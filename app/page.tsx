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
      {/* Header rediseñado con disposición más compacta y profesional */}
      <header className="bg-[#49416D] shadow-md fixed w-full top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
          {/* Logo y título en el lado izquierdo */}
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-[#D9BBA0]"
            >
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
            </svg>
            <h1 className="text-xl font-bold text-[#D9BBA0]">IoT Dashboard</h1>
          </div>

          <div className="order-3 md:order-2 w-full md:w-auto mt-2 md:mt-0 overflow-x-auto flex-grow md:flex-grow-0 md:max-w-md lg:max-w-xl xl:max-w-2xl py-1">
            {devices.length > 0 && (
              <div className="flex items-center space-x-1 md:space-x-2 justify-start md:justify-center">
                <span className="text-sm font-semibold text-gray-300 whitespace-nowrap mr-2">Devices:</span>
                <div className="flex space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent pb-1">
                  {devices.map((device) => (
                    <button
                      key={device}
                      onClick={() => setSelectedDevice(device)}
                      className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 whitespace-nowrap ${selectedDevice === device
                        ? "bg-[#416D49] text-white font-medium scale-105 shadow-lg"
                        : "bg-[#6D4941] bg-opacity-70 hover:bg-opacity-100 text-gray-200"
                        }`}
                    >
                      {device}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="order-2 md:order-3">
            <UserButton onLoginClick={() => setShowLoginModal(true)} />
          </div>
        </div>
      </header>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
          onClick={() => setShowLoginModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <LoginForm onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}

      <div className="h-20"></div>

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