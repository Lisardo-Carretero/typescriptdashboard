import { NextResponse } from 'next/server';
import supabase from '../../../../../lib/supabaseClientCasa';
import { Database } from '../../../../databaseCasa.types';

type Wardrobe = Database['public']['Tables']['Wardrobe']['Row'];

export async function GET() {
    try {
        const { data: wardrobes, error } = await supabase
            .from('Wardrobe')
            .select(`
                id,
                name,
                location,
                house_id,
                House (
                    id,
                    name,
                    address
                )
            `)
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching wardrobes:', error);
            return NextResponse.json(
                {
                    error: 'Error al obtener wardrobes',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                },
                { status: 500 }
            );
        }

        if (!wardrobes || wardrobes.length === 0) {
            return NextResponse.json(
                {
                    message: 'No se encontraron wardrobes',
                    data: []
                },
                { status: 200 }
            );
        }

        // Formatear la respuesta para incluir información adicional
        const formattedWardrobes = wardrobes.map(wardrobe => ({
            id: wardrobe.id,
            name: wardrobe.name,
            location: wardrobe.location,
            house_id: wardrobe.house_id,
            house: wardrobe.House ? {
                id: wardrobe.House.id,
                name: wardrobe.House.name,
                address: wardrobe.House.address
            } : null
        }));

        return NextResponse.json({
            success: true,
            count: formattedWardrobes.length,
            data: formattedWardrobes
        }, { status: 200 });

    } catch (error) {
        console.error('Unexpected error fetching wardrobes:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}


