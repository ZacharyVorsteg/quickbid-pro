export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Trade = 'hvac' | 'plumbing' | 'electrical' | 'roofing';
export type EstimateStatus = 'draft' | 'sent' | 'won' | 'lost';
export type SubscriptionStatus = 'trial' | 'active' | 'canceled' | 'past_due';
export type ItemType = 'material' | 'labor';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          company_name: string | null;
          company_logo_url: string | null;
          phone: string | null;
          address: string | null;
          default_markup: number;
          default_labor_rate: number;
          tax_rate: number;
          payment_terms: string;
          trade: Trade | null;
          subscription_status: SubscriptionStatus;
          stripe_customer_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          company_name?: string | null;
          company_logo_url?: string | null;
          phone?: string | null;
          address?: string | null;
          default_markup?: number;
          default_labor_rate?: number;
          tax_rate?: number;
          payment_terms?: string;
          trade?: Trade | null;
          subscription_status?: SubscriptionStatus;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string | null;
          company_logo_url?: string | null;
          phone?: string | null;
          address?: string | null;
          default_markup?: number;
          default_labor_rate?: number;
          tax_rate?: number;
          payment_terms?: string;
          trade?: Trade | null;
          subscription_status?: SubscriptionStatus;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string | null;
          phone: string | null;
          address: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      estimates: {
        Row: {
          id: string;
          user_id: string;
          client_id: string | null;
          job_address: string | null;
          status: EstimateStatus;
          subtotal: number | null;
          tax: number | null;
          total: number | null;
          notes: string | null;
          valid_until: string | null;
          created_at: string;
          sent_at: string | null;
          pdf_url: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          client_id?: string | null;
          job_address?: string | null;
          status?: EstimateStatus;
          subtotal?: number | null;
          tax?: number | null;
          total?: number | null;
          notes?: string | null;
          valid_until?: string | null;
          created_at?: string;
          sent_at?: string | null;
          pdf_url?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          client_id?: string | null;
          job_address?: string | null;
          status?: EstimateStatus;
          subtotal?: number | null;
          tax?: number | null;
          total?: number | null;
          notes?: string | null;
          valid_until?: string | null;
          created_at?: string;
          sent_at?: string | null;
          pdf_url?: string | null;
        };
      };
      estimate_items: {
        Row: {
          id: string;
          estimate_id: string;
          type: ItemType;
          description: string | null;
          quantity: number | null;
          unit: string | null;
          unit_price: number | null;
          total: number | null;
          sort_order: number | null;
        };
        Insert: {
          id?: string;
          estimate_id: string;
          type: ItemType;
          description?: string | null;
          quantity?: number | null;
          unit?: string | null;
          unit_price?: number | null;
          total?: number | null;
          sort_order?: number | null;
        };
        Update: {
          id?: string;
          estimate_id?: string;
          type?: ItemType;
          description?: string | null;
          quantity?: number | null;
          unit?: string | null;
          unit_price?: number | null;
          total?: number | null;
          sort_order?: number | null;
        };
      };
      materials: {
        Row: {
          id: string;
          user_id: string | null;
          trade: Trade | null;
          name: string | null;
          unit: string | null;
          default_price: number | null;
          is_custom: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          trade?: Trade | null;
          name?: string | null;
          unit?: string | null;
          default_price?: number | null;
          is_custom?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          trade?: Trade | null;
          name?: string | null;
          unit?: string | null;
          default_price?: number | null;
          is_custom?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

// Helper types for easier use
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Client = Database['public']['Tables']['clients']['Row'];
export type Estimate = Database['public']['Tables']['estimates']['Row'];
export type EstimateItem = Database['public']['Tables']['estimate_items']['Row'];
export type Material = Database['public']['Tables']['materials']['Row'];

export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ClientInsert = Database['public']['Tables']['clients']['Insert'];
export type EstimateInsert = Database['public']['Tables']['estimates']['Insert'];
export type EstimateItemInsert = Database['public']['Tables']['estimate_items']['Insert'];
export type MaterialInsert = Database['public']['Tables']['materials']['Insert'];

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type ClientUpdate = Database['public']['Tables']['clients']['Update'];
export type EstimateUpdate = Database['public']['Tables']['estimates']['Update'];
export type EstimateItemUpdate = Database['public']['Tables']['estimate_items']['Update'];
export type MaterialUpdate = Database['public']['Tables']['materials']['Update'];

// Extended types with relations
export interface EstimateWithItems extends Estimate {
  estimate_items: EstimateItem[];
  clients?: Client | null;
}

export interface EstimateWithClient extends Estimate {
  clients: Client | null;
}
