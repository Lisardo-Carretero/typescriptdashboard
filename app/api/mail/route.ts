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
    notify: boolean;
    period_of_time: string;
}

export async function POST(request: NextRequest) {

    const { device_name, sensor_name, condition, threshold, color, period_of_time } = await request.json();

    if (!alert) {
        return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    if (!period_of_time) {
        return NextResponse.json({ error: "Invalid period_of_time" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
        from: "IoT Dashboard " + "<" + sender + ">",
        to: [receiver],
        subject: "Alert detected !",
        react: await EmailTemplate({
            device_name: device_name,
            sensor_name: sensor_name,
            condition: condition,
            threshold: threshold,
            color: color,
            period_of_time: timePeriodMap[period_of_time],
        }),
    });

    if (error)
        return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ status: 200 });

}