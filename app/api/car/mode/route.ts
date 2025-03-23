import { NextRequest, NextResponse } from "next/server";
import mqtt from "mqtt";

// Variables de entorno para configurar el servidor MQTT
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://<your-mosquitto-server-ip>";
const MQTT_TOPIC = process.env.MQTT_TOPIC_MODE || "car/mode"; // Define el topic en el que publicarás los mensajes
const MQTT_USERNAME = process.env.MQTT_USERNAME || "your-username"; // Usuario para autenticación
const MQTT_PASSWORD = process.env.MQTT_PASSWORD || "your-password"; // Contraseña para autenticación

export async function GET(req: NextRequest) {
    try {
        // Configurar las opciones de conexión con usuario y contraseña
        const client = mqtt.connect(MQTT_BROKER_URL, {
            username: MQTT_USERNAME,
            password: MQTT_PASSWORD,
        });

        client.on("connect", () => {
            console.log("Connected to MQTT broker");

            // Publicar el mensaje para cambiar el modo
            const message = JSON.stringify({ action: "toggle_mode" });
            client.publish(MQTT_TOPIC, message, (err) => {
                if (err) {
                    console.error("Error publishing to MQTT:", err);
                    client.end();
                    return NextResponse.json({ error: "Failed to publish to MQTT" }, { status: 500 });
                }

                console.log(`Published to MQTT topic ${MQTT_TOPIC}:`, message);
                client.end(); // Cerrar la conexión después de publicar
            });
        });

        client.on("error", (err) => {
            console.error("MQTT connection error:", err);
            client.end();
            return NextResponse.json({ error: "MQTT connection error" }, { status: 500 });
        });

        // Responder con éxito
        return NextResponse.json({ message: "Mode toggle command sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}