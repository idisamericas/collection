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


---

# IMPORTANT AUTH SETUP FOR GITHUB PAGES

If Supabase sends a link containing:

```text
redirect_to=http://localhost:3000
```

the Supabase project is still using its default development Auth URL.

In the Supabase Dashboard open:

```text
Authentication
→ URL Configuration
```

Set:

```text
Site URL
https://idisamericas.github.io/collection/
```

Add these Redirect URLs:

```text
https://idisamericas.github.io/collection/
https://idisamericas.github.io/collection/studio.html
```

Build 40.1 also passes `emailRedirectTo` from the browser on every collector
sign-in request, so Supabase no longer relies only on the Site URL.

## To send a 6-digit code instead of a Magic Link

Supabase's `signInWithOtp()` uses the SAME email template for Magic Links and
email OTPs. The template determines what the visitor receives.

Open:

```text
Authentication
→ Email Templates
→ Magic Link
```

Replace the Magic Link template with an OTP template that uses:

```text
{{ .Token }}
```

Example:

```html
<h2>Your IDIS sign-in code</h2>

<p>Use this code to save and sync your collectible collection:</p>

<p style="font-size:32px;font-weight:700;letter-spacing:8px;">
  {{ .Token }}
</p>

<p>This code expires shortly and can only be used once.</p>
```

A template containing `{{ .Token }}` sends the six-digit code.

A template containing `{{ .ConfirmationURL }}` sends the clickable Magic Link.

The Build 40.1 web app accepts either method, so Magic Link can remain as a
temporary fallback while the OTP template is being configured.
