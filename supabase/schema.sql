create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null check (status in ('active', 'completed')),
  location text not null,
  household_count text not null,
  unit_plan text not null,
  expected_move_in text not null,
  sales_conditions text not null,
  premium_summary text not null,
  location_description text not null,
  cover_image_url text,
  cover_image_path text,
  contact_phone text not null,
  reservation_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  image_path text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  name text not null,
  phone text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'processing', 'done')),
  created_at timestamptz not null default now()
);

create table if not exists public.daily_visitors (
  date_key text primary key,
  visitor_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_status_idx on public.projects(status);
create index if not exists project_images_project_id_idx on public.project_images(project_id);
create index if not exists inquiries_project_id_idx on public.inquiries(project_id);
create index if not exists inquiries_created_at_idx on public.inquiries(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

drop trigger if exists set_daily_visitors_updated_at on public.daily_visitors;
create trigger set_daily_visitors_updated_at
before update on public.daily_visitors
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.inquiries enable row level security;
alter table public.daily_visitors enable row level security;

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do update set public = excluded.public;
