"use client";

import WardrobeCard from './WardrobeCard';

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
    itemCount?: number; // Opcional porque se carga dinámicamente
    icon?: string; // Para compatibilidad con componentes existentes
    description?: string; // Opcional para WardrobeCard
}

interface WardrobeGridProps {
    wardrobes: Wardrobe[];
    isLoading: boolean;
    onWardrobeClick: (wardrobeId: number) => void;
    loadingCount?: number;
}

const WardrobeGrid: React.FC<WardrobeGridProps> = ({
    wardrobes,
    isLoading,
    onWardrobeClick,
    loadingCount = 8
}) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: loadingCount }).map((_, index) => (
                    <WardrobeCard
                        key={`loading-${index}`}
                        wardrobe={{
                            id: 0,
                            name: '',
                            description: '',
                            itemCount: 0
                        }}
                        onClick={() => { }}
                        isLoading={true}
                    />
                ))}
            </div>
        );
    }

    if (wardrobes.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No hay wardrobes disponibles
                </h3>
                <p className="text-gray-500">
                    Los wardrobes aparecerán aquí cuando estén disponibles en la base de datos
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wardrobes.map((wardrobe) => (
                <WardrobeCard
                    key={wardrobe.id}
                    wardrobe={wardrobe}
                    onClick={onWardrobeClick}
                />
            ))}
        </div>
    );
};

export default WardrobeGrid;