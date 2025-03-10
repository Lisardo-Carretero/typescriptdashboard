"use client";

import { useState } from "react";

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      onClose();
      // Aquí podríamos actualizar el estado global del usuario
    } else {
      setError(result.error || "Error desconocido");
    }
  };

  return (
    <div className="bg-[#2E2A3B] p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-xl font-semibold text-white mb-4">Iniciar sesión</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-[#49416D] text-white placeholder-gray-300"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-[#49416D] text-white placeholder-gray-300"
          required
        />
        <button type="submit" className="bg-[#416D49] text-white py-2 rounded">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
