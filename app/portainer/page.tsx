"use client";

import { useEffect, useRef, useState } from "react";
import { Network } from "vis-network/standalone";
import mqtt from "mqtt";

// Define interfaces for mesh network data
interface MeshNode {
    id: number;
    label: string;
    isMaster: boolean;
    status: string; // connected, disconnected
    rssi?: number; // Signal strength
}

interface MeshConnection {
    from: number;
    to: number;
    delay?: number; // Connection delay in ms
}

interface MeshNetwork {
    nodes: MeshNode[];
    connections: MeshConnection[];
}

interface Node {
    id: number;
    label: string;
    color?: {
        background?: string;
        border?: string;
    };
    borderWidth?: number;
}

interface Edge {
    from: number;
    to: number;
    length?: number;
    label?: string;
    color?: string;
}

export default function WifiMeshPortainer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [network, setNetwork] = useState<Network | null>(null);

    // MQTT state
    const [mqttClient, setMqttClient] = useState<any>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const [mqttTopic, setMqttTopic] = useState<string>("network/topology");
    const [brokerUrl, setBrokerUrl] = useState<string>("mqtt://localhost:1883");

    // Network data
    const [meshData, setMeshData] = useState<MeshNetwork>({
        nodes: [],
        connections: [],
    });

    // UI controls
    const [selectedNode, setSelectedNode] = useState<number | null>(null);

    // Add new state for delay measurement between two nodes
    const [delaySourceNode, setDelaySourceNode] = useState<number | null>(null);
    const [delayTargetNode, setDelayTargetNode] = useState<number | null>(null);
    const [selectionMode, setSelectionMode] = useState<'normal' | 'source' | 'target'>('normal');

    // Add context menu state
    const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number } | null>(null);
    const [showContextMenu, setShowContextMenu] = useState<boolean>(false);

    // Add state for feedback messages
    const [actionStatus, setActionStatus] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | null;
    }>({ message: '', type: null });

    // Connect to MQTT broker
    useEffect(() => {
        try {
            const client = mqtt.connect(brokerUrl);

            client.on("connect", () => {
                console.log("Connected to MQTT broker");
                setConnected(true);
                client.subscribe(mqttTopic);
            });

            client.on("message", (topic, message) => {
                if (topic === mqttTopic) {
                    try {
                        const data = JSON.parse(message.toString());
                        setMeshData(data);
                    } catch (error) {
                        console.error("Error parsing MQTT message:", error);
                    }
                }
            });

            client.on("error", (error) => {
                console.error("MQTT error:", error);
                setConnected(false);
            });

            setMqttClient(client);

            return () => {
                client.end();
            };
        } catch (error) {
            console.error("Failed to connect to MQTT broker:", error);
        }
    }, [brokerUrl, mqttTopic]);

    // Handle clicks outside the context menu
    useEffect(() => {
        const handleClickOutside = () => {
            setShowContextMenu(false);
        };

        if (showContextMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showContextMenu]);

    // Update visualization when mesh data changes
    useEffect(() => {
        if (!containerRef.current || meshData.nodes.length === 0) return;

        const nodes: Node[] = meshData.nodes.map((node) => ({
            id: node.id,
            label: node.label,
            color: {
                background: node.isMaster
                    ? "#FF9900"
                    : node.status === "connected"
                        ? "#6D4941"
                        : "#999999",
                border: node.isMaster ? "#FFCC00" : "#D9BBA0",
            },
            borderWidth: node.isMaster ? 3 : 1,
        }));

        const edges: Edge[] = meshData.connections.map((conn) => ({
            from: conn.from,
            to: conn.to,
            label: conn.delay ? `${conn.delay}ms` : "",
            color: getConnectionColor(conn.delay),
            length: 150 + (conn.delay || 0) / 2,
        }));

        const data = { nodes, edges };

        const options = {
            physics: {
                enabled: true,
                forceAtlas2Based: {
                    gravitationalConstant: -50,
                    centralGravity: 0.01,
                    springLength: 150,
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
            },
            edges: {
                smooth: {
                    enabled: true,
                    type: "dynamic",
                    roundness: 0.5,
                },
            },
            interaction: {
                hover: true,
                selectConnectedEdges: true,
            },
        };

        const networkInstance = new Network(containerRef.current, data, options);

        networkInstance.on("click", (params) => {
            if (params.nodes.length > 0) {
                const clickedNodeId = params.nodes[0];

                // Handle different selection modes
                if (selectionMode === 'normal') {
                    setSelectedNode(clickedNodeId);

                    // Get node position in the DOM
                    const nodePosition = networkInstance.getPositions([clickedNodeId])[clickedNodeId];
                    const domPosition = networkInstance.canvasToDOM({ x: nodePosition.x, y: nodePosition.y });

                    // Set context menu position
                    setContextMenuPosition({
                        x: domPosition.x,
                        y: domPosition.y
                    });
                    setShowContextMenu(true);
                } else if (selectionMode === 'source') {
                    setDelaySourceNode(clickedNodeId);
                    setSelectionMode('normal');
                } else if (selectionMode === 'target') {
                    setDelayTargetNode(clickedNodeId);
                    setSelectionMode('normal');
                }
            } else {
                if (selectionMode === 'normal') {
                    setSelectedNode(null);
                    setShowContextMenu(false);
                }
            }
        });

        setNetwork(networkInstance);

        return () => {
            networkInstance.destroy();
        };
    }, [meshData, selectionMode]);

    // Helper to color code connections based on delay
    const getConnectionColor = (delay?: number): string => {
        if (!delay) return "#D9BBA0";

        if (delay < 10) return "#00FF00"; // Fast - green
        if (delay < 50) return "#AAFF00"; // Good - lime
        if (delay < 100) return "#FFFF00"; // Medium - yellow
        if (delay < 200) return "#FFAA00"; // Slow - orange
        return "#FF0000"; // Very slow - red
    };

    // Command handlers without debug logging
    const handleSetMaster = async () => {
        if (!selectedNode) return;

        setActionStatus({ message: `Setting node ${selectedNode} as master...`, type: 'info' });

        try {
            const response = await fetch('/api/portainer/setMaster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodeId: selectedNode,
                }),
            });

            let data;
            try {
                data = await response.json();
            } catch (parseError) {
                const text = await response.text();
                console.error("Failed to parse response as JSON:", parseError, text);
                throw parseError;
            }

            if (response.ok) {
                setActionStatus({
                    message: `Set node ${selectedNode} (${getNodeLabelById(selectedNode)}) as master successfully! Topic: ${data.topic}`,
                    type: 'success'
                });
            } else {
                setActionStatus({
                    message: `Failed to set master node: ${data.error || 'Unknown error'}`,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('Error setting master node:', error);
            setActionStatus({
                message: `Network error while setting master node: ${error}`,
                type: 'error'
            });
        }
    };

    const handleDisconnectNode = async () => {
        if (!selectedNode) return;

        setActionStatus({ message: `Disconnecting node ${selectedNode}...`, type: 'info' });

        try {
            const response = await fetch('/api/portainer/disconnectNode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodeId: selectedNode,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setActionStatus({
                    message: `Disconnected node ${selectedNode} (${getNodeLabelById(selectedNode)}) successfully! Topic: ${data.topic}`,
                    type: 'success'
                });
            } else {
                setActionStatus({
                    message: `Failed to disconnect node: ${data.error || 'Unknown error'}`,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('Error disconnecting node:', error);
            setActionStatus({
                message: `Network error while disconnecting node: ${error}`,
                type: 'error'
            });
        }
    };

    // Update the node-to-node delay measurement function
    const handleMeasureDelay = async () => {
        if (!delaySourceNode || !delayTargetNode) return;

        setActionStatus({ message: `Measuring delay between nodes ${delaySourceNode} and ${delayTargetNode}...`, type: 'info' });

        try {
            const response = await fetch('/api/portainer/delay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: delaySourceNode,
                    to: delayTargetNode,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setActionStatus({
                    message: `Delay measurement between ${getNodeLabelById(delaySourceNode)} and ${getNodeLabelById(delayTargetNode)} requested successfully! Topic: ${data.topic}`,
                    type: 'success'
                });
            } else {
                setActionStatus({
                    message: `Failed to measure delay: ${data.error || 'Unknown error'}`,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('Error measuring delay:', error);
            setActionStatus({
                message: `Network error while measuring delay: ${error}`,
                type: 'error'
            });
        }
    };

    // Start node selection for delay measurement
    const startSelectSource = () => {
        setSelectionMode('source');
    };

    const startSelectTarget = () => {
        setSelectionMode('target');
    };

    // Reset delay measurement selection
    const resetDelaySelection = () => {
        setDelaySourceNode(null);
        setDelayTargetNode(null);
    };

    // Load mock data for development/testing
    const loadMockData = () => {
        const mockData: MeshNetwork = {
            nodes: [
                { id: 1, label: "Gateway", isMaster: true, status: "connected" },
                { id: 2, label: "Living Room", isMaster: false, status: "connected" },
                { id: 3, label: "Kitchen", isMaster: false, status: "connected" },
                { id: 4, label: "Bedroom", isMaster: false, status: "connected" },
                { id: 5, label: "Bathroom", isMaster: false, status: "disconnected" },
                { id: 6, label: "Garage", isMaster: false, status: "connected" },
            ],
            connections: [
                { from: 1, to: 2, delay: 15 },
                { from: 1, to: 3, delay: 25 },
                { from: 1, to: 4, delay: 120 },
                { from: 2, to: 5, delay: 80 },
                { from: 2, to: 6, delay: 45 },
            ],
        };

        setMeshData(mockData);
    };

    // Helper function to get node label by ID
    const getNodeLabelById = (id: number | null) => {
        if (!id) return "None";
        const node = meshData.nodes.find(node => node.id === id);
        return node ? node.label : `Node ${id}`;
    };

    // Enhanced testApiDirectly function that tests all backend API endpoints
    const testApiDirectly = async () => {
        console.log("Starting API tests for all backend endpoints");
        setActionStatus({ message: "Running API tests for all commands...", type: 'info' });

        // Test results to track success/failure
        const testResults = {
            setMaster: false,
            disconnectNode: false,
            delay: false
        };

        try {
            // 1. Test setMaster endpoint
            console.log("Testing setMaster endpoint");
            const setMasterResponse = await fetch('/api/portainer/setMaster', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodeId: selectedNode || 1 }),
            });

            const setMasterData = await setMasterResponse.json();
            console.log("setMaster response:", setMasterData);
            testResults.setMaster = setMasterResponse.ok;

            // 2. Test disconnectNode endpoint
            console.log("Testing disconnectNode endpoint");
            const disconnectResponse = await fetch('/api/portainer/disconnectNode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodeId: selectedNode || 2 }),
            });

            const disconnectData = await disconnectResponse.json();
            console.log("disconnectNode response:", disconnectData);
            testResults.disconnectNode = disconnectResponse.ok;

            // 3. Test delay endpoint
            console.log("Testing delay endpoint");
            const delayResponse = await fetch('/api/portainer/delay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from: delaySourceNode || 1,
                    to: delayTargetNode || 2
                }),
            });

            const delayData = await delayResponse.json();
            console.log("delay response:", delayData);
            testResults.delay = delayResponse.ok;

            // Prepare summary results
            const successCount = Object.values(testResults).filter(Boolean).length;
            const totalCount = Object.keys(testResults).length;

            // Show summary feedback to user
            setActionStatus({
                message: `API tests completed: ${successCount}/${totalCount} successful. Check console for details.`,
                type: successCount === totalCount ? 'success' : 'error'
            });
        } catch (error) {
            console.error("API test error:", error);
            setActionStatus({
                message: `API tests failed with error: ${error}`,
                type: 'error'
            });
        }
    };

    // Context menu component without debug logs
    const NodeContextMenu = () => {
        if (!showContextMenu || !contextMenuPosition || !selectedNode) {
            return null;
        }

        // Get the node details for display
        const node = meshData.nodes.find(n => n.id === selectedNode);
        if (!node) {
            return null;
        }

        return (
            <div
                className="absolute bg-[#3D3853] rounded-lg shadow-lg p-3 border border-[#D9BBA0] z-50"
                style={{
                    left: `${contextMenuPosition.x + 20}px`,
                    top: `${contextMenuPosition.y - 20}px`,
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col space-y-2 min-w-[200px]">
                    {/* Pointer arrow */}
                    <div
                        className="absolute w-4 h-4 bg-[#3D3853] border-l border-t border-[#D9BBA0] transform rotate-45"
                        style={{
                            left: '-6px',
                            top: '20px',
                        }}
                    ></div>

                    {/* Node info at the top of the menu */}
                    <div className="mb-2 pb-2 border-b border-gray-500">
                        <p className="font-medium text-[#D9BBA0]">Node {node.id}: {node.label}</p>
                        <p className="text-xs text-gray-300">
                            Status: {node.status} • Role: {node.isMaster ? "Master" : "Client"}
                        </p>
                    </div>

                    <button
                        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-left flex items-center"
                        onClick={(e) => {
                            handleSetMaster();
                            setShowContextMenu(false);
                            e.stopPropagation();
                        }}
                    >
                        <img
                            src="/sombrero.png"
                            alt="Master"
                            className="w-5 h-5 mr-2"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                        />
                        Set as Master Node
                    </button>

                    <button
                        className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-left flex items-center"
                        onClick={(e) => {
                            handleDisconnectNode();
                            setShowContextMenu(false);
                            e.stopPropagation();
                        }}
                    >
                        <img
                            src="/disconect.png"
                            alt="Disconnect"
                            className="w-5 h-5 mr-2"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                        />
                        Disconnect Node
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#2E2A3B] text-white p-8">
            <h1 className="text-3xl font-bold text-center text-[#D9BBA0] mb-6">
                WiFi Mesh Network Portainer
            </h1>

            {/* Connection Status with Test API button */}
            <div className="mb-4 flex items-center space-x-3">
                <div className="flex items-center">
                    <div
                        className={`w-4 h-4 rounded-full mr-2 ${connected ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span>
                        {connected ? "Connected to MQTT Broker" : "Disconnected"}
                    </span>
                </div>

                <button
                    onClick={loadMockData}
                    className="bg-blue-600 px-3 py-1 rounded text-sm"
                >
                    Load Test Data
                </button>

                {/* Keep Test API button */}
                <button
                    onClick={testApiDirectly}
                    className="bg-yellow-600 px-3 py-1 rounded text-sm"
                >
                    Test API
                </button>
            </div>

            {/* Node-to-Node Delay Measurement Section */}
            <div className="mb-6 p-4 bg-[#3D3853] rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Measure Delay Between Specific Nodes</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Source Node Selection */}
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm">Source Node: <span className="font-medium">{getNodeLabelById(delaySourceNode)}</span></p>
                        <button
                            className={`px-4 py-2 rounded ${selectionMode === 'source' ? 'bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                            onClick={startSelectSource}
                        >
                            {selectionMode === 'source' ? 'Click on Source Node...' : 'Select Source Node'}
                        </button>
                    </div>

                    {/* Target Node Selection */}
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm">Target Node: <span className="font-medium">{getNodeLabelById(delayTargetNode)}</span></p>
                        <button
                            className={`px-4 py-2 rounded ${selectionMode === 'target' ? 'bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                            onClick={startSelectTarget}
                        >
                            {selectionMode === 'target' ? 'Click on Target Node...' : 'Select Target Node'}
                        </button>
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex flex-wrap gap-3">
                    <button
                        className={`px-4 py-2 rounded ${delaySourceNode && delayTargetNode ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'}`}
                        onClick={handleMeasureDelay}
                        disabled={!delaySourceNode || !delayTargetNode}
                    >
                        Measure Delay
                    </button>

                    <button
                        className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
                        onClick={resetDelaySelection}
                    >
                        Reset Selection
                    </button>

                    {selectionMode !== 'normal' && (
                        <button
                            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
                            onClick={() => setSelectionMode('normal')}
                        >
                            Cancel Selection
                        </button>
                    )}
                </div>
            </div>

            {/* Selected Node Info */}
            {selectedNode && (
                <div className="mb-6 p-4 bg-[#3D3853] rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Node Information</h2>
                    {meshData.nodes
                        .filter((node) => node.id === selectedNode)
                        .map((node) => (
                            <div
                                key={node.id}
                                className="grid grid-cols-2 md:grid-cols-4 gap-2"
                            >
                                <p>
                                    <span className="font-medium">ID:</span> {node.id}
                                </p>
                                <p>
                                    <span className="font-medium">Name:</span> {node.label}
                                </p>
                                <p>
                                    <span className="font-medium">Role:</span>{" "}
                                    {node.isMaster ? "Master" : "Client"}
                                </p>
                                <p>
                                    <span className="font-medium">Status:</span>{" "}
                                    {node.status}
                                </p>
                                {node.rssi && (
                                    <p>
                                        <span className="font-medium">Signal:</span>{" "}
                                        {node.rssi} dBm
                                    </p>
                                )}
                            </div>
                        ))}
                </div>
            )}

            {/* Add status message display */}
            {actionStatus.type && (
                <div className={`mb-4 p-3 rounded-lg ${actionStatus.type === 'success' ? 'bg-green-600' :
                    actionStatus.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                    }`}>
                    <p className="flex items-center">
                        {actionStatus.type === 'success' && <span className="mr-2">✅</span>}
                        {actionStatus.type === 'error' && <span className="mr-2">❌</span>}
                        {actionStatus.type === 'info' && <span className="mr-2">ℹ️</span>}
                        {actionStatus.message}
                    </p>
                </div>
            )}

            {/* Network Visualization - Now wrapped in a relative div for context menu positioning */}
            <div className="relative">
                <div
                    ref={containerRef}
                    style={{ height: "600px", backgroundColor: "#49416D" }}
                    className="rounded-lg shadow-lg"
                ></div>

                {/* Context Menu */}
                <NodeContextMenu />
            </div>

            {/* Selection Mode Indicator */}
            {selectionMode !== 'normal' && (
                <div className="mt-3 p-2 bg-yellow-600 text-center rounded-lg">
                    <p className="font-medium">
                        {selectionMode === 'source'
                            ? 'Click on a node to select it as the SOURCE for delay measurement'
                            : 'Click on a node to select it as the TARGET for delay measurement'}
                    </p>
                </div>
            )}

            {/* Legend */}
            <div className="mt-4 p-3 bg-[#3D3853] rounded-lg">
                <h3 className="font-medium mb-2">Legend:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-[#FF9900] border-2 border-[#FFCC00] mr-2"></div>
                        <span>Master Node</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-[#6D4941] border border-[#D9BBA0] mr-2"></div>
                        <span>Connected Node</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-[#999999] border border-[#D9BBA0] mr-2"></div>
                        <span>Disconnected Node</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#00FF00] mr-2"></div>
                        <span>&lt;10ms Delay</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#FFFF00] mr-2"></div>
                        <span>50-100ms Delay</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#FF0000] mr-2"></div>
                        <span>&gt;200ms Delay</span>
                    </div>
                </div>
            </div>
        </div>
    );
}