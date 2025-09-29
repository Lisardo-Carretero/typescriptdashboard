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

        const wardrobeId = body.wardrobeId;

        // Validar que el wardrobe existe si se especifica
        if (wardrobeId) {
            const { data: wardrobe, error: wardrobeError } = await supabase
                .from('Wardrobe')
                .select('id')
                .eq('id', wardrobeId)
                .single();

            if (wardrobeError || !wardrobe) {
                return NextResponse.json(
                    { error: 'El wardrobe especificado no existe' },
                    { status: 400 }
                );
            }
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

        // Insertar la prenda
        const { data: clothInsert, error: clothError } = await supabase
            .from('Cloth')
            .insert({
                name: body.name,
                owner: body.category,
                colour: body.color,
                brand: body.brand,
                notes: body.notes,
                size: body.size || null,
                tags: tagsArray
            })
            .select()
            .single();

        if (clothError) {
            console.error('Error al insertar prenda:', clothError);
            throw clothError;
        }

        // Si se especifica un wardrobe, crear la relación con rollback en caso de error
        let relationData = null;
        console.log('wardrobe ID:', wardrobeId);

        if (wardrobeId && clothInsert) {
            const { data: relationInsert, error: relationError } = await supabase
                .from('WardrobeHasCloth')
                .insert([{
                    wardrobeId: wardrobeId,
                    clothId: clothInsert.id
                }])
                .select()
                .single();

            if (relationError) {
                console.error('Error al crear relación wardrobe-cloth:', relationError);

                // ROLLBACK: Eliminar la prenda que se acaba de crear
                console.log(`Ejecutando rollback para prenda ID: ${clothInsert.id}`);
                const { error: deleteError } = await supabase
                    .from('Cloth')
                    .delete()
                    .eq('id', clothInsert.id);

                if (deleteError) {
                    console.error('Error crítico: No se pudo hacer rollback de la prenda:', deleteError);
                    return NextResponse.json({
                        success: false,
                        error: 'Error crítico: La prenda se creó pero no se pudo asociar al wardrobe y falló el rollback. Contacta al administrador.',
                        clothId: clothInsert.id,
                        details: process.env.NODE_ENV === 'development' ? { relationError, deleteError } : undefined
                    }, { status: 500 });
                }

                console.log('Rollback exitoso: Prenda eliminada tras fallo en relación');
                return NextResponse.json({
                    success: false,
                    error: 'No se pudo asociar la prenda al wardrobe seleccionado. La operación fue cancelada.',
                    details: process.env.NODE_ENV === 'development' ? relationError : undefined
                }, { status: 400 });
            } else {
                relationData = relationInsert;
                console.log('Relación creada exitosamente:', relationData);
            }
        }

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
                tags: clothInsert.tags,
                wardrobe_relation: relationData ? true : false,
                wardrobe_id: wardrobeId || null
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
