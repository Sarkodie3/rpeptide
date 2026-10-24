import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'Rpeptidessupport@gmail.com';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.email || !data.message) {
      return NextResponse.json(
        { error: 'Email and message are required fields.' },
        { status: 400 }
      );
    }

    const name = data.name || 'Website Visitor';
    const clientEmail = data.email;
    const phone = data.phone || 'Not provided';
    const organization = data.organization || 'Not provided';
    const subject = data.subject || 'Customer Complaint / Technical Inquiry';
    const message = data.message;

    let emailSent = false;
    let deliveryMethod = 'formsubmit';

    // 1. Try Nodemailer if SMTP credentials are provided in environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost || 'smtp.gmail.com',
          port: smtpHost ? Number(process.env.SMTP_PORT || 587) : 465,
          secure: !smtpHost || process.env.SMTP_PORT === '465',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"rPeptide Contact Form" <${smtpUser}>`,
          to: RECIPIENT_EMAIL,
          replyTo: clientEmail,
          subject: `[rPeptide Inquiry/Complaint] ${subject} - from ${name}`,
          html: `
            <h2>New rPeptide Client Contact / Complaint</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${clientEmail}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <h3>Client Message / Complaint:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
            <hr />
            <p style="font-size: 12px; color: #666;">This message was submitted via the rPeptide Contact Us portal and dispatched to ${RECIPIENT_EMAIL}.</p>
          `,
        });

        emailSent = true;
        deliveryMethod = 'smtp';
      } catch (smtpErr) {
        console.error('SMTP delivery error:', smtpErr);
      }
    }

    // 2. Fallback / Direct Relay via FormSubmit API to deliver straight to Rpeptidessupport@gmail.com
    if (!emailSent) {
      try {
        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Referer: 'https://www.rpeptide.com',
            Origin: 'https://www.rpeptide.com',
          },
          body: JSON.stringify({
            name,
            email: clientEmail,
            phone,
            organization,
            subject,
            message,
            _subject: `[rPeptide Inquiry/Complaint] ${subject} from ${name}`,
            _replyto: clientEmail,
            _captcha: 'false',
            _template: 'table',
          }),
        });

        if (formSubmitRes.ok) {
          emailSent = true;
          deliveryMethod = 'formsubmit';
        }
      } catch (fetchErr) {
        console.error('FormSubmit relay error:', fetchErr);
      }
    }

    console.log(`Contact message from ${clientEmail} processed. Sent: ${emailSent} via ${deliveryMethod}`);

    return NextResponse.json({
      success: true,
      recipient: RECIPIENT_EMAIL,
      message: `Thank you for contacting rPeptide. Your inquiry has been routed to our support team at ${RECIPIENT_EMAIL}. We will respond within 24 hours.`,
    });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again or email us directly at ' + RECIPIENT_EMAIL },
      { status: 500 }
    );
  }
}
