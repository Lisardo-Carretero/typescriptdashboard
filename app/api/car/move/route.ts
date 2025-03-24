import { NextRequest, NextResponse } from "next/server";
import mqtt from "mqtt";

// Variables de entorno para configurar el servidor MQTT
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://<your-mosquitto-server-ip>";
const MQTT_TOPIC = process.env.MQTT_TOPIC_COMMAND || "test/topic"; // Define el topic en el que publicarás los mensajes
const MQTT_USERNAME = process.env.MQTT_USERNAME || "your-username"; // Usuario para autenticación
const MQTT_PASSWORD = process.env.MQTT_PASSWORD || "your-password"; // Contraseña para autenticación

export async function POST(req: NextRequest) {
    try {
        // Leer el cuerpo de la solicitud
        const body = await req.json();

        // Validar que el cuerpo contiene los datos necesarios
        const { name, command } = body;
        if (!name || !command) {
            return NextResponse.json({ error: "Missing required fields: name or command" }, { status: 400 });
        }

        // Configurar las opciones de conexión con usuario y contraseña
        const client = mqtt.connect(MQTT_BROKER_URL, {
            username: MQTT_USERNAME,
            password: MQTT_PASSWORD,
        });

        client.on("connect", () => {
            console.log("Connected to MQTT broker");

            // Publicar el mensaje en el topic
            const message = JSON.stringify({ command });
            client.publish(MQTT_TOPIC + `/${name}`, message, (err) => {
                if (err) {
                    console.error("Error publishing to MQTT:", err);
                    client.end();
                    return NextResponse.json({ error: "Failed to publish to MQTT" }, { status: 500 });
                }

                console.log(`Published to MQTT topic ${MQTT_TOPIC}/${name}:`, message);
                client.end(); // Cerrar la conexión después de publicar
            });
        });

        client.on("error", (err) => {
            console.error("MQTT connection error:", err);
            client.end();
            return NextResponse.json({ error: "MQTT connection error" }, { status: 500 });
        });

        // Responder con éxito
        return NextResponse.json({ message: "Command received and published successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}