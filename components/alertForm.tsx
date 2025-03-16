import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface AlertFormProps {
    devices: string[];
    groupedData: { [device: string]: string[] };
    onSave: (alert: Alert) => void;
    onClose: () => void;
}

interface Alert {
    id?: number;
    device_name: string;
    sensor_name: string;
    condition: "<" | ">" | "<=" | ">=" | "=";
    threshold: number;
    color: string;
    period_of_time: "1h" | "1w" | "1m";
}

const AlertForm = ({ devices, groupedData, onSave, onClose }: AlertFormProps) => {
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [sensors, setSensors] = useState<string[]>([]);
    const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
    const [condition, setCondition] = useState<"<" | ">" | "<=" | ">=" | "=">(">");
    const [threshold, setThreshold] = useState<number>(0);
    const [color, setColor] = useState<string>("#ff0000");
    const [timePeriod, setTimePeriod] = useState<"1h" | "1w" | "1m">("1h");

    useEffect(() => {
        if (selectedDevice && groupedData[selectedDevice]) {
            setSensors(groupedData[selectedDevice]);
        } else {
            setSensors([]);
        }
    }, [selectedDevice, groupedData]);

    const handleSave = () => {
        if (!selectedDevice || !selectedSensor || !timePeriod || !color || isNaN(threshold)) {
            alert("⚠️ Please fill out all fields correctly.");
            return;
        }

        const newAlert: Alert = {
            device_name: selectedDevice,
            sensor_name: selectedSensor,
            condition,
            threshold,
            color,
            period_of_time: timePeriod,
        };

        onSave(newAlert);
    };

    return (
        <div
            className="fixed inset-0 bg-[#2E2A3B]/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
            onClick={onClose}
            style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
            <div
                className="animate-fadeIn max-w-lg w-full p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-[#49416D] rounded-lg shadow-xl w-full max-w-md border border-[#D9BBA0]">
                    <div className="p-6 ">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl font-bold">New Alert</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-300 hover:text-white"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="mb-4 ">
                            <label className="block mb-2 text-sm font-medium">Device name:</label>
                            <select
                                className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent"
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

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Sensor name:</label>
                            <select
                                className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent"
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

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Condition</label>
                            <select
                                className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value as "<" | ">" | "<=" | ">=" | "=")}
                            >
                                <option value=">">Greater than</option>
                                <option value="<">Lower than</option>
                                <option value=">=">Greater or equal to</option>
                                <option value="<=">Lower or equal to</option>
                                <option value="=">Equal to</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Threshold value</label>
                            <input
                                type="number"
                                className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent"
                                value={threshold}
                                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Time period</label>
                            <select
                                className="w-full p-2.5 rounded bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-[#D9BBA0] focus:border-transparent"
                                value={timePeriod}
                                onChange={(e) => setTimePeriod(e.target.value as "1h" | "1w" | "1m")}
                            >
                                <option value="1h">Last hour</option>
                                <option value="1w">Last week</option>
                                <option value="1m">Last month</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium">Alert color</label>
                            <input
                                type="color"
                                className="w-full h-10 rounded cursor-pointer"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={onClose}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2.5 px-4 rounded transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded transition-colors font-medium"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertForm;