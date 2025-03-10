"use client";

import { useState, useEffect } from "react";
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
        onLoginClick();
        setMenuOpen(false);
    };

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 bg-[#6D4941] flex items-center justify-center text-white hover:bg-[#8A625A] transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <User size={24} />
            </button>
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#49416D] shadow-lg rounded-lg py-2 border border-[#D9BBA0]">
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