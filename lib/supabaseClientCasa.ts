// Cansé de estar creando clientes mejor hacerlo presistente y reuitlizable
import { createClient } from "@supabase/supabase-js";
import { Database } from "../app/databaseCasa.types";

const SUPABASE_URL = process.env.NEXT_PRIVATE_SUPABASE_URL_CASA!;
const SUPABASE_ANON_KEY = process.env.NEXT_PRIVATE_SUPABASE_ANON_KEY_CASA!;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true, // Mantiene la sesión entre recargas
        autoRefreshToken: true,
        detectSessionInUrl: true
    },
    realtime: {
        params: {
            eventsPerSecond: 10,
            reconnectRetries: 10,
            reconnectInterval: 5000,
        },
    },
});

export default supabase;
