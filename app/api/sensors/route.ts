import { NextResponse } from "next/server";
import supabase from "../../../lib/supabaseClient";

export async function POST(request: Request) {
    const { p_device_name } = await request.json();

    let { data, error } = await supabase
        .rpc('sensors_per_device', {
            p_device_name
        });

    if (error) {
        return NextResponse.json({ error: "Error fetching sensors" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}