"use client";

import { useState } from "react";
import { X } from "lucide-react"; // Importamos el icono X para cerrar

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess("Inicio de sesión exitoso");
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setError(result.error || "Error al iniciar sesión. Intenta de nuevo.");
      }
    } catch (err) {
      setError("Error de conexión. Intenta más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#49416D] p-6 rounded-lg shadow-xl border border-[#D9BBA0] w-96 relative">
      {/* Botón de cerrar en la esquina superior derecha */}
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
        <h2 className="text-xl font-semibold text-[#D9BBA0]">IoT Dashboard Login</h2>
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

      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md w-full bg-[#2E2A3B] border border-[#D9BBA0]/50 text-white 
                     placeholder-gray-400 focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md w-full bg-[#2E2A3B] border border-[#D9BBA0]/50 text-white 
                     placeholder-gray-400 focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#6D4941] text-white py-3 px-4 rounded-md font-medium hover:bg-[#8A625A] 
                   focus:outline-none focus:ring-2 focus:ring-[#D9BBA0] transition-colors disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-300">
        <p>Demo académica - Universidad de Almería</p>
      </div>
    </div>
  );
};

export default LoginForm;