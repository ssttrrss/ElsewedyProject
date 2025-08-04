import { createClient } from "@supabase/supabase-js"

export type Database = {
  public: {
    Tables: {
      competitions: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          type: "local" | "international"
          deadline: string
          author: string
          role: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          type: "local" | "international"
          deadline: string
          author: string
          role: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          type?: "local" | "international"
          deadline?: string
          author?: string
          role?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      grants: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          amount: number
          deadline: string
          allow_teams: boolean
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          amount: number
          deadline: string
          allow_teams?: boolean
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          amount?: number
          deadline?: string
          allow_teams?: boolean
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
