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
            .select('id, name')
            .eq('id', wardrobeId)
            .single();

        if (wardrobeError || !wardrobe) {
            return NextResponse.json(
                { error: 'Wardrobe no encontrado' },
                { status: 404 }
            );
        }

        // Contar el total de prendas en el wardrobe
        const { count, error: countError } = await supabase
            .from('Cloth')
            .select('id', { count: 'exact', head: true })
            .eq('wardrobe_id', wardrobeId);

        if (countError) {
            console.error('Error al contar prendas:', countError);
            throw countError;
        }

        // Respuesta exitosa
        return NextResponse.json({
            success: true,
            count: count || 0,
            wardrobeName: wardrobe.name,
            message: `Se encontraron ${count || 0} prendas en el wardrobe`
        }, { status: 200 });

    } catch (error) {
        console.error('Error al obtener total de prendas:', error);

        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor al obtener el total de prendas',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: 500 });
    }
}
