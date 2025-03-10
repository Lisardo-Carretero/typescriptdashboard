import { NextResponse } from "next/server";
import supabase from "../../../lib/supabaseClient";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return NextResponse.json({ error: "Wrong credentials." }, { status: 401 });
    }

    return NextResponse.json({ user: data.user });
}
