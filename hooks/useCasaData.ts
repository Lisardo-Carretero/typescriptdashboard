/**
 * Custom hooks for Casa data management with React Query
 * Provides optimized data fetching, caching, and real-time synchronization
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useMemo } from 'react';
import { authUtils } from '../lib/supabaseAuth';

// Tipos TypeScript
interface Wardrobe {
    id: number;
    name: string;
    location?: string | null;
    house_id?: number | null;
    house?: {
        id: number;
        name: string;
        address: string | null;
    } | null;
}

interface Tag {
    id: string;
    name: string;
    color: string;
}

interface Cloth {
    id: number;
    name: string;
    owner: string;
    colour?: string | null;
    brand?: string | null;
    size?: string | null;
    tags?: any[] | null;
    notes?: string | null;
    created_at: string;
    wardrobe_id: number;
}

// Función utilitaria para hacer peticiones autenticadas
const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
    try {
        let token: string | undefined;
        try {
            const session = await authUtils.getCurrentSession();
            token = session?.access_token;
        } catch (sessionError) {
            console.warn('No se pudo obtener sesión, continuando en modo público');
        }

        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        return response;
    } catch (error) {
        console.error('Error en petición autenticada:', error);
        throw error;
    }
};

// Query Keys - Centralizados para consistencia
export const queryKeys = {
    wardrobes: ['wardrobes'] as const,
    wardrobe: (id: number) => ['wardrobe', id] as const,
    wardrobeCount: (id: number) => ['wardrobe-count', id] as const,
    cloths: ['cloths'] as const,
    clothsByWardrobe: (wardrobeId: number) => ['cloths', wardrobeId] as const,
    tags: ['tags'] as const,
    houses: ['houses'] as const,
};

// Hook para obtener las casas del usuario autenticado
export const useUserHouses = () => {
    return useQuery({
        queryKey: queryKeys.houses,
        queryFn: async (): Promise<any[]> => {
            try {
                const response = await makeAuthenticatedRequest('/api/casa/house/get');
                if (!response.ok) {
                    console.error('Error en useUserHouses:', response.statusText);
                    return [] as any[];
                }
                const data = await response.json();
                if (data.success && Array.isArray(data.data)) {
                    return data.data;
                }
                console.error('Respuesta de API no válida para houses:', data);
                return [] as any[];
            } catch (error) {
                console.error('Error en useUserHouses:', error);
                return [] as any[];
            }
        },
        enabled: true,
        staleTime: 10 * 60 * 1000, // 10 minutos - las casas cambian menos frecuentemente
        gcTime: 30 * 60 * 1000, // 30 minutos
    });
};

// Hook para obtener todos los wardrobes del usuario autenticado
export const useWardrobes = () => {
    return useQuery({
        queryKey: queryKeys.wardrobes,
        queryFn: async (): Promise<Wardrobe[]> => {
            try {
                const response = await makeAuthenticatedRequest('/api/casa/wardrobe/get');
                if (!response.ok) {
                    console.error('Error en useWardrobes:', response.statusText);
                    return [] as Wardrobe[];
                }
                const data = await response.json();
                if (data.success && Array.isArray(data.data)) {
                    return data.data;
                }
                console.error('Respuesta de API no válida para wardrobes:', data);
                return [] as Wardrobe[];
            } catch (error) {
                console.error('Error en useWardrobes:', error);
                return [] as Wardrobe[];
            }
        },
        enabled: true,
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
    });
};

// Hook optimizado que combina wardrobes con sus conteos
export const useWardrobesWithCounts = () => {
    const queryClient = useQueryClient();
    const wardrobesQuery = useWardrobes();

    // Estado para forzar re-render cuando los conteos cambien
    const [countsVersion, setCountsVersion] = useState(0);

    // Prefetch conteos para todos los wardrobes y suscribirse a cambios
    useEffect(() => {
        if (wardrobesQuery.data) {
            wardrobesQuery.data.forEach(wardrobe => {
                // Prefetch el conteo
                queryClient.prefetchQuery({
                    queryKey: queryKeys.wardrobeCount(wardrobe.id),
                    queryFn: async () => {
                        try {
                            const response = await fetch(`/api/casa/wardrobe/${wardrobe.id}/totalCloths`);
                            if (!response.ok) {
                                console.error(`Error en prefetch conteo para wardrobe ${wardrobe.id}`);
                                return 0;
                            }
                            const data = await response.json();
                            return data.success ? data.count : 0;
                        } catch (error) {
                            console.error(`Error en prefetch para wardrobe ${wardrobe.id}:`, error);
                            return 0;
                        }
                    },
                    staleTime: 2 * 60 * 1000, // 2 minutos
                });
            });

            // Forzar actualización cuando se completen las queries
            const timer = setTimeout(() => {
                setCountsVersion(prev => prev + 1);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [wardrobesQuery.data, queryClient]);

    // Enriquecer wardrobes con conteos desde el cache
    const wardrobesWithCounts = useMemo(() => {
        if (!wardrobesQuery.data) return [];

        return wardrobesQuery.data.map(wardrobe => {
            const countData = queryClient.getQueryData(queryKeys.wardrobeCount(wardrobe.id)) as number;
            return {
                ...wardrobe,
                itemCount: countData || 0
            };
        });
    }, [wardrobesQuery.data, queryClient, countsVersion]);

    return {
        ...wardrobesQuery,
        data: wardrobesWithCounts
    };
};// Hook para obtener todos los tags
export const useTags = () => {
    return useQuery({
        queryKey: queryKeys.tags,
        queryFn: async (): Promise<Tag[]> => {
            try {
                const response = await makeAuthenticatedRequest('/api/casa/tag/get');
                if (!response.ok) {
                    console.error('Error al obtener tags:', response.statusText);
                    return [] as Tag[];
                }
                const data = await response.json();
                if (data.success && Array.isArray(data.data)) {
                    return data.data;
                }
                console.error('Respuesta de API no válida para tags:', data);
                return [] as Tag[];
            } catch (error) {
                console.error('Error en useTags:', error);
                return [] as Tag[];
            }
        },
        enabled: true,
        staleTime: 10 * 60 * 1000, // Tags cambian menos frecuentemente
        gcTime: 30 * 60 * 1000, // 30 minutos
    });
};

// Hook para obtener el conteo de prendas de un wardrobe
export const useWardrobeCount = (wardrobeId: number) => {
    return useQuery({
        queryKey: queryKeys.wardrobeCount(wardrobeId),
        queryFn: async (): Promise<number> => {
            try {
                const response = await fetch(`/api/casa/wardrobe/${wardrobeId}/totalCloths`);
                if (!response.ok) {
                    console.error(`Error al obtener conteo de prendas para wardrobe ${wardrobeId}:`, response.statusText);
                    return 0;
                }
                const data = await response.json();
                if (data.success && typeof data.count === 'number') {
                    return data.count;
                }
                console.error('Respuesta de API no válida para conteo:', data);
                return 0;
            } catch (error) {
                console.error(`Error en useWardrobeCount para wardrobe ${wardrobeId}:`, error);
                return 0;
            }
        },
        enabled: wardrobeId > 0, // Solo ejecutar si hay un ID válido
        staleTime: 2 * 60 * 1000, // 2 minutos (los conteos pueden cambiar más frecuentemente)
    });
};

// Hook para obtener prendas de un wardrobe específico
export const useClothsByWardrobe = (wardrobeId: number) => {
    return useQuery({
        queryKey: queryKeys.clothsByWardrobe(wardrobeId),
        queryFn: async (): Promise<{ wardrobe: any; cloths: Cloth[] }> => {
            try {
                const response = await fetch(`/api/casa/wardrobe/${wardrobeId}/cloths`);
                if (!response.ok) {
                    console.error(`Error al obtener prendas del wardrobe ${wardrobeId}:`, response.statusText);
                    return { wardrobe: null, cloths: [] };
                }
                const data = await response.json();
                if (data.success) {
                    return { wardrobe: data.wardrobe, cloths: data.cloths || [] };
                }
                console.error('Error en respuesta API para cloths:', data.error);
                return { wardrobe: null, cloths: [] };
            } catch (error) {
                console.error(`Error en useClothsByWardrobe para wardrobe ${wardrobeId}:`, error);
                return { wardrobe: null, cloths: [] };
            }
        },
        enabled: wardrobeId > 0,
        staleTime: 3 * 60 * 1000, // 3 minutos
    });
};

// Hook para mutación: añadir nueva prenda
export const useAddCloth = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (clothData: any) => {
            try {
                const response = await fetch('/api/casa/cloth/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(clothData),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ error: 'Error de red' }));
                    console.error('Error al añadir prenda:', errorData.error);
                    return { success: false, error: errorData.error || 'Error al añadir prenda' };
                }

                const result = await response.json();
                if (!result.success) {
                    console.error('Error en respuesta al añadir prenda:', result.error);
                    return { success: false, error: result.error || 'Error al añadir prenda' };
                }

                return result;
            } catch (error) {
                console.error('Error en useAddCloth:', error);
                return { success: false, error: 'Error de conexión' };
            }
        },
        onSuccess: (data, variables) => {
            if (data.success) {
                // Solo invalidar si la operación fue exitosa
                queryClient.invalidateQueries({ queryKey: queryKeys.wardrobes });
                queryClient.invalidateQueries({ queryKey: queryKeys.wardrobeCount(variables.wardrobeId) });
                queryClient.invalidateQueries({ queryKey: queryKeys.clothsByWardrobe(variables.wardrobeId) });
                queryClient.invalidateQueries({ queryKey: queryKeys.cloths });
            }
        },
    });
};

// Realtime eliminado — la BD es local (PostgreSQL directo, sin Supabase)

// Hook para obtener el total de todas las prendas
export const useTotalClothsCount = () => {
    const wardrobesQuery = useWardrobes();

    return useQuery({
        queryKey: ['total-cloths-count'],
        queryFn: async (): Promise<number> => {
            try {
                if (!wardrobesQuery.data || wardrobesQuery.data.length === 0) {
                    return 0;
                }

                // Obtener conteos de todos los wardrobes en paralelo
                const countPromises = wardrobesQuery.data.map(async (wardrobe) => {
                    try {
                        const response = await fetch(`/api/casa/wardrobe/${wardrobe.id}/totalCloths`);
                        if (!response.ok) return 0;
                        const data = await response.json();
                        return data.success ? data.count || 0 : 0;
                    } catch (error) {
                        console.error(`Error obteniendo conteo para wardrobe ${wardrobe.id}:`, error);
                        return 0;
                    }
                });

                const counts = await Promise.all(countPromises);
                return counts.reduce((total, count) => total + count, 0);
            } catch (error) {
                console.error('Error en useTotalClothsCount:', error);
                return 0;
            }
        },
        enabled: !!wardrobesQuery.data && wardrobesQuery.data.length > 0,
        staleTime: 2 * 60 * 1000, // 2 minutos
        gcTime: 5 * 60 * 1000, // 5 minutos
    });
};

