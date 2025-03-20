"use client";

import { useState } from "react";
import GamepadHandler from "./gamepadHandler";
import JoystickVisualizer from "./gamepadVisualizer";

const GamepadPage = () => {
    const [joystickData, setJoystickData] = useState({ x: 0, y: 0 });
    const [history, setHistory] = useState<string[]>([]);

    const handleJoystickMove = (data: { x: number; y: number }) => {
        // Actualizamos el estado con los datos del joystick
        setJoystickData((prevData) => {
            // Solo añadimos al historial si los valores han cambiado
            if (prevData.x !== data.x || prevData.y !== data.y) {
                setHistory((prevHistory) => [
                    ...prevHistory,
                    `Eje X: ${data.x.toFixed(2)}, Eje Y: ${data.y.toFixed(2)}`,
                ]);
            }
            return data;
        });
    };

    return (
        <div className="min-h-screen bg-[#2E2A3B] text-white p-8 flex flex-col space-y-6">
            {/* Título principal */}
            <h1 className="text-3xl font-bold text-center text-[#D9BBA0]">Gamepad Dashboard</h1>

            <div className="flex flex-1 space-x-6">
                {/* Visualizador del joystick */}
                <div className="flex-1 flex flex-col items-center space-y-4 bg-[#49416D] p-6 rounded-lg shadow-lg border border-[#D9BBA0]">
                    <GamepadHandler onJoystickMove={handleJoystickMove} />
                    <JoystickVisualizer x={joystickData.x} y={joystickData.y} />
                    {/* Mostrar valores numéricos */}
                    <div className="text-center bg-gray-800 p-4 rounded-lg shadow-md w-full">
                        <h2 className="text-xl font-semibold mb-2 text-[#D9BBA0]">Valores del Joystick</h2>
                        <p className="text-lg">
                            <span className="font-bold">Eje X:</span> {joystickData.x.toFixed(2)}
                        </p>
                        <p className="text-lg">
                            <span className="font-bold">Eje Y:</span> {joystickData.y.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Chat de texto para el histórico */}
                <div className="flex-1 bg-[#49416D] p-6 rounded-lg shadow-lg border border-[#D9BBA0] flex flex-col">
                    <h2 className="text-2xl font-bold text-center mb-4 text-[#D9BBA0] border-b-2 border-gray-700 pb-2">
                        AXIS HISTORY
                    </h2>
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