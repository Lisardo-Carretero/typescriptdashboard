import { NextRequest, NextResponse } from 'next/server';
import mqtt from "mqtt";

// Variables de entorno para configurar el servidor MQTT
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://<your-mosquitto-server-ip>";
const MQTT_TOPIC_PORTAINER = process.env.MQTT_TOPIC_COMMAND || "test/topic"; // Define el topic en el que publicarás los mensajes
const MQTT_USERNAME = process.env.MQTT_USERNAME || "your-username"; // Usuario para autenticación
const MQTT_PASSWORD = process.env.MQTT_PASSWORD || "your-password"; // Contraseña para autenticación

function connectMqtt() {
    return mqtt.connect(MQTT_BROKER_URL, {
        username: MQTT_USERNAME,
        password: MQTT_PASSWORD,
        clientId: 'nextjs' + Math.random().toString(16).slice(2), // Genera un clientId único
    });
}


export async function GET() {
    const client = connectMqtt();
    client.subscribe(MQTT_TOPIC_PORTAINER, (err) => {
        if (err) {
            console.error("Error subscribing to MQTT topic:", err);
            return NextResponse.json({ error: "Failed to subscribe to MQTT topic" }, { status: 500 });
        }
        console.log(`Subscribed to MQTT topic ${MQTT_TOPIC_PORTAINER}`);
    });

    client.on("message", (topic, message) => {
        const msg = message.toString();
        console.log("Received message:", topic, msg);

    });




    return NextResponse.json("h", { status: 200 });
};