import { NextResponse, NextRequest } from "next/server";
import supabase from "../../../../../../lib/supabaseClient";

export async function GET(request: NextRequest, { params }: { params: { device_name: string } }) {
    const { device_name } = await params;

    if (!device_name) {
        return NextResponse.json({ error: "device_name is required" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('device_name', device_name);

    if (error) {
        return NextResponse.json({ error: "Error fetching alerts" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}