import { NextResponse } from 'next/server';
import pool from '../../../../../lib/dbCasa';

const TAG_COLORS = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-red-100 text-red-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-gray-100 text-gray-800',
    'bg-orange-100 text-orange-800',
    'bg-teal-100 text-teal-800',
];

export async function GET() {
    try {
        const { rows: tags } = await pool.query(
            `SELECT id, name FROM public.tag ORDER BY name ASC`
        );

        if (tags.length === 0) {
            return NextResponse.json({ success: true, message: 'No se encontraron tags', data: [], count: 0 });
        }

        const tagsWithColors = tags.map((tag, index) => ({
            id: tag.id.toString(),
            name: tag.name,
            color: TAG_COLORS[index % TAG_COLORS.length]
        }));

        return NextResponse.json({ success: true, count: tagsWithColors.length, data: tagsWithColors });

    } catch (error) {
        console.error('Unexpected error fetching tags:', error);
        return NextResponse.json({ success: false, error: 'Error interno del servidor', data: [] }, { status: 500 });
    }
}