import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../../lib/supabaseClientCasa";
import { Database } from "../../../../databaseCasa.types";

type Cloth = Database['public']['Tables']['Cloth']['Row'];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const wardrobeId = searchParams.get('wardrobe_id');
        const owner = searchParams.get('owner');
        const limit = searchParams.get('limit');

        let query = supabase
            .from('Cloth')
            .select(`
                id,
                name,
                owner,
                colour,
                brand,
                size,
                tags,
                notes,
                created_at,
                wardrobe_id,
                Wardrobe (
                    id,
                    name,
                    location
                )
            `);

        // Aplicar filtros opcionales
        if (wardrobeId) {
            query = query.eq('wardrobe_id', parseInt(wardrobeId));
        }

        if (owner) {
            query = query.eq('owner', owner);
        }

        // Aplicar límite si se especifica
        if (limit) {
            query = query.limit(parseInt(limit));
        }

        // Ordenar por fecha de creación (más recientes primero)
        query = query.order('created_at', { ascending: false });

        const { data: cloths, error } = await query;

        if (error) {
            console.error('Error fetching cloths:', error);
            return NextResponse.json(
                {
                    error: 'Error al obtener las prendas',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                },
                { status: 500 }
            );
        }

        if (!cloths || cloths.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No se encontraron prendas',
                data: [],
                count: 0
            }, { status: 200 });
        }

        // Formatear la respuesta
        const formattedCloths = cloths.map(cloth => ({
            ...cloth,
            wardrobe: cloth.Wardrobe ? {
                id: cloth.Wardrobe.id,
                name: cloth.Wardrobe.name,
                location: cloth.Wardrobe.location
            } : null
        }));

        return NextResponse.json({
            success: true,
            count: formattedCloths.length,
            data: formattedCloths,
            filters: {
                wardrobe_id: wardrobeId,
                owner: owner,
                limit: limit
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Unexpected error fetching cloths:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}