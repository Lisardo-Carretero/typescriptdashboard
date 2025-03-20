"use client";

import React, { useRef, useState } from "react";
import UserButton from "./userButton";

const Header: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLoginClick = () => {
        alert("Login button clicked!");
    };

    return (
        <header className="bg-[#49416D] shadow-md fixed w-full top-0 z-40">
            <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => alert("Gamepad button clicked!")}
                        className="flex items-center justify-center w-10 h-10 bg-[#6D4941] hover:bg-opacity-100 bg-opacity-90 rounded-full text-white transition-all duration-300 shadow-md hover:shadow-md hover:shadow-[#D9BBA0]"
                        aria-label="Gamepad Button"
                    >
                        <img src="/Playstation_logo_colour.svg" alt="Gamepad" className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex items-center space-x-3" onClick={() => window.location.reload()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-7 h-7 text-[#D9BBA0]"
                    >
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                    </svg>
                    <h1 className="text-xl font-bold text-[#D9BBA0]">IoT Dashboard</h1>
                </div>

                {/* UserButton on the right side */}
                <div className="order-2 md:order-3">
                    <UserButton onLoginClick={handleLoginClick} />
                </div>
            </div>
        </header>
    );
};

export default Header;