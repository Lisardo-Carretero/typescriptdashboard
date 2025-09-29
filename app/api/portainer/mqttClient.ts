import mqtt from "mqtt";

// Define MQTT topics - now with more explicit names for clarity
export const MQTT_TOPICS = {
    // Topic for receiving network topology updates
    TOPOLOGY: "network/topology",

    // Topic for sending all commands
    COMMANDS: "mesh/network/commands"
};

// Configure MQTT settings
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://localhost:1883";
const MQTT_USERNAME = process.env.MQTT_USERNAME || "";
const MQTT_PASSWORD = process.env.MQTT_PASSWORD || "";

// Create a singleton MQTT client
let mqttClient: mqtt.MqttClient | null = null;

export function getMqttClient() {
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
            mqttClient?.subscribe(MQTT_TOPICS.TOPOLOGY);
        });

        mqttClient.on('error', (err) => {
            console.error('MQTT connection error:', err);
            mqttClient = null; // Reset to try again next time
        });
    }

    return mqttClient;
}

// Enhanced function to publish MQTT commands with better logging
export async function publishCommand(command: any): Promise<boolean> {
    try {
        const client = getMqttClient();
        const topic = MQTT_TOPICS.COMMANDS; // Explicitly reference for clarity

        console.log(`Preparing to send command to topic: "${topic}"`);
        console.log(`Command payload:`, command);

        const result = await new Promise<boolean>((resolve) => {
            if (!client || !client.connected) {
                console.error('MQTT client not connected, cannot send command');
                resolve(false);
                return;
            }

            client.publish(
                topic,
                JSON.stringify(command),
                { qos: 1 },
                (err) => {
                    if (err) {
                        console.error(`Error publishing MQTT command to "${topic}":`, err);
                        resolve(false);
                    } else {
                        console.log(`✓ Successfully published to "${topic}": ${JSON.stringify(command)}`);
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
