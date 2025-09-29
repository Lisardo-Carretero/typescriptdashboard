import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../../../lib/supabaseClientCasa";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ wardrobeId: string }> }
) {
    try {
        const { wardrobeId: wardrobeIdStr } = await params;
        const wardrobeId = parseInt(wardrobeIdStr);

        // Validar que wardrobeId es un número válido
        if (isNaN(wardrobeId)) {
            return NextResponse.json(
                { error: 'ID de wardrobe inválido' },
                { status: 400 }
            );
        }

        // Verificar que el wardrobe existe
        const { data: wardrobe, error: wardrobeError } = await supabase
            .from('Wardrobe')
            .select('*')
            .eq('id', wardrobeId)
            .single();

        if (wardrobeError || !wardrobe) {
            return NextResponse.json(
                { error: 'Wardrobe no encontrado' },
                { status: 404 }
            );
        }

        // Obtener todas las prendas del wardrobe con JOIN
        const { data: clothsInWardrobe, error: clothsInWardrobeError } = await supabase
            .from('WardrobeHasCloth')
            .select('Cloth(*)')
            .eq('wardrobeId', wardrobeId);

        if (clothsInWardrobeError) {
            console.error('Error al obtener prendas:', clothsInWardrobeError);
            throw clothsInWardrobeError;
        }

        // Formatear los datos para el frontend
        const formattedCloths = clothsInWardrobe?.map(item => ({
            id: item.Cloth?.id,
            name: item.Cloth?.name,
            owner: item.Cloth?.owner,
            colour: item.Cloth?.colour,
            brand: item.Cloth?.brand,
            size: item.Cloth?.size,
            tags: item.Cloth?.tags || [],
            notes: item.Cloth?.notes,
            created_at: item.Cloth?.created_at
        })).filter(cloth => cloth.id) || [];

        // Respuesta exitosa
        return NextResponse.json({
            success: true,
            wardrobe: {
                id: wardrobe.id,
                name: wardrobe.name,
                location: wardrobe.location
            },
            cloths: formattedCloths,
            totalCloths: formattedCloths.length
        }, { status: 200 });

    } catch (error) {
        console.error('Error al obtener prendas del wardrobe:', error);

        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor al obtener las prendas',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: 500 });
    }
}