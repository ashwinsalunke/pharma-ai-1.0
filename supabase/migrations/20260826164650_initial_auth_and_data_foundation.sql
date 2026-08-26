-- Foundation schema for ZNTX Pharma AI.
-- Applied to project pharma-ai-1.0 as migration 20260826164650.

create schema if not exists private;

revoke all on schema private from public;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.drugs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  generic_name text,
  manufacturer text,
  indication text,
  source text not null default 'demo',
  external_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  abstract text,
  authors text,
  journal text,
  published_on date,
  url text,
  source text not null default 'demo',
  external_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clinical_trials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  nct_id text,
  status text,
  phase text,
  condition text,
  sponsor text,
  source text not null default 'demo',
  external_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  item_type text not null check (item_type in ('drug', 'publication', 'clinical_trial')),
  item_id uuid not null,
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, item_type, item_id)
);

create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  query text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index drugs_source_external_id_idx
  on public.drugs (source, external_id)
  where external_id is not null;

create unique index publications_source_external_id_idx
  on public.publications (source, external_id)
  where external_id is not null;

create unique index clinical_trials_source_external_id_idx
  on public.clinical_trials (source, external_id)
  where external_id is not null;

create unique index clinical_trials_nct_id_idx
  on public.clinical_trials (nct_id)
  where nct_id is not null;

create index saved_items_user_id_idx on public.saved_items (user_id);
create index alerts_user_id_idx on public.alerts (user_id);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function private.set_updated_at();

create trigger drugs_set_updated_at
  before update on public.drugs
  for each row execute function private.set_updated_at();

create trigger publications_set_updated_at
  before update on public.publications
  for each row execute function private.set_updated_at();

create trigger clinical_trials_set_updated_at
  before update on public.clinical_trials
  for each row execute function private.set_updated_at();

create trigger alerts_set_updated_at
  before update on public.alerts
  for each row execute function private.set_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

alter table public.profiles enable row level security;
alter table public.drugs enable row level security;
alter table public.publications enable row level security;
alter table public.clinical_trials enable row level security;
alter table public.saved_items enable row level security;
alter table public.alerts enable row level security;

create policy profiles_select_own
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create policy profiles_update_own
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy drugs_select_public
  on public.drugs for select to anon, authenticated
  using (true);

create policy publications_select_public
  on public.publications for select to anon, authenticated
  using (true);

create policy clinical_trials_select_public
  on public.clinical_trials for select to anon, authenticated
  using (true);

create policy saved_items_select_own
  on public.saved_items for select to authenticated
  using (user_id = (select auth.uid()));

create policy saved_items_insert_own
  on public.saved_items for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy saved_items_update_own
  on public.saved_items for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy saved_items_delete_own
  on public.saved_items for delete to authenticated
  using (user_id = (select auth.uid()));

create policy alerts_select_own
  on public.alerts for select to authenticated
  using (user_id = (select auth.uid()));

create policy alerts_insert_own
  on public.alerts for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy alerts_update_own
  on public.alerts for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy alerts_delete_own
  on public.alerts for delete to authenticated
  using (user_id = (select auth.uid()));
