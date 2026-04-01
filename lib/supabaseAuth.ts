/**
 * Cliente Supabase optimizado para autenticación
 * Manejo seguro de sesiones y tokens JWT
 */

import { createClient } from '@supabase/supabase-js';

// URLs y claves desde variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Faltan variables de entorno de Supabase');
}

// Cliente para el navegador (client-side)
export const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce', // Más seguro para aplicaciones públicas
    },
    global: {
        headers: {
            'X-Client-Info': 'nextjs-auth'
        }
    }
});

// Cliente para el servidor (server-side) - sin persistencia de sesión
export const createServerClient = () => {
    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
        },
    });
};

// Tipos TypeScript para autenticación
export interface UserProfile {
    id: string;
    email: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    success: boolean;
    user?: UserProfile;
    session?: any;
    error?: string;
}

// Utilidades de autenticación
export const authUtils = {
    // Obtener usuario actual (solo si hay sesión activa)
    getCurrentUser: async () => {
        try {
            // Primero verificar si hay sesión
            const { data: { session }, error: sessionError } = await supabaseAuth.auth.getSession();

            if (sessionError || !session) {
                return null;
            }

            // Si hay sesión, obtener usuario
            const { data: { user }, error } = await supabaseAuth.auth.getUser();
            if (error) {
                console.error('Error obteniendo usuario:', error);
                return null;
            }
            return user;
        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            return null;
        }
    },

    // Obtener sesión actual
    getCurrentSession: async () => {
        try {
            const { data: { session }, error } = await supabaseAuth.auth.getSession();
            if (error) {
                console.error('Error obteniendo sesión:', error);
                return null;
            }
            return session;
        } catch (error) {
            console.error('Error obteniendo sesión:', error);
            return null;
        }
    },

    // Validar token JWT
    validateToken: async (token: string) => {
        try {
            const { data: { user }, error } = await supabaseAuth.auth.getUser(token);
            return { valid: !error && !!user, user, error };
        } catch (error) {
            return { valid: false, user: null, error };
        }
    },

    // Cerrar sesión
    signOut: async () => {
        try {
            const { error } = await supabaseAuth.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error cerrando sesión:', error);
            return { success: false, error };
        }
    }
};

export default supabaseAuth;