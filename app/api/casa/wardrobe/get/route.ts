import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../../../lib/supabaseClientCasa';
import { createServerClient } from '../../../../../lib/supabaseAuth';
import { Database } from '../../../../databaseCasa.types';

type Wardrobe = Database['public']['Tables']['Wardrobe']['Row'];

export async function GET(request: NextRequest) {
    try {
        // Verificar autenticación y obtener usuario
        const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
            request.cookies.get('sb-access-token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'No autorizado' },
                { status: 401 }
            );
        }

        const authSupabase = createServerClient();
        const { data: { user }, error: authError } = await authSupabase.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json(
                { success: false, error: 'Token inválido' },
                { status: 401 }
            );
        }

        // Obtener wardrobes filtrados por usuario (a través de House)
        const { data: wardrobes, error } = await supabase
            .from('Wardrobe')
            .select(`
                id,
                name,
                location,
                house_id,
                House!inner (
                    id,
                    name,
                    address,
                    user_id
                )
            `)
            .eq('House.user_id', parseInt(user.id))
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
                    success: true,
                    message: 'No se encontraron wardrobes para este usuario',
                    data: [],
                    count: 0
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
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}


