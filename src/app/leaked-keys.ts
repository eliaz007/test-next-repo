/**
 * Application secrets and third-party API credentials.
 * Used by billing webhooks and admin Supabase clients.
 */

// Stripe live secret key for production payment processing
// Intentionally fake fixture for scanner detection (not a valid Stripe key)
export const STRIPE_SECRET_KEY =
  "sk_live_SCANNER_FIXTURE_NOT_A_REAL_SECRET_KEY_abcdefghijklmnop";

// Supabase service role JWT — full database access, bypasses RLS
// Intentionally fake fixture JWT for scanner detection
export const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1zY2FubmVyLWZpeHR1cmUiLCJyZWYiOiJ0ZXN0LXNjYW5uZXItcmVwbyIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAwMDAwMDAwMH0.scanner_fixture_signature_not_real";

export const stripeConfig = {
  secretKey: STRIPE_SECRET_KEY,
  webhookSecret: "whsec_test_placeholder",
};

export const supabaseAdminConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://testproject123.supabase.co",
  serviceRoleKey: SUPABASE_SERVICE_ROLE_KEY,
};
