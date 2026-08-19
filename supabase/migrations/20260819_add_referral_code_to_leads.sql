-- Add referral_code column to leads table, to support the "Chương trình giới thiệu"
-- (refer-a-friend) feature. Not applied automatically — run this in the Supabase
-- SQL editor (or via `supabase db push` if the project is linked) before deploying
-- the updated RegistrationForm/LeadsManager code, otherwise the insert from the
-- public registration form will fail with a "column does not exist" error.

alter table public.leads
  add column if not exists referral_code text;

comment on column public.leads.referral_code is
  'Optional referral code entered by the parent at signup. Used to attribute leads to the parent/student who referred them, ahead of a full referral-rewards program.';
