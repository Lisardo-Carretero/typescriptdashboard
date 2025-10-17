"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AddClothModal from '../../components/casa/AddClothModal';
import WardrobeGrid from '../../components/casa/WardrobeGrid';
import { useWardrobes, useTags, useSupabaseRealtime, useTotalClothsCount } from '../../hooks/useCasaData';

interface Tag {
    id: string;
    name: string;
    color: string;
}

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
    itemCount?: number;
}

const CasaPage = () => {
    const router = useRouter();

    // Usar React Query hooks para data fetching optimizado
    const { data: wardrobes = [], isLoading: loadingWardrobes, error: wardrobesError } = useWardrobes();
    const { data: availableTags = [], isLoading: loadingTags, error: tagsError } = useTags();
    const { data: totalItems = 0, isLoading: loadingTotal } = useTotalClothsCount();

    // Activar Supabase Realtime para sincronización automática
    useSupabaseRealtime();

    // Estado para el modal de añadir prenda
    const [showAddItemModal, setShowAddItemModal] = useState(false);

    // Total de items calculado con hook optimizado

    // Manejo de errores con mensajes amigables para el usuario
    const hasErrors = wardrobesError || tagsError;
    if (hasErrors) {
        console.error('Error cargando datos:', { wardrobesError, tagsError });
    }

    // Handlers
    const handleWardrobeClick = (wardrobeId: number) => {
        router.push(`/casa/wardrobe/${wardrobeId}`);
    };

    const handleOpenModal = () => {
        setShowAddItemModal(true);
    };

    const handleCloseModal = () => {
        setShowAddItemModal(false);
    };

    const handleModalSuccess = (wardrobeId: number) => {
        console.log(`Prenda añadida exitosamente al wardrobe ${wardrobeId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        🏠 Inventario de Casa
                    </h1>
                    <p className="text-gray-800 text-lg">
                        Gestiona y organiza tu ropa con tags inteligentes
                    </p>

                    {/* Mensaje de error amigable */}
                    {hasErrors && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-yellow-800 text-sm">
                                ⚠️ Algunos datos pueden no estar actualizados. Verificando conexión...
                            </p>
                        </div>
                    )}
                </div>

                {/* Stats Overview */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">
                                {loadingTotal || loadingWardrobes ? (
                                    <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                                ) : (
                                    totalItems
                                )}
                            </div>
                            <div className="text-gray-600">Total de Prendas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">
                                {loadingWardrobes ? (
                                    <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                                ) : (
                                    wardrobes.length
                                )}
                            </div>
                            <div className="text-gray-600">Wardrobes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">
                                {loadingTags ? (
                                    <div className="animate-pulse bg-gray-200 h-8 w-16 mx-auto rounded"></div>
                                ) : (
                                    availableTags.length
                                )}
                            </div>
                            <div className="text-gray-600">Tags Disponibles</div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={handleOpenModal}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Añadir Prenda
                    </button>
                    <button className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 shadow border border-gray-200 hover:shadow-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Buscar
                    </button>
                    <button className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 shadow border border-gray-200 hover:shadow-md">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                        </svg>
                        Filtros
                    </button>
                </div>

                {/* Wardrobes Grid */}
                <WardrobeGrid
                    wardrobes={wardrobes}
                    isLoading={loadingWardrobes}
                    onWardrobeClick={handleWardrobeClick}
                />
            </div>

            {/* Modal flotante para añadir prenda */}
            <AddClothModal
                isOpen={showAddItemModal}
                onClose={handleCloseModal}
                wardrobes={wardrobes}
                availableTags={availableTags}
                loadingWardrobes={loadingWardrobes}
                loadingTags={loadingTags}
                onSuccess={handleModalSuccess}
            />


        </div>
    );
};

export default CasaPage;