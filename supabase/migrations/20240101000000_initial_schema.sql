-- QuickBid Pro Initial Database Schema
-- Run this migration to set up all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  company_name TEXT,
  company_logo_url TEXT,
  phone TEXT,
  address TEXT,
  default_markup DECIMAL DEFAULT 20,
  default_labor_rate DECIMAL DEFAULT 75,
  tax_rate DECIMAL DEFAULT 8.25,
  payment_terms TEXT DEFAULT 'Net 30',
  trade TEXT CHECK (trade IN ('hvac', 'plumbing', 'electrical', 'roofing')),
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'canceled', 'past_due')),
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create estimates table
CREATE TABLE IF NOT EXISTS estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  job_address TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'won', 'lost')),
  subtotal DECIMAL,
  tax DECIMAL,
  total DECIMAL,
  notes TEXT,
  valid_until DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE,
  pdf_url TEXT
);

-- Create estimate_items table
CREATE TABLE IF NOT EXISTS estimate_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  estimate_id UUID REFERENCES estimates(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('material', 'labor')),
  description TEXT,
  quantity DECIMAL,
  unit TEXT,
  unit_price DECIMAL,
  total DECIMAL,
  sort_order INTEGER
);

-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  trade TEXT CHECK (trade IN ('hvac', 'plumbing', 'electrical', 'roofing')),
  name TEXT,
  unit TEXT,
  default_price DECIMAL,
  is_custom BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_estimates_user_id ON estimates(user_id);
CREATE INDEX IF NOT EXISTS idx_estimates_client_id ON estimates(client_id);
CREATE INDEX IF NOT EXISTS idx_estimates_status ON estimates(status);
CREATE INDEX IF NOT EXISTS idx_estimate_items_estimate_id ON estimate_items(estimate_id);
CREATE INDEX IF NOT EXISTS idx_materials_user_id ON materials(user_id);
CREATE INDEX IF NOT EXISTS idx_materials_trade ON materials(trade);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimate_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for clients
CREATE POLICY "Users can view own clients" ON clients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own clients" ON clients
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clients" ON clients
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own clients" ON clients
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for estimates
CREATE POLICY "Users can view own estimates" ON estimates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own estimates" ON estimates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own estimates" ON estimates
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own estimates" ON estimates
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for estimate_items
CREATE POLICY "Users can view own estimate items" ON estimate_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM estimates
      WHERE estimates.id = estimate_items.estimate_id
      AND estimates.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own estimate items" ON estimate_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM estimates
      WHERE estimates.id = estimate_items.estimate_id
      AND estimates.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own estimate items" ON estimate_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM estimates
      WHERE estimates.id = estimate_items.estimate_id
      AND estimates.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own estimate items" ON estimate_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM estimates
      WHERE estimates.id = estimate_items.estimate_id
      AND estimates.user_id = auth.uid()
    )
  );

-- RLS Policies for materials
CREATE POLICY "Users can view own materials" ON materials
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own materials" ON materials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own materials" ON materials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own materials" ON materials
  FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, company_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'company_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
