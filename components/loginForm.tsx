"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  onClose: () => void;
  showClose?: boolean;
  switchToRegister?: () => void;
};

const LoginForm = ({ onClose, showClose = true, switchToRegister }: LoginFormProps) => {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("¡Te hemos enviado un enlace mágico a tu email! Revisa tu bandeja de entrada.");
      } else {
        setError(result.error || "Error al enviar el enlace mágico.");
      }
    } catch (err) {
      setError("No pudimos conectar con el servidor. Por favor, inténtalo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.success) {
        setSuccess("¡Login exitoso! Redirigiendo...");
        setTimeout(() => {
          onClose();
          router.push('/casa'); // Redirigir a casa después del login exitoso
        }, 1000);
      } else {
        let errorMsg = "Error al iniciar sesión. Inténtalo de nuevo.";
        if (result.error?.includes("Email o contraseña incorrectos")) {
          errorMsg = "¡Ups! El email o la contraseña no son correctos";
        } else if (result.error?.includes("Email no confirmado")) {
          errorMsg = "Por favor, confirma tu email antes de iniciar sesión";
        }
        setError(errorMsg);
      }
    } catch (err) {
      setError("No pudimos conectar con el servidor. Por favor, inténtalo más tarde.");
    } finally {
      setIsLoading(false);
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
                <path d="M12 2a5 5 0 015 5v3h1a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h1V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v3h6V7a3 3 0 00-3-3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Inicia sesión</h2>
              <p className="text-sm text-gray-300">Accede a tu dashboard IoT</p>
            </div>
          </div>

          {error && (
            <div className={`bg-red-900/40 border border-red-600 p-3 rounded-md mb-4 text-sm text-white flex items-center animate-shake`}>
              <X className="w-4 h-4 mr-2 text-red-500" />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900/30 border border-green-500 p-3 rounded-md mb-4 text-sm text-white flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={useMagicLink ? handleMagicLinkLogin : handleLogin} className="flex flex-col gap-3">
            {useMagicLink && (
              <div className="bg-blue-900/20 border border-blue-500/50 p-3 rounded-md mb-2 text-xs text-blue-200">
                <p>💡 Solo se enviará un enlace si tu email ya está registrado en el sistema.</p>
              </div>
            )}

            <div className="space-y-3">
              <label className="block">
                <span className="text-xs text-gray-400">Correo electrónico</span>
                <input
                  id="email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-md bg-[#2a2430] border border-[#3b3242] text-white px-3 py-2 text-sm placeholder-gray-500 focus:ring-2 focus:ring-[#8b6d66] outline-none transition"
                  required
                />
              </label>

              {!useMagicLink && (
                <label className="block relative">
                  <span className="text-xs text-gray-400">Contraseña</span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-md bg-[#2a2430] border border-[#3b3242] text-white px-3 py-2 text-sm placeholder-gray-500 focus:ring-2 focus:ring-[#8b6d66] outline-none transition"
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
              )}
            </div>

            <button
              type="submit"
              className="mt-2 w-full inline-flex items-center justify-center bg-gradient-to-r from-[#D9BBA0] to-[#cdb59e] text-[#2E2A3B] py-2 px-4 rounded-md text-sm font-semibold shadow hover:scale-[1.01] transition-transform disabled:opacity-70"
              disabled={isLoading || loading}
            >
              {isLoading || loading
                ? (useMagicLink ? "Enviando enlace..." : "Iniciando sesión...")
                : (useMagicLink ? "Enviar enlace mágico" : "Iniciar sesión")}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setUseMagicLink(!useMagicLink)}
                className="text-xs text-[#D9BBA0] hover:text-white transition-colors"
              >
                {useMagicLink ? "← Volver a iniciar sesión con contraseña" : "Iniciar sesión sin contraseña →"}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
              <button
                type="button"
                onClick={() => {
                  if (switchToRegister) return switchToRegister();
                  onClose();
                  router.push('/register');
                }}
                className="text-[#D9BBA0] hover:text-white"
              >
                ¿No tienes cuenta? Regístrate
              </button>
              <button
                type="button"
                onClick={() => router.push('/forgot')}
                className="text-gray-400 hover:text-white"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;