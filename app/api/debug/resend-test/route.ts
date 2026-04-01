import { NextResponse } from 'next/server';
import { resend } from '../../../../lib/resend';

type ReqBody = {
    to?: string;
};

export async function POST(request: Request) {
    try {
        const body: ReqBody = await request.json().catch(() => ({} as ReqBody));
        const to = body.to || process.env.RESEND_TEST_TO;

        if (!to) {
            return NextResponse.json({ error: 'No destinatario proporcionado. Pasa { "to": "you@domain.com" } en el body o configura RESEND_TEST_TO env.' }, { status: 400 });
        }

        const from = 'team@lisardocarretero.com';

        const resp = await resend.emails.send({
            from,
            to,
            subject: 'Prueba de envío - Resend',
            html: `<html><body><h1>Prueba de Resend</h1><p>Si ves este correo, la integración con Resend está funcionando.</p></body></html>`,
        });

        return NextResponse.json({ ok: true, resp });
    } catch (err: any) {
        console.error('Error sending test email via Resend:', err);
        return NextResponse.json({ error: err?.message || 'unknown' }, { status: 500 });
    }
}
