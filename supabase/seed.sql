-- Seed IDIS Americas + GSX 2026 collectible.
insert into public.organizations (slug,name,brand)
values ('idis-americas','IDIS Americas','{"accent":"#18c9c3","tagline":"See Security Smarter"}'::jsonb)
on conflict (slug) do update set name=excluded.name, brand=excluded.brand;

insert into public.campaigns (organization_id,slug,name,starts_on,ends_on,active)
select id,'gsx-2026','GSX 2026','2026-09-14','2026-09-16',true
from public.organizations where slug='idis-americas'
on conflict (organization_id,slug) do update set name=excluded.name, starts_on=excluded.starts_on, ends_on=excluded.ends_on, active=true;

insert into public.collectibles (organization_id,campaign_id,slug,name,year,event_start,event_end,location,image_url,experience_type,experience_config,active)
select o.id,c.id,'gsx2026-atlanta','GSX 2026 Atlanta',2026,'2026-09-14','2026-09-16','Atlanta, GA','./assets/thumbs/gsx2026-atlanta.webp','parallax',
  '{"experience":"atlanta","voiceover":"./assets/audio/state-voiceover.mp3"}'::jsonb,true
from public.organizations o join public.campaigns c on c.organization_id=o.id and c.slug='gsx-2026'
where o.slug='idis-americas'
on conflict (slug) do update set name=excluded.name,year=excluded.year,event_start=excluded.event_start,event_end=excluded.event_end,location=excluded.location,image_url=excluded.image_url,experience_type=excluded.experience_type,experience_config=excluded.experience_config,active=true;

-- After your first login, make yourself an owner by replacing YOUR_USER_UUID:
-- insert into public.organization_members (organization_id,user_id,role)
-- select id,'YOUR_USER_UUID'::uuid,'owner' from public.organizations where slug='idis-americas'
-- on conflict (organization_id,user_id) do update set role='owner';
