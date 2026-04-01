import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/callback',
    '/api/auth/magic-link',
    '/auth/callback',
    '/login',
    '/register',
    '/auth/confirmed',
    '/auth/reset-password',
    '/favicon.ico',
    '/_next',
    '/public'
];

// Rutas protegidas que requieren autenticación
const PROTECTED_ROUTES = [
    '/game',
    '/portainer',
    '/api/device',
    '/api/sensors',
    '/api/data'
];

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const path = request.nextUrl.pathname;
    const corsUrl = process.env.CORS_URL;

    // Agregar encabezados CORS para todas las respuestas
    response.headers.set("Access-Control-Allow-Origin", corsUrl ? `${corsUrl}/*` : "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Manejar preflight requests
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: response.headers });
    }

    // Verificar si es una ruta pública
    const isPublicRoute = PUBLIC_ROUTES.some(route => path.startsWith(route));
    if (isPublicRoute) {
        return response;
    }

    // Permitir acceso a la raíz sin autenticación (tiene los modales)
    if (path === '/') {
        return response;
    }

    // Verificar si es una ruta protegida
    const isProtectedRoute = PROTECTED_ROUTES.some(route => path.startsWith(route));
    if (!isProtectedRoute) {
        return response;
    }

    // Verificar autenticación para rutas protegidas
    try {
        // Crear cliente de Supabase para el servidor que maneja cookies correctamente
        const supabase = createServerClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value;
                    },
                    set(name: string, value: string, options: any) {
                        // No necesitamos establecer cookies en el middleware
                    },
                    remove(name: string, options: any) {
                        // No necesitamos eliminar cookies en el middleware
                    },
                },
            }
        );

        // Obtener la sesión actual desde las cookies
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
            console.log('No session found, redirecting to login');
            // Sin sesión válida - redirigir a login
            if (path.startsWith('/api/')) {
                return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Verificar que el usuario existe
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            console.log('Invalid session or user not found, redirecting to login');
            // Usuario no válido - redirigir a login
            if (path.startsWith('/api/')) {
                return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }

        console.log('User authenticated:', user.email);
        // Usuario autenticado - agregar información del usuario a headers
        response.headers.set('X-User-ID', user.id);
        response.headers.set('X-User-Email', user.email || '');

        return response;
    } catch (error) {
        console.error('Error en middleware de autenticación:', error);

        if (path.startsWith('/api/')) {
            return NextResponse.json({ error: 'Error de autenticación' }, { status: 500 });
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};