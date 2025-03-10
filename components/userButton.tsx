"use client";

import { useState, useEffect, useRef } from "react";
import supabase from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import RegisterForm from "./registerForm";

const UserButton = ({ onLoginClick }: { onLoginClick: () => void }) => {
    const [user, setUser] = useState<any>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch("/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    setUser(result.user);
                } else {
                    localStorage.removeItem("token");
                }
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem("token"); // Eliminar el token de localStorage
        setUser(null);
        router.refresh();
        setMenuOpen(false);
    };

    const handleLoginClick = () => {
        onLoginClick();
        setMenuOpen(false);
    };

    const handleRegisterClick = () => {
        setShowRegisterModal(true);
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuOpen &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node) &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
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
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <User size={24} />
            </button>

            {menuOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-0 top-full mt-2 w-32 bg-[#49416D] shadow-lg rounded-lg py-2 border border-[#D9BBA0] z-50"
                >
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-white hover:bg-[#6D4941] w-full text-left"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleLoginClick}
                                className="block px-4 py-2 text-sm text-white hover:bg-[#6D4941] w-full text-left"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleRegisterClick}
                                className="block px-4 py-2 text-sm text-white hover:bg-[#6D4941] w-full text-left"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            )}

            {showRegisterModal && (
                <div
                    className="fixed inset-0 bg-[#2E2A3B]/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
                    onClick={() => setShowRegisterModal(false)}
                    style={{ animation: 'fadeIn 0.2s ease-out' }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="animate-fadeIn"
                    >
                        <RegisterForm onClose={() => setShowRegisterModal(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserButton;