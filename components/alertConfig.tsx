"use client";
import supabase, { subscribeToAlerts } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { subHours, subDays } from "date-fns";
import AlertForm from "./alertForm";

interface Alert {
    id?: number;
    device_name: string;
    sensor_name: string;
    condition: "<" | ">" | "<=" | ">=" | "=";
    threshold: number;
    color: string;
    time_period: "1h" | "1w" | "1m";
}

interface AlertConfigProps {
    devices: string[];
    groupedData: { [device: string]: string[] };
    device: string | null;
}

export default function AlertConfig({ devices, groupedData, device }: AlertConfigProps) {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [conditionsMet, setConditionsMet] = useState<{ [key: number]: boolean }>({});

    async function fetchAlerts() {
        try {
            const response = await fetch(`/api/alerts/${device}`);
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
        if (device) {
            fetchAlerts();

            const unsubscribe = subscribeToAlerts("*", () => {
                fetchAlerts();
            });

            return () => {
                unsubscribe();
            };
        }
    }, [device]);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await fetch("/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    setUser(result.user);
                } else {
                    localStorage.removeItem("token");
                    setUser(null); // Ensure user is set to null if token is invalid
                }
            } else {
                setUser(null); // Ensure user is set to null if no token is found
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const checkConditions = async () => {
            const newConditionsMet: { [key: number]: boolean } = {};
            for (const alert of alerts) {
                newConditionsMet[alert.id!] = await isConditionMet(alert);
            }
            setConditionsMet(newConditionsMet);
        };

        checkConditions();
    }, [alerts]);

    async function saveAlert(newAlert: Alert) {
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
                throw new Error(errorData.error || 'Error during creation');
            }

            const savedAlert = await response.json();
            setAlerts([...alerts, savedAlert]);
            setShowModal(false);
            alert("✅ Alert CREATED successfully!");
        } catch (error: any) {
            alert(`❌ Error during creation: ${error?.message || 'UNKNOWN ERROR'}`);
        }
    }

    async function deleteAlert(id: number) {
        try {
            const response = await fetch('/api/alerts', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Error while deleting alert');
            }

            setAlerts(alerts.filter(alert => alert.id !== id));
            alert("✅ Alert DELETED successfully!");
        } catch (error: any) {
            alert(`❌ Error: ${error?.message || 'UNKNOWN ERROR'}`);
        }
    }
    const fetchAverageValue = async (device: string, sensor: string, timePeriod: "1h" | "1w" | "1m"): Promise<number> => {
        const now = new Date();
        let startTime = now;
        let endTime = now;

        if (timePeriod === "1h") endTime = subHours(now, 1);
        else if (timePeriod === "1w") endTime = subDays(now, 7);
        else if (timePeriod === "1m") endTime = subDays(now, 30);

        const response = await fetch(`/api/data/${device}/${sensor}/avg`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ p_start_time: startTime.toISOString(), p_end_time: endTime.toISOString() }),
        });

        const data = await response.json();

        if (!response.ok || data.average_value === null) {
            console.error("Error fetching data:", data.error);
            return 0;
        }

        return data.average_value;
    };

    const isConditionMet = async (alert: Alert): Promise<boolean> => {
        const currentValue = await fetchAverageValue(alert.device_name, alert.sensor_name, alert.time_period);

        switch (alert.condition) {
            case ">":
                return currentValue > alert.threshold;
            case "<":
                return currentValue < alert.threshold;
            case ">=":
                return currentValue >= alert.threshold;
            case "<=":
                return currentValue <= alert.threshold;
            case "=":
                return currentValue === alert.threshold;
            default:
                return false;
        }
    };

    return (
        <div className="p-6 bg-[#49416D] rounded-lg shadow-md text-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Available Alerts</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className={`bg-green-600 text-white px-4 py-2 rounded-md transition-colors shadow-md flex items-center ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                    disabled={!user}
                >
                    <span className="mr-1">+</span> New Alert
                </button>
            </div>

            {/* Listado de alertas */}
            <div className="mt-4">
                {alerts.filter(alert => alert.device_name === device).length === 0 ? (
                    <p className="text-center text-gray-300 py-4">There are no alerts configured</p>
                ) : (
                    <ul className="space-y-2">
                        {alerts.filter(alert => alert.device_name === device).map((alert) => (
                            <li
                                key={alert.id}
                                className="bg-gray-700 p-3 rounded-lg flex justify-between items-center shadow-md border border-gray-600"
                            >
                                <span className="flex items-center">
                                    <span
                                        className="w-4 h-4 rounded-full mr-3"
                                        style={{ backgroundColor: conditionsMet[alert.id!] ? alert.color : 'transparent' }}
                                    />
                                    <span className="font-medium">{alert.device_name}</span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span>{alert.sensor_name}</span>
                                    <span className="mx-2 text-gray-300 font-mono">{alert.condition}</span>
                                    <span>{alert.threshold}</span>
                                    <span className="mx-2 text-gray-300">{alert.time_period}</span>
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
                <AlertForm
                    devices={devices}
                    groupedData={groupedData}
                    onSave={saveAlert}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}