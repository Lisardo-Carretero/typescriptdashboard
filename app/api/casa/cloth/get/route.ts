import { NextRequest, NextResponse } from "next/server";
import pool from "../../../../../lib/dbCasa";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const wardrobeId = searchParams.get('wardrobe_id');
        const owner = searchParams.get('owner');
        const limit = searchParams.get('limit');

        const conditions: string[] = [];
        const values: any[] = [];
        let idx = 1;

        if (wardrobeId) {
            conditions.push(`whc."wardrobeId" = $${idx++}`);
            values.push(parseInt(wardrobeId));
        }
        if (owner) {
            conditions.push(`c.owner = $${idx++}`);
            values.push(owner);
        }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const limitClause = limit ? `LIMIT $${idx++}` : '';
        if (limit) values.push(parseInt(limit));

        const query = `
            SELECT
                c.id, c.name, c.owner, c.colour, c.brand, c.size,
                c.tags, c.notes, c.created_at,
                whc."wardrobeId" as wardrobe_id,
                w.id AS w_id, w.name AS w_name, w.location AS w_location
            FROM public."Cloth" c
            LEFT JOIN public."WardrobeHasCloth" whc ON whc."clothId" = c.id
            LEFT JOIN public."Wardrobe" w ON w.id = whc."wardrobeId"
            ${where}
            ORDER BY c.created_at DESC
            ${limitClause}
        `;

        const { rows } = await pool.query(query, values);

        const cloths = rows.map(r => ({
            id: r.id,
            name: r.name,
            owner: r.owner,
            colour: r.colour,
            brand: r.brand,
            size: r.size,
            tags: r.tags,
            notes: r.notes,
            created_at: r.created_at,
            wardrobe_id: r.wardrobe_id,
            wardrobe: r.w_id ? { id: r.w_id, name: r.w_name, location: r.w_location } : null
        }));

        return NextResponse.json({
            success: true,
            count: cloths.length,
            data: cloths,
            filters: { wardrobe_id: wardrobeId, owner, limit }
        });

    } catch (error) {
        console.error('Error fetching cloths:', error);
        return NextResponse.json({ error: 'Error al obtener las prendas' }, { status: 500 });
    }
}
