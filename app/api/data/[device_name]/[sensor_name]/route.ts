import { NextResponse } from "next/server";
import supabase from "../../../../../lib/supabaseClient";

export async function POST(request: Request, { params }: { params: Promise<{ device_name: string, sensor_name: string }> }) {
    const { device_name, sensor_name } = await params;

    const { p_start_time } = await request.json();

    // Verifica que p_start_time esté definido
    if (!p_start_time) {
        return NextResponse.json({ error: "p_start_time is required" }, { status: 400 });
    }
    if (isNaN(new Date(p_start_time).getTime())) {
        return NextResponse.json({ error: "Invalid p_start_time" }, { status: 400 });
    }

    // Quiero verificar primero que el device_name exista en mi base de datos
    const { data: devices, error: devicesError } = await supabase.rpc('get_unique_device_name');
    if (devicesError) {
        return NextResponse.json({ error: "Error fetching devices" }, { status: 500 });
    }
    const deviceNames = devices.map((device: { device_name: string }) => device.device_name);
    if (!deviceNames.includes(device_name)) {
        return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Verificar que el sensor_name existe para el device_name
    const { data: sensors, error: sensorsError } = await supabase.rpc('sensors_per_device', { p_device_name: device_name });
    if (sensorsError) {
        return NextResponse.json({ error: "Error fetching sensors" }, { status: 500 });
    }
    if (!sensors) {
        return NextResponse.json({ error: "Sensor not found" }, { status: 404 });
    }
    const sensorNames = Array.isArray(sensors[0]?.sensor_names) ? sensors[0].sensor_names.filter((sensor: any) => typeof sensor === 'string').map((sensor: string) => sensor.toLowerCase()) : [];
    if (!sensorNames.includes(sensor_name.toLowerCase())) {
        return NextResponse.json({ error: "Sensor not found for the given device" }, { status: 404 });
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