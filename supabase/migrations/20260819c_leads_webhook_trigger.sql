-- Database trigger that fires the Google Apps Script webhook (Leads sheet +
-- email notification) on every new lead. Uses pg_net so the HTTP call is
-- fire-and-forget from inside Postgres — no Supabase Edge Function needed.
--
-- The Apps Script Web App is deployed with "Anyone can access" (required for
-- an external POST without a Google login), but it checks the `secret` query
-- param against a value only known here and in the script itself, so the
-- endpoint can't be abused by anyone who stumbles on the URL.
--
-- NOTE: the URL below is redacted (placeholder Web App URL + secret) — this
-- is kept for reference/reinstallation only. The real values were applied
-- directly in the Supabase SQL Editor on 2026-08-19 and are not committed to
-- git; they live only in the production `notify_new_lead()` function and the
-- deployed Apps Script project (see supabase/apps-script/leads-notification.gs).

create extension if not exists pg_net with schema extensions;

create or replace function public.notify_new_lead()
returns trigger
language plpgsql
security definer
as $$
begin
  perform net.http_post(
    url := 'https://script.google.com/macros/s/REPLACE_WITH_DEPLOYMENT_ID/exec?secret=REPLACE_WITH_GENERATED_SECRET',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object('record', to_jsonb(NEW))
  );
  return NEW;
end;
$$;

drop trigger if exists on_lead_insert_notify on public.leads;
create trigger on_lead_insert_notify
  after insert on public.leads
  for each row
  execute function public.notify_new_lead();
