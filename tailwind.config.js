/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',  // Added app directory
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0', transform: 'translateY(-20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' }
                }
            },
            animation: {
                'fadeIn': 'fadeIn 0.3s ease-out forwards'
            },
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