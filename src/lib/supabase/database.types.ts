export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          query: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          query?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          query?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      clinical_trials: {
        Row: {
          condition: string | null
          created_at: string
          external_id: string | null
          id: string
          metadata: Json
          nct_id: string | null
          phase: string | null
          source: string
          sponsor: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          condition?: string | null
          created_at?: string
          external_id?: string | null
          id?: string
          metadata?: Json
          nct_id?: string | null
          phase?: string | null
          source?: string
          sponsor?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          condition?: string | null
          created_at?: string
          external_id?: string | null
          id?: string
          metadata?: Json
          nct_id?: string | null
          phase?: string | null
          source?: string
          sponsor?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      drugs: {
        Row: {
          created_at: string
          external_id: string | null
          generic_name: string | null
          id: string
          indication: string | null
          manufacturer: string | null
          metadata: Json
          name: string
          source: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          external_id?: string | null
          generic_name?: string | null
          id?: string
          indication?: string | null
          manufacturer?: string | null
          metadata?: Json
          name: string
          source?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          external_id?: string | null
          generic_name?: string | null
          id?: string
          indication?: string | null
          manufacturer?: string | null
          metadata?: Json
          name?: string
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      publications: {
        Row: {
          abstract: string | null
          authors: string | null
          created_at: string
          external_id: string | null
          id: string
          journal: string | null
          metadata: Json
          published_on: string | null
          source: string
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          abstract?: string | null
          authors?: string | null
          created_at?: string
          external_id?: string | null
          id?: string
          journal?: string | null
          metadata?: Json
          published_on?: string | null
          source?: string
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          abstract?: string | null
          authors?: string | null
          created_at?: string
          external_id?: string | null
          id?: string
          journal?: string | null
          metadata?: Json
          published_on?: string | null
          source?: string
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      saved_items: {
        Row: {
          created_at: string
          id: string
          item_id: string
          item_type: string
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          item_type: string
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          item_type?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never
