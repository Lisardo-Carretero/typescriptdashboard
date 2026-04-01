/**
 * API Route: Registrar nueva casa para el usuario autenticado
 * POST /api/casa/house/register
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
    // La tabla House no existe en la BD local
    return NextResponse.json(
        { success: false, error: 'La tabla House no existe en la base de datos local' },
        { status: 501 }
    );
}

// Método OPTIONS para CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}