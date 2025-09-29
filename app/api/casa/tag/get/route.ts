import { NextResponse } from 'next/server';
import supabase from '../../../../../lib/supabaseClientCasa';

export async function GET() {
    try {
        const { data: tags, error } = await supabase
            .from('tag')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching tags from Supabase:', error);
            return NextResponse.json([]);
        }

        const tagsWithColors = tags?.map((tag: any) => ({
            id: tag.id.toString(),
            name: tag.name,
            color: 'bg-blue-100 text-blue-800'
        })) || [];

        return NextResponse.json(tagsWithColors);
    } catch (error) {
        console.error('Error fetching tags:', error);
        return NextResponse.json([]);
    }
}