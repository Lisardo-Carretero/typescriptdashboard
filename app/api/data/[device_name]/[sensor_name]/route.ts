import { NextResponse } from "next/server";
import supabase from "../../../../../lib/supabaseClient";

export async function POST(request: Request, context: { params: Promise<{ device_name: string, sensor_name: string }> }) {
    const { device_name, sensor_name } = await context.params;

    const { p_start_time, p_end_time } = await request.json();

    // Verifica que p_start_time esté definido
    if (!p_start_time) {
        return NextResponse.json({ error: "p_start_time is required" }, { status: 400 });
    }

    // Realiza la consulta a la base de datos
    const { data, error } = await supabase
        .from("timeseries")
        .select("*")
        .eq("device_name", device_name)
        .eq("sensor_name", sensor_name)
        .gte("event_time", p_start_time)
        .order("event_time", { ascending: true });

    // Manejo de errores
    if (error) {
        return NextResponse.json({ error: "Error fetching sensor data" }, { status: 500 });
    }

    // Devuelve los datos
    return NextResponse.json(data, { status: 200 });
}