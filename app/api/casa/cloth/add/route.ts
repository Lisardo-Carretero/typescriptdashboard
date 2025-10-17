import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../../lib/supabaseClientCasa";

export async function POST(request: NextRequest) {
    try {
        // Parsear el cuerpo de la petición
        const body = await request.json();

        // Validar campos obligatorios
        if (!body.name || !body.category) {
            return NextResponse.json(
                { error: 'Los campos name y category son obligatorios' },
                { status: 400 }
            );
        }

        // Normalizar el campo del wardrobe
        const wardrobeId = body.wardrobeId || body.storageId;

        // Validar que el wardrobe es obligatorio
        if (!wardrobeId) {
            return NextResponse.json(
                { error: 'El wardrobe es obligatorio' },
                { status: 400 }
            );
        }

        // Validar que el wardrobe existe
        const { data: wardrobe, error: wardrobeError } = await supabase
            .from('Wardrobe')
            .select('id, name')
            .eq('id', wardrobeId)
            .single();

        if (wardrobeError || !wardrobe) {
            return NextResponse.json(
                { error: 'El wardrobe especificado no existe' },
                { status: 400 }
            );
        }

        // Preparar tags como array JSON
        const tagsArray = body.tags?.map((tag: any) => {
            // Si es un objeto con propiedad name, extraer el name
            if (typeof tag === 'object' && tag.name) {
                return tag.name;
            }
            // Si es un string, usarlo directamente
            if (typeof tag === 'string') {
                return tag;
            }
            return null;
        }).filter((name: any) => name !== null) || [];

        // Insertar la prenda directamente con wardrobe_id
        const { data: clothInsert, error: clothError } = await supabase
            .from('Cloth')
            .insert({
                name: body.name,
                owner: body.category,
                colour: body.color || null,
                brand: body.brand || null,
                notes: body.notes || null,
                size: body.size || null,
                tags: tagsArray,
                wardrobe_id: wardrobeId
            })
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
                wardrobe_id
            `)
            .single();

        if (clothError) {
            console.error('Error al insertar prenda:', clothError);
            throw clothError;
        }

        console.log('Prenda creada exitosamente:', clothInsert);

        // Respuesta exitosa
        return NextResponse.json({
            success: true,
            message: 'Prenda añadida exitosamente',
            data: {
                id: clothInsert.id,
                name: clothInsert.name,
                owner: clothInsert.owner,
                colour: clothInsert.colour,
                brand: clothInsert.brand,
                size: clothInsert.size,
                tags: clothInsert.tags,
                notes: clothInsert.notes,
                created_at: clothInsert.created_at,
                wardrobe_id: clothInsert.wardrobe_id,
                wardrobe_name: wardrobe.name
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Error al crear prenda:', error);

        return NextResponse.json({
            success: false,
            error: 'Error interno del servidor al crear la prenda',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: 500 });
    }
}
