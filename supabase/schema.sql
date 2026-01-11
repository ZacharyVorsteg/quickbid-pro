-- QuickBid Pro Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Custom types
create type trade_type as enum ('hvac', 'plumbing', 'electrical', 'roofing');
create type estimate_status as enum ('draft', 'sent', 'won', 'lost');
create type subscription_status as enum ('trial', 'active', 'canceled', 'past_due');
create type item_type as enum ('material', 'labor');

-- Profiles table (company info)
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  company_name text,
  company_logo_url text,
  phone text,
  address text,
  default_markup numeric default 20,
  default_labor_rate numeric default 75,
  tax_rate numeric default 8.25,
  payment_terms text default 'Net 30',
  trade trade_type,
  subscription_status subscription_status default 'trial',
  stripe_customer_id text,
  created_at timestamp with time zone default now()
);

-- Clients table
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  email text,
  phone text,
  address text,
  notes text,
  created_at timestamp with time zone default now()
);

-- Estimates table
create table if not exists estimates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  client_id uuid references clients(id) on delete set null,
  job_address text,
  status estimate_status default 'draft',
  subtotal numeric,
  tax numeric,
  total numeric,
  notes text,
  valid_until date,
  created_at timestamp with time zone default now(),
  sent_at timestamp with time zone,
  pdf_url text
);

-- Estimate items table
create table if not exists estimate_items (
  id uuid primary key default gen_random_uuid(),
  estimate_id uuid references estimates(id) on delete cascade not null,
  type item_type not null,
  description text,
  quantity numeric,
  unit text,
  unit_price numeric,
  total numeric,
  sort_order integer
);

-- Materials library table
create table if not exists materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  trade trade_type,
  name text,
  unit text,
  default_price numeric,
  is_custom boolean default false,
  created_at timestamp with time zone default now()
);

-- Create indexes
create index if not exists idx_clients_user_id on clients(user_id);
create index if not exists idx_estimates_user_id on estimates(user_id);
create index if not exists idx_estimates_client_id on estimates(client_id);
create index if not exists idx_estimate_items_estimate_id on estimate_items(estimate_id);
create index if not exists idx_materials_user_id on materials(user_id);
create index if not exists idx_materials_trade on materials(trade);

-- Enable RLS
alter table profiles enable row level security;
alter table clients enable row level security;
alter table estimates enable row level security;
alter table estimate_items enable row level security;
alter table materials enable row level security;

-- RLS Policies for profiles
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- RLS Policies for clients
create policy "Users can view own clients" on clients
  for select using (auth.uid() = user_id);

create policy "Users can manage own clients" on clients
  for all using (auth.uid() = user_id);

-- RLS Policies for estimates
create policy "Users can view own estimates" on estimates
  for select using (auth.uid() = user_id);

create policy "Users can manage own estimates" on estimates
  for all using (auth.uid() = user_id);

-- RLS Policies for estimate_items
create policy "Users can view own estimate items" on estimate_items
  for select using (
    estimate_id in (select id from estimates where user_id = auth.uid())
  );

create policy "Users can manage own estimate items" on estimate_items
  for all using (
    estimate_id in (select id from estimates where user_id = auth.uid())
  );

-- RLS Policies for materials
create policy "Users can view materials" on materials
  for select using (user_id = auth.uid() or user_id is null);

create policy "Users can manage own materials" on materials
  for all using (auth.uid() = user_id);

-- Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
