import { NextRequest, NextResponse } from 'next/server';
import mqtt from "mqtt";

// Configure MQTT settings
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://localhost:1883";
const MQTT_COMMAND_TOPIC = "mesh/network/command"; // Topic for sending commands to mesh nodes
const MQTT_TOPOLOGY_TOPIC = "mesh/network/topology"; // Topic for receiving network topology updates
const MQTT_USERNAME = process.env.MQTT_USERNAME || ""; // Optional auth
const MQTT_PASSWORD = process.env.MQTT_PASSWORD || ""; // Optional auth

// Create a singleton MQTT client
let mqttClient: mqtt.MqttClient | null = null;

function getMqttClient() {
    if (!mqttClient) {
        const options: mqtt.IClientOptions = {
            clientId: 'nextjs-portainer-' + Math.random().toString(16).slice(2),
        };

        // Only add credentials if they're provided
        if (MQTT_USERNAME && MQTT_PASSWORD) {
            options.username = MQTT_USERNAME;
            options.password = MQTT_PASSWORD;
        }

        mqttClient = mqtt.connect(MQTT_BROKER_URL, options);

        mqttClient.on('connect', () => {
            console.log('Backend connected to MQTT broker');
            mqttClient?.subscribe(MQTT_TOPOLOGY_TOPIC);
        });

        mqttClient.on('error', (err) => {
            console.error('MQTT connection error:', err);
            mqttClient = null; // Reset to try again next time
        });
    }

    return mqttClient;
}

// Generic function to publish MQTT commands
async function publishCommand(command: any): Promise<boolean> {
    try {
        const client = getMqttClient();
        const result = await new Promise<boolean>((resolve) => {
            if (!client || !client.connected) {
                resolve(false);
                return;
            }

            client.publish(
                MQTT_COMMAND_TOPIC,
                JSON.stringify(command),
                { qos: 1 },
                (err) => {
                    if (err) {
                        console.error('Error publishing MQTT command:', err);
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            );
        });

        return result;
    } catch (error) {
        console.error('Failed to publish MQTT command:', error);
        return false;
    }
}

// API endpoint for setting a master node
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, nodeId, from, to } = body;

        if (!action) {
            return NextResponse.json(
                { error: "Missing required parameter: action" },
                { status: 400 }
            );
        }

        let command: any = { action };

        // Add appropriate parameters based on the action
        switch (action) {
            case 'setMaster':
                if (!nodeId) {
                    return NextResponse.json(
                        { error: "Missing required parameter: nodeId" },
                        { status: 400 }
                    );
                }
                command.nodeId = nodeId;
                break;

            case 'disconnectNode':
                if (!nodeId) {
                    return NextResponse.json(
                        { error: "Missing required parameter: nodeId" },
                        { status: 400 }
                    );
                }
                command.nodeId = nodeId;
                break;

            case 'getDelays':
                // No additional parameters needed
                break;

            case 'delay':
                if (!from || !to) {
                    return NextResponse.json(
                        { error: "Missing required parameters: from and to" },
                        { status: 400 }
                    );
                }
                command.from = from;
                command.to = to;
                break;

            default:
                return NextResponse.json(
                    { error: `Unsupported action: ${action}` },
                    { status: 400 }
                );
        }

        // Publish command to MQTT
        const success = await publishCommand(command);

        if (success) {
            return NextResponse.json(
                {
                    success: true,
                    message: `Command ${action} sent successfully`
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: "Failed to send command to MQTT broker" },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// GET endpoint for checking API status
export async function GET() {
    const client = getMqttClient();

    return NextResponse.json(
        {
            status: "API is running",
            mqttConnected: client?.connected || false
        },
        { status: 200 }
    );
}