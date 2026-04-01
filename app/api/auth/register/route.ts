/**
 * API Route: Registro de usuario con Supabase Auth
 * POST /api/auth/register
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../../lib/supabaseAuth';
import { resend } from '../../../../lib/resend';
import { z } from 'zod';

// Esquema de validación para registro
const registerSchema = z.object({
    email: z.string().email('Email inválido').min(1, 'Email requerido'),
    password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Contraseña debe contener al menos una mayúscula, una minúscula y un número'),
    full_name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').optional(),
});

export async function POST(request: NextRequest) {
    try {
        // Parsear y validar datos del request
        const body = await request.json();
        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                success: false,
                error: 'Datos inválidos',
                details: validation.error.issues
            }, { status: 400 });
        }

        const { email, password, full_name } = validation.data;

        // Intentar registro con Supabase Auth
        const supabase = createServerClient();
        // Construir redirect para emails (apunta a la nueva página de callback)
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const emailRedirectTo = `${appUrl}/auth/callback`;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: full_name || email.split('@')[0],
                },
                // Indicar a Supabase que use nuestra URL de redirección en el correo
                emailRedirectTo,
            }
        });

        if (error) {
            console.error('Error en registro:', error);

            // Mapear errores comunes
            let errorMessage = 'Error al registrar usuario';
            if (error.message.includes('User already registered')) {
                errorMessage = 'El email ya está registrado';
            } else if (error.message.includes('Password should be')) {
                errorMessage = 'La contraseña no cumple con los requisitos';
            } else if (error.message.includes('Invalid email')) {
                errorMessage = 'Email inválido';
            }

            return NextResponse.json({
                success: false,
                error: errorMessage
            }, { status: 400 });
        }

        if (!data.user) {
            return NextResponse.json({
                success: false,
                error: 'No se pudo crear el usuario'
            }, { status: 400 });
        }

        // NOTA: Supabase ya envía automáticamente un email de confirmación
        // con el token correcto. No necesitamos enviar un email adicional con Resend.
        // Si quieres personalizar los emails, hazlo desde Supabase Dashboard → 
        // Authentication → Email Templates

        /* COMENTADO: Email personalizado con Resend (no incluye token de Supabase)
        try {
            const verifyUrl = `${emailRedirectTo}?email=${encodeURIComponent(email)}`;
            const fromAddress = 'team@lisardocarretero.com';

            await resend.emails.send({
                from: fromAddress,
                to: email,
                subject: 'Verifica tu cuenta - IoT Dashboard (desarrollo)',
                html: `
                    <p>Hola ${full_name || ''},</p>
                    <p>Gracias por registrarte. Haz click en el siguiente enlace para verificar tu cuenta (entorno de desarrollo):</p>
                    <p><a href="${verifyUrl}">Verificar cuenta</a></p>
                    <p>Si el enlace no funciona, copia y pega esta URL en tu navegador:</p>
                    <p>${verifyUrl}</p>
                    <hr />
                    <small>Si no solicitaste esto, ignora este mensaje.</small>
                `,
            });
        } catch (emailError) {
            console.error('Error enviando correo de verificación con Resend:', emailError);
            // No fallamos el registro solo porque el correo de Resend haya fallado
        }
        */

        // Registro exitoso
        return NextResponse.json({
            success: true,
            message: 'Usuario registrado exitosamente. Revisa tu email para confirmar la cuenta.',
            user: {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.user_metadata?.full_name,
                email_confirmed: data.user.email_confirmed_at ? true : false,
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Error en API register:', error);
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