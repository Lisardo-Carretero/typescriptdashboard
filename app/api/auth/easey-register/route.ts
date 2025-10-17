import { NextResponse } from "next/server";
import supabase from "../../../../lib/supabaseClient";


export async function POST(request: Request) {
    const { email, password } = await request.json();
    let { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    if (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}