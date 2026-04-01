/**
 * API Route: Obtener casas del usuario autenticado
 * GET /api/casa/house/get
 */

import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../../../lib/supabaseClientCasa';
import { createServerClient } from '../../../../../lib/supabaseAuth';

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

        // Obtener casas del usuario
        const { data: houses, error } = await supabase
            .from('House')
            .select('id, name, address, created_at')
            .eq('user_id', parseInt(user.id))
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching houses:', error);
            return NextResponse.json(
                { success: false, error: 'Error al obtener casas' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: houses || [],
            count: houses?.length || 0
        }, { status: 200 });

    } catch (error) {
        console.error('Error en API house get:', error);
        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor'
        }, { status: 500 });
    }
}

// Método OPTIONS para CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}