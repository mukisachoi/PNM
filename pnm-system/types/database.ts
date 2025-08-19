export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: number
          name: string
          email: string
          phone: string | null
          address: string | null
          profile_img: string | null
          role: string
          created_at: string
          is_public: boolean
          kakao_id: string | null
          facebook_id: string | null
          naver_id: string | null
          google_id: string | null
        }
        Insert: {
          user_id?: number
          name: string
          email: string
          phone?: string | null
          address?: string | null
          profile_img?: string | null
          role?: string
          created_at?: string
          is_public?: boolean
          kakao_id?: string | null
          facebook_id?: string | null
          naver_id?: string | null
          google_id?: string | null
        }
        Update: {
          user_id?: number
          name?: string
          email?: string
          phone?: string | null
          address?: string | null
          profile_img?: string | null
          role?: string
          created_at?: string
          is_public?: boolean
          kakao_id?: string | null
          facebook_id?: string | null
          naver_id?: string | null
          google_id?: string | null
        }
      }
      events: {
        Row: {
          event_id: number
          title: string
          poster_img: string | null
          place: string | null
          start_date: string | null
          end_date: string | null
          theme: string | null
          summary: string | null
          created_by: number | null
          is_public: boolean
          created_at: string
        }
        Insert: {
          event_id?: number
          title: string
          poster_img?: string | null
          place?: string | null
          start_date?: string | null
          end_date?: string | null
          theme?: string | null
          summary?: string | null
          created_by?: number | null
          is_public?: boolean
          created_at?: string
        }
        Update: {
          event_id?: number
          title?: string
          poster_img?: string | null
          place?: string | null
          start_date?: string | null
          end_date?: string | null
          theme?: string | null
          summary?: string | null
          created_by?: number | null
          is_public?: boolean
          created_at?: string
        }
      }
      contacts: {
        Row: {
          contact_id: number
          owner_id: number
          name: string
          profile_img: string | null
          phone: string | null
          email: string | null
          address: string | null
          kakao_id: string | null
          facebook_id: string | null
          naver_id: string | null
          google_id: string | null
          first_met_at: string | null
          first_met_event: number | null
          relationship: string | null
          memo: string | null // 암호화된 데이터
          is_private: boolean
          created_at: string
        }
        Insert: {
          contact_id?: number
          owner_id: number
          name: string
          profile_img?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          kakao_id?: string | null
          facebook_id?: string | null
          naver_id?: string | null
          google_id?: string | null
          first_met_at?: string | null
          first_met_event?: number | null
          relationship?: string | null
          memo?: string | null
          is_private?: boolean
          created_at?: string
        }
        Update: {
          contact_id?: number
          owner_id?: number
          name?: string
          profile_img?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          kakao_id?: string | null
          facebook_id?: string | null
          naver_id?: string | null
          google_id?: string | null
          first_met_at?: string | null
          first_met_event?: number | null
          relationship?: string | null
          memo?: string | null
          is_private?: boolean
          created_at?: string
        }
      }
      event_attendees: {
        Row: {
          attendee_id: number
          event_id: number
          user_id: number | null
          contact_id: number | null
          attended_at: string | null
          memo: string | null // 암호화된 데이터
          is_private: boolean
          created_at: string
        }
        Insert: {
          attendee_id?: number
          event_id: number
          user_id?: number | null
          contact_id?: number | null
          attended_at?: string | null
          memo?: string | null
          is_private?: boolean
          created_at?: string
        }
        Update: {
          attendee_id?: number
          event_id?: number
          user_id?: number | null
          contact_id?: number | null
          attended_at?: string | null
          memo?: string | null
          is_private?: boolean
          created_at?: string
        }
      }
      relationships: {
        Row: {
          rel_id: number
          source_id: number
          target_id: number
          rel_type: string | null
          event_id: number | null
          strength: number | null
          is_private: boolean
          updated_at: string
        }
        Insert: {
          rel_id?: number
          source_id: number
          target_id: number
          rel_type?: string | null
          event_id?: number | null
          strength?: number | null
          is_private?: boolean
          updated_at?: string
        }
        Update: {
          rel_id?: number
          source_id?: number
          target_id?: number
          rel_type?: string | null
          event_id?: number | null
          strength?: number | null
          is_private?: boolean
          updated_at?: string
        }
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
  }
}

// 타입 별칭
export type User = Database['public']['Tables']['users']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type Contact = Database['public']['Tables']['contacts']['Row']
export type EventAttendee = Database['public']['Tables']['event_attendees']['Row']
export type Relationship = Database['public']['Tables']['relationships']['Row']

export type UserInsert = Database['public']['Tables']['users']['Insert']
export type EventInsert = Database['public']['Tables']['events']['Insert']
export type ContactInsert = Database['public']['Tables']['contacts']['Insert']
export type EventAttendeeInsert = Database['public']['Tables']['event_attendees']['Insert']
export type RelationshipInsert = Database['public']['Tables']['relationships']['Insert']

export type UserUpdate = Database['public']['Tables']['users']['Update']
export type EventUpdate = Database['public']['Tables']['events']['Update']
export type ContactUpdate = Database['public']['Tables']['contacts']['Update']
export type EventAttendeeUpdate = Database['public']['Tables']['event_attendees']['Update']
export type RelationshipUpdate = Database['public']['Tables']['relationships']['Update']