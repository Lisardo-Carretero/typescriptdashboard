import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import supabase from "../../../../lib/supabaseClient";

export async function GET(request: Request) {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
        return NextResponse.json({ error: "Authorization header is missing" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return NextResponse.json({ error: "Token is missing" }, { status: 401 });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const { data, error } = await supabase
            .from('user')
            .select('email')
            .eq('email', decoded.email)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user: data });
    } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}