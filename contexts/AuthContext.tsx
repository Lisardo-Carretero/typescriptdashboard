/**
 * Context de Autenticación
 * Maneja el estado global del usuario y la autenticación
 */

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import supabaseAuth, { authUtils } from '../lib/supabaseAuth';

// Tipos para el contexto
interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signUp: (email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

// Provider del contexto
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener el usuario actual
    const refreshUser = async () => {
        try {
            setError(null);

            // Primero verificar si hay una sesión activa
            const session = await authUtils.getCurrentSession();

            if (!session) {
                setUser(null);
                return;
            }

            // Si hay sesión, obtener el usuario
            const currentUser = await authUtils.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            // No establecer error aquí si es solo porque no hay sesión
            setUser(null);
        }
    };

    // Inicializar usuario al montar el componente
    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);

            try {
                // Verificar sesión inicial
                const session = await authUtils.getCurrentSession();

                if (session?.user) {
                    setUser(session.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error inicializando auth:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Escuchar cambios de autenticación
        const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state change:', event);

                if (event === 'SIGNED_IN' && session?.user) {
                    setUser(session.user);
                    setError(null);
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                    setError(null);
                } else if (event === 'TOKEN_REFRESHED' && session?.user) {
                    setUser(session.user);
                } else if (event === 'USER_UPDATED' && session?.user) {
                    setUser(session.user);
                }

                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    // Función de login
    const signIn = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!data.success) {
                setError(data.error);
                return { success: false, error: data.error };
            }

            // El usuario se actualizará automáticamente por onAuthStateChange
            return { success: true };

        } catch (error) {
            const errorMessage = 'Error de conexión';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Función de registro
    const signUp = async (email: string, password: string, fullName?: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    full_name: fullName
                }),
            });

            const data = await response.json();

            if (!data.success) {
                setError(data.error);
                return { success: false, error: data.error };
            }

            return { success: true };

        } catch (error) {
            const errorMessage = 'Error de conexión';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Función de logout
    const signOut = async () => {
        try {
            setLoading(true);
            setError(null);

            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            // También cerrar sesión en el cliente
            await authUtils.signOut();

            // El usuario se actualizará automáticamente por onAuthStateChange
        } catch (error) {
            console.error('Error en logout:', error);
            setError('Error al cerrar sesión');
        } finally {
            setLoading(false);
        }
    };

    // Valor del contexto
    const value: AuthContextType = {
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para verificar si el usuario está autenticado
export const useRequireAuth = () => {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            // Redirigir a login si no está autenticado
            window.location.href = '/login';
        }
    }, [user, loading]);

    return { user, loading };
};