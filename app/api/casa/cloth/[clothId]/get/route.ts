
import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../../../../lib/supabaseClientCasa';

export async function GET(request: NextRequest, { params }: { params: Promise<{ clothId: string }> }) {
    try {
        const { clothId: clothIdStr } = await params;
        const clothId = parseInt(clothIdStr);
        let { data: Cloth, error } = await supabase
            .from('Cloth')
            .select('*')
            .eq('id', clothId)
            .single();

        if (error) {
            throw error;
        }

        return NextResponse.json(Cloth);
    } catch (error) {
        console.error('Error fetching cloth:', error);
        return NextResponse.json({ error: 'Error fetching cloth' }, { status: 500 });
    }
}
