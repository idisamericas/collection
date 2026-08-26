# Supabase setup

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Run `supabase/seed.sql`.
4. In Authentication > URL Configuration, set the Site URL to `https://idisamericas.github.io/collection/` and add `https://idisamericas.github.io/collection/**` as an allowed redirect URL.
5. In Authentication > Email, keep email auth enabled. The build works with the default Magic Link email. If you prefer a 6-digit OTP, edit the Magic Link template to include `{{ .Token }}`.
6. The current Build 40 package is already wired to the connected Supabase project with its browser-safe publishable key.
7. Sign in once from the site.
8. In Supabase Authentication > Users, copy your user UUID.
9. Run the commented `organization_members` owner insert at the bottom of `supabase/seed.sql` with your UUID.
10. Open `studio.html`. You should now have admin access.

Never put a `service_role` key in browser code.
