"use client";

import { useState, useEffect } from 'react';

interface WardrobeCardProps {
    wardrobe: {
        id: number;
        name: string;
        description?: string;
        location?: string;
        itemCount?: number; // Ahora es opcional porque se carga dinámicamente
        color?: string;
    };
    onClick: (wardrobeId: number) => void;
    isLoading?: boolean;
}

const WardrobeCard: React.FC<WardrobeCardProps> = ({ wardrobe, onClick, isLoading = false }) => {
    const [itemCount, setItemCount] = useState<number>(wardrobe.itemCount || 0);
    const [loadingCount, setLoadingCount] = useState<boolean>(!wardrobe.itemCount);

    // Cargar el número de prendas dinámicamente
    useEffect(() => {
        const fetchItemCount = async () => {
            if (wardrobe.id && !isLoading) {
                try {
                    setLoadingCount(true);
                    const response = await fetch(`/api/casa/wardrobe/${wardrobe.id}/totalCloths`);
                    if (response.ok) {
                        const data = await response.json();
                        setItemCount(data.totalCloths || 0);
                    } else {
                        console.warn(`Error al obtener itemCount para wardrobe ${wardrobe.id}`);
                        setItemCount(0);
                    }
                } catch (error) {
                    console.error(`Error al cargar itemCount para wardrobe ${wardrobe.id}:`, error);
                    setItemCount(0);
                } finally {
                    setLoadingCount(false);
                }
            }
        };

        fetchItemCount();
    }, [wardrobe.id, isLoading]);

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse relative">
                {/* Placeholder del ID */}
                <div className="absolute top-3 right-3 bg-gray-200 w-8 h-5 rounded-md"></div>

                <div className="text-center">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={() => onClick(wardrobe.id)}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-300 transform hover:-translate-y-1 relative"
        >
            {/* ID del wardrobe en la esquina superior derecha */}
            <div className="absolute top-3 right-3 bg-gray-100 text-gray-600 text-xs font-mono px-2 py-1 rounded-md group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                #{wardrobe.id}
            </div>

            <div className="p-6">
                <div className="text-center">
                    {/* Nombre del wardrobe */}
                    <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors text-xl">
                        {wardrobe.name}
                    </h3>

                    {/* Descripción o ubicación */}
                    <p className="text-gray-600 text-sm mb-4 h-10 flex items-center justify-center">
                        {wardrobe.description || wardrobe.location || 'Sin descripción'}
                    </p>

                    {/* Contador de prendas */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                        {loadingCount ? (
                            <div className="animate-pulse">
                                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {itemCount}
                                </div>
                                <div className="text-gray-600 text-sm font-medium">
                                    {itemCount === 1 ? 'prenda' : 'prendas'}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WardrobeCard;