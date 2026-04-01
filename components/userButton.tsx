"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

type UserButtonProps = {
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
};

const UserButton = ({ onLoginClick, onRegisterClick }: UserButtonProps) => {
    const { user, signOut } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        setMenuOpen(false);
        router.push('/');
    };

    const handleLoginClick = () => {
        if (onLoginClick) {
            onLoginClick();
        }
        setMenuOpen(false);
    };

    const handleRegisterClick = () => {
        if (onRegisterClick) {
            onRegisterClick();
        }
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
        </div>
    );
};

export default UserButton;