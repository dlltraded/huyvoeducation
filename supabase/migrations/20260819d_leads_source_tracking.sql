-- Adds a `source` column to `leads` so every registration can be attributed to
-- where it came from (e.g. a QR code on a printed poster, a Facebook post, a
-- specific referrer's link) in addition to the existing `referral_code` (which
-- identifies a specific referring person).
--
-- Not applied automatically — run this in the Supabase SQL editor (or via
-- `supabase db push`) before deploying the updated RegistrationForm code.

alter table public.leads
  add column if not exists source text;

comment on column public.leads.source is
  'Marketing/attribution source captured from the `src` (or `ref`, for referrer links) query param when the visitor first landed on the site, e.g. "qr-poster-truong-abc", "facebook-ads", or a referrer''s referral_code. Auto-captured client-side, not user-entered.';
