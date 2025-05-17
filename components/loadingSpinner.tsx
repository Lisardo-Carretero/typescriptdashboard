// Versión simplificada de loadingSpinner.tsx
"use client";

import React from "react";

interface LoadingSpinnerProps {
    message?: string;
    location?: string;
    size?: "small" | "medium" | "large" | "fullscreen";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message = "Loading data...",
    location = "IoT Dashboard",
    size = "fullscreen",
}) => {
    // Configuraciones basadas en tamaño
    const config = {
        fullscreen: {
            container: "min-h-screen",
            centerCircle: "h-10 w-10",
            orbitBase: 16,
            title: "text-2xl",
            message: "text-lg",
            progressBar: "w-64 h-2",
            showAll: true
        },
        large: {
            container: "h-96",
            centerCircle: "h-8 w-8",
            orbitBase: 14,
            title: "text-xl",
            message: "text-base",
            progressBar: "w-48 h-2",
            showAll: true
        },
        medium: {
            container: "h-64",
            centerCircle: "h-6 w-6",
            orbitBase: 12,
            title: "text-lg",
            message: "text-sm",
            progressBar: "",
            showTitle: true,
            showMessage: true,
            showProgress: false
        },
        small: {
            container: "h-40",
            centerCircle: "h-4 w-4",
            orbitBase: 10,
            title: "",
            message: "text-xs",
            progressBar: "",
            showTitle: false,
            showMessage: true,
            showProgress: false
        }
    }[size];

    // Colores temáticos del dashboard
    const themeColors = ["#D9BBA0", "#6D4941", "#49416D", "#416D49", "#8A5A4F"];

    return (
        <div className={`${config.container} bg-[#2E2A3B] flex flex-col items-center justify-center p-4`}>
            <div className="text-center">
                {/* Animación de círculos */}
                <div className="flex items-center justify-center mb-4 relative">
                    {themeColors.map((color, index) => (
                        <div
                            key={index}
                            className="absolute rounded-full animate-spin-orbit"
                            style={{
                                backgroundColor: color,
                                width: `${config.orbitBase - index * 2}px`,
                                height: `${config.orbitBase - index * 2}px`,
                                animationDuration: `${3 + index * 0.5}s`,
                                transformOrigin: `0 ${20 + index * 4}px`
                            }}
                        />
                    ))}

                    {/* Círculo central */}
                    <div className={`${config.centerCircle} bg-[#D9BBA0] rounded-full animate-pulse shadow-lg shadow-[#D9BBA0]/20`} />
                </div>

                {/* Título y mensaje */}
                {config.title && (
                    <h2 className={`${config.title} font-bold text-[#D9BBA0] mb-1`}>
                        {location}
                    </h2>
                )}

                {config.message && (
                    <p className={`${config.message} text-white ${config.progressBar ? 'mb-4' : 'mb-0'}`}>
                        {message}
                    </p>
                )}

                {/* Barra de progreso */}
                {config.progressBar && (
                    <div className={`${config.progressBar} bg-gray-700 rounded-full overflow-hidden`}>
                        <div className="h-full bg-[#D9BBA0] animate-loadingBar" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoadingSpinner;