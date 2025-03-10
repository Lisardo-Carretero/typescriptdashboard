"use client";

import { useEffect, useState, useRef } from "react";
import SensorChart from "../components/sensorChart";
import SensorGauge from "../components/sensorGauge";
import supabase from "../lib/supabaseClient";

import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import AlertConfig from "../components/alertConfig";
import UserButton from "../components/userButton";
import LoginForm from "../components/loginForm";

const Page = () => {
  const [timeseries, setTimeseries] = useState<any[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [devices, setDevices] = useState<string[]>([]);
  const [collapsedSensors, setCollapsedSensors] = useState<{ [key: string]: boolean }>({});
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Función para obtener dispositivos únicos
  const getUniqueDevices = (data: any[]) => {
    return Array.from(new Set(data.map((d) => d.device_name)));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("timeseries")
        .select("*")
        .order("event_time", { ascending: true });

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      if (data) {
        setTimeseries(data);
        const uniqueDevices = getUniqueDevices(data);
        setDevices(uniqueDevices);

        // Solo seleccionar el primer dispositivo si no hay ninguno seleccionado
        if (uniqueDevices.length > 0 && !selectedDevice) {
          setSelectedDevice(uniqueDevices[0]);
        }
      }
    };

    fetchData();

    // Configuración de canal con manejo de errores y reconexión
    const channel = supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "timeseries"
        },
        (payload) => {
          console.log("Incoming change from channel:", payload);

          if (payload.eventType === "INSERT") {
            // Añadir el nuevo registro a los datos existentes
            setTimeseries((prev) => {
              // Verificar si el registro ya existe para evitar duplicados
              const exists = prev.some(item =>
                item.id === payload.new.id ||
                (item.device_name === payload.new.device_name &&
                  item.event_time === payload.new.event_time &&
                  item.sensor_name === payload.new.sensor_name)
              );

              if (exists) {
                return prev;
              }
              return [...prev, payload.new];
            });

            // Actualizar la lista de dispositivos si es necesario
            const newDeviceName = payload.new.device_name;

            setDevices((prevDevices) => {
              if (!prevDevices.includes(newDeviceName)) {
                console.log(`Adding new device from realtime: ${newDeviceName}`);
                return [...prevDevices, newDeviceName];
              }
              return prevDevices;
            });
          }
        }
      )
      .subscribe((status) => {
        console.log(`Supabase realtime status: ${status}`);
        if (status === "SUBSCRIBED") {
          console.log("✅ Realtime subscription active");
        } else if (status === "CHANNEL_ERROR") {
          console.error("❌ Realtime subscription error");
          // Intentar reconectar después de un tiempo
          setTimeout(() => {
            console.log("🔄 Attempting to reconnect realtime...");
            channel.subscribe();
          }, 5000);
        }
      });

    // Cierra el dropdown cuando se hace clic fuera de él
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      console.log("Cleaning up realtime subscription");
      supabase.removeChannel(channel);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Eliminar selectedDevice de las dependencias para evitar re-suscripciones

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

  const selectDevice = (device: string) => {
    setSelectedDevice(device);
    setDropdownOpen(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
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

          {/* Dropdown para selección de dispositivos */}
          <div className="order-3 md:order-2 py-1 relative" ref={dropdownRef}>
            {devices.length > 0 && (
              <div className="inline-block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-[#6D4941] hover:bg-opacity-100 bg-opacity-90 px-4 py-2 rounded-lg text-white transition-all duration-300"
                >
                  <span>{selectedDevice || "Selecciona un dispositivo"}</span>
                  <ChevronDown size={18} className={`transition-transform duration-300 ${dropdownOpen ? "transform rotate-180" : ""}`} />
                </button>

                {/* Lista desplegable de dispositivos */}
                {dropdownOpen && (
                  <div className="absolute left-0 mt-1 w-full min-w-[200px] max-h-[300px] overflow-y-auto bg-[#49416D] rounded-lg border border-[#D9BBA0] shadow-lg animate-fadeIn z-50">
                    <div className="py-1">
                      {devices.map((device) => (
                        <button
                          key={device}
                          onClick={() => selectDevice(device)}
                          className={`flex items-center justify-between w-full px-4 py-2 text-left text-sm ${selectedDevice === device
                            ? "bg-[#416D49] text-white font-medium"
                            : "text-gray-200 hover:bg-[#6D4941] hover:bg-opacity-70"
                            }`}
                        >
                          <span>{device}</span>
                          {selectedDevice === device && <CheckCircle2 size={18} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* UserButton en el lado derecho */}
          <div className="order-2 md:order-3">
            <UserButton onLoginClick={handleLoginClick} />
          </div>
        </div>
      </header>

      {/* Modal de login mejorado con backdrop translúcido */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-[#2E2A3B]/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          onClick={() => setShowLoginModal(false)}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-fadeIn"
          >
            <LoginForm onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}

      {/* Espacio para el header fijo */}
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
            Select a device to view its sensors data.
          </p>
        )}
      </main>
    </div>
  );
};

export default Page;