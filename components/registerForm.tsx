"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

type RegisterFormProps = {
    onClose: () => void;
    showClose?: boolean;
    switchToLogin?: () => void;
};

const RegisterForm = ({ onClose, showClose = true, switchToLogin }: RegisterFormProps) => {
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
            setError("Las contraseñas no coinciden.");
            setIsLoading(false);
            return;
        } try {
            // Send the raw password to the backend; Supabase will hash it securely server-side.
            const response = await fetch('/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccess("¡Registro exitoso! Te hemos enviado un email de confirmación.");
                setTimeout(() => {
                    onClose();
                }, 1000);
            } else {
                setError(result.error || "Error al registrarse. Por favor, inténtalo de nuevo.");
            }
        } catch (err) {
            setError("Error de conexión. Por favor, inténtalo más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
        } else {
            setError("");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative bg-gradient-to-br from-[#40304a] to-[#594060] rounded-xl p-1 shadow-2xl">
                <div className="bg-[#1f1724] rounded-lg p-6">
                    {showClose && (
                        <button
                            onClick={onClose}
                            aria-label="Cerrar formulario"
                            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    )}

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#D9BBA0] rounded-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#2E2A3B]">
                                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-white">Crea tu cuenta</h2>
                            <p className="text-sm text-gray-300">Regístrate para guardar tus casas y prendas</p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/40 border border-red-600 p-3 rounded-md mb-4 text-sm text-white">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-900/30 border border-green-500 p-3 rounded-md mb-4 text-sm text-white">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <label className="block">
                            <span className="text-xs text-gray-400">Email</span>
                            <input
                                id="email"
                                type="email"
                                placeholder="usuario@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full rounded-md bg-[#2a2430] border border-[#3b3242] text-white px-3 py-2 placeholder-gray-500 focus:ring-2 focus:ring-[#8b6d66] outline-none transition"
                                required
                            />
                        </label>

                        <label className="block relative">
                            <span className="text-xs text-gray-400">Contraseña</span>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full rounded-md bg-[#2a2430] border border-[#3b3242] text-white px-3 py-2 placeholder-gray-500 focus:ring-2 focus:ring-[#8b6d66] outline-none transition"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-7 text-gray-400 hover:text-white"
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </label>

                        <label className="block relative">
                            <span className="text-xs text-gray-400">Confirmar contraseña</span>
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={handleConfirmPasswordBlur}
                                className="mt-1 w-full rounded-md bg-[#2a2430] border border-[#3b3242] text-white px-3 py-2 placeholder-gray-500 focus:ring-2 focus:ring-[#8b6d66] outline-none transition"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-7 text-gray-400 hover:text-white"
                                aria-label={showConfirmPassword ? 'Ocultar confirma' : 'Mostrar confirma'}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </label>

                        {/* Simple password match indicator */}
                        {confirmPassword.length > 0 && (
                            <div className={`text-sm ${password === confirmPassword ? 'text-green-400' : 'text-yellow-400'}`}>
                                {password === confirmPassword ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D9BBA0] to-[#cdb59e] text-[#2E2A3B] py-2 px-4 rounded-md font-semibold shadow hover:scale-[1.01] transition-transform disabled:opacity-70"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registrando...' : 'Crear cuenta'}
                        </button>

                        <div className="text-center text-sm text-gray-400 mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    if (switchToLogin) return switchToLogin();
                                    onClose();
                                    // fallback: go to login page
                                }}
                                className="text-[#D9BBA0] hover:text-white underline"
                            >
                                ¿Ya tienes cuenta? Inicia sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;