"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface SensorData {
  device_name: string;
  sensor_name: string;
  pin: string | null;
  value: number;
  event_time: string;
}

interface SensorChartProps {
  data: SensorData[];
  title: string;
}

const SensorChart: React.FC<SensorChartProps> = ({ data, title }) => {
  // Convertimos los timestamps a un formato más legible
  const formattedData = data.map((entry) => ({
    ...entry,
    event_time: new Date(entry.event_time).toLocaleTimeString(),
  }));

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="event_time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;
