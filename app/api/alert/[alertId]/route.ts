import { NextResponse, NextRequest } from "next/server";
import supabase from "../../../../lib/supabaseClient";

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