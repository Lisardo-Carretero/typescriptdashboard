"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import UserButton from "@/components/userButton";
import LoginForm from "../../components/loginForm";
import GamepadPage from "@/components/gamepadPage";

const GamePage = () => {
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [selectedCar, setSelectedCar] = useState<string | null>(null);
    const [cars, setCars] = useState<string[]>([]);
    const [dropdownOpenCar, setDropdownOpenCar] = useState<boolean>(false);
    const dropdownRefCar = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Fetch cars from API
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch("/api/car/all");
                if (!response.ok) throw new Error("Failed to fetch cars");
                const data = await response.json();
                setCars(data.map((car: { name: string }) => car.name)); // Assuming each car has a `name` property
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRefCar.current && !dropdownRefCar.current.contains(event.target as Node)) {
                setDropdownOpenCar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCarSelect = (car: string) => {
        setSelectedCar(car);
        setDropdownOpenCar(false);
    };

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col">
            {/* Header */}
            <header className="bg-[#49416D] shadow-md fixed w-full top-0 z-40">
                <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
                    {/* Logo and Home Navigation */}
                    <div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <h1 className="text-xl font-bold text-[#D9BBA0]">Gamepad Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push("/game")}
                            className="flex items-center justify-center w-10 h-10 border border-[#D9BBA0] bg-[#6D4941] hover:bg-opacity-100 bg-opacity-90 rounded-full text-white transition-all duration-300 shadow-md hover:shadow-md hover:shadow-[#D9BBA0]"
                            aria-label="Gamepad Button"
                        >
                            <img src="/Playstation_logo_colour.svg" alt="Gamepad" className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="order-3 md:order-2 py-1 relative" ref={dropdownRefCar}>
                        {cars.length > 0 && (
                            <div className="inline-block border-[#D9BBA0] border rounded-lg">
                                <button
                                    onClick={() => setDropdownOpenCar(!dropdownOpenCar)}
                                    className="flex items-center space-x-2 bg-[#6D4941] hover:bg-opacity-100 bg-opacity-90 px-4 py-2 rounded-lg text-white transition-all duration-300"
                                >
                                    <span>{selectedCar || "Test Joysticks"}</span>
                                    <ChevronDown
                                        size={18}
                                        className={`transition-transform duration-300 ${dropdownOpenCar ? "transform rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {dropdownOpenCar && (
                                    <div className="absolute left-0 mt-1 w-full min-w-[200px] max-h-[300px] overflow-y-auto bg-[#49416D] rounded-lg border border-[#D9BBA0] shadow-lg animate-fadeIn z-50">
                                        <div className="py-1">
                                            {cars.map((car) => (
                                                <button
                                                    key={car}
                                                    onClick={() => handleCarSelect(car)}
                                                    className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm ${selectedCar === car
                                                        ? "bg-[#416D49] text-white font-medium"
                                                        : "text-gray-200 hover:bg-[#6D4941] hover:bg-opacity-70"
                                                        }`}
                                                >
                                                    <span>{car}</span>
                                                    {selectedCar === car && <CheckCircle2 size={18} />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* User Button */}
                    <div className="order-2 md:order-3">
                        <UserButton onLoginClick={handleLoginClick} />
                    </div>
                </div>
                {/* Login modal */}
                {showLoginModal && (
                    <div
                        className="fixed inset-0 bg-[#2E2A3B]/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
                        onClick={() => setShowLoginModal(false)}
                        style={{ animation: 'fadeIn 0.2s ease-out' }}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="animate-fadeIn"
                        >
                            <LoginForm onClose={() => setShowLoginModal(false)} />
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden">
                <GamepadPage selectedCar={selectedCar} />
            </main>
        </div>
    );
};

export default GamePage;