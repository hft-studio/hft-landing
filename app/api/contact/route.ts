import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, company, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO contact_submissions (name, email, company, message)
    VALUES (${name}, ${email}, ${company || null}, ${message})
  `;

  await notifySlack({ name, email, company, message });

  return NextResponse.json({ success: true });
}

async function notifySlack(submission: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;

  const { name, email, company, message } = submission;

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `New contact form submission from ${name}`,
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: "📬 New contact form submission" },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Name*\n${name}` },
              { type: "mrkdwn", text: `*Email*\n<mailto:${email}|${email}>` },
              {
                type: "mrkdwn",
                text: `*Company*\n${company || "_not provided_"}`,
              },
            ],
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `*Message*\n${message}` },
          },
        ],
      }),
    });
  } catch (err) {
    console.error("Failed to send Slack notification", err);
  }
}
