export interface GuestbookRow {
  id: string
  name: string
  message: string
  created_at: string
}

export interface GuestbookInsert {
  id?: string
  name: string
  message: string
  created_at?: string
}

export interface Database {
  public: {
    Tables: {
      guestbook: {
        Row: GuestbookRow
        Insert: GuestbookInsert
        Update: Partial<GuestbookInsert>
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
