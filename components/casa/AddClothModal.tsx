"use client";

import { useState } from 'react';

interface Tag {
    id: string;
    name: string;
    color: string;
}

interface ClothingItem {
    id: string;
    name: string;
    category: string;
    wardrobeId: number;
    tags: Tag[];
    color?: string;
    size?: string;
    brand?: string;
    notes?: string;
}

interface Wardrobe {
    id: number;
    name: string;
    description?: string;
    location?: string;
    icon?: string;
    itemCount?: number;
    color?: string;
}

interface AddClothModalProps {
    isOpen: boolean;
    onClose: () => void;
    wardrobes: Wardrobe[];
    availableTags: Tag[];
    loadingWardrobes: boolean;
    loadingTags: boolean;
    onSuccess: (wardrobeId: number) => void;
}

const AddClothModal = ({
    isOpen,
    onClose,
    wardrobes,
    availableTags,
    loadingWardrobes,
    loadingTags,
    onSuccess
}: AddClothModalProps) => {
    const [submitting, setSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const [newItem, setNewItem] = useState<Partial<ClothingItem>>({
        name: '',
        category: '',
        wardrobeId: wardrobes.length > 0 ? wardrobes[0].id : undefined,
        tags: [],
        color: '',
        size: '',
        brand: '',
        notes: ''
    });

    const handleAddTag = (tag: Tag) => {
        if (newItem.tags && !newItem.tags.find(t => t.id === tag.id)) {
            setNewItem({
                ...newItem,
                tags: [...newItem.tags, tag]
            });
        }
    };

    const handleRemoveTag = (tagId: string) => {
        setNewItem({
            ...newItem,
            tags: newItem.tags?.filter(tag => tag.id !== tagId) || []
        });
    };

    // Función para validar un campo específico
    const validateField = (fieldName: string, value: any): string => {
        switch (fieldName) {
            case 'name':
                if (!value || value.trim() === '') return 'El nombre es obligatorio';
                if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
                if (value.length > 100) return 'El nombre no puede exceder 100 caracteres';
                return '';

            case 'category':
                if (!value || value === '') return 'La categoría es obligatoria';
                const validCategories = ['Papá', 'Mamá', 'Lisardo'];
                if (!validCategories.includes(value)) return 'Categoría no válida';
                return '';

            case 'wardrobeId':
                if (!value) return 'Debes seleccionar un wardrobe';
                if (!wardrobes.find(w => w.id === value)) return 'Wardrobe seleccionado no válido';
                return '';

            case 'color':
                if (value && value.length > 50) return 'El color no puede exceder 50 caracteres';
                return '';

            case 'size':
                if (value && value.length > 20) return 'La talla no puede exceder 20 caracteres';
                return '';

            case 'brand':
                if (value && value.length > 50) return 'La marca no puede exceder 50 caracteres';
                return '';

            case 'notes':
                if (value && value.length > 500) return 'Las notas no pueden exceder 500 caracteres';
                return '';

            default:
                return '';
        }
    };

    // Función para validar todo el formulario
    const validateForm = (): boolean => {
        const errors: { [key: string]: string } = {};

        // Validar campos obligatorios
        errors.name = validateField('name', newItem.name);
        errors.category = validateField('category', newItem.category);
        errors.wardrobeId = validateField('wardrobeId', newItem.wardrobeId);

        // Validar campos opcionales si tienen valor
        if (newItem.color) errors.color = validateField('color', newItem.color);
        if (newItem.size) errors.size = validateField('size', newItem.size);
        if (newItem.brand) errors.brand = validateField('brand', newItem.brand);
        if (newItem.notes) errors.notes = validateField('notes', newItem.notes);

        // Validaciones especiales
        if (wardrobes.length === 0) {
            errors.general = 'No hay wardrobes disponibles. No se puede añadir la prenda.';
        }

        // Filtrar errores vacíos
        const filteredErrors = Object.fromEntries(
            Object.entries(errors).filter(([_, value]) => value !== '')
        );

        setValidationErrors(filteredErrors);
        return Object.keys(filteredErrors).length === 0;
    };

    // Función para limpiar error de un campo específico
    const clearFieldError = (fieldName: string) => {
        if (validationErrors[fieldName]) {
            const newErrors = { ...validationErrors };
            delete newErrors[fieldName];
            setValidationErrors(newErrors);
        }
    };

    const handleClose = () => {
        setNewItem({
            name: '',
            category: '',
            wardrobeId: wardrobes.length > 0 ? wardrobes[0].id : undefined,
            tags: [],
            color: '',
            size: '',
            brand: '',
            notes: ''
        });
        setValidationErrors({});
        onClose();
    };

    const handleSubmit = async () => {
        // Validar formulario antes del envío
        if (!validateForm()) {
            const firstErrorField = Object.keys(validationErrors)[0];
            const errorMessage = validationErrors[firstErrorField] || 'Por favor corrige los errores en el formulario';
            alert(errorMessage);
            return;
        }

        // Validaciones adicionales de negocio
        if (wardrobes.length === 0) {
            alert('No hay wardrobes disponibles. No se puede añadir la prenda.');
            return;
        }

        if (!wardrobes.find(w => w.id === newItem.wardrobeId)) {
            alert('El wardrobe seleccionado no es válido.');
            return;
        }

        try {
            setSubmitting(true);

            // Limpiar y preparar datos
            const itemData = {
                name: newItem.name?.trim(),
                category: newItem.category,
                wardrobeId: newItem.wardrobeId,
                tags: newItem.tags || [],
                color: newItem.color?.trim() || null,
                size: newItem.size?.trim() || null,
                brand: newItem.brand?.trim() || null,
                notes: newItem.notes?.trim() || null,
                dateAdded: new Date(),
            };

            // Validación final antes del envío
            if (!itemData.name || !itemData.category || !itemData.wardrobeId) {
                throw new Error('Datos del formulario incompletos');
            }

            const response = await fetch('/api/casa/cloth/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Prenda añadida exitosamente:', result);

                onSuccess(newItem.wardrobeId!);
                handleClose();
                alert(`¡Prenda "${itemData.name}" añadida exitosamente al wardrobe!`);
            } else {
                const errorResult = await response.json();
                console.error('Error del servidor:', errorResult);
                throw new Error(errorResult.error || `Error del servidor: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al crear la prenda:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error al añadir la prenda: ${errorMessage}`);
        } finally {
            setSubmitting(false);
        }
    };

    // Función helper para manejar cambios con validación en tiempo real
    const handleFieldChange = (fieldName: string, value: any) => {
        setNewItem({ ...newItem, [fieldName]: value });

        // Limpiar error si el campo ahora tiene un valor válido
        if (validationErrors[fieldName]) {
            const error = validateField(fieldName, value);
            if (error === '') {
                clearFieldError(fieldName);
            }
        }
    };

    // Función para obtener clase CSS según estado de validación
    const getFieldClassName = (fieldName: string, baseClassName: string): string => {
        const hasError = validationErrors[fieldName];
        if (hasError) {
            return `${baseClassName} border-red-300 focus:ring-red-500 focus:border-red-500`;
        }
        return baseClassName;
    };

    if (!isOpen) return null;

    // Componente para mostrar errores de validación
    const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
        if (!validationErrors[fieldName]) return null;
        return (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {validationErrors[fieldName]}
            </p>
        );
    };

    return (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header del Modal */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    Añadir Nueva Prenda
                                    {newItem.name && newItem.category && newItem.wardrobeId && Object.keys(validationErrors).length === 0 && (
                                        <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </h2>
                                <p className="text-blue-100 text-sm">Completa la información de tu nueva prenda</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={submitting}
                            className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Contenido del Modal */}
                <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
                    {/* Campos principales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nombre de la Prenda *
                            </label>
                            <input
                                type="text"
                                value={newItem.name || ''}
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                className={getFieldClassName('name', "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600 text-gray-900")}
                                placeholder="Ej: Camisa azul marino"
                                disabled={submitting}
                                maxLength={100}
                            />
                            <ErrorMessage fieldName="name" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Wardrobe/Almacén *
                            </label>
                            {loadingWardrobes ? (
                                <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                                    Cargando wardrobes...
                                </div>
                            ) : (
                                <select
                                    value={newItem.wardrobeId || ''}
                                    onChange={(e) => handleFieldChange('wardrobeId', Number(e.target.value))}
                                    className={getFieldClassName('wardrobeId', "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900")}
                                    disabled={submitting}
                                >
                                    <option value="">Seleccionar wardrobe</option>
                                    {wardrobes.map((wardrobe) => (
                                        <option key={wardrobe.id} value={wardrobe.id}>
                                            {wardrobe.icon || '📦'} {wardrobe.name} (ID: {wardrobe.id})
                                        </option>
                                    ))}
                                </select>
                            )}
                            <ErrorMessage fieldName="wardrobeId" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Categoría *
                            </label>
                            <select
                                value={newItem.category || ''}
                                onChange={(e) => handleFieldChange('category', e.target.value)}
                                className={getFieldClassName('category', "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900")}
                                disabled={submitting}
                            >
                                <option value="" disabled hidden>
                                    Selecciona una categoría
                                </option>
                                <option value="Papá">Papá</option>
                                <option value="Mamá">Mamá</option>
                                <option value="Lisardo">Lisardo</option>
                            </select>
                            <ErrorMessage fieldName="category" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Color
                            </label>
                            <input
                                type="text"
                                value={newItem.color || ''}
                                onChange={(e) => handleFieldChange('color', e.target.value)}
                                className={getFieldClassName('color', "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600 text-gray-900")}
                                placeholder="Ej: Azul marino, Rojo"
                                disabled={submitting}
                                maxLength={50}
                            />
                            <ErrorMessage fieldName="color" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Talla
                            </label>
                            <input
                                type="text"
                                value={newItem.size || ''}
                                onChange={(e) => handleFieldChange('size', e.target.value)}
                                className={getFieldClassName('size', "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600 text-gray-900")}
                                placeholder="Ej: M, 42, XL, Talla única"
                                disabled={submitting}
                                maxLength={20}
                            />
                            <ErrorMessage fieldName="size" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Marca
                            </label>
                            <input
                                type="text"
                                value={newItem.brand || ''}
                                onChange={(e) => handleFieldChange('brand', e.target.value)}
                                className={getFieldClassName('brand', "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600 text-gray-900")}
                                placeholder="Ej: Nike, Zara, H&M"
                                disabled={submitting}
                                maxLength={50}
                            />
                            <ErrorMessage fieldName="brand" />
                        </div>
                    </div>

                    {/* Selector de Tags */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Tags (Selecciona los que apliquen)
                        </label>
                        {loadingTags ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className="px-3 py-2 rounded-lg bg-gray-200 animate-pulse h-8"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                                {availableTags.map((tag) => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        onClick={() => handleAddTag(tag)}
                                        disabled={submitting}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 disabled:opacity-50 ${newItem.tags?.find(t => t.id === tag.id)
                                            ? `${tag.color || 'bg-blue-100 text-blue-800'} ring-2 ring-blue-500 shadow-md`
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Tags seleccionados */}
                        {newItem.tags && newItem.tags.length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Tags seleccionados:</p>
                                <div className="flex flex-wrap gap-2">
                                    {newItem.tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className={`${tag.color || 'bg-blue-100 text-blue-800'} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm`}
                                        >
                                            {tag.name}
                                            <button
                                                onClick={() => handleRemoveTag(tag.id)}
                                                disabled={submitting}
                                                className="hover:text-red-600 font-bold disabled:opacity-50 hover:bg-red-100 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Notas */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Notas adicionales
                        </label>
                        <textarea
                            value={newItem.notes || ''}
                            onChange={(e) => handleFieldChange('notes', e.target.value)}
                            rows={3}
                            className={getFieldClassName('notes', "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none placeholder-gray-600 text-gray-900")}
                            placeholder="Cualquier información adicional sobre esta prenda..."
                            disabled={submitting}
                            maxLength={500}
                        />
                        <ErrorMessage fieldName="notes" />
                        {newItem.notes && (
                            <p className="mt-1 text-sm text-gray-500 text-right">
                                {newItem.notes.length}/500 caracteres
                            </p>
                        )}
                    </div>

                    {/* Indicador de estado de validación */}
                    {Object.keys(validationErrors).length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <h4 className="text-red-800 font-medium">Errores de validación</h4>
                            </div>
                            <p className="text-red-700 text-sm">
                                Por favor corrige los errores marcados antes de enviar el formulario.
                            </p>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                        <button
                            onClick={handleClose}
                            disabled={submitting}
                            className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50 font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!newItem.name || !newItem.category || !newItem.wardrobeId || submitting || Object.keys(validationErrors).length > 0}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg"
                        >
                            {submitting && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            )}
                            {submitting ? 'Añadiendo...' : 'Añadir Prenda'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClothModal;