-- Referral program: track referrers, their referral codes, and the commission/discount
-- owed for each successful referral. Builds on the `referral_code` text column already
-- added to `public.leads` (see 20260819_add_referral_code_to_leads.sql).
--
-- Design notes:
--  - `referrers` holds one row per person who can refer new families (parents, staff,
--    partners, etc). `referral_code` is what parents type into the registration form.
--  - `referral_settings` is a single-row config table so the admin can change the
--    default commission/discount amount later without a code deploy.
--  - Leads stay linked to referrers by `referral_code` (text match) rather than a hard
--    foreign key, so a lead submitted with a typo'd/unknown code still saves — matching
--    is done in the admin UI/reporting layer, not enforced at the DB level.

create table if not exists public.referrers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  referral_code text not null unique,
  commission_amount numeric(12,0), -- VND per successful referral; null = use referral_settings default
  notes text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

comment on table public.referrers is
  'People who can refer new families to Huy Võ Education via a referral code entered at signup.';
comment on column public.referrers.commission_amount is
  'VND owed to this referrer per successful (enrolled) referral. Falls back to referral_settings.default_commission_amount when null.';

create table if not exists public.referral_settings (
  id boolean primary key default true, -- single-row table
  default_commission_amount numeric(12,0) not null default 500000, -- paid to the referrer
  default_discount_amount numeric(12,0) not null default 100000,   -- given to the referred family
  updated_at timestamptz not null default now(),
  constraint referral_settings_singleton check (id)
);

comment on table public.referral_settings is
  'Single-row config for the referral program: default commission (paid to referrer) and default discount (given to the referred family) in VND, per successful enrollment.';

insert into public.referral_settings (id) values (true)
  on conflict (id) do nothing;

-- RLS: these tables are admin-only (referrer names/phone/commission are not needed by
-- the public site — the registration form only ever writes a plain text code to
-- leads.referral_code). Only authenticated (admin-logged-in) users may read/write.
alter table public.referrers enable row level security;
alter table public.referral_settings enable row level security;

drop policy if exists "Admins manage referrers" on public.referrers;
create policy "Admins manage referrers" on public.referrers
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Admins manage referral settings" on public.referral_settings;
create policy "Admins manage referral settings" on public.referral_settings
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Helper view: leads matched to a known referrer, for the admin dashboard.
create or replace view public.leads_with_referrer as
select
  l.*,
  r.id as referrer_id,
  r.name as referrer_name,
  r.phone as referrer_phone,
  coalesce(r.commission_amount, s.default_commission_amount) as commission_owed
from public.leads l
left join public.referrers r on r.referral_code = l.referral_code and r.is_active
left join public.referral_settings s on s.id = true;

-- Applied directly via Supabase SQL Editor on 2026-08-19 (production project
-- "huyvoeducation"). Kept here for repo history / future environments.
