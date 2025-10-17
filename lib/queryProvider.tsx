/**
 * React Query configuration and setup
 * Provides optimized data fetching, caching, and synchronization
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

// Configuración optimizada de React Query
const createQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            // Tiempo que los datos se consideran "frescos" (no necesitan refetch)
            staleTime: 5 * 60 * 1000, // 5 minutos

            // Tiempo que los datos permanecen en cache después de no usarse
            gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)

            // Reintenta automáticamente en caso de error
            retry: (failureCount, error: any) => {
                // No reintentar en errores 404 o de autorización
                if (error?.status === 404 || error?.status === 401) return false;
                return failureCount < 3;
            },

            // Refetch automático cuando la ventana recibe foco
            refetchOnWindowFocus: false,

            // Refetch cuando se reconecta a internet
            refetchOnReconnect: true,

            // Refetch cuando el componente se monta
            refetchOnMount: true,
        },
        mutations: {
            // Reintenta mutaciones fallidas
            retry: 1,
        },
    },
});

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    // Crear una instancia única del QueryClient por sesión
    const [queryClient] = useState(() => createQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* DevTools solo en desarrollo */}
            {process.env.NODE_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    );
}

// Hook para invalidar queries específicas
export const useInvalidateQueries = () => {
    const queryClient = useQueryClient();

    return {
        invalidateWardrobes: () => queryClient.invalidateQueries({ queryKey: ['wardrobes'] }),
        invalidateCloths: (wardrobeId?: number) =>
            queryClient.invalidateQueries({
                queryKey: wardrobeId ? ['cloths', wardrobeId] : ['cloths']
            }),
        invalidateTags: () => queryClient.invalidateQueries({ queryKey: ['tags'] }),
        invalidateWardrobeCount: (wardrobeId: number) =>
            queryClient.invalidateQueries({ queryKey: ['wardrobe-count', wardrobeId] }),
    };
};

// Importar useQueryClient para el hook anterior
import { useQueryClient } from '@tanstack/react-query';