import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../../../lib/dbCasa';

export async function GET(_request: NextRequest) {
    try {
        const { rows: wardrobes } = await pool.query(
            `SELECT id, name, location FROM public."Wardrobe" ORDER BY name ASC`
        );

        return NextResponse.json({
            success: true,
            count: wardrobes.length,
            data: wardrobes
        }, { status: 200 });

    } catch (error) {
        console.error('Unexpected error fetching wardrobes:', error);
        return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
    }
}


