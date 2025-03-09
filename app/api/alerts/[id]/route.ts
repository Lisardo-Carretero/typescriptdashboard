import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from "../../../database.types";

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json(
                { error: 'Alert ID is required' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('alerts')
            .delete()
            .eq('id', parseInt(id, 10));  // Convertir string a number para la consulta

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json(
                { error: 'Failed to delete alert' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Alert deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}