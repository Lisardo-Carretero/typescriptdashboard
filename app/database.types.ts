export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          color: string
          condition: string
          device_name: string
          id: number
          notify: boolean
          period_of_time: string
          sensor_name: string
          threshold: number
        }
        Insert: {
          color: string
          condition: string
          device_name: string
          id?: number
          notify?: boolean
          period_of_time: string
          sensor_name: string
          threshold: number
        }
        Update: {
          color?: string
          condition?: string
          device_name?: string
          id?: number
          notify?: boolean
          period_of_time?: string
          sensor_name?: string
          threshold?: number
        }
        Relationships: []
      }
      car: {
        Row: {
          created_at: string
          id: string
          motor1: number | null
          motor2: number | null
          motor3: number | null
          motor4: number | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          motor1?: number | null
          motor2?: number | null
          motor3?: number | null
          motor4?: number | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          motor1?: number | null
          motor2?: number | null
          motor3?: number | null
          motor4?: number | null
          name?: string | null
        }
        Relationships: []
      }
      timeseries: {
        Row: {
          device_name: string
          event_time: string
          pin: number | null
          sensor_name: string
          value: number
        }
        Insert: {
          device_name?: string
          event_time?: string
          pin?: number | null
          sensor_name?: string
          value: number
        }
        Update: {
          device_name?: string
          event_time?: string
          pin?: number | null
          sensor_name?: string
          value?: number
        }
        Relationships: []
      }
      user: {
        Row: {
          created_at: string
          email: string
          id: string
          password: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_all_cars: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          motor1: number
          motor2: number
          motor3: number
          motor4: number
          created_at: string
        }[]
      }
      get_average_value: {
        Args: {
          p_device_name: string
          p_sensor_name: string
          p_end_time: string
          p_start_time?: string
        }
        Returns: number
      }
      get_sensor_values: {
        Args: {
          p_device_name: string
          p_sensor_name: string
          p_end_time: string
          p_start_time?: string
        }
        Returns: {
          value: number
          event_time: string
        }[]
      }
      get_timeseries_data:
        | {
            Args: {
              p_device_name: string
              p_sensor_name: string
              p_start_time: string
              p_end_time: string
            }
            Returns: {
              value: number
              event_time: string
            }[]
          }
        | {
            Args: {
              p_device_name: string
              p_sensor_name: string
              p_start_time: string
              p_end_time: string
            }
            Returns: {
              value: number
              event_time: string
            }[]
          }
      get_unique_device_name: {
        Args: Record<PropertyKey, never>
        Returns: {
          device_name: string
        }[]
      }
      sensors_per_device: {
        Args: {
          p_device_name: string
        }
        Returns: {
          device_name: string
          sensor_names: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
