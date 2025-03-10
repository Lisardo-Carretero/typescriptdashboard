import { NextResponse } from "next/server";
import supabase from "../../../lib/supabaseClient";

export async function GET() {
    const { data, error } = await supabase.rpc('get_unique_device_name');

    if (error) {
        return NextResponse.json({ error: "Error fetching devices" }, { status: 500 });
    }

    return NextResponse.json(data);
}