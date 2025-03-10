"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const UserButton = ({ onLoginClick }: { onLoginClick: () => void }) => {
    const [user, setUser] = useState<any>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data?.user) setUser(data.user);
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.refresh();
        setMenuOpen(false);
    };

    const handleLoginClick = () => {
        setMenuOpen(false);
        // Pequeño retraso para que el menú se cierre primero visualmente
        setTimeout(() => {
            onLoginClick();
        }, 10);
    };

    const toggleMenu = () => {
        if (!menuOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.bottom + window.scrollY,
                left: rect.right - 128, // Ancho del menú (w-32 = 8rem = 128px)
            });
        }
        setMenuOpen(!menuOpen);
    };

    // Cierra el menú cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuOpen && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 bg-[#6D4941] flex items-center justify-center text-white hover:bg-[#8A625A] transition-colors"
                onClick={toggleMenu}
            >
                <User size={24} />
            </button>

            {/* Portal para el menú flotante */}
            {menuOpen && (
                <div
                    className="fixed z-50 w-32 bg-[#49416D] shadow-lg rounded-lg py-2 border border-[#D9BBA0]"
                    style={{
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                    }}
                >
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-white hover:bg-[#6D4941] w-full text-left"
                        >
                            Cerrar sesión
                        </button>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            className="block px-4 py-2 text-sm text-white hover:bg-[#6D4941] w-full text-left"
                        >
                            Iniciar sesión
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserButton;