import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let headers = { 'accept-language': 'en-US,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en-US', 'nl-NL', 'nl']
let defaultLocale = 'en-US'

match(languages, locales, defaultLocale) // -> 'en-US'

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const path = process.env.CORS_URL;

    // Agregar encabezados CORS
    response.headers.set("Access-Control-Allow-Origin", path + "/*"); // Permitir cualquier origen
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return response;
}

export const config = {
    matcher: "/api/:path*", // Aplicar solo a rutas de la API
};