import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
        const { device_name, sensor_name, condition, threshold, color } = await request.json();

        // Validate required fields
        if (!device_name || !sensor_name || !condition || threshold === undefined || !color) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate condition is one of the allowed values
        const allowedConditions = ['<', '>', '<=', '>=', '='];
        if (!allowedConditions.includes(condition)) {
            return NextResponse.json(
                { error: 'Invalid condition value' },
                { status: 400 }
            );
        }

        // Insert into database using supabase
        const { data, error } = await supabase
            .from('alerts')
            .insert([{ device_name, sensor_name, condition, threshold, color }])
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json(
                { error: 'Failed to save alert' },
                { status: 500 }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('alerts')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch alerts' },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}