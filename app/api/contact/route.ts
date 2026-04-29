import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, company, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "needitconsult@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"NeedIT Website" <needitconsult@gmail.com>`,
    to: "needitconsult@gmail.com",
    replyTo: email,
    subject: `New contact form submission from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">New message from your website</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 100px;"><strong>Name</strong></td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          ${company ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td><td style="padding: 8px 0;">${company}</td></tr>` : ""}
        </table>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <h3 style="color: #374151;">Message</h3>
        <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="color: #9ca3af; font-size: 12px;">Sent from needitconsulting.com contact form</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
