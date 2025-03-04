"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface SensorGaugeProps {
  value: number;
  minValue: number;
  maxValue: number;
  sensorName: string;
}

export default function SensorGauge({
  value,
  minValue,
  maxValue,
  sensorName,
}: SensorGaugeProps) {
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  
  // Gradiente dinámico basado en el porcentaje
  const getColor = () => {
    if (percentage < 33) return "#FDE68A"; // Amarillo claro
    if (percentage < 66) return "#F59E0B"; // Naranja
    return "#B45309"; // Naranja oscuro
  };

  return (
    <div className="flex flex-col items-center space-y-2 bg-gray-800 p-4 rounded-lg">
      <div className="w-40 h-40">
        <CircularProgressbar
          value={percentage}
          text={`${value}`}
          styles={buildStyles({
            textColor: getColor(),
            pathColor: getColor(),
            trailColor: "#1F2937",
            textSize: "16px",
          })}
        />
      </div>
      <p className="text-white text-lg">{sensorName}</p>
    </div>
  );
}
