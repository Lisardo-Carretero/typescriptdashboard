/**
 * API Route: Obtener casas del usuario autenticado
 * GET /api/casa/house/get
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
    // La tabla House no existe en la BD local — se devuelve vacío
    return NextResponse.json({ success: true, data: [], count: 0 }, { status: 200 });
}

// Método OPTIONS para CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}