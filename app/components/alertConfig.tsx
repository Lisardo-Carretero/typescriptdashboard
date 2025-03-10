"use client";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Alert {
    id?: number;
    device_name: string;
    sensor_name: string;
    condition: "<" | ">" | "<=" | ">=" | "=";
    threshold: number;
    color: string;
}

interface AlertConfigProps {
    devices: string[];
    groupedData: { [device: string]: string[] };
}

export default function AlertConfig({ devices, groupedData }: AlertConfigProps) {
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [sensors, setSensors] = useState<string[]>([]);
    const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
    const [condition, setCondition] = useState<"<" | ">" | "<=" | ">=" | "=">(">");
    const [threshold, setThreshold] = useState<number>(0);
    const [color, setColor] = useState<string>("#ff0000"); // Rojo por defecto
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    async function fetchAlerts() {
        try {
            const response = await fetch('/api/alerts');
            if (!response.ok) {
                throw new Error('Error al cargar alertas');
            }
            const alertsData = await response.json();
            setAlerts(alertsData);
        } catch (error) {
            console.error("Error cargando alertas:", error);
        }
    }

    useEffect(() => {
        fetchAlerts();
    }, []);

    useEffect(() => {
        const channel = supabase
            .channel("alerts_changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "alerts" },
                () => {
                    fetchAlerts();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Actualizar sensores cuando se seleccione un dispositivo
    useEffect(() => {
        if (selectedDevice && groupedData[selectedDevice]) {
            setSensors(groupedData[selectedDevice]);
        } else {
            setSensors([]);
        }
    }, [selectedDevice, groupedData]);

    // Función para resetear el formulario
    const resetForm = () => {
        setSelectedDevice(null);
        setSelectedSensor(null);
        setCondition(">");
        setThreshold(0);
        setColor("#ff0000");
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    async function saveAlert() {
        if (!selectedDevice) {
            alert("⚠️ Debes seleccionar un dispositivo.");
            return;
        }

        if (!selectedSensor) {
            alert("⚠️ Debes seleccionar un sensor.");
            return;
        }

        if (isNaN(threshold)) {
            alert("⚠️ El umbral debe ser un número válido.");
            return;
        }

        const newAlert: Alert = {
            device_name: selectedDevice,
            sensor_name: selectedSensor,
            condition,
            threshold,
            color,
        };

        try {
            const response = await fetch('/api/alerts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAlert),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al guardar la alerta');
            }

            const savedAlert = await response.json();
            setAlerts([...alerts, savedAlert]);
            closeModal();
            alert("✅ Alerta creada con éxito!");
        } catch (error: any) {
            console.error("Error guardando alerta:", error);
            alert(`❌ Error al guardar la alerta: ${error?.message || 'Error desconocido'}`);
        }
    }

    async function deleteAlert(id: number) {
        try {
            const response = await fetch(`/api/alerts/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la alerta');
            }

            setAlerts(alerts.filter(alert => alert.id !== id));
            alert("✅ Alerta eliminada correctamente");
        } catch (error: any) {
            console.error("Error eliminando alerta:", error);
            alert(`❌ Error: ${error?.message || 'Error desconocido'}`);
        }
    }

    return (
        <div className="p-6 bg-[#49416D] rounded-lg shadow-md text-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Avaliable Alerts</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors shadow-md flex items-center"
                >
                    <span className="mr-1">+</span> New Alert
                </button>
            </div>

            {/* Listado de alertas */}
            <div className="mt-4">
                {alerts.length === 0 ? (
                    <p className="text-center text-gray-300 py-4">There are no alerts configured</p>
                ) : (
                    <ul className="space-y-2">
                        {alerts.map((alert) => (
                            <li
                                key={alert.id}
                                className="bg-gray-700 p-3 rounded-lg flex justify-between items-center shadow-md border border-gray-600"
                            >
                                <span className="flex items-center">
                                    <span
                                        className="w-4 h-4 rounded-full mr-3"
                                        style={{ backgroundColor: alert.color }}
                                    />
                                    <span className="font-medium">{alert.device_name}</span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span>{alert.sensor_name}</span>
                                    <span className="mx-2 text-gray-300 font-mono">{alert.condition}</span>
                                    <span>{alert.threshold}</span>
                                </span>
                                <button
                                    onClick={() => deleteAlert(alert.id!)}
                                    className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md transition-colors"
                                    title="Eliminar alerta"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Modal de creación de alertas */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-[#2E2A3B]/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
                    onClick={closeModal}
                    style={{ animation: 'fadeIn 0.2s ease-out' }} // Añadida la misma animación que en el modal de login
                >
                    <div
                        className="animate-fadeIn" // Cambiado para que solo el contenido use la clase de animación
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-[#49416D] rounded-lg shadow-xl w-full max-w-md border border-[#D9BBA0]">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold">New Alert</h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-300 hover:text-white"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Selección de Dispositivo */}
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Device name:</label>
                                    <select
                                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent"
                                        value={selectedDevice || ""}
                                        onChange={(e) => setSelectedDevice(e.target.value)}
                                    >
                                        <option value="">Select a device</option>
                                        {devices.map((device) => (
                                            <option key={device} value={device}>
                                                {device}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Selección de Sensor */}
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Sensor name:</label>
                                    <select
                                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent"
                                        value={selectedSensor || ""}
                                        onChange={(e) => setSelectedSensor(e.target.value)}
                                        disabled={!selectedDevice}
                                    >
                                        <option value="">Select a sensor</option>
                                        {sensors.map((sensor) => (
                                            <option key={sensor} value={sensor}>
                                                {sensor}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Condición */}
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Condition</label>
                                    <select
                                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent"
                                        value={condition}
                                        onChange={(e) => setCondition(e.target.value as "<" | ">" | "<=" | ">=" | "=")}
                                    >
                                        <option value=">">Greatter than</option>
                                        <option value="<">Lower than</option>
                                        <option value=">=">Greatter or equal to</option>
                                        <option value="<=">Lower or equal to</option>
                                        <option value="=">Equal to</option>
                                    </select>
                                </div>

                                {/* Valor Umbral */}
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Threshold value</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent"
                                        value={threshold}
                                        onChange={(e) => setThreshold(parseFloat(e.target.value))}
                                    />
                                </div>

                                {/* Color */}
                                <div className="mb-6">
                                    <label className="block mb-1 font-medium">Alert color</label>
                                    <input
                                        type="color"
                                        className="w-full h-10 rounded cursor-pointer"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                    />
                                </div>

                                {/* Botones de acción */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={saveAlert}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}