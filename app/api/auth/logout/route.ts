/**
 * API Route: Logout de usuario
 * POST /api/auth/logout
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabaseAuth';

export async function POST(request: NextRequest) {
    try {
        // Obtener token del header o cookies
        const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
            request.cookies.get('sb-access-token')?.value;

        if (!token) {
            return NextResponse.json({
                success: false,
                error: 'No hay sesión activa'
            }, { status: 400 });
        }

        // Cerrar sesión en Supabase
        const supabase = createServerClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error cerrando sesión:', error);
            return NextResponse.json({
                success: false,
                error: 'Error al cerrar sesión'
            }, { status: 500 });
        }

        // Crear respuesta y limpiar cookies
        const response = NextResponse.json({
            success: true,
            message: 'Sesión cerrada exitosamente'
        });

        // Eliminar cookies de sesión
        response.cookies.delete('sb-access-token');
        response.cookies.delete('sb-refresh-token');

        return response;

    } catch (error) {
        console.error('Error en API logout:', error);
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
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}