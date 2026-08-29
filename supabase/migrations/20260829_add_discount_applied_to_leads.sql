-- Add discount_applied column to leads table
-- Used to record the discount amount given to a family when they sign up with a valid referral code.

alter table public.leads
  add column if not exists discount_applied numeric(12,0) default 0;

comment on column public.leads.discount_applied is
  'VND discount applied to this lead due to a valid referral code.';