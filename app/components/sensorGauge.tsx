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
  
  // Gradiente dinámico basado en el color #416D49 y en función de su porcentaje
  const getColor = () => {
    if (percentage <= 25) return "#8CC78F "; 
    if (percentage <= 50) return "#73A973 "; 
    if (percentage <= 75) return "#5A8B5E "; 
    return "#416D49 "; 
  };

  return (
    <div className="flex flex-col items-center space-y-2 bg-[#5A413D] p-6 border rounded-lg shadow-md">
      <div className="w-40 h-40 font-bold">
        <CircularProgressbar
          value={percentage}
          text={`${value}`}
          styles={buildStyles({
            textColor: getColor(),
            pathColor: getColor(),
            trailColor: "#1F2937",
            textSize: "18px",
          })}
        />
      </div>
      <p className="text-[#D9BBA0] text-lg">{sensorName}</p>
    </div>
  );
}
