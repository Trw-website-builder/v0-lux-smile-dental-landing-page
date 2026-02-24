import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  reason: z.string().min(1),
  lastName: z.string().min(2),
  firstName: z.string().min(2),
  phone: z.string().min(1),
  email: z.string().email(),
  date: z.string().min(1),
  time: z.string().min(1),
  message: z.string().max(500).optional().default(""),
  locale: z.enum(["fr", "en", "de"]),
});

const REASON_LABELS: Record<string, Record<string, string>> = {
  fr: {
    checkup: "Bilan general",
    cleaning: "Nettoyage",
    cosmetic: "Cosmetique",
    emergency: "Urgence",
    other: "Autre",
  },
  en: {
    checkup: "General Checkup",
    cleaning: "Cleaning",
    cosmetic: "Cosmetic",
    emergency: "Emergency",
    other: "Other",
  },
  de: {
    checkup: "Allgemeine Untersuchung",
    cleaning: "Reinigung",
    cosmetic: "Kosmetisch",
    emergency: "Notfall",
    other: "Andere",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    const reasonLabel =
      REASON_LABELS[data.locale]?.[data.reason] || data.reason;
    const dateFormatted = new Date(data.date).toLocaleDateString(
      data.locale === "de" ? "de-DE" : data.locale === "fr" ? "fr-FR" : "en-GB"
    );

    // Build the email HTML
    const html = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #2d5a3d; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 20px;">New Appointment Request - LuxSmile Dental</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #f3f4f6;">Reason</td>
              <td style="padding: 8px 12px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${reasonLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #f3f4f6;">Name</td>
              <td style="padding: 8px 12px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #f3f4f6;">Phone</td>
              <td style="padding: 8px 12px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #f3f4f6;">Email</td>
              <td style="padding: 8px 12px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #f3f4f6;">Preferred Date</td>
              <td style="padding: 8px 12px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${dateFormatted}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #f3f4f6;">Preferred Time</td>
              <td style="padding: 8px 12px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${data.time}</td>
            </tr>
            ${
              data.message
                ? `<tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151; border-bottom: 1px solid #f3f4f6;">Message</td>
              <td style="padding: 8px 12px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${data.message}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #374151;">Language</td>
              <td style="padding: 8px 12px; color: #6b7280;">${data.locale.toUpperCase()}</td>
            </tr>
          </table>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">This email was sent from the LuxSmile Dental website contact form.</p>
      </div>
    `;

    const contactEmail =
      process.env.CONTACT_EMAIL || "juozas.m49@gmail.com";

    // Check if SMTP is configured
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      // Dynamic import to avoid issues when nodemailer is not available
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"LuxSmile Dental" <${process.env.SMTP_USER}>`,
        to: contactEmail,
        replyTo: data.email,
        subject: `New Appointment Request - ${data.firstName} ${data.lastName}`,
        html,
      });
    } else {
      // Log the submission when SMTP is not configured (development)
      console.log("=== APPOINTMENT REQUEST (SMTP not configured) ===");
      console.log("To:", contactEmail);
      console.log("From:", data.email);
      console.log("Data:", JSON.stringify(data, null, 2));
      console.log("================================================");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
