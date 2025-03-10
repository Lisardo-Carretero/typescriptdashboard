"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

import SensorChart from "../components/sensorChart";
import SensorGauge from "../components/sensorGauge";
import supabase from "../lib/supabaseClient";

import AlertConfig from "../components/alertConfig";
import UserButton from "../components/userButton";
import LoginForm from "../components/loginForm";

const Page = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [devices, setDevices] = useState<string[]>([]);
  const [collapsedSensors, setCollapsedSensors] = useState<{ [key: string]: boolean }>({});
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [groupedData, setGroupedData] = useState<{ [device: string]: string[] }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Función para obtener dispositivos únicos desde la API
  const getUniqueDevices = async () => {
    const response = await fetch('/api/devices');
    const data = await response.json();

    if (!response.ok) {
      console.error("Error fetching devices:", data.error);
      return [];
    }

    // Asegúrate de que data sea un array de strings
    const deviceNames = data.map((device: { device_name: string }) => device.device_name);
    console.log("Fetched devices:", deviceNames);
    return deviceNames;
  };

  // Función para obtener sensores por dispositivo desde la API
  const getSensorsByDevice = async (deviceName: string) => {
    const response = await fetch(`/api/sensors?device_name=${deviceName}`);
    const data = await response.json();

    if (!response.ok) {
      console.error("Error fetching sensors:", data.error);
      return [];
    }

    console.log(`Fetched sensors for ${deviceName}:`, data);
    return data;
  };

  useEffect(() => {
    const initializeData = async () => {
      const uniqueDevices = await getUniqueDevices();
      setDevices(uniqueDevices);

      // Obtener sensores para cada dispositivo
      const groupedData: { [device: string]: string[] } = {};
      for (const device of uniqueDevices) {
        const sensors = await getSensorsByDevice(device);
        groupedData[device] = sensors.map((sensor: { sensor_name: string }) => sensor.sensor_name);
      }
      setGroupedData(groupedData);

      // Solo seleccionar el primer dispositivo si no hay ninguno seleccionado
      if (uniqueDevices.length > 0 && !selectedDevice) {
        setSelectedDevice(uniqueDevices[0]);
      }
    };

    initializeData();

    // Cierra el dropdown cuando se hace clic fuera de él
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Eliminar selectedDevice de las dependencias para evitar re-suscripciones

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
      <header className="bg-[#49416D] shadow-md fixed w-full top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
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

      <div className="h-20"></div>

      <div className="p-4">
        <AlertConfig devices={devices} groupedData={groupedData} />
      </div>

      <main className="p-8 space-y-6">
        {selectedDevice ? (
          <div className="space-y-6">
            {groupedData[selectedDevice]?.map((sensor) => (
              <div key={sensor} className="bg-[#49416D] p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold text-[#D9BBA0] mb-4">{sensor}</h2>
                <div className="flex space-x-4">
                  <SensorGauge device={selectedDevice} sensor={sensor} />
                  <SensorChart device={selectedDevice} sensor={sensor} />
                </div>
              </div>
            ))}
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