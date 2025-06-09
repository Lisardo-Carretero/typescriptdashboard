import { NextRequest, NextResponse } from 'next/server';
import { publishCommand, MQTT_TOPICS } from '../mqttClient';

export async function POST(request: NextRequest) {
    try {
        // Command published to: commands
        const command = {
            action: "getDelays"
        };

        const success = await publishCommand(command);

        if (success) {
            return NextResponse.json(
                {
                    success: true,
                    message: "Get delays command sent successfully",
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
