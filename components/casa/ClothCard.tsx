"use client";

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

interface ClothCardProps {
    cloth: ClothItem;
    isLoading?: boolean;
}

const ClothCard: React.FC<ClothCardProps> = ({ cloth, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        try {
            if (!dateString) return 'Sin fecha';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Fecha inválida';
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.error('Error formateando fecha:', error);
            return 'Sin fecha';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
            {/* Header con nombre y fecha */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-900 text-lg truncate mr-2">
                    {cloth.name}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(cloth.created_at)}
                </span>
            </div>

            {/* Información principal */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Propietario:</span>
                    <span className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                        {cloth.owner}
                    </span>
                </div>

                {cloth.colour && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">Color:</span>
                        <span className="text-sm text-gray-900">{cloth.colour}</span>
                    </div>
                )}

                {cloth.size && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">Talla:</span>
                        <span className="text-sm text-gray-900">{cloth.size}</span>
                    </div>
                )}

                {cloth.brand && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">Marca:</span>
                        <span className="text-sm text-gray-900">{cloth.brand}</span>
                    </div>
                )}
            </div>

            {/* Tags */}
            {cloth.tags && Array.isArray(cloth.tags) && cloth.tags.length > 0 && (
                <div className="mb-4">
                    <span className="text-sm font-medium text-gray-600 block mb-2">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                        {cloth.tags.filter(tag => tag && typeof tag === 'string').map((tag, index) => (
                            <span
                                key={`${cloth.id}-tag-${index}-${tag}`}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Notas */}
            {cloth.notes && (
                <div className="border-t border-gray-100 pt-3">
                    <span className="text-sm font-medium text-gray-600 block mb-1">Notas:</span>
                    <p className="text-sm text-gray-700 italic">"{cloth.notes}"</p>
                </div>
            )}
        </div>
    );
};

export default ClothCard;