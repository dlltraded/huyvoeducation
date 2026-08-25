-- Extends public.leads to support the NVH "Rèn luyện Kỹ năng hè 2026-2027"
-- landing page (nvh-ky-nang-he), which reuses the same Supabase project,
-- `leads` table, and referral-code system as huyvoeducation.com so all leads
-- land in one place / one Google Sheet (see supabase/apps-script/leads-notification.gs
-- and the `source` column added in 20260819d_leads_source_tracking.sql).
--
-- This landing page collects a few fields the HVE homepage form does not:
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
--
-- Not applied automatically — run this in the Supabase SQL editor (or via
-- `supabase db push`) before the nvh-ky-nang-he landing page goes live,
-- otherwise the insert from its registration form will fail with a
-- "column does not exist" error (same pattern as the other leads.* migrations
-- in this folder).

alter table public.leads
  add column if not exists child_school text,
  add column if not exists package_selected text,
  add column if not exists wants_after_1630 boolean not null default false,
  add column if not exists staff_discount_claim boolean not null default false;

comment on column public.leads.child_school is
  'Child''s current school, collected on the nvh-ky-nang-he landing page — used to check eligibility for the NVH 8-school "tuyến gần" 30% pickup-fee discount.';
comment on column public.leads.package_selected is
  'Monthly package code selected on the nvh-ky-nang-he landing page (e.g. TH_1BUOI, THCS_1BUOI, TH_2BUOI, THCS_2BUOI). Not used by the main HVE homepage form.';
comment on column public.leads.wants_after_1630 is
  'Parent indicated (nvh-ky-nang-he landing page) they need pickup/care after 16:30, outside the standard schedule — for NVH staff to follow up on before enrollment.';
comment on column public.leads.staff_discount_claim is
  'Parent self-declared (nvh-ky-nang-he landing page) that the child qualifies for the "con em cán bộ, công chức, viên chức" tuition discount. Self-reported only — NVH staff must verify before applying the discount; not auto-granted.';

-- Recommended (optional): tag every lead from this landing page for easy
-- filtering in the admin/Sheet, using the existing `source` column —
-- e.g. insert with source = 'nvh-ky-nang-he-2026' when no ?ref=/?src= param
-- was present. Handled client-side in the landing page's submit handler;
-- no schema change needed for this part.
