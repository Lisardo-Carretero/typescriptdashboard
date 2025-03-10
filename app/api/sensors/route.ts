import { NextResponse } from "next/server";
import supabase from "../../../lib/supabaseClient";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const deviceName = searchParams.get('device_name');

    if (!deviceName) {
        return NextResponse.json({ error: "device_name is required" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('timeseries')
        .select('sensor_name')
        .eq('device_name', deviceName);

    if (error) {
        return NextResponse.json({ error: "Error fetching sensors" }, { status: 500 });
    }

    return NextResponse.json(data);
}