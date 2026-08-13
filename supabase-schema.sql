-- Run this in Supabase SQL editor

-- NextAuth required tables
create table users (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text unique,
  "emailVerified" timestamptz,
  image text
);

create table accounts (
  id uuid default gen_random_uuid() primary key,
  "userId" uuid references users(id) on delete cascade,
  type text,
  provider text,
  "providerAccountId" text,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  unique(provider, "providerAccountId")
);

create table sessions (
  id uuid default gen_random_uuid() primary key,
  "sessionToken" text unique,
  "userId" uuid references users(id) on delete cascade,
  expires timestamptz
);

create table verification_tokens (
  identifier text,
  token text,
  expires timestamptz,
  primary key(identifier, token)
);

-- Points system
create table user_points (
  user_id uuid primary key references users(id) on delete cascade,
  total integer default 0
);

create table point_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  action text not null,
  points integer not null,
  created_at timestamptz default now()
);

-- Function to increment points safely
create or replace function increment_points(uid uuid, delta integer)
returns void as $$
begin
  insert into user_points (user_id, total)
  values (uid, delta)
  on conflict (user_id)
  do update set total = user_points.total + delta;
end;
$$ language plpgsql;

-- Enable RLS
alter table user_points enable row level security;
alter table point_history enable row level security;

-- Policies: users can only read their own data
create policy "Users read own points" on user_points for select using (auth.uid()::text = user_id::text);
create policy "Users read own history" on point_history for select using (auth.uid()::text = user_id::text);
