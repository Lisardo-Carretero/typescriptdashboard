import { NextResponse } from 'next/server';
import supabase from '../../../../../lib/supabaseClientCasa';

export async function GET() {

    let { data, error } = await supabase
        .from('Wardrobe')
        .select('*')
    if (error) {
        console.error('Error al obtener wardrobes:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener wardrobes' }), { status: 500 });
    }
    return NextResponse.json(data, { status: 200 });

}


