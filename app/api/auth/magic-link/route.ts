/**
 * API Route: Magic Link Login
 * POST /api/auth/magic-link
 * Envía un enlace mágico al email del usuario para iniciar sesión sin contraseña
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabaseAuth';
import { z } from 'zod';

// Esquema de validación
const magicLinkSchema = z.object({
    email: z.string().email('Email inválido').min(1, 'Email requerido'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = magicLinkSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                error: 'Email inválido',
                details: validation.error.issues
            }, { status: 400 });
        }

        const { email } = validation.data;

        const supabase = createServerClient();

        // Obtener la URL base para la redirección
        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        // Enviar magic link
        // shouldCreateUser: false asegura que solo funcione con usuarios existentes
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${origin}/auth/callback?next=/casa`,
                shouldCreateUser: false, // Solo permitir magic link a usuarios registrados
            },
        });

        if (error) {
            console.error('Error enviando magic link:', error);

            let errorMessage = 'Error al enviar el enlace mágico';
            if (error.message.includes('rate limit')) {
                errorMessage = 'Demasiados intentos. Por favor, espera unos minutos.';
            } else if (error.message.includes('Invalid email')) {
                errorMessage = 'Email inválido';
            } else if (error.message.includes('User not found') || error.message.includes('Signups not allowed')) {
                // No revelar si el usuario existe o no por seguridad
                errorMessage = 'Este email no está registrado. Por favor, regístrate primero.';
            }

            return NextResponse.json({
                success: false,
                error: errorMessage
            }, { status: 400 });
        } return NextResponse.json({
            success: true,
            message: 'Enlace mágico enviado correctamente. Revisa tu email.',
            data: {
                email: email
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error en magic link:', error);
        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor'
        }, { status: 500 });
    }
}
