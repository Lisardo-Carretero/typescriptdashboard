"use client";

import React from "react";

interface JoystickVisualizerProps {
    x: number;
    y: number;
}

const JoystickVisualizer: React.FC<JoystickVisualizerProps> = ({ x, y }) => {
    const centerX = 150; // Centro del plano cartesiano
    const centerY = 150;
    const radius = 100; // Radio máximo del joystick

    // Calcular la posición del círculo
    const posX = centerX + x * radius;
    const posY = centerY + y * radius;

    return (
        <svg width="300" height="300" className="bg-gray-700 rounded-lg">
            {/* Ejes */}
            <line x1={centerX} y1="0" x2={centerX} y2="300" stroke="white" strokeWidth="2" />
            <line x1="0" y1={centerY} x2="300" y2={centerY} stroke="white" strokeWidth="2" />

            {/* Círculo que representa el joystick */}
            <circle cx={posX} cy={posY} r="10" fill="red" />
        </svg>
    );
};

export default JoystickVisualizer;