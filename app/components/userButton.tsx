"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const UserButton = () => {
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
    };

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <Image
                    src="/default-user.png"
                    alt="User"
                    width={40}
                    height={40}
                />
            </button>
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg py-2">
                    {user ? (
                        <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => router.push("/login")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            Login
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserButton;
