import { NextRequest, NextResponse } from 'next/server';
import { publishCommand, MQTT_TOPICS } from '../mqttClient';

export async function POST(request: NextRequest) {
    console.log("setMaster API endpoint called");

    try {
        const body = await request.json();
        console.log("Request body received:", body);

        const { nodeId } = body;

        if (!nodeId) {
            console.error("Missing nodeId parameter");
            return NextResponse.json(
                { error: "Missing required parameter: nodeId" },
                { status: 400 }
            );
        }

        // Command published to: commands
        const command = {
            action: "setMaster",
            nodeId
        };
        console.log("Preparing to send MQTT command:", command);

        const success = await publishCommand(command);
        console.log("MQTT publish result:", success);

        if (success) {
            console.log("Command sent successfully");
            return NextResponse.json(
                {
                    success: true,
                    message: "Set master node command sent successfully",
                    topic: MQTT_TOPICS.COMMANDS
                },
                { status: 200 }
            );
        } else {
            console.error("Failed to send command to MQTT broker");
            console.error("MQTT publish failed. Topic:", MQTT_TOPICS.COMMANDS);
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
