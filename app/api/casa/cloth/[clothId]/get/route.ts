import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../../lib/dbCasa';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ clothId: string }> }) {
    try {
        const { clothId: clothIdStr } = await params;
        const clothId = parseInt(clothIdStr);

        const { rows } = await pool.query(
            `SELECT * FROM public."Cloth" WHERE id = $1`,
            [clothId]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Prenda no encontrada' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Error fetching cloth:', error);
        return NextResponse.json({ error: 'Error fetching cloth' }, { status: 500 });
    }
}
