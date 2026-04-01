"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabaseAuth from '../../../lib/supabaseAuth';
import LoadingSpinner from '../../../components/loadingSpinner';

export default function AuthCallbackPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('Verificando...');

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const supabase = supabaseAuth;

                // Log para debugging
                console.log('=== AUTH CALLBACK DEBUG ===');
                console.log('Full URL:', window.location.href);
                console.log('Hash:', window.location.hash);
                console.log('Search:', window.location.search);

                // Verificar si hay un hash con tokens (método antiguo de Supabase)
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = hashParams.get('access_token');
                const refreshToken = hashParams.get('refresh_token');
                const type = hashParams.get('type');
                const tokenHash = hashParams.get('token_hash');

                console.log('Hash params:', { accessToken: !!accessToken, refreshToken: !!refreshToken, type, tokenHash: !!tokenHash });

                // También verificar query params para el nuevo flujo PKCE
                const queryParams = new URLSearchParams(window.location.search);
                const code = queryParams.get('code');
                const token = queryParams.get('token');
                const errorParam = queryParams.get('error');
                const errorDescription = queryParams.get('error_description');

                console.log('Query params:', { code: !!code, token: !!token, errorParam, errorDescription });

                if (errorParam) {
                    console.error('Error from Supabase:', errorParam, errorDescription);
                    setError(errorDescription || errorParam);
                    setTimeout(() => router.push('/login'), 3000);
                    return;
                }

                // Método 1: Si hay tokens en el hash (invitaciones, magic links antiguos)
                if (accessToken && refreshToken) {
                    setStatus('Estableciendo sesión...');

                    const { data, error: sessionError } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    });

                    if (sessionError) {
                        console.error('Error estableciendo sesión:', sessionError);
                        setError('Error al establecer la sesión');
                        setTimeout(() => router.push('/login'), 3000);
                        return;
                    }

                    // Verificar que la sesión se estableció correctamente
                    const { data: { session } } = await supabase.auth.getSession();

                    if (!session) {
                        setError('No se pudo establecer la sesión');
                        setTimeout(() => router.push('/login'), 3000);
                        return;
                    }

                    // Redirigir según el tipo
                    if (type === 'invite') {
                        setStatus('¡Invitación aceptada! Redirigiendo...');
                        setTimeout(() => router.push('/casa'), 1000);
                    } else if (type === 'magiclink') {
                        setStatus('¡Acceso concedido! Redirigiendo...');
                        setTimeout(() => router.push('/casa'), 1000);
                    } else if (type === 'signup') {
                        setStatus('¡Email confirmado! Redirigiendo...');
                        setTimeout(() => router.push('/casa'), 1000);
                    } else {
                        setStatus('¡Verificación exitosa! Redirigiendo...');
                        setTimeout(() => router.push('/casa'), 1000);
                    }
                    return;
                }

                // Método 2: Si hay un código (nuevo flujo PKCE)
                if (code) {
                    setStatus('Intercambiando código de autorización...');

                    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

                    if (exchangeError) {
                        console.error('Error intercambiando código:', exchangeError);
                        setError('Error al verificar el código');
                        setTimeout(() => router.push('/login'), 3000);
                        return;
                    }

                    // Verificar que la sesión se estableció correctamente
                    const { data: { session } } = await supabase.auth.getSession();

                    if (!session) {
                        setError('No se pudo establecer la sesión');
                        setTimeout(() => router.push('/login'), 3000);
                        return;
                    }

                    setStatus('¡Verificación exitosa! Redirigiendo...');
                    setTimeout(() => router.push('/casa'), 1000);
                    return;
                }

                // Método 3: Si hay un token_hash (confirmación de email con nuevo formato)
                if (tokenHash) {
                    setStatus('Verificando token de confirmación...');

                    const { data, error: verifyError } = await supabase.auth.verifyOtp({
                        token_hash: tokenHash,
                        type: 'email',
                    });

                    if (verifyError) {
                        console.error('Error verificando token:', verifyError);
                        setError('Error al verificar el email. El enlace puede haber expirado.');
                        setTimeout(() => router.push('/login'), 3000);
                        return;
                    }

                    setStatus('¡Email verificado exitosamente! Redirigiendo...');
                    setTimeout(() => router.push('/casa'), 1000);
                    return;
                }

                // Método 4: Si solo hay token query param (some Supabase versions)
                if (token) {
                    setStatus('Verificando confirmación de email...');

                    const { data, error: verifyError } = await supabase.auth.verifyOtp({
                        token_hash: token,
                        type: 'email',
                    });

                    if (verifyError) {
                        console.error('Error verificando token:', verifyError);
                        setError('Error al verificar el email. El enlace puede haber expirado.');
                        setTimeout(() => router.push('/login'), 3000);
                        return;
                    }

                    setStatus('¡Email verificado exitosamente! Redirigiendo...');
                    setTimeout(() => router.push('/casa'), 1000);
                    return;
                }

                // Si no hay tokens ni código, mostrar mensaje informativo y redirigir a login
                console.error('No authentication data found in callback');
                setError('No se encontraron datos de autenticación en el enlace. Por favor, intenta registrarte o iniciar sesión nuevamente.');
                setTimeout(() => router.push('/login'), 5000);

            } catch (err) {
                console.error('Error en callback:', err);
                setError('Error procesando la autenticación. Por favor, intenta nuevamente.');
                setTimeout(() => router.push('/login'), 3000);
            }
        };

        handleCallback();
    }, [router]);

    return (
        <div className="min-h-screen bg-[#2E2A3B] text-white flex items-center justify-center">
            <div className="bg-[#49416D] p-8 rounded-lg shadow-xl border border-[#D9BBA0] w-full max-w-lg text-center">
                {error ? (
                    <>
                        <div className="mb-4">
                            <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold mb-4 text-red-400">Error de autenticación</h1>
                        <p className="mb-4 text-white">{error}</p>
                        <div className="mt-6 p-4 bg-[#2E2A3B] rounded-lg">
                            <p className="text-sm text-gray-300 mb-2">
                                💡 <strong>Posibles causas:</strong>
                            </p>
                            <ul className="text-xs text-gray-400 text-left list-disc list-inside space-y-1">
                                <li>El enlace de confirmación ha expirado</li>
                                <li>El enlace ya fue utilizado anteriormente</li>
                                <li>El formato del enlace es incorrecto</li>
                            </ul>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">Redirigiendo a login...</p>
                    </>
                ) : (
                    <>
                        <div className="mb-4">
                            <LoadingSpinner />
                        </div>
                        <h1 className="text-2xl font-bold mb-4 text-[#D9BBA0]">Verificando autenticación</h1>
                        <p className="mb-4 text-white">{status}</p>
                        <p className="text-sm text-gray-400">Por favor espera un momento...</p>
                    </>
                )}
            </div>
        </div>
    );
}
