import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../../../lib/dbCasa";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ wardrobeId: string }> }
) {
    try {
        const { wardrobeId: wardrobeIdStr } = await params;
        const wardrobeId = parseInt(wardrobeIdStr);

        // Validar que wardrobeId es un número válido
        if (isNaN(wardrobeId)) {
            return NextResponse.json(
                { error: 'ID de wardrobe inválido' },
                { status: 400 }
            );
        }

        const { rows: wardrobeRows } = await pool.query(
            `SELECT id, name, location FROM public."Wardrobe" WHERE id = $1`,
            [wardrobeId]
        );

        if (wardrobeRows.length === 0) {
            return NextResponse.json({ error: 'Wardrobe no encontrado' }, { status: 404 });
        }

        const { rows: cloths } = await pool.query(
            `SELECT
                c.id,
                c.name,
                c.owner,
                c.colour,
                c.brand,
                c.size,
                c.tags,
                c.notes,
                c.created_at,
                whc."wardrobeId" AS wardrobe_id
             FROM public."WardrobeHasCloth" whc
             INNER JOIN public."Cloth" c ON c.id = whc."clothId"
             WHERE whc."wardrobeId" = $1
             ORDER BY c.created_at DESC`,
            [wardrobeId]
        );

        return NextResponse.json({
            success: true,
            wardrobe: wardrobeRows[0],
            cloths,
            totalCloths: cloths.length
        }, { status: 200 });

    } catch (error) {
        console.error('Error al obtener prendas del wardrobe:', error);
        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor al obtener las prendas',
        }, { status: 500 });
    }
}