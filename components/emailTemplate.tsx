import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
} from '@react-email/components';

interface AlertEmailProps {
    device_name: string;
    sensor_name: string;
    condition: string;
    threshold: number;
    color: string;
    period_of_time: string;
}

export const EmailTemplate: React.FC<Readonly<AlertEmailProps>> = ({
    device_name,
    sensor_name,
    condition,
    threshold,
    color,
    period_of_time,
}) => (
    <Html>
        <Head />
        <Preview>Alert Notification</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Alert Notification</Heading>
                <Text style={text}>
                    An alert has been triggered for the following device and sensor:
                </Text>
                <Text style={text}>
                    <strong>Device:</strong> {device_name}
                </Text>
                <Text style={text}>
                    <strong>Sensor:</strong> {sensor_name}
                </Text>
                <Text style={text}>
                    <strong>Condition:</strong> {condition} {threshold}
                </Text>
                <Text style={{ ...text, color }}>
                    This alert has been triggered based on the specified condition.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default EmailTemplate;

const main = {
    backgroundColor: '#2E2A3B',
    margin: '0 auto',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
    margin: 'auto',
    padding: '48px 20px 32px',
    backgroundColor: '#49416D',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const h1 = {
    color: '#D9BBA0',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '32px',
    margin: '0 0 20px',
    textAlign: 'center' as const,
};

const text = {
    color: '#ffffff',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 0 16px',
    textAlign: 'center' as const,
};