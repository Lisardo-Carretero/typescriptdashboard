/**
 * Página de Login
 * Formulario de autenticación con validación y UX profesional
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../components/loginForm';
import RegisterForm from '../../components/registerForm';

export default function LoginPage() {
    const router = useRouter();
    const [showRegister, setShowRegister] = useState(false);

    const handleClose = () => {
        // No redirigir automáticamente, esperar a que el usuario complete el login
    };

    const switchToRegister = () => {
        setShowRegister(true);
    };

    const switchToLogin = () => {
        setShowRegister(false);
    };

    return (
        <div className="min-h-screen bg-[#2E2A3B] text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md mb-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10 text-[#D9BBA0]"
                    >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                    </svg>
                    <h1 className="text-3xl font-bold text-[#D9BBA0]">IoT Dashboard</h1>
                </div>
                <p className="text-gray-400 text-sm">
                    {showRegister ? 'Crea una cuenta para empezar' : 'Inicia sesión para acceder al dashboard'}
                </p>
            </div>

            {showRegister ? (
                <RegisterForm
                    onClose={handleClose}
                    showClose={false}
                    switchToLogin={switchToLogin}
                />
            ) : (
                <LoginForm
                    onClose={handleClose}
                    showClose={false}
                    switchToRegister={switchToRegister}
                />
            )}

            <div className="mt-6 text-center text-xs text-gray-500">
                <p>© 2024 IoT Dashboard. Todos los derechos reservados.</p>
            </div>
        </div>
    );
}
