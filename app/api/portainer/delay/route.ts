import { NextRequest, NextResponse } from 'next/server';
import { publishCommand, MQTT_TOPICS } from '../mqttClient';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { from, to } = body;

        if (!from || !to) {
            return NextResponse.json(
                { error: "Missing required parameters: from and to" },
                { status: 400 }
            );
        }

        // Command published to MQTT topic: commands
        const targetTopic = MQTT_TOPICS.COMMANDS; // Make topic explicit
        console.log(`Sending delay measurement command to topic: ${targetTopic}`);

        const command = {
            action: "delay",
            from,
            to
        };

        const success = await publishCommand(command);

        if (success) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Measure delay command sent successfully",
                    topic: MQTT_TOPICS.COMMANDS
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
