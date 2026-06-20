import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENTS = [
  "abdirahman.dahir@stratosphereaeronautics.com",
  "info@stratosphereaeronautics.com",
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { name, email, phone, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "name, email, and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: row, error: dbError } = await supabase
      .from("contact_inquiries")
      .insert({
        name,
        email,
        phone: phone || null,
        message,
        recipient_emails: RECIPIENTS,
        delivered: false,
      })
      .select("id, created_at")
      .single();

    if (dbError || !row) {
      return new Response(
        JSON.stringify({ error: "Could not store inquiry", detail: dbError?.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let delivered = false;
    let mailError: string | null = null;

    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");
    const smtpFrom = Deno.env.get("SMTP_FROM");
    const smtpPort = Number(Deno.env.get("SMTP_PORT") || "587");

    if (smtpHost && smtpUser && smtpPass && smtpFrom) {
      try {
        const nodemailer = await import("npm:nodemailer@6.9.14");
        const transporter = nodemailer.default.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });

        const text =
          `New enrollment inquiry from ${name}\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone || "(not provided)"}\n\n` +
          `Message:\n${message}\n\n` +
          `---\nSubmitted ${new Date().toISOString()}\nInquiry ID: ${row.id}`;

        const html =
          `<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">` +
          `<h2 style="color:#d4af37;margin:0 0 8px">New Enrollment Inquiry</h2>` +
          `<p style="color:#555;margin:0 0 24px">Stratosphere Aeronautics — website contact form</p>` +
          `<table style="width:100%;border-collapse:collapse;font-size:14px">` +
          `<tr><td style="padding:8px 0;color:#888;width:100px">Name</td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>` +
          `<tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#1a4391">${escapeHtml(email)}</a></td></tr>` +
          `<tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0">${escapeHtml(phone || "(not provided)")}</td></tr>` +
          `</table>` +
          `<h3 style="color:#333;margin:24px 0 8px">Message</h3>` +
          `<div style="background:#f7f7f7;border-left:3px solid #d4af37;padding:16px;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(message)}</div>` +
          `<p style="color:#999;font-size:12px;margin-top:24px">Submitted ${new Date().toISOString()}<br>Inquiry ID: ${row.id}</p>` +
          `</div>`;

        const info = await transporter.sendMail({
          from: smtpFrom,
          to: RECIPIENTS.join(", "),
          replyTo: email,
          subject: `New Enrollment Inquiry — ${name}`,
          text,
          html,
        });

        delivered = !!info?.messageId;

        await supabase
          .from("contact_inquiries")
          .update({ delivered })
          .eq("id", row.id);
      } catch (err) {
        mailError = err instanceof Error ? err.message : String(err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        inquiryId: row.id,
        delivered,
        mailError,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
