import { NextResponse, NextRequest } from "next/server";
import supabase from "../../../lib/supabaseClient";

export async function POST(request: NextRequest) {
    let json;
    try {
        json = await request.json();
        console.log(json);

        if (!json) {
            return NextResponse.json({ error: "Empty request body" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
    }

    const { device_name, sensor_name, condition, threshold, color, time_period } = json;
    console.log(device_name, sensor_name, condition, threshold, color, time_period);

    if (!device_name || !sensor_name || !condition || threshold === undefined || !color || !time_period) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('alerts')
        .insert([{ device_name, sensor_name, condition, threshold, color, period_of_time: time_period }]);

    if (error) {
        return NextResponse.json({ error: "Error creating alert" }, { status: 500 });
    }

    return NextResponse.json("Alert created ", { status: 201 });
}

export async function DELETE(request: NextRequest) {
    let json;
    try {
        json = await request.json();

        if (!json) {
            return NextResponse.json({ error: "Empty request body" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
    }

    const { id } = json;
    const _id = Number.parseInt(id);
    // comprobar que id es un número
    if (isNaN(_id)) {
        return NextResponse.json({ error: "id must be a number" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('alerts')
        .delete()
        .eq('id', _id);

    if (error) {
        return NextResponse.json({ error: "Error deleting alert" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}