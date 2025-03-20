"use client";

import { useEffect } from "react";

interface JoystickData {
    x: number;
    y: number;
}

interface GamepadHandlerProps {
    onJoystickMove: (data: JoystickData) => void;
}

const GamepadHandler: React.FC<GamepadHandlerProps> = ({ onJoystickMove }) => {
    useEffect(() => {
        const handleGamepadConnected = (event: GamepadEvent) => {
            console.log("Gamepad connected:", event.gamepad);
        };

        const handleGamepadDisconnected = () => {
            console.log("Gamepad disconnected");
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
                onJoystickMove({ x, y }); // Llamamos al callback con los datos actualizados
            }

            animationFrameId = requestAnimationFrame(updateJoystickData);
        };

        animationFrameId = requestAnimationFrame(updateJoystickData);

        return () => cancelAnimationFrame(animationFrameId);
    }, [onJoystickMove]);

    return null; // Este componente no necesita renderizar nada
};

export default GamepadHandler;