"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import SensorChart from "./components/sensorChart";
import SensorGauge from "./components/sensorGauge";
import { Database } from "./database.types";
import { ChevronDown, ChevronUp } from "lucide-react";
import AlertConfig from "./components/alertConfig";
import UserButton from "./components/userButton";
import LoginForm from "./components/loginForm";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Page = () => {
  const [timeseries, setTimeseries] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [devices, setDevices] = useState<string[]>([]);
  const [collapsedSensors, setCollapsedSensors] = useState<{ [key: string]: boolean }>({});
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("timeseries")
        .select("*")
        .order("event_time", { ascending: true });

      if (error) console.error("Error fetching data:", error);
      else {
        setTimeseries(data);
        const uniqueDevices = Array.from(new Set(data.map((d) => d.device_name)));
        setDevices(uniqueDevices);
      }
    };

    fetchData();

    const channel = supabase
      .channel("timeseries_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "timeseries" },
        (payload) => {
          setTimeseries((prev) => [...prev, payload.new]);
          setDevices((prev) => {
            const newDevice = payload.new.device_name;
            return prev.includes(newDevice) ? prev : [...prev, newDevice];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Estructura optimizada para AlertConfig
  const sensorsPerDevice: { [device: string]: string[] } = timeseries.reduce(
    (acc, curr) => {
      if (!acc[curr.device_name]) acc[curr.device_name] = [];
      if (!acc[curr.device_name].includes(curr.sensor_name)) {
        acc[curr.device_name].push(curr.sensor_name);
      }
      return acc;
    },
    {} as { [device: string]: string[] }
  );

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

  const toggleSensorCollapse = (sensor: string) => {
    setCollapsedSensors((prev) => ({
      ...prev,
      [sensor]: !prev[sensor],
    }));
  };

  return (
    <div className="min-h-screen bg-[#2E2A3B] text-white">
      {/* Barra de dispositivos fija con botón de usuario */}
      <header className="bg-[#49416D] p-4 shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#D9BBA0]">IoT Dashboard</h1>
          <UserButton onLoginClick={() => setShowLoginModal(true)} />
        </div>
        <div className="mt-4 flex justify-center space-x-4 overflow-x-auto">
          {devices.map((device) => (
            <button
              key={device}
              onClick={() => setSelectedDevice(device)}
              className={`px-4 py-2 rounded-lg transition duration-300 text-white ${selectedDevice === device ? "bg-[#416D49]" : "bg-[#6D4941] hover:bg-opacity-80"
                }`}
            >
              {device}
            </button>
          ))}
        </div>
      </header>

      {/* Modal de login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
          onClick={() => setShowLoginModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <LoginForm onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}

      {/* Espacio para evitar que el contenido quede oculto bajo la barra */}
      <div className="h-28"></div>

      <div className="p-4">
        <AlertConfig devices={devices} groupedData={sensorsPerDevice} />
      </div>

      <main className="p-8 space-y-6">
        {selectedDevice && groupedData[selectedDevice] ? (
          <div className="space-y-6">
            {Object.keys(groupedData[selectedDevice]).map((sensor) => {
              const sensorData = groupedData[selectedDevice][sensor];
              const isCollapsed = collapsedSensors[sensor];

              let minValue = 0;
              let maxValue = 100;

              if (sensor === "RSSI") {
                minValue = -100;
                maxValue = 0;
              } else if (sensor === "Temperature") {
                minValue = 0;
                maxValue = 100;
              } else if (sensor === "Counter") {
                minValue = 0;
                maxValue = 999;
              }

              return (
                <div
                  key={`${selectedDevice}-${sensor}`}
                  className="bg-[#6D4941] p-6 rounded-lg shadow-lg border border-[#D9BBA0] relative"
                >
                  {/* Botón de colapsar en la esquina superior izquierda */}
                  <button
                    className="absolute top-4 left-4 text-[#D9BBA0] hover:text-white transition"
                    onClick={() => toggleSensorCollapse(sensor)}
                  >
                    {isCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
                  </button>

                  <h3 className="text-3xl font-semibold text-center mb-4 text-[#D9BBA0]">
                    {sensor}
                  </h3>

                  {!isCollapsed && (
                    <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6">
                      <SensorGauge
                        sensorName={sensor}
                        data={sensorData}
                        minValue={minValue}
                        maxValue={maxValue}
                      />
                      <SensorChart title={`Chart for ${sensor}`} data={sensorData} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-[#D9BBA0] text-lg font-medium mt-10">
            Selecciona un dispositivo para visualizar sus datos.
          </p>
        )}
      </main>
    </div>
  );
};

export default Page;