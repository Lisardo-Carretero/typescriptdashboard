import React from "react";
import SensorChart from "./components/sensorChart";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
const Page = async () => {
  const { data: timeseries, error } = await supabase
    .from("timeseries")
    .select("*")
    .order("event_time", { ascending: true });

  if (error) {
    return <p>Error al cargar los datos</p>;
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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Gráficos de Datos de Sensores</h1>
      {devices.map((device) => {
        const sensors = Object.keys(groupedByDeviceAndSensor[device]);

        return (
          <div key={device} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Dispositivo: {device}</h2>
            {sensors.map((sensor) => (
              <SensorChart
                key={`${device}-${sensor}`}
                title={`Sensor: ${sensor}`}
                data={groupedByDeviceAndSensor[device][sensor]} // Pasamos los datos de un sensor específico
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
