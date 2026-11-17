-- Public marketing images only. Reuse the existing CMS administrator identity.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('website-images', 'website-images', true, 5242880,
  array['image/jpeg', 'image/png', 'image/webp']);

create policy "HVE administrator uploads website images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'website-images'
  and (select auth.uid()) = '427ebaf1-73b3-42c9-a96f-313efa3aaea0'::uuid
  and (storage.foldername(name))[1] in ('programs', 'instructors')
);

-- Reading public object URLs needs no SELECT policy. Only the admin may list.
create policy "HVE administrator lists website images"
on storage.objects for select to authenticated
using (
  bucket_id = 'website-images'
  and (select auth.uid()) = '427ebaf1-73b3-42c9-a96f-313efa3aaea0'::uuid
);

-- Uploads use unique paths with upsert:false; no UPDATE or DELETE is granted.
