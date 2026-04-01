import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../../lib/dbCasa";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.name || !body.category) {
            return NextResponse.json(
                { error: 'Los campos name y category son obligatorios' },
                { status: 400 }
            );
        }

        const wardrobeId = body.wardrobeId || body.storageId;
        if (!wardrobeId) {
            return NextResponse.json({ error: 'El wardrobe es obligatorio' }, { status: 400 });
        }

        const { rows: wardrobeRows } = await pool.query(
            `SELECT id, name FROM public."Wardrobe" WHERE id = $1`,
            [wardrobeId]
        );
        if (wardrobeRows.length === 0) {
            return NextResponse.json({ error: 'El wardrobe especificado no existe' }, { status: 400 });
        }
        const wardrobe = wardrobeRows[0];

        const tagsArray = (body.tags || [])
            .map((tag: any) => (typeof tag === 'object' && tag.name ? tag.name : typeof tag === 'string' ? tag : null))
            .filter((t: any) => t !== null);
        const tagsJsonArray = tagsArray.map((tag: string) => JSON.stringify(tag));

        await pool.query('BEGIN');

        const { rows } = await pool.query(
            `INSERT INTO public."Cloth" (name, owner, colour, brand, notes, size, tags)
             VALUES ($1, $2, $3, $4, $5, $6, $7::json[])
             RETURNING id, name, owner, colour, brand, size, tags, notes, created_at`,
            [
                body.name,
                body.category,
                body.color || null,
                body.brand || null,
                body.notes || null,
                body.size || null,
                tagsJsonArray
            ]
        );

        const cloth = rows[0];

        await pool.query(
            `INSERT INTO public."WardrobeHasCloth" ("wardrobeId", "clothId")
             VALUES ($1, $2)`,
            [wardrobeId, cloth.id]
        );

        await pool.query('COMMIT');

        return NextResponse.json({
            success: true,
            message: 'Prenda añadida exitosamente',
            data: { ...cloth, wardrobe_id: wardrobeId, wardrobe_name: wardrobe.name }
        }, { status: 201 });

    } catch (error) {
        try {
            await pool.query('ROLLBACK');
        } catch (rollbackError) {
            console.error('Error en rollback al crear prenda:', rollbackError);
        }
        console.error('Error al crear prenda:', error);
        return NextResponse.json({ success: false, error: 'Error interno del servidor al crear la prenda' }, { status: 500 });
    }
}
