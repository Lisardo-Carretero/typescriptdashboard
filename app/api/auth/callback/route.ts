import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '../../../../lib/supabaseAuth';

/**
 * API callback usado como emailRedirectTo target.
 * Maneja magic links, invitaciones y confirmaciones de email de Supabase.
 * Intercambia el código por una sesión y redirige a una página amigable.
 */
export async function GET(request: NextRequest) {
    try {
        const requestUrl = new URL(request.url);
        const code = requestUrl.searchParams.get('code');
        const token_hash = requestUrl.searchParams.get('token_hash');
        const type = requestUrl.searchParams.get('type');
        const next = requestUrl.searchParams.get('next') || '/casa';

        const supabase = createServerClient();

        // Si hay un código de autorización, intercambiarlo por una sesión
        if (code) {
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);

            if (error) {
                console.error('Error intercambiando código:', error);
                return NextResponse.redirect(
                    new URL(`/login?error=${encodeURIComponent('Error al verificar el enlace')}`, requestUrl.origin)
                );
            }

            // Determinar a dónde redirigir según el tipo
            if (type === 'signup' || type === 'invite') {
                // Usuario confirmado o invitado - ir a página de bienvenida
                return NextResponse.redirect(
                    new URL(`/auth/confirmed?email=${encodeURIComponent(data.user?.email || '')}`, requestUrl.origin)
                );
            } else if (type === 'magiclink') {
                // Magic link - ir directamente a la app
                return NextResponse.redirect(new URL(next, requestUrl.origin));
            } else if (type === 'recovery') {
                // Reseteo de contraseña - ir a página de cambio de contraseña
                return NextResponse.redirect(new URL('/auth/reset-password', requestUrl.origin));
            }

            // Por defecto, ir a la app
            return NextResponse.redirect(new URL(next, requestUrl.origin));
        }

        // Si hay token_hash (método antiguo), también manejarlo
        if (token_hash) {
            const { error } = await supabase.auth.verifyOtp({
                token_hash,
                type: type as any || 'email',
            });

            if (error) {
                console.error('Error verificando OTP:', error);
                return NextResponse.redirect(
                    new URL(`/login?error=${encodeURIComponent('Error al verificar el enlace')}`, requestUrl.origin)
                );
            }

            if (type === 'signup' || type === 'invite') {
                return NextResponse.redirect(
                    new URL('/auth/confirmed', requestUrl.origin)
                );
            }

            return NextResponse.redirect(new URL(next, requestUrl.origin));
        }

        // Si no hay código ni token, redirigir al login
        return NextResponse.redirect(
            new URL('/login?error=missing_verification_data', requestUrl.origin)
        );

    } catch (err) {
        console.error('Error en callback de autenticación:', err);
        return NextResponse.redirect(
            new URL('/login?error=callback_error', new URL(request.url).origin)
        );
    }
}
