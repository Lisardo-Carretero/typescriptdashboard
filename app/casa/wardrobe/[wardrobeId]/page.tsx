"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClothCard from '../../../../components/casa/ClothCard';

interface ClothItem {
    id: string;
    name: string;
    owner: string;
    colour?: string;
    brand?: string;
    size?: string;
    tags: string[];
    notes?: string;
    created_at: string;
}

interface Wardrobe {
    id: number;
    name: string;
    location?: string;
}

interface WardrobeDetailPageProps {
    params: Promise<{ wardrobeId: string }>;
}

const WardrobeDetailPage = ({ params }: WardrobeDetailPageProps) => {
    const router = useRouter();
    const [wardrobeId, setWardrobeId] = useState<string>('');
    const [wardrobe, setWardrobe] = useState<Wardrobe | null>(null);
    const [cloths, setCloths] = useState<ClothItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    // Resolver params
    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await params;
            setWardrobeId(resolvedParams.wardrobeId);
        };
        resolveParams();
    }, [params]);

    // Cargar datos del wardrobe y sus prendas
    useEffect(() => {
        if (!wardrobeId) return;

        const fetchWardrobeData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/casa/wardrobe/${wardrobeId}/cloths`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setError('Wardrobe no encontrado');
                    } else {
                        setError('Error al cargar el wardrobe');
                    }
                    return;
                }

                const data = await response.json();
                if (data.success) {
                    setWardrobe(data.wardrobe);
                    setCloths(data.cloths || []);
                } else {
                    setError(data.error || 'Error al cargar los datos');
                }
            } catch (error) {
                console.error('Error al cargar wardrobe:', error);
                setError('Error de conexión');
            } finally {
                setLoading(false);
            }
        };

        fetchWardrobeData();
    }, [wardrobeId]);

    const handleGoBack = () => {
        router.push('/casa');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Loading */}
                    <div className="mb-8 animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-96"></div>
                    </div>

                    {/* Grid Loading */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }, (_, index) => (
                            <ClothCard
                                key={`loading-cloth-${index}`}
                                cloth={{
                                    id: `loading-${index}`,
                                    name: '',
                                    owner: '',
                                    tags: [],
                                    created_at: ''
                                }}
                                isLoading={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😔</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Oops!</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={handleGoBack}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Volver al inventario
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver
                        </button>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            📦 {wardrobe?.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 text-gray-600">
                        {wardrobe?.location && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{wardrobe.location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span>{cloths.length} {cloths.length === 1 ? 'prenda' : 'prendas'}</span>
                        </div>
                        <div className="text-sm">
                            ID: #{wardrobeId}
                        </div>
                    </div>
                </div>

                {/* Content */}
                {cloths.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">👔</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No hay prendas en este wardrobe
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Añade algunas prendas para empezar a organizar tu ropa
                        </p>
                        <button
                            onClick={handleGoBack}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                        >
                            Ir al inventario
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cloths.filter(cloth => cloth && cloth.id).map((cloth) => (
                            <ClothCard key={`cloth-${cloth.id}`} cloth={cloth} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WardrobeDetailPage;