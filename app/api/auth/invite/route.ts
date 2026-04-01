/**
 * API Route: Invitar Usuario
 * POST /api/auth/invite
 * Permite a un administrador invitar a un usuario por email
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabaseAuth';
import { z } from 'zod';

// Esquema de validación
const inviteSchema = z.object({
    email: z.string().email('Email inválido').min(1, 'Email requerido'),
    redirectTo: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = inviteSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                error: 'Email inválido',
                details: validation.error.issues
            }, { status: 400 });
        }

        const { email, redirectTo } = validation.data;

        const supabase = createServerClient();

        // Verificar que el usuario que invita esté autenticado y sea admin
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({
                success: false,
                error: 'No autorizado'
            }, { status: 401 });
        }

        // Aquí podrías verificar si el usuario es admin
        // const isAdmin = user.user_metadata?.role === 'admin';
        // if (!isAdmin) { return 403; }

        // Obtener la URL base para la redirección
        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const emailRedirectTo = redirectTo || `${origin}/auth/callback`;

        // Invitar usuario usando la Admin API de Supabase
        const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
            redirectTo: emailRedirectTo,
        });

        if (error) {
            console.error('Error invitando usuario:', error);

            let errorMessage = 'Error al invitar usuario';
            if (error.message.includes('already exists')) {
                errorMessage = 'El usuario ya existe';
            } else if (error.message.includes('rate limit')) {
                errorMessage = 'Demasiados intentos. Por favor, espera unos minutos.';
            } else if (error.message.includes('Invalid email')) {
                errorMessage = 'Email inválido';
            }

            return NextResponse.json({
                success: false,
                error: errorMessage
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: 'Invitación enviada correctamente',
            data: {
                email: email,
                user: data.user
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error en invitación:', error);
        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor'
        }, { status: 500 });
    }
}
