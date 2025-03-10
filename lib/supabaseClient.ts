// Cansé de estar creando clientes mejor hacerlo presistente y reuitlizable
import { createClient } from "@supabase/supabase-js";
import { Database } from "../app/database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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

// Helper function to subscribe to timeseries table changes
export const subscribeToTimeseries = (eventType: "INSERT" | "UPDATE" | "DELETE" | "*", callback: (payload: any) => void) => {
  const channel = supabase
    .channel('timeseries_changes')
    .on('postgres_changes',
      {
        event: eventType,
        schema: 'public',
        table: 'timeseries'
      },
      (payload) => callback(payload)
    )
    .subscribe((status) => {
      console.log(`Supabase realtime status: ${status}`);
    });

  return () => {
    supabase.removeChannel(channel);
  };
};

// Helper function to subscribe to alerts table changes
export const subscribeToAlerts = (eventType: "INSERT" | "UPDATE" | "DELETE" | "*", callback: (payload: any) => void) => {
  const channel = supabase
    .channel('alerts_changes')
    .on('postgres_changes',
      {
        event: eventType,
        schema: 'public',
        table: 'alerts'
      },
      (payload) => callback(payload)
    )
    .subscribe((status) => {
      console.log(`Alerts subscription status: ${status}`);
    });

  return () => {
    supabase.removeChannel(channel);
  };
};

export default supabase;
