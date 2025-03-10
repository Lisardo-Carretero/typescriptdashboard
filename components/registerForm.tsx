"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import bcrypt from "bcryptjs";

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess("");
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            // Hash the password before sending it to the backend
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const response = await fetch('/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: hashedPassword }),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccess("Registration successful");
                setTimeout(() => {
                    onClose();
                }, 1000);
            } else {
                setError(result.error || "Error registering. Please try again.");
            }
        } catch (err) {
            setError("Connection error. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            setError("");
        }
    };

    return (
        <div className="bg-[#49416D] p-6 rounded-lg shadow-xl border border-[#D9BBA0] w-96 relative">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
            >
                <X size={20} />
            </button>

            <div className="flex items-center justify-center mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-[#D9BBA0] mr-2"
                >
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                </svg>
                <h2 className="text-xl font-semibold text-[#D9BBA0]">IoT Dashboard Register</h2>
            </div>

            {error && (
                <div className="bg-red-900/30 border border-red-500/50 p-3 rounded-md mb-4 text-sm text-white">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-900/30 border border-green-500/50 p-3 rounded-md mb-4 text-sm text-white">
                    {success}
                </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 rounded-md w-full bg-[#2E2A3B] border border-[#D9BBA0]/50 text-white 
                     placeholder-gray-400 focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent outline-none"
                        required
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 rounded-md w-full bg-[#2E2A3B] border border-[#D9BBA0]/50 text-white 
                     placeholder-gray-400 focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent outline-none"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={handleConfirmPasswordBlur}
                        className="p-3 rounded-md w-full bg-[#2E2A3B] border border-[#D9BBA0]/50 text-white 
                     placeholder-gray-400 focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent outline-none"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-[#6D4941] text-white py-3 px-4 rounded-md font-medium hover:bg-[#8A625A] 
                   focus:outline-none focus:ring-2 focus:ring-[#D9BBA0] transition-colors disabled:opacity-70"
                    disabled={isLoading}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;