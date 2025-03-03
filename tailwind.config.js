// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',  // Asegúrate de que todas tus rutas estén aquí
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                purple: {
                    light: '#A78BFA', // Lila suave
                    medium: '#9D4EDD', // Púrpura
                    dark: '#6B21A8', // Púrpura oscuro
                },
                blue: {
                    light: '#60A5FA', // Azul claro
                    bright: '#3B82F6', // Azul brillante
                },
                orange: {
                    light: '#F97316', // Naranja claro
                    bright: '#F59E0B', // Naranja brillante
                },
                yellow: {
                    light: '#FCD34D', // Amarillo claro
                    strong: '#F59E0B', // Amarillo fuerte
                },
                pink: {
                    light: '#F472B6', // Rosa claro
                    strong: '#EC4899', // Rosa fuerte
                },
            },
        },
    },
    plugins: [],
}
