"use client";

import { useState, useRef } from "react";
import GamepadHandler from "./gamepadHandler";
import JoystickVisualizer from "./gamepadVisualizer";

const GamepadPage = () => {
    const [joystickData, setJoystickData] = useState({ x: 0, y: 0 });
    const [history, setHistory] = useState<string[]>([]);
    const [showGamepadConnectedMessage, setShowGamepadConnectedMessage] = useState<boolean>(false);

    // Referencia para almacenar el último valor añadido al historial
    const lastHistoryEntryRef = useRef<string | null>(null);

    const handleJoystickMove = (data: { x: number; y: number }) => {
        setJoystickData((prevData) => {
            const newEntry = `X-axis: ${data.x.toFixed(2)}, Y-axis: ${data.y.toFixed(2)}`;

            // Solo añadimos al historial si los valores han cambiado y no son duplicados
            if ((prevData.x !== data.x || prevData.y !== data.y) && lastHistoryEntryRef.current !== newEntry) {
                setHistory((prevHistory) => [...prevHistory, newEntry]);
                lastHistoryEntryRef.current = newEntry; // Actualizamos la referencia
            }

            return data;
        });
    };

    const handleGamepadConnected = () => {
        setShowGamepadConnectedMessage(true);
        setTimeout(() => {
            setShowGamepadConnectedMessage(false);
        }, 3000); // El mensaje desaparecerá después de 3 segundos
    };

    const clearHistory = () => {
        setHistory([]);
        lastHistoryEntryRef.current = null; // Reiniciamos la referencia
    };

    return (
        <div className="min-h-screen bg-[#2E2A3B] text-white p-8 flex flex-col space-y-6">
            {/* Título principal */}
            <h1 className="text-3xl font-bold text-center text-[#D9BBA0]">Gamepad Dashboard</h1>

            {/* Mensaje de mando conectado */}
            {showGamepadConnectedMessage && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                    ¡Controller conected!
                </div>
            )}

            <div className="flex flex-1 space-x-6">
                {/* Visualizador del joystick */}
                <div className="flex-1 flex flex-col items-center space-y-4 bg-[#49416D] p-6 rounded-lg shadow-lg border border-[#D9BBA0]">
                    <GamepadHandler onJoystickMove={handleJoystickMove} onGamepadConnected={handleGamepadConnected} />
                    <JoystickVisualizer x={joystickData.x} y={joystickData.y} />
                    {/* Mostrar valores numéricos */}
                    <div className="text-center bg-gray-800 p-4 rounded-lg shadow-md w-full">
                        <h2 className="text-xl font-semibold mb-2 text-[#D9BBA0]">Joystick values </h2>
                        <p className="text-lg">
                            <span className="font-bold">X-axis:</span> {joystickData.x.toFixed(2)}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Y-axis:</span> {joystickData.y.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Chat de texto para el histórico */}
                <div className="flex-1 bg-[#49416D] p-6 rounded-lg shadow-lg border border-[#D9BBA0] flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-[#D9BBA0] border-b-2 border-[#D9BBA0] pb-2">
                            AXIS HISTORY
                        </h2>
                        <button
                            onClick={clearHistory}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                        >
                            Clean
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 bg-gray-800 p-6 rounded-lg max-h-[700px]">
                        {history.map((entry, index) => (
                            <p key={index} className="text-sm bg-gray-700 p-2 rounded">
                                {entry}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamepadPage;