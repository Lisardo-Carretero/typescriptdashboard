/**
 * Guía para habilitar Supabase Realtime
 * 
 * Para que funcione la sincronización en tiempo real, necesitas:
 * 
 * 1. Habilitar Realtime en Supabase Dashboard:
 *    - Ve a tu proyecto en https://supabase.com/dashboard
 *    - Navega a Database > Replication
 *    - Activa "Enable Realtime" para las tablas: Wardrobe, Cloth, tag
 * 
 * 2. Configurar Row Level Security (RLS) si es necesario:
 *    - Ve a Database > Authentication > Policies
 *    - Asegúrate de que las políticas permitan SELECT en las tablas
 * 
 * 3. Verificar permisos en las tablas:
 *    - Las tablas deben tener permisos de lectura para los usuarios
 * 
 * 4. Comandos SQL para habilitar (ejecutar en SQL Editor):
 * 
 * -- Habilitar Realtime en las tablas
 * ALTER publication supabase_realtime ADD TABLE public."Wardrobe";
 * ALTER publication supabase_realtime ADD TABLE public."Cloth"; 
 * ALTER publication supabase_realtime ADD TABLE public."tag";
 * 
 * -- Verificar que está habilitado
 * SELECT schemaname, tablename 
 * FROM pg_publication_tables 
 * WHERE pubname = 'supabase_realtime';
 * 
 * 5. Reiniciar la conexión de Supabase en tu aplicación después de habilitar
 */

export const REALTIME_SETUP_GUIDE = {
    tables: ['Wardrobe', 'Cloth', 'tag'],
    commands: [
        'ALTER publication supabase_realtime ADD TABLE public."Wardrobe";',
        'ALTER publication supabase_realtime ADD TABLE public."Cloth";',
        'ALTER publication supabase_realtime ADD TABLE public."tag";'
    ],
    verification: `
        SELECT schemaname, tablename 
        FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime';
    `
};