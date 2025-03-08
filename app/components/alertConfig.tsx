"use client";

import { useEffect, useState } from "react";

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

    // Actualizar sensores cuando se seleccione un dispositivo
    useEffect(() => {
        if (selectedDevice) {
            setSensors(Object.keys(groupedData[selectedDevice] || {}));
        } else {
            setSensors([]);
        }
    }, [selectedDevice, groupedData]);

    function saveAlert() {
        if (!selectedDevice || !selectedSensor) return;

        const newAlert: Alert = {
            device_name: selectedDevice,
            sensor_name: selectedSensor,
            condition,
            threshold,
            color,
        };

        setAlerts([...alerts, newAlert]);
        alert("⚠️ Alerta creada con éxito.");
    }

    return (
        <div className="p-6 bg-[#49416D] rounded-lg shadow-md text-white">
            <h2 className="text-xl font-bold mb-4">Configurar Alerta</h2>

            {/* Selección de Dispositivo */}
            <label className="block mb-2">Dispositivo</label>
            <select
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={selectedDevice || ""}
                onChange={(e) => setSelectedDevice(e.target.value)}
            >
                <option value="">Seleccione un dispositivo</option>
                {devices.map((device) => (
                    <option key={device} value={device}>
                        {device}
                    </option>
                ))}
            </select>

            {/* Selección de Sensor */}
            <label className="block mt-4 mb-2">Sensor</label>
            <select
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={selectedSensor || ""}
                onChange={(e) => setSelectedSensor(e.target.value)}
                disabled={!selectedDevice}
            >
                <option value="">Seleccione un sensor</option>
                {sensors.map((sensor) => (
                    <option key={sensor} value={sensor}>
                        {sensor}
                    </option>
                ))}
            </select>

            {/* Condición */}
            <label className="block mt-4 mb-2">Condición</label>
            <select
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={condition}
                onChange={(e) => setCondition(e.target.value as "<" | ">" | "<=" | ">=" | "=")}
            >
                <option value=">">Mayor que</option>
                <option value="<">Menor que</option>
                <option value=">=">Mayor o igual</option>
                <option value="<=">Menor o igual</option>
                <option value="=">Igual a</option>
            </select>

            {/* Valor Umbral */}
            <label className="block mt-4 mb-2">Valor Umbral</label>
            <input
                type="number"
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
            />

            {/* Color */}
            <label className="block mt-4 mb-2">Color de Alerta</label>
            <input
                type="color"
                className="w-full h-10"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />

            {/* Botón de Guardar */}
            <button
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                onClick={saveAlert}
            >
                Guardar Alerta
            </button>

            {/* Listado de alertas */}
            <h3 className="mt-6 text-lg font-bold">Alertas Configuradas:</h3>
            <ul className="mt-2 space-y-2">
                {alerts.map((alert, index) => (
                    <li key={index} className="bg-gray-700 p-2 rounded flex justify-between items-center">
                        <span>
                            📡 {alert.device_name} - {alert.sensor_name} {alert.condition} {alert.threshold}
                        </span>
                        <span
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: alert.color }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
