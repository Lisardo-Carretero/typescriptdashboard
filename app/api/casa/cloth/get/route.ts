import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../../lib/supabaseClientCasa";

export async function GET(request: NextRequest) {
    let { data, error } = await supabase
        .from('Cloth')
        .select('*')
        .order('name', { ascending: false });
    if (error) {
        console.error('Error fetching cloths:', error);
        return NextResponse.json({ error: 'Error fetching cloths' }, { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });
}