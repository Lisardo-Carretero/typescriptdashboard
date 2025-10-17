import { NextResponse } from 'next/server';
import supabase from '../../../../../lib/supabaseClientCasa';
import { Database } from '../../../../databaseCasa.types';

type Tag = Database['public']['Tables']['tag']['Row'];

// Colores predefinidos para tags
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
        const { data: tags, error } = await supabase
            .from('tag')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching tags from Supabase:', error);
            return NextResponse.json({
                success: false,
                error: 'Error al obtener los tags',
                data: [],
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }, { status: 500 });
        }

        if (!tags || tags.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No se encontraron tags',
                data: [],
                count: 0
            }, { status: 200 });
        }

        // Asignar colores a los tags de manera consistente
        const tagsWithColors = tags.map((tag: Tag, index: number) => ({
            id: tag.id.toString(),
            name: tag.name,
            color: TAG_COLORS[index % TAG_COLORS.length]
        }));

        return NextResponse.json({
            success: true,
            count: tagsWithColors.length,
            data: tagsWithColors
        }, { status: 200 });

    } catch (error) {
        console.error('Unexpected error fetching tags:', error);
        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor',
            data: []
        }, { status: 500 });
    }
}