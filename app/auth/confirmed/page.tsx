"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import LoadingSpinner from '../../../components/loadingSpinner';

function ConfirmedContent() {
    const params = useSearchParams();
    const router = useRouter();

    const email = params.get('email') || '';
    const accessToken = params.get('access_token') || '';

    useEffect(() => {
        // You might want to use access_token here to set session client-side in the future.
        // For now we simply show a friendly message and let the user log in.
    }, [accessToken]);

    return (
        <div className="bg-[#49416D] p-8 rounded-lg shadow-xl border border-[#D9BBA0] w-full max-w-lg text-center">
            <h1 className="text-2xl font-bold mb-4">Cuenta verificada</h1>
            <p className="mb-4">{email ? `La cuenta ${email} ha sido verificada correctamente.` : 'Tu cuenta ha sido verificada correctamente.'}</p>
            <p className="mb-6">Ahora puedes iniciar sesión en la aplicación.</p>
            <div className="flex justify-center gap-3">
                <button
                    onClick={() => router.push('/login')}
                    className="px-4 py-2 bg-[#D9BBA0] text-[#2E2A3B] rounded-md font-semibold"
                >
                    Iniciar sesión
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 border border-[#D9BBA0] rounded-md"
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    );
}

const ConfirmedPage = () => {
    return (
        <div className="min-h-screen bg-[#2E2A3B] text-white flex items-center justify-center">
            <Suspense fallback={
                <div className="flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            }>
                <ConfirmedContent />
            </Suspense>
        </div>
    );
};

export default ConfirmedPage;
