import { NextResponse, NextRequest } from "next/server";
import supabase from "../../../../../lib/supabaseClient";
import { subHours, subDays } from "date-fns";
import EmailTemplate from "@/components/emailTemplate";
import { resend } from "@/lib/resend";

const sender = process.env.ALERT_SENDER_EMAIL || 'default_sender@example.com';
const receiver = process.env.TEST_EMAIL || '';
const timePeriodMap: { [key: string]: string } = {
    "1h": "hour",
    "1w": "week",
    "1m": "month"
};

interface Alert {
    id?: number;
    device_name: string;
    sensor_name: string;
    condition: "<" | ">" | "<=" | ">=" | "=";
    threshold: number;
    color: string;
    notify: boolean;
    period_of_time: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ alertId: number }> }) {
    const { alertId } = await params;

    if (!alertId) {
        return NextResponse.json({ error: "alertId is required" }, { status: 400 });
    }
    // Obtenemos todos los datos de la alerta
    const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('id', alertId);
    if (error) {
        return NextResponse.json({ error: "Error fetching conditions" }, { status: 500 });
    }
    const alert: Alert = { ...data[0], condition: data[0].condition as "<" | ">" | "<=" | ">=" | "=" };

    let currentValue = await fetchAverageValue(alert.device_name, alert.sensor_name, alert.period_of_time);
    if (!currentValue || isNaN(currentValue)) {
        currentValue = 0;
    }
    let isMet = false;
    switch (alert.condition) {
        case ">":
            isMet = currentValue > alert.threshold;
            break;
        case "<":
            isMet = currentValue < alert.threshold;
            break;
        case ">=":
            isMet = currentValue >= alert.threshold;
            break;
        case "<=":
            isMet = currentValue <= alert.threshold;
            break;
        case "=":
            isMet = currentValue === alert.threshold;
            break;
        default:
            isMet = false;
    }

    if (isMet && !alert.notify) {
        const mailResponse = await sendEmail(alert);

        if (mailResponse.error) {
            return NextResponse.json({ error: "Error sending mail" }, { status: mailResponse.status });
        }

        const { error: updateError } = await supabase
            .from('alerts')
            .update({ notify: true })
            .eq('id', alertId)
            .select();
        if (updateError) {
            return NextResponse.json({ error: "Error updating the alert" }, { status: 500 });
        }
    }

    return NextResponse.json({ isMet, currentValue }, { status: 200 });
}

async function fetchAverageValue(device: string, sensor: string, timeFilter: string): Promise<number> {
    const p_end_time = timeFilter;

    let startTimeValue = new Date();
    let endTimeValue = p_end_time;

    switch (p_end_time) {
        case "1h":
            endTimeValue = subHours(startTimeValue, 1).toISOString();
            break;
        case "1w":
            endTimeValue = subDays(startTimeValue, 7).toISOString();
            break;
        case "1m":
            endTimeValue = subDays(startTimeValue, 30).toISOString();
            break;
    }

    const { data: avgData, error: avgError } = await supabase
        .rpc('get_average_value', {
            p_device_name: device,
            p_sensor_name: sensor,
            p_start_time: startTimeValue.toISOString(),
            p_end_time: endTimeValue
        });

    if (avgError) {
        throw new Error("Error fetching average value");
    }

    return avgData;
}

async function sendEmail(alert: Alert) {
    const { device_name, sensor_name, condition, threshold, color, period_of_time } = alert;

    try {
        const { data, error } = await resend.emails.send({
            from: `IoT Dashboard <${sender}>`,
            to: [receiver],
            subject: "Alert detected!",
            react: await EmailTemplate({
                device_name,
                sensor_name,
                condition,
                threshold,
                color,
                period_of_time: timePeriodMap[period_of_time],
            }),
        });

        if (error) {
            return { error, status: 500 };
        }

        return { status: 200 };
    } catch (error) {
        return { error: error, status: 500 };
    }
}