import { NextResponse } from "next/server";
import supabase from "../../../../lib/supabaseClient";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const { error } = await supabase.from("user").insert([
        { email, password }
    ]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }


    return NextResponse.json({ message: "User registered successfully" });
}