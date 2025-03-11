"use client";

import React, { useState, useEffect } from "react";
import { format, subHours, subDays, differenceInSeconds } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";

interface SensorData {
  device_name: string;
  sensor_name: string;
  value: number;
  event_time: string;
}

interface SensorChartProps {
  title: string;
  device: string;
  sensor: string;
}

const SensorChart: React.FC<SensorChartProps> = ({ title, device, sensor }) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [filteredData, setFilteredData] = useState<SensorData[]>([]);
  const [timeFilter, setTimeFilter] = useState<"1h" | "1w" | "1m">("1h");
  const [isPaused, setIsPaused] = useState(false);

  const fetchData = async (device: string, sensor: string, timeFilter: "1h" | "1w" | "1m") => {
    const now = new Date();
    let startTime = now;

    if (timeFilter === "1h") startTime = subHours(now, 1);
    else if (timeFilter === "1w") startTime = subDays(now, 7);
    else if (timeFilter === "1m") startTime = subDays(now, 30);

    const response = await fetch(`/api/data/${device}/${sensor}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_start_time: startTime.toISOString() }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error("Error fetching data:", data.error);
      return;
    }

    setData(data);
    setFilteredData(optimizeIntervals(data));
  };

  useEffect(() => {
    if (!isPaused) {
      fetchData(device, sensor, timeFilter);

      if (timeFilter === "1h") {
        const interval = setInterval(() => {
          fetchData(device, sensor, timeFilter);
        }, 5000);

        return () => clearInterval(interval);
      }
    }
  }, [device, sensor, timeFilter, isPaused]);

  // Función para ajustar los intervalos dinámicamente
  const optimizeIntervals = (data: SensorData[]) => {
    if (data.length === 0) return [];

    const optimizedData: any[] = [];
    let lastTime: Date | null = null;

    data.forEach((entry) => {
      const currentTime = new Date(entry.event_time);

      if (lastTime) {
        const gap = differenceInSeconds(currentTime, lastTime);
        if (gap > 5) {
          // Si el gap es grande, marcar un salto en el gráfico
          optimizedData.push({ event_time: "", value: null });
        }
      }

      optimizedData.push({
        ...entry,
        event_time: format(currentTime, "HH:mm:ss"),
        full_date: format(currentTime, "yyyy-MM-dd HH:mm:ss"),
      });

      lastTime = currentTime;
    });

    return optimizedData;
  };

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#49416D] text-white p-3 rounded-lg shadow-md">
          <p className="text-sm font-bold">{payload[0].payload.full_date}</p>
          <p className="text-lg">Value: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 border border-[#D9BBA0] rounded-lg shadow-md bg-[#5A413D] text-white w-full">
      <h2 className="text-2xl font-semibold text-center mb-4 text-[#D9BBA0]">
        {title}
      </h2>

      {/* Botones de Filtro */}
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
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${isPaused
            ? "bg-[#416D49] text-[#D9BBA0]"
            : "bg-[#8A625A] text-white shadow-md"
            }`}
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData.length ? filteredData : [{ event_time: "", value: 0 }]}>
          <XAxis dataKey="event_time" stroke="#D9BBA0" />
          <YAxis stroke="#D9BBA0" />
          <CartesianGrid stroke="#6D4941" strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ECAE49"
            strokeWidth={3}
            dot={{ fill: "#49416D", r: 3 }}
            connectNulls={false} // Evita conectar datos con gaps grandes
          />
          <Brush dataKey="event_time" height={30} stroke="#ECAE49" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;