"use client";

"use client";

import { useWardrobeCount } from '../../hooks/useCasaData';

interface WardrobeCardProps {
    wardrobe: {
        id: number;
        name: string;
        location?: string | null;
        house_id?: number | null;
        house?: {
            id: number;
            name: string;
            address: string | null;
        } | null;
        itemCount?: number; // Ahora es opcional porque se carga dinámicamente
        icon?: string; // Para compatibilidad
        description?: string; // Opcional para WardrobeCard
    };
    onClick: (wardrobeId: number) => void;
    isLoading?: boolean;
}

const WardrobeCard: React.FC<WardrobeCardProps> = ({ wardrobe, onClick, isLoading = false }) => {
    // Usar el hook optimizado para obtener el conteo con cache
    const { data: itemCount = 0, isLoading: loadingCount } = useWardrobeCount(wardrobe.id);

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

            <div className="p-6">
                <div className="text-center">
                    {/* Nombre del wardrobe */}
                    <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors text-xl">
                        {wardrobe.name}
                    </h3>

                    {/* Ubicación */}
                    <p className="text-gray-600 text-sm mb-4 h-10 flex items-center justify-center">
                        {wardrobe.location || wardrobe.house?.name || 'Sin ubicación'}
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