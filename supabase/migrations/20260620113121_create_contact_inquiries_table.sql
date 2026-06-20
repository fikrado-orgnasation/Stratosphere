/*
# Create contact_inquiries table

1. Purpose
   Stores enrollment inquiry submissions from the Stratosphere Aeronautics
   website contact form. Each row is a single prospective student's submission.

2. New Tables
   - `contact_inquiries`
     - `id` (uuid, primary key)
     - `name` (text, not null) — full name of the inquirer
     - `email` (text, not null) — inquirer's email address
     - `phone` (text) — inquirer's phone number (optional)
     - `message` (text) — free-text message / questions
     - `recipient_emails` (text[]) — company addresses the inquiry was routed to
     - `delivered` (bool, default false) — whether the notification email was sent
     - `created_at` (timestamptz, default now())

3. Security
   - RLS ENABLED on `contact_inquiries`.
   - Anonymous visitors can INSERT their own inquiries (public contact form),
     but CANNOT read, update, or delete any rows (no SELECT/UPDATE/DELETE
     policies for anon). Onlyauthenticated service role can read via dashboard.
   - This is intentionally public-write / private-read: the form must accept
     submissions from unauthenticated site visitors, but inquiry data must
     never be exposed publicly.
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  recipient_emails text[] NOT NULL,
  delivered boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON contact_inquiries;
CREATE POLICY "anon_insert_inquiries"
  ON contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
