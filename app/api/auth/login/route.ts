import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Importa jsonwebtoken
import supabase from "../../../../lib/supabaseClient";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Retrieve the user from the database
    const { data, error } = await supabase
        .from('user')
        .select('password')
        .eq('email', email)
        .single();

    if (error) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    if (!data) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, data.password);

    if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate a JWT token
    if (!process.env.JWT_SECRET) {
        return NextResponse.json({ error: "JWT_SECRET is not defined" }, { status: 500 });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
}