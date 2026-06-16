-- Akieni website — form submission storage for the admin dashboard.
-- Run against the Supabase project (SQL editor or `supabase db push`).
--
-- Access model: all reads/writes go through the SERVER using the service-role
-- key, which bypasses RLS. We enable RLS with NO policies so the public anon
-- key cannot reach this data at all.

-- ── contacts ────────────────────────────────────────────────────────────────
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text,
  subject     text,
  message     text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists contacts_created_at_idx
  on public.contacts (created_at desc);

-- ── applications ────────────────────────────────────────────────────────────
create table if not exists public.applications (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text not null,
  email        text not null,
  phone        text,
  location     text,
  profile_url  text,
  role_title   text,
  role_slug    text,
  cv_path      text,            -- object path in the private `cvs` bucket
  cover_note   text,
  source       text,
  consent      boolean not null default false,
  status       text not null default 'new',
  created_at   timestamptz not null default now()
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

-- ── RLS: lock both tables (service role bypasses this) ──────────────────────
alter table public.contacts     enable row level security;
alter table public.applications enable row level security;
-- Intentionally no policies: only the service-role key may read/write.

-- ── private storage bucket for CV uploads ───────────────────────────────────
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', false)
on conflict (id) do nothing;
