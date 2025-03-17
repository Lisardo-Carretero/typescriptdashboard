"use client";

import { useEffect, useState, JSX } from "react";
import AlertForm from "./alertForm";

interface Alert {
    id?: number;
    device_name: string;
    sensor_name: string;
    condition: "<" | ">" | "<=" | ">=" | "=";
    threshold: number;
    color: string;
    notify?: boolean;
    period_of_time: string;
}

interface AlertConfigProps {
    devices: string[];
    groupedData: { [device: string]: string[] };
    device: string | null;
}

interface ConditionsMet {
    [key: number]: {
        isMet: boolean;
        currentValue: number;
    };
}

export default function AlertConfig({ devices, groupedData, device }: AlertConfigProps) {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [conditionsMet, setConditionsMet] = useState<ConditionsMet>({});

    async function fetchAlerts() {
        try {
            const response = await fetch(`/api/device/${device}/alerts/all`);
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
        if (device)
            fetchAlerts();
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
            const newConditionsMet: ConditionsMet = {};
            for (const alert of alerts) {
                const { isMet: boolean, currentValue: number } = await isConditionMet(alert);
                newConditionsMet[alert.id!] = { isMet: boolean, currentValue: number };
            }
            setConditionsMet(newConditionsMet);
        };

        checkConditions();
    }, [alerts]);

    async function saveAlert(newAlert: Alert) {
        try {
            const response = await fetch('/api/alert', {
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
        if (!user) {
            alert("❌ You must be logged in to delete an alert.");
            return;
        }

        try {
            const response = await fetch('/api/alert', {
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

    const isConditionMet = async (alert: Alert): Promise<{ isMet: boolean, currentValue: number }> => {
        const response = await fetch(`/api/alert/${alert.id}/condition`);
        if (!response.ok) {
            throw new Error('Error fetching sensor data');
        }
        const data = await response.json();
        const { isMet, currentValue }: { isMet: boolean, currentValue: number } = data;
        return { isMet, currentValue };
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
                                        style={{
                                            backgroundColor: conditionsMet[alert.id!] && conditionsMet[alert.id!].isMet ? alert.color : 'transparent',
                                            border: '1px solid',
                                            borderColor: alert.color
                                        }}
                                        title={conditionsMet[alert.id!]
                                            ? `Alert active: ${alert.sensor_name} ${alert.condition} ${alert.threshold}`
                                            : `Alert inactive: Condition not met`
                                        }
                                    />
                                    <span className="font-medium">{alert.device_name}</span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span>AVG </span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span>{alert.sensor_name}</span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className="mx-2 text-gray-300 font-mono">{alert.condition}</span>
                                    <span>{alert.threshold}</span>
                                    <span className="mx-2 text-gray-300">{alert.period_of_time}</span>
                                </span>
                                <button
                                    onClick={() => deleteAlert(alert.id!)}
                                    className={`bg-red-500 text-white p-1.5 rounded-md transition-colors ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                                    title="Eliminar alerta"
                                    disabled={!user}
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