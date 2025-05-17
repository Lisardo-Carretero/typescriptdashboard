"use client";

import { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";

interface Node {
    id: number;
    label: string;
}

interface Edge {
    from: number;
    to: number;
    length?: number; // Longitud personalizada para la arista
}

export default function GeneralGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [network, setNetwork] = useState<Network | null>(null);
    const [nodeDistance, setNodeDistance] = useState(150); // Distancia base entre nodos
    const [customDistances, setCustomDistances] = useState({
        "1-2": 200,
        "1-3": 100,
        "1-4": 150,
        "2-5": 150,
        "2-6": 150,
    });

    useEffect(() => {
        if (containerRef.current) {
            // Generar nodos y aristas dinámicamente
            const nodes: Node[] = [
                { id: 1, label: "Node 1" },
                { id: 2, label: "Node 2" },
                { id: 3, label: "Node 3" },
                { id: 4, label: "Node 4" },
                { id: 5, label: "Node 5" },
                { id: 6, label: "Node 6" },
            ];

            const edges: Edge[] = [
                { from: 1, to: 2, length: customDistances["1-2"] },
                { from: 1, to: 3, length: customDistances["1-3"] },
                { from: 1, to: 4, length: customDistances["1-4"] },
                { from: 2, to: 5, length: customDistances["2-5"] },
                { from: 2, to: 6, length: customDistances["2-6"] },
            ];

            const data = { nodes, edges };

            const options = {
                physics: {
                    enabled: true, // Habilitar fuerzas físicas
                    forceAtlas2Based: {
                        gravitationalConstant: -50,
                        centralGravity: 0.01,
                        springLength: nodeDistance,
                        springConstant: 0.08,
                    },
                    solver: "forceAtlas2Based",
                    stabilization: {
                        enabled: true,
                        iterations: 1000,
                    },
                },
                nodes: {
                    shape: "dot",
                    size: 20,
                    font: {
                        size: 15,
                        color: "#ffffff",
                    },
                    color: {
                        background: "#6D4941",
                        border: "#D9BBA0",
                    },
                },
                edges: {
                    color: "#D9BBA0",
                    smooth: {
                        enabled: true,
                        type: "dynamic",
                        roundness: 0.5, // Add the required roundness property
                    },
                },
            };

            const networkInstance = new Network(containerRef.current, data, options);
            setNetwork(networkInstance);
        }
    }, [nodeDistance, customDistances]);

    const handleNodeDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNodeDistance(Number(e.target.value));
    };

    const handleCustomDistanceChange = (key: string, value: number) => {
        setCustomDistances((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-[#2E2A3B] text-white p-8">
            <h1 className="text-3xl font-bold text-center text-[#D9BBA0] mb-6">
                General Graph with Adjustable Distances
            </h1>
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                    Node Distance: {nodeDistance}px
                </label>
                <input
                    type="range"
                    min="50"
                    max="300"
                    value={nodeDistance}
                    onChange={handleNodeDistanceChange}
                    className="w-full"
                />
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-medium mb-2">Custom Distances:</h2>
                {(Object.keys(customDistances) as Array<keyof typeof customDistances>).map((key) => (
                    <div key={key} className="mb-2">
                        <label className="block text-sm font-medium mb-1">
                            Distance for Edge {key}: {customDistances[key]}px
                        </label>
                        <input
                            type="range"
                            min="50"
                            max="300"
                            value={customDistances[key]}
                            onChange={(e) =>
                                handleCustomDistanceChange(key, Number(e.target.value))
                            }
                            className="w-full"
                        />
                    </div>
                ))}
            </div>
            <div
                ref={containerRef}
                style={{ height: "600px", backgroundColor: "#49416D" }}
                className="rounded-lg shadow-lg"
            ></div>
        </div>
    );
}