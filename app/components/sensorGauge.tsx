"use client";

import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { format, subHours, subDays } from "date-fns";
import "react-circular-progressbar/dist/styles.css";

interface SensorData {
  device_name: string;
  sensor_name: string;
  value: number;
  event_time: string;
}

interface SensorGaugeProps {
  data: SensorData[];
  minValue: number;
  maxValue: number;
  sensorName: string;
}

export default function SensorGauge({
  data,
  minValue,
  maxValue,
  sensorName,
}: SensorGaugeProps) {
  const [timeFilter, setTimeFilter] = useState("1h");
  const [averageValue, setAverageValue] = useState(0);

  useEffect(() => {
    const now = new Date();
    let startTime = now;

    if (timeFilter === "1h") startTime = subHours(now, 1);
    else if (timeFilter === "1w") startTime = subDays(now, 7);
    else if (timeFilter === "1m") startTime = subDays(now, 30);

    const filtered = data.filter(
      (entry) => new Date(entry.event_time) >= startTime
    );

    // Calcular la media de los valores filtrados
    const average = filtered.length
      ? filtered.reduce((sum, entry) => sum + entry.value, 0) / filtered.length
      : 0;

    setAverageValue(average);
  }, [timeFilter, data]);

  const percentage = ((averageValue - minValue) / (maxValue - minValue)) * 100;

  const getColor = () => {
    if (percentage <= 25) return "#A3D9A5"; // Verde claro
    if (percentage <= 50) return "#7DBE80"; // Verde medio
    if (percentage <= 75) return "#5A8B5E"; // Verde oscuro intermedio
    return "#416D49"; // Verde principal
  };

  return (
    <div className="flex flex-col items-center space-y-3 bg-[#5A413D] p-6 border border-[#D9BBA0] rounded-xl shadow-lg">
      <div className="flex justify-center space-x-3 mb-4">
        {["1h", "1w", "1m"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${timeFilter === filter
              ? "bg-[#416D49] text-white shadow-md"
              : "bg-[#6D4941] text-[#D9BBA0] hover:bg-[#8A625A]"
              }`}
            onClick={() => setTimeFilter(filter)}
          >
            {filter === "1h"
              ? "Last hour"
              : filter === "1w"
                ? "Last week"
                : "Last month"}
          </button>
        ))}
      </div>
      <div className="w-44 h-44 font-bold">
        <CircularProgressbar
          value={percentage}
          text={`${averageValue.toFixed(2)}`}
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
      <div className="text-center">
        <p className="text-[#D9BBA0] text-lg font-semibold tracking-wide">
          {sensorName}
        </p>
        <p className="text-[#D9BBA0] text-sm mt-1">
          Average value for the selected period of time
        </p>
      </div>
    </div>
  );
}