/**
 * API Route: Login de usuario con Supabase Auth
 * POST /api/auth/login
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabaseAuth';
import { z } from 'zod';

// Esquema de validación para login
const loginSchema = z.object({
    email: z.string().email('Email inválido').min(1, 'Email requerido'),
    password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
});

export async function POST(request: NextRequest) {
    try {
        // Parsear y validar datos del request
        const body = await request.json();
        const validation = loginSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                error: 'Datos inválidos',
                details: validation.error.issues
            }, { status: 400 });
        }

        const { email, password } = validation.data;

        // Intentar login con Supabase Auth
        const supabase = createServerClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Error en login:', error);

            // Mapear errores comunes
            let errorMessage = 'Error al iniciar sesión';
            if (error.message.includes('Invalid login credentials')) {
                errorMessage = 'Email o contraseña incorrectos';
            } else if (error.message.includes('Email not confirmed')) {
                errorMessage = 'Email no confirmado';
            }

            return NextResponse.json({
                success: false,
                error: errorMessage
            }, { status: 401 });
        }

        if (!data.user || !data.session) {
            return NextResponse.json({
                success: false,
                error: 'No se pudo establecer la sesión'
            }, { status: 401 });
        }

        // Login exitoso
        const response = NextResponse.json({
            success: true,
            user: {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.user_metadata?.full_name,
                avatar_url: data.user.user_metadata?.avatar_url,
            },
            session: {
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at,
            }
        });

        // Establecer cookies seguras para la sesión
        response.cookies.set('sb-access-token', data.session.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: data.session.expires_in || 3600,
        });

        response.cookies.set('sb-refresh-token', data.session.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 días
        });

        return response;

    } catch (error) {
        console.error('Error en API login:', error);
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