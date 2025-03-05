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

  // Gradiente de color según el valor
  const getColor = () => {
    if (percentage <= 25) return "#A3D9A5"; // Verde claro
    if (percentage <= 50) return "#7DBE80"; // Verde medio
    if (percentage <= 75) return "#5A8B5E"; // Verde oscuro intermedio
    return "#416D49"; // Verde principal
  };

  return (
    <div className="flex flex-col items-center space-y-3 bg-[#5A413D] p-6 border border-[#D9BBA0] rounded-xl shadow-lg">
      <div className="w-44 h-44 font-bold">
        <CircularProgressbar
          value={percentage}
          text={`${value}`}
          styles={buildStyles({
            textColor: getColor(),
            pathColor: getColor(),
            trailColor: "#2E2E2E",
            textSize: "22px",
            strokeLinecap: "round",
            pathTransitionDuration: 0.5,
          })}
        />
      </div>
      <p className="text-[#D9BBA0] text-lg font-semibold tracking-wide">
        {sensorName}
      </p>
    </div>
  );
}
