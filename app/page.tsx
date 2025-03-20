"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

import SensorChart from "../components/sensorChart";
import SensorGauge from "../components/sensorGauge";

import AlertConfig from "../components/alertConfig";
import UserButton from "../components/userButton";
import LoginForm from "../components/loginForm";

import GamepadIcon from "../public/gamepad.png"

const devicePlaceholder = process.env.NEXT_PUBLIC_PLACEHOLDER_DEVICE || null;

const Page = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(devicePlaceholder);
  const [devices, setDevices] = useState<string[]>([]);
  const [collapsedSensors, setCollapsedSensors] = useState<{ [key: string]: boolean }>({});
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [groupedData, setGroupedData] = useState<{ [device: string]: string[] }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Función para obtener dispositivos únicos desde la API
  const getUniqueDevices = async () => {
    const response = await fetch('/api/device/all');
    const data = await response.json();

    if (!response.ok) {
      return [];
    }

    // Asegúrate de que data sea un array de strings
    const deviceNames = data.map((device: { device_name: string }) => device.device_name);
    return deviceNames;
  };

  // Función para obtener sensores por dispositivo desde la API
  const getSensorsByDevice = async (deviceName: string) => {
    const response = await fetch('/api/sensors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_device_name: deviceName }),
    });
    const data = await response.json();

    if (!response.ok) {
      return [];
    }

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
        groupedData[device] = sensors[0].sensor_names;
      }
      setGroupedData(groupedData);

      // Solo seleccionar el dispositivo IIOT_Lisardo si está disponible
      if (uniqueDevices.includes(devicePlaceholder)) {
        setSelectedDevice(devicePlaceholder);
      } else if (uniqueDevices.length > 0 && !selectedDevice) {
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
          <div className="flex items-center space-x-4 ">
            <button
              onClick={() => alert("Gamepad button clicked!")}
              className="flex items-center justify-center w-10 h-10 bg-[#6D4941] hover:bg-opacity-100 bg-opacity-90 rounded-full text-white transition-all duration-300 shadow-md hover:shadow-md hover:shadow-[#D9BBA0]"
              aria-label="Gamepad Button"
            >
              <img src="/Playstation_logo_colour.svg" alt="Gamepad" className="w-6 h-6" /> {/* Ajusta la ruta y tamaño */}
            </button>
          </div>
          <div className="flex items-center space-x-3" onClick={() => window.location.reload()}>
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

          {/* Dropdown of devices */}
          <div className="order-3 md:order-2 py-1 relative" ref={dropdownRef}>
            {devices.length > 0 && (
              <div className="inline-block border-[#D9BBA0] border rounded-lg">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-[#6D4941] hover:bg-opacity-100 bg-opacity-90 px-4 py-2 rounded-lg text-white transition-all duration-300"
                >
                  <span>{selectedDevice || "Selecciona un dispositivo"}</span>
                  <ChevronDown size={18} className={`transition-transform duration-300 ${dropdownOpen ? "transform rotate-180" : ""}`} />
                </button>

                {/* The drop-down list */}
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

          {/* UserButton on the right side */}
          <div className="order-2 md:order-3">
            <UserButton onLoginClick={handleLoginClick} />
          </div>
        </div>
      </header>

      {/* Login modal  */}
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
      )
      }

      <div className="h-20"></div>

      <div className="p-4">
        <AlertConfig devices={devices} groupedData={groupedData} device={selectedDevice} />
      </div>

      <main className="p-8 space-y-6">
        {selectedDevice && groupedData[selectedDevice] ? (
          <div className="space-y-6">
            {groupedData[selectedDevice].map((sensor) => {
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
                        device={selectedDevice}
                        sensor={sensor}
                        minValue={minValue}
                        maxValue={maxValue}
                      />
                      <SensorChart title={`Chart for ${sensor}`} device={selectedDevice} sensor={sensor} />
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
    </div >
  );
};

export default Page;