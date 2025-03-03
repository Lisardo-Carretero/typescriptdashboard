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
    <div className="p-6 border rounded-lg shadow-md bg-gray-800 text-blue-600">
      <h2 className="text-2xl font-semibold text-center mb-4 text-purple-400">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis dataKey="event_time" stroke="#ddd" />
          <YAxis stroke="#ddd" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;
