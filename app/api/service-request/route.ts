import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { services, firstName, lastName, businessName, employees, phone, email, preferredDate } = await req.json();

  if (!firstName || !lastName || !businessName || !phone || !email || !services?.length) {
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
    subject: `New Service Request — ${services.join(", ")}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #16a34a; padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">New Service Request</h2>
          <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">${services.join(" · ")}</p>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; padding: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 160px;"><strong>Services</strong></td><td style="padding: 8px 0; font-size: 14px;">${services.join("<br/>")}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;"><strong>Name</strong></td><td style="padding: 8px 0; font-size: 14px;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;"><strong>Business Name</strong></td><td style="padding: 8px 0; font-size: 14px;">${businessName}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;"><strong>Employees</strong></td><td style="padding: 8px 0; font-size: 14px;">${employees || "Not provided"}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;"><strong>Phone</strong></td><td style="padding: 8px 0; font-size: 14px;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;"><strong>Email</strong></td><td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;"><strong>Preferred Call Date</strong></td><td style="padding: 8px 0; font-size: 14px;">${preferredDate || "Not specified"}</td></tr>
          </table>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Sent from needitconsulting.com · Service Request Form</p>
        </div>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
