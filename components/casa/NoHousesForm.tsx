/**
 * Formulario para registrar la primera casa del usuario
 * Se muestra cuando el usuario autenticado no tiene casas registradas
 */

'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../hooks/useCasaData';
import { authUtils } from '../../lib/supabaseAuth';

interface HouseFormData {
    name: string;
    address: string;
}

const NoHousesForm: React.FC = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<HouseFormData>({
        name: '',
        address: '',
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Mutación para crear casa
    const createHouseMutation = useMutation({
        mutationFn: async (houseData: HouseFormData) => {
            // Obtener token de autenticación
            const session = await authUtils.getCurrentSession();
            const token = session?.access_token;

            const response = await fetch('/api/casa/house/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(houseData),
            });

            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Error al crear casa');
            }
            return result;
        },
        onSuccess: () => {
            // Invalidar queries para refrescar los datos
            queryClient.invalidateQueries({ queryKey: queryKeys.houses });
            queryClient.invalidateQueries({ queryKey: queryKeys.wardrobes });
        },
    });

    // Validación del formulario
    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = 'El nombre de la casa es requerido';
        } else if (formData.name.length < 2) {
            errors.name = 'El nombre debe tener al menos 2 caracteres';
        } else if (formData.name.length > 100) {
            errors.name = 'El nombre es muy largo';
        }

        if (formData.address.trim() && formData.address.length < 5) {
            errors.address = 'La dirección debe tener al menos 5 caracteres';
        } else if (formData.address.length > 200) {
            errors.address = 'La dirección es muy larga';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Manejar cambios en inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar error del campo cuando el usuario comience a escribir
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        createHouseMutation.mutate(formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-indigo-600">
                        <span className="text-2xl">🏠</span>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        ¡Bienvenido!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Para comenzar, registra tu primera casa para organizar tu inventario
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Campo Nombre de la Casa */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre de la Casa
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${formErrors.name ? 'border-red-300' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Mi Casa, Casa Principal, etc."
                            />
                            {formErrors.name && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                            )}
                        </div>

                        {/* Campo Dirección */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Dirección (opcional)
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                rows={3}
                                value={formData.address}
                                onChange={handleInputChange}
                                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${formErrors.address ? 'border-red-300' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Calle, número, ciudad, código postal..."
                            />
                            {formErrors.address && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                            )}
                        </div>
                    </div>

                    {/* Error de la mutación */}
                    {createHouseMutation.error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-800">
                                {createHouseMutation.error.message}
                            </div>
                        </div>
                    )}

                    {/* Botón de envío */}
                    <div>
                        <button
                            type="submit"
                            disabled={createHouseMutation.isPending}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${createHouseMutation.isPending
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                }`}
                        >
                            {createHouseMutation.isPending ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registrando casa...
                                </span>
                            ) : (
                                'Registrar Casa'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoHousesForm;