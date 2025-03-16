import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../lib/supabaseClient";

export async function POST(request: NextRequest) {
    let json;
    try {
        const body = await request.json();
        if (!body) {
            return NextResponse.json({ error: "Empty request body" }, { status: 400 });
        }
        json = body;
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
    }

    const { p_device_name } = json;

    if (!p_device_name) {
        return NextResponse.json({ error: "p_device_name is required" }, { status: 400 });
    }

    let { data, error } = await supabase
        .rpc('sensors_per_device', {
            p_device_name
        });

    if (error) {
        return NextResponse.json({ error: "Error fetching sensors" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}