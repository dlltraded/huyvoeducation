-- Extends public.leads to support the NVH "Rèn luyện Kỹ năng hè 2026-2027"
-- landing page (nvh-ky-nang-he), which reuses the same Supabase project,
-- `leads` table, and referral-code system as huyvoeducation.com so all leads
-- land in one place / one Google Sheet (see supabase/apps-script/leads-notification.gs
-- and the `source` column added in 20260819d_leads_source_tracking.sql).
--
-- Two pages on this project write to `leads`:
--   - index.html   (quick/detailed form on the main landing page, id="reg-form")
--   - dang-ky.html (dedicated, more detailed registration page, id="regForm")
--
-- This landing-page project collects a few fields the HVE homepage form does not:
--   - child_school        : the child's current school (used for the NVH
--                            "tuyến gần" 08-school pickup-discount logic)
--   - package_selected     : which monthly package the parent picked
--                            (e.g. "TH_1BUOI", "THCS_2BUOI" — see the
--                            landing page's PACKAGES table for labels/prices)
--   - wants_after_1630     : parent flagged they need pickup/care after 16:30
--   - staff_discount_claim : parent self-declared their child qualifies for
--                            the "con em cán bộ, công chức, viên chức" fee
--                            discount (NOT auto-verified — NVH staff confirm
--                            manually against payroll records before applying
--                            the discount)
--   - note                 : free-text note field, collected only on dang-ky.html
--   - site                 : fixed constant tag ('nvhttn') written by BOTH forms
--                            on every insert, independent of the existing
--                            `source` column. `source` still carries ad/referral
--                            attribution (utm/ref code) and can get overwritten
--                            by a referral code — `site` never does, so a future
--                            admin panel can reliably filter
--                            `where site = 'nvhttn'` to see only this project's
--                            leads apart from HVE's own homepage leads, even for
--                            referred signups.
--
-- Not applied automatically — run this in the Supabase SQL editor (or via
-- `supabase db push`) before the nvh-ky-nang-he landing page goes live,
-- otherwise the insert from its registration forms will fail with a
-- "column does not exist" error (same pattern as the other leads.* migrations
-- in this folder). Both index.html and dang-ky.html already retry with a
-- reduced payload if this happens, so registrations won't crash — but the
-- NVH-specific fields (school, package, discount flags, source tag) will be
-- silently dropped until this migration is run.

alter table public.leads
  add column if not exists child_school text,
  add column if not exists package_selected text,
  add column if not exists wants_after_1630 boolean not null default false,
  add column if not exists staff_discount_claim boolean not null default false,
  add column if not exists note text,
  add column if not exists site text;

comment on column public.leads.child_school is
  'Child''s current school, collected on the nvh-ky-nang-he landing page — used to check eligibility for the NVH 8-school "tuyến gần" 30% pickup-fee discount.';
comment on column public.leads.package_selected is
  'Monthly package code selected on the nvh-ky-nang-he landing page (e.g. TH_1BUOI, THCS_1BUOI, TH_2BUOI, THCS_2BUOI). Not used by the main HVE homepage form.';
comment on column public.leads.wants_after_1630 is
  'Parent indicated (nvh-ky-nang-he landing page) they need pickup/care after 16:30, outside the standard schedule — for NVH staff to follow up on before enrollment.';
comment on column public.leads.staff_discount_claim is
  'Parent self-declared (nvh-ky-nang-he landing page) that the child qualifies for the "con em cán bộ, công chức, viên chức" tuition discount. Self-reported only — NVH staff must verify before applying the discount; not auto-granted.';
comment on column public.leads.note is
  'Free-text note from the parent, collected on the nvh-ky-nang-he dang-ky.html registration page only.';
comment on column public.leads.site is
  'Fixed project tag written by every insert from the NVH landing page project (value: ''nvhttn''), independent of `source`. Lets a future NVH-only admin view filter its own leads (where site = ''nvhttn'') without depending on ad/referral attribution values, which vary and can be null.';

-- Recommended index for the upcoming NVH-only admin panel, since it will
-- filter and sort this table by site + created_at on every page load.
create index if not exists leads_site_created_at_idx
  on public.leads (site, created_at desc);
