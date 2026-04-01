/**
 * API Route: Registrar nueva casa para el usuario autenticado
 * POST /api/casa/house/register
 */

import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../../../lib/supabaseClientCasa';
import { createServerClient } from '../../../../../lib/supabaseAuth';
import { z } from 'zod';

// Esquema de validación para casa
const houseSchema = z.object({
    name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(100, 'Nombre muy largo'),
    address: z.string().min(5, 'Dirección debe tener al menos 5 caracteres').max(200, 'Dirección muy larga').optional(),
});

export async function POST(request: NextRequest) {
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

        // Parsear y validar datos del request
        const body = await request.json();
        const validation = houseSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                error: 'Datos inválidos',
                details: validation.error.issues
            }, { status: 400 });
        }

        const { name, address } = validation.data;

        // Verificar si el usuario ya tiene una casa con ese nombre
        const { data: existingHouse, error: checkError } = await supabase
            .from('House')
            .select('id, name')
            .eq('user_id', parseInt(user.id))
            .eq('name', name)
            .single();

        if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows found
            console.error('Error verificando casa existente:', checkError);
            return NextResponse.json(
                { success: false, error: 'Error al verificar casa existente' },
                { status: 500 }
            );
        }

        if (existingHouse) {
            return NextResponse.json(
                { success: false, error: 'Ya tienes una casa con ese nombre' },
                { status: 409 }
            );
        }

        // Crear la nueva casa
        const { data: newHouse, error: insertError } = await supabase
            .from('House')
            .insert([{
                name,
                address: address || null,
                user_id: parseInt(user.id)
            }])
            .select('id, name, address, created_at')
            .single();

        if (insertError) {
            console.error('Error creando casa:', insertError);
            return NextResponse.json(
                { success: false, error: 'Error al crear la casa' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Casa creada exitosamente',
            data: {
                id: newHouse.id,
                name: newHouse.name,
                address: newHouse.address,
                created_at: newHouse.created_at,
                user_id: parseInt(user.id)
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Error en API house register:', error);
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