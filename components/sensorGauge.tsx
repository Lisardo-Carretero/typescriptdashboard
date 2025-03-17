"use client";

import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { subHours, subDays } from "date-fns";
import "react-circular-progressbar/dist/styles.css";

interface SensorData {
  device_name: string;
  sensor_name: string;
  value: number;
  event_time: string;
}

interface SensorGaugeProps {
  device: string;
  sensor: string;
  minValue: number;
  maxValue: number;
}

export default function SensorGauge({ device, sensor, minValue, maxValue }: SensorGaugeProps) {
  const [averageValue, setAverageValue] = useState(0);
  const [timeFilter, setTimeFilter] = useState<"1h" | "1w" | "1m">("1h");

  const fetchData = async (device: string, sensor: string, timeFilter: "1h" | "1w" | "1m") => {
    const response = await fetch(`/api/data/${device}/${sensor}/avg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_end_time: timeFilter }),
    });
    const data = await response.json();

    if (!response.ok || data.average_value === null) {
      setAverageValue(0);
      return;
    }

    setAverageValue(data);
  };

  useEffect(() => {
    fetchData(device, sensor, timeFilter);

    if (timeFilter === "1h") {
      const interval = setInterval(() => {
        fetchData(device, sensor, timeFilter);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [device, sensor, timeFilter]);

  const percentage = ((averageValue - minValue) / (maxValue - minValue)) * 100;

  const getColor = () => {
    if (percentage <= 25) return "#A3D9A5";
    if (percentage <= 50) return "#7DBE80";
    if (percentage <= 75) return "#5A8B5E";
    return "#416D49";
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
            onClick={() => setTimeFilter(filter as "1h" | "1w" | "1m")}
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
          {sensor}
        </p>
        <p className="text-[#D9BBA0] text-sm mt-1">
          Average value for the selected period of time
        </p>
      </div>
    </div>
  );
}