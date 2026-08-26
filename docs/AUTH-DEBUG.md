# Auth Debug

## Symptom
Email link contains:

`redirect_to=http://localhost:3000`

## Cause
Supabase Authentication > URL Configuration still has the development Site URL,
or the client did not provide `emailRedirectTo`.

Build 40.1 fixes the client side.

The dashboard still needs:

Site URL:
`https://idisamericas.github.io/collection/`

Redirect URLs:
`https://idisamericas.github.io/collection/`
`https://idisamericas.github.io/collection/studio.html`

## Why there was no six-digit code

Supabase `signInWithOtp()` sends either a Magic Link or OTP based on the Magic
Link email template.

- `{{ .ConfirmationURL }}` => clickable link
- `{{ .Token }}` => six-digit code

To use codes, edit Authentication > Email Templates > Magic Link and place
`{{ .Token }}` in the template.
