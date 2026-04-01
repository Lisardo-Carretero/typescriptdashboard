import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_CASA_URL;
const databasePassword = process.env.DATABASE_CASA_PASSWORD ?? process.env.PGPASSWORD ?? '';

// Soporta conexión por URL o por variables separadas para entornos locales.
const pool = (() => {
    if (databaseUrl) {
        const parsed = new URL(databaseUrl);
        const password = decodeURIComponent(parsed.password || databasePassword);

        if (!password) {
            throw new Error('Falta configurar DATABASE_CASA_PASSWORD para conectar a PostgreSQL local');
        }

        return new Pool({
            host: parsed.hostname,
            port: Number(parsed.port || 5432),
            database: parsed.pathname.replace(/^\//, ''),
            user: decodeURIComponent(parsed.username || process.env.DATABASE_CASA_USER || ''),
            // Evita error de pg/SCRAM cuando la contraseña no existe en la URL.
            password,
        });
    }

    return new Pool({
        host: process.env.DATABASE_CASA_HOST ?? 'localhost',
        port: Number(process.env.DATABASE_CASA_PORT ?? 5432),
        database: process.env.DATABASE_CASA_NAME,
        user: process.env.DATABASE_CASA_USER,
        password: databasePassword,
    });
})();

export default pool;
