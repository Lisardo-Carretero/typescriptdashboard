"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { format, subHours, subDays, isBefore, isEqual, addSeconds, parseISO } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Brush } from "recharts";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SensorData {
  device_name: string;
  sensor_name: string;
  value: number;
  event_time: string;
}

interface SensorChartProps {
  data: SensorData[];
  title: string;
}

const SensorChart: React.FC<SensorChartProps> = ({ data, title }) => {
  const [filteredData, setFilteredData] = useState<SensorData[]>([]);
  const [timeFilter, setTimeFilter] = useState<"1h" | "1w" | "1m">("1h");

  useEffect(() => {
    const now = new Date();
    let startTime = now;

    if (timeFilter === "1h") startTime = subHours(now, 1);
    else if (timeFilter === "1w") startTime = subDays(now, 7);
    else if (timeFilter === "1m") startTime = subDays(now, 30);

    // Ordenar los datos por fecha
    const sortedData = [...data].sort((a, b) =>
      new Date(a.event_time).getTime() - new Date(b.event_time).getTime()
    );

    // Filtrar solo los datos que caen en el rango de tiempo seleccionado
    const filtered = sortedData.filter((entry) => new Date(entry.event_time) >= startTime);

    // Asegurar que se rellenan los datos faltantes sin perder los existentes
    const completeData = fillMissingData(filtered, startTime, now);
    setFilteredData(completeData);
  }, [timeFilter, data]);

  useEffect(() => {
    const channel = supabase
      .channel("timeseries_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "timeseries" },
        (payload) => {
          const newData = payload.new as SensorData;
          setFilteredData((prev) => [...prev, newData].sort((a, b) =>
            new Date(a.event_time).getTime() - new Date(b.event_time).getTime()
          ));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Función mejorada para rellenar datos faltantes por segundo
  const fillMissingData = (data: SensorData[], start: Date, end: Date) => {
    const filledData: SensorData[] = [];
    let currentTime = new Date(start);

    while (isBefore(currentTime, end) || isEqual(currentTime, end)) {
      const existingData = data.find((entry) => {
        const entryTime = parseISO(entry.event_time);
        return format(entryTime, "yyyy-MM-dd HH:mm:ss") === format(currentTime, "yyyy-MM-dd HH:mm:ss");
      });

      if (existingData) {
        filledData.push(existingData);
      } else {
        filledData.push({
          device_name: "N/A",
          sensor_name: "N/A",
          value: 0,
          event_time: currentTime.toISOString(),
        });
      }

      currentTime = addSeconds(currentTime, 1);
    }

    return filledData;
  };

  const formattedData = filteredData.map((entry) => ({
    ...entry,
    event_time: format(new Date(entry.event_time), "HH:mm:ss"),
    full_date: format(new Date(entry.event_time), "yyyy-MM-dd HH:mm:ss"),
  }));

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
              ? "Última Hora"
              : filter === "1w"
                ? "Última Semana"
                : "Último Mes"}
          </button>
        ))}
      </div>

      {/* Gráfico con Zoom y Pan */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData.length ? formattedData : [{ event_time: "", value: 0 }]}>
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
          />
          <Brush dataKey="event_time" height={30} stroke="#ECAE49" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;
