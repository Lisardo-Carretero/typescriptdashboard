import { NextResponse } from 'next/server';
import { getMqttClient, MQTT_TOPICS } from '../mqttClient';

export async function GET() {
    const client = getMqttClient();

    // Return detailed topic information to make it very clear where messages are being sent
    return NextResponse.json(
        {
            status: "API is running",
            mqttConnected: client?.connected || false,
            mqttTopics: {
                subscribedTo: [
                    {
                        name: "Topology updates",
                        topic: MQTT_TOPICS.TOPOLOGY
                    }
                ],
                publishingTo: {
                    name: "Commands",
                    topic: MQTT_TOPICS.COMMANDS,
                    description: "All control commands (setMaster, disconnectNode, getDelays, delay)"
                }
            }
        },
        { status: 200 }
    );
}
