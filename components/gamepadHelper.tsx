"use client";

import { useEffect, useState } from "react";

interface JoystickData {
    x: number;
    y: number;
}

const GamepadHandler = () => {
    const [gamepadConnected, setGamepadConnected] = useState(false);
    const [joystickData, setJoystickData] = useState<JoystickData>({ x: 0, y: 0 });

    useEffect(() => {
        const handleGamepadConnected = (event: GamepadEvent) => {
            console.log("Gamepad connected:", event.gamepad);
            setGamepadConnected(true);
        };

        const handleGamepadDisconnected = () => {
            console.log("Gamepad disconnected");
            setGamepadConnected(false);
        };

        window.addEventListener("gamepadconnected", handleGamepadConnected);
        window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

        return () => {
            window.removeEventListener("gamepadconnected", handleGamepadConnected);
            window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
        };
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const updateJoystickData = () => {
            const gamepads = navigator.getGamepads();
            const gamepad = gamepads[0]; // Usamos el primer mando conectado

            if (gamepad) {
                const x = gamepad.axes[0]; // Eje X del joystick izquierdo
                const y = gamepad.axes[1]; // Eje Y del joystick izquierdo
                setJoystickData({ x, y });
            }

            animationFrameId = requestAnimationFrame(updateJoystickData);
        };

        if (gamepadConnected) {
            animationFrameId = requestAnimationFrame(updateJoystickData);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [gamepadConnected]);

    return (
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Gamepad Status</h2>
            <p>{gamepadConnected ? "Gamepad connected" : "No gamepad connected"}</p>
            <div className="mt-4">
                <p>Joystick X: {joystickData.x.toFixed(2)}</p>
                <p>Joystick Y: {joystickData.y.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default GamepadHandler;