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
            `SELECT id, name FROM public."Wardrobe" WHERE id = $1`,
            [wardrobeId]
        );

        if (wardrobeRows.length === 0) {
            return NextResponse.json({ error: 'Wardrobe no encontrado' }, { status: 404 });
        }

        const { rows } = await pool.query(
            `SELECT COUNT(*)::int AS count
             FROM public."WardrobeHasCloth"
             WHERE "wardrobeId" = $1`,
            [wardrobeId]
        );

        const count = rows[0].count;
        return NextResponse.json({
            success: true,
            count,
            wardrobeName: wardrobeRows[0].name,
            message: `Se encontraron ${count} prendas en el wardrobe`
        }, { status: 200 });

    } catch (error) {
        console.error('Error al obtener total de prendas:', error);
        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor al obtener el total de prendas',
        }, { status: 500 });
    }
}
