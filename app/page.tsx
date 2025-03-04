"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SensorChart from "./components/sensorChart";
import SensorGauge from "./components/sensorGauge";
import { Database } from "./database.types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Page = () => {
  const [timeseries, setTimeseries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("timeseries")
        .select("*")
        .order("event_time", { ascending: true });

      if (error) console.error("Error fetching data:", error);
      else setTimeseries(data);
    };

    fetchData();

    // Suscribirse a cambios en la base de datos en tiempo real
    const channel = supabase
      .channel("timeseries_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "timeseries" },
        (payload) => {
          console.log("Nuevo dato recibido:", payload.new);
          setTimeseries((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Agrupar por dispositivo y sensor
  const groupedData = timeseries.reduce(
    (acc: { [device: string]: { [sensor: string]: any[] } }, curr) => {
      if (!acc[curr.device_name]) acc[curr.device_name] = {};
      if (!acc[curr.device_name][curr.sensor_name])
        acc[curr.device_name][curr.sensor_name] = [];
      acc[curr.device_name][curr.sensor_name].push(curr);
      return acc;
    },
    {}
  );

  return (
    <div className="p-6 space-y-6 bg-blue-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
        MAIN DASHBOARD
      </h1>

      {Object.keys(groupedData).map((device) => (
        <div key={device} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-purple-900">
            Device: {device}
          </h2>

          {Object.keys(groupedData[device]).map((sensor) => {
            const sensorData = groupedData[device][sensor];
            const latestValue = sensorData[sensorData.length - 1]?.value || 0;

            let minValue = 0;
            let maxValue = 100;

            if (sensor === "RSSI") {
              minValue = -100;
              maxValue = 0;
            } else if (sensor === "Temperature") {
              minValue = 0;
              maxValue = 100;
            }else if (sensor === "Counter") {
              minValue = 0;
              maxValue = 999;
            }

            return (
              <div
                key={`${device}-${sensor}`}
                className="space-y-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <h3 className="text-3xl font-semibold text-center mb-4 text-purple-900">
                  {sensor}
                </h3>

                {/* Gauge y Chart en columna */}
                <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6">
                  <SensorGauge
                    sensorName={sensor}
                    value={latestValue}
                    minValue={minValue}
                    maxValue={maxValue}
                  />
                  <SensorChart title={`Chart for ${sensor}`} data={sensorData} />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Page;
