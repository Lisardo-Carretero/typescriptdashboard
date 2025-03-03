import React from "react";
import SensorChart from "./components/sensorChart";
import SensorGauge from "./components/sensorGauge"; // Importamos el componente generico SensorGauge
import { Database } from './database.types';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Page = async () => {
  const { data: timeseries, error } = await supabase
    .from("timeseries")
    .select("*")
    .order("event_time", { ascending: true });

  if (error) {
    return <p className="text-red-500 text-center">Error al cargar los datos</p>;
  }

  // Preprocesamos los datos agrupándolos por `device_name` y luego por `sensor_name`
  const groupedByDeviceAndSensor = timeseries?.reduce((acc: { [device: string]: { [sensor: string]: any[] } }, curr) => {
    if (!acc[curr.device_name]) {
      acc[curr.device_name] = {};
    }
    if (!acc[curr.device_name][curr.sensor_name]) {
      acc[curr.device_name][curr.sensor_name] = [];
    }
    acc[curr.device_name][curr.sensor_name].push(curr);
    return acc;
  }, {});

  // Obtenemos los dispositivos y sus sensores
  const devices = Object.keys(groupedByDeviceAndSensor || {});

  return (
    <div className="p-6 space-y-6 bg-blue-200 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">MAIN DASHBOARD</h1>

      {/* Mostrar los gauges de los sensores de cada dispositivo */}
      {devices.map((device) => {
        const sensors = Object.keys(groupedByDeviceAndSensor[device]);

        return (
          <div key={device} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-purple-900">Device: {device}</h2>

            {sensors.map((sensor) => {
              // Filtramos los datos para cada sensor
              const sensorData = groupedByDeviceAndSensor[device][sensor];

              // Tomamos el último valor del sensor
              const latestValue = sensorData[sensorData.length - 1]?.value;

              // Definir los rangos min y max para el gauge, ajustamos dependiendo del tipo de sensor
              let minValue = 0;
              let maxValue = 100;

              if (sensor === "RSSI") {
                minValue = -100;
                maxValue = 0; // RSSI típicamente va de -100 a 0
              } else if (sensor === "Temperature") {
                minValue = 0;
                maxValue = 100; // Temperatura en grados Celsius
              }

              return (
                <div key={`${device}-${sensor}`} className="space-y-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="text-3xl font-semibold text-center mb-4 text-purple-900">{sensor}</h3>

                  {/* Mostrar el Gauge para cada sensor */}
                  <SensorGauge
                    sensorName={sensor}
                    value={latestValue ?? 0} // Usamos 0 como valor predeterminado
                    minValue={minValue}
                    maxValue={maxValue}
                  />

                  {/* Mostrar el gráfico de líneas */}
                  <SensorChart
                    title={`Chart for ${sensor}`}
                    data={sensorData}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
