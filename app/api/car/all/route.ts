import { NextResponse } from "next/server";
import supabase from "../../../../lib/supabaseClient";

export async function GET() {

    let { data, error } = await supabase
        .rpc('get_all_cars')
    if (error)
        return NextResponse.json({ error: "Error fetching devices" }, { status: 500 });
    else console.log(data)

    return NextResponse.json(data, { status: 200 });
};