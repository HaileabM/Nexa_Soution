import nodemailer from 'nodemailer';

interface SendEmailParams {
  to?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  reason?: string;
  error?: string;
}

export function isSmtpConfigured(): boolean {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  return Boolean(user && pass);
}

export async function sendEmail({
  to,
  replyTo,
  subject,
  text,
  html,
}: SendEmailParams): Promise<SendEmailResult> {
  const targetEmail = to || process.env.NEXT_PUBLIC_SERVICE_EMAIL || 'nexasolutionsethiopia@gmail.com';
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

  if (!smtpUser || !smtpPass) {
    console.info(
      '[sendEmail] SMTP credentials not fully configured in environment (SMTP_USER/SMTP_PASS). Ready to send once configured.'
    );
    return {
      success: false,
      reason: 'SMTP_CREDENTIALS_NOT_CONFIGURED',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Nexa Solutions Portal'}" <${smtpUser}>`,
      to: targetEmail,
      replyTo: replyTo || undefined,
      subject,
      text,
      html: html || undefined,
    });

    console.info(`[sendEmail] Email successfully sent: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (err: any) {
    console.error('[sendEmail] Failed to send email via SMTP:', err);
    return {
      success: false,
      reason: 'SEND_FAILED',
      error: err?.message || 'Failed to send email via SMTP',
    };
  }
}

export async function sendContactEmailNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  id?: string;
}) {
  const target = process.env.NEXT_PUBLIC_SERVICE_EMAIL || 'nexasolutionsethiopia@gmail.com';
  const emailSubject = `[Nexa Contact Us] ${data.subject} - from ${data.name}`;

  const textBody =
    `Hello Nexa Solutions Team,\n\n` +
    `You have received a new message through the Contact Us form on your website:\n\n` +
    `• Sender Name: ${data.name}\n` +
    `• Sender Email: ${data.email}\n` +
    `• Subject: ${data.subject}\n` +
    (data.id ? `• Reference ID: NEXA-MSG-${data.id.slice(-6).toUpperCase()}\n` : '') +
    `\n--- Message Content ---\n${data.message}\n\n` +
    `You can reply directly to this email to contact the sender.`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #1e293b; margin: 0; font-size: 20px;">New Website Contact Message</h2>
        <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Nexa Solutions SBCC Ethiopia Portal</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 130px; font-weight: 600;">Sender:</td>
          <td style="padding: 8px 0; color: #1e293b; font-weight: bold;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td>
          <td style="padding: 8px 0; color: #1e293b;">${data.subject}</td>
        </tr>
        ${data.id ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Reference:</td>
          <td style="padding: 8px 0; color: #0d9488; font-family: monospace;">NEXA-MSG-${data.id.slice(-6).toUpperCase()}</td>
        </tr>` : ''}
      </table>
      <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
        <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">Message</div>
        <div style="color: #1e293b; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
      </div>
      <div style="font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px;">
        This email was dispatched via the Nexa Solutions web contact form to ${target}.
      </div>
    </div>
  `;

  return sendEmail({
    to: target,
    replyTo: data.email,
    subject: emailSubject,
    text: textBody,
    html: htmlBody,
  });
}

export async function sendServiceRequestNotification(data: {
  name: string;
  organization?: string | null;
  email: string;
  phone?: string | null;
  serviceType: string;
  projectScope: string;
  targetAudience?: string | null;
  timeline?: string | null;
  id?: string;
}) {
  const target = process.env.NEXT_PUBLIC_SERVICE_EMAIL || 'nexasolutionsethiopia@gmail.com';
  const emailSubject = `[Service Request] ${data.serviceType} - ${data.organization || data.name}`;

  const textBody =
    `Hello Nexa Solutions SBCC Team,\n\n` +
    `A new Service Utilization / Deliverable Request has been submitted:\n\n` +
    `• Requested Service / Deliverables: ${data.serviceType}\n` +
    `• Client / Focal Person: ${data.name}\n` +
    `• Organization: ${data.organization || 'Individual / Not specified'}\n` +
    `• Email: ${data.email}\n` +
    `• Phone: ${data.phone || 'N/A'}\n` +
    `• Target Audience: ${data.targetAudience || 'General / Not specified'}\n` +
    `• Timeline: ${data.timeline || 'Flexible'}\n` +
    (data.id ? `• Reference ID: NEXA-REQ-${data.id.slice(-6).toUpperCase()}\n` : '') +
    `\n--- Scope & Requirements ---\n${data.projectScope}\n\n` +
    `Log into the Nexa Admin Dashboard to update status or reply directly to the client.`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #0d9488; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #1e293b; margin: 0; font-size: 20px;">New Service Utilization Request</h2>
        <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Nexa Solutions SBCC & Deliverables Portal</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 140px; font-weight: 600;">Deliverable / Service:</td>
          <td style="padding: 8px 0; color: #0d9488; font-weight: bold;">${data.serviceType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Client Name:</td>
          <td style="padding: 8px 0; color: #1e293b; font-weight: bold;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Organization:</td>
          <td style="padding: 8px 0; color: #1e293b;">${data.organization || 'Individual / Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
          <td style="padding: 8px 0; color: #1e293b;">${data.phone || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Target Audience:</td>
          <td style="padding: 8px 0; color: #1e293b;">${data.targetAudience || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Timeline:</td>
          <td style="padding: 8px 0; color: #1e293b;">${data.timeline || 'Flexible'}</td>
        </tr>
        ${data.id ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Reference ID:</td>
          <td style="padding: 8px 0; color: #2563eb; font-family: monospace;">NEXA-REQ-${data.id.slice(-6).toUpperCase()}</td>
        </tr>` : ''}
      </table>
      <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
        <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">Scope & Deliverable Requirements</div>
        <div style="color: #1e293b; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.projectScope}</div>
      </div>
      <div style="font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px;">
        This request has been recorded in the Nexa database and dispatched to ${target}.
      </div>
    </div>
  `;

  return sendEmail({
    to: target,
    replyTo: data.email,
    subject: emailSubject,
    text: textBody,
    html: htmlBody,
  });
}
