import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; // Asegúrate de definir esta clave en tu entorno

export async function POST(req: NextRequest) {
    try {
        // Obtener el token de autorización del encabezado
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        console.log("Received token:", token);
        // Verificar el token JWT
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        // Leer el cuerpo de la solicitud
        const body = await req.json();

        // Validar que el cuerpo contiene los datos necesarios
        const { uuid, command } = body;
        if (!uuid || !command) {
            return NextResponse.json({ error: "Missing required fields: uuid or command" }, { status: 400 });
        }

        // Aquí puedes procesar la orden (por ejemplo, enviarla al coche con el UUID especificado)
        console.log(`Received command for car ${uuid}: ${command}`);

        // Responder con éxito
        return NextResponse.json({ message: "Command received successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}