import { NextResponse, NextRequest } from "next/server";
import supabase from "../../../../../../lib/supabaseClient";
import { subHours, subDays } from "date-fns";

export async function POST(request: NextRequest, { params }: { params: Promise<{ device_name: string, sensor_name: string }> }) {
    const { device_name, sensor_name } = await params;
    const body = await request.json();
    const { p_start_time, p_end_time } = body;

    if (!device_name || !sensor_name) {
        return NextResponse.json({ error: "Missing device_name or sensor_name" }, { status: 400 });
    }
    if (!p_end_time) {
        return NextResponse.json({ error: "Missing p_end_time" }, { status: 400 });
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

    let startTimeValue = p_start_time ? new Date(p_start_time) : new Date();
    if (isNaN(startTimeValue.getTime())) {
        return NextResponse.json({ error: "Invalid p_start_time" }, { status: 400 });
    }

    let endTimeValue = p_end_time;
    if (["1h", "1w", "1m"].includes(p_end_time)) {
        switch (p_end_time) {
            case "1h":
                endTimeValue = subHours(startTimeValue, 1).toISOString();
                break;
            case "1w":
                endTimeValue = subDays(startTimeValue, 7).toISOString();
                break;
            case "1m":
                endTimeValue = subDays(startTimeValue, 30).toISOString();
                break;
        }
    } else {
        const endDate = new Date(p_end_time);
        if (isNaN(endDate.getTime())) {
            return NextResponse.json({ error: "Invalid p_end_time" }, { status: 400 });
        }
        endTimeValue = endDate.toISOString();
    }

    const { data, error } = await supabase
        .rpc('get_average_value', {
            p_device_name: device_name,
            p_sensor_name: sensor_name,
            p_start_time: startTimeValue.toISOString(),
            p_end_time: endTimeValue
        });

    if (error) {
        return NextResponse.json({ error: "Error fetching sensor data" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
