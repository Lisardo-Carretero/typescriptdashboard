import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from '../../../components/emailTemplate';
import { resend } from '../../../lib/resend';

const sender = process.env.ALERT_SENDER_EMAIL || 'default_sender@example.com';
const receiver = process.env.TEST_EMAIL || '';
const timePeriodMap: { [key: string]: string } = {
    "1h": "hour",
    "1w": "week",
    "1m": "month"
};

interface Alert extends NextRequest {
    id?: number;
    device_name: string;
    sensor_name: string;
    condition: "<" | ">" | "<=" | ">=" | "=";
    threshold: number;
    color: string;
    time_period: string;
}

export async function POST(request: NextRequest, res: NextResponse) {

    const { alert } = await request.json() as { alert: Alert };

    if (!alert) {
        return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    alert.time_period = timePeriodMap[alert.time_period];

    if (!alert.time_period) {
        return NextResponse.json({ error: "Invalid time_period" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
        from: "IoT Dashboard " + "<" + sender + ">",
        to: [receiver],
        subject: "Alert detected !",
        react: await EmailTemplate({ name: 'Bu' }),
        //react: await EmailTemplate({
        //    body: `Alert detected for device ${alert.device_name} and sensor ${alert.sensor_name}`,
        //    html: `<p style="color: ${alert.color}">Threshold : ${alert.condition} ${alert.threshold} in the last reached.`
        //}),
    });

    if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ status: 200 });

}