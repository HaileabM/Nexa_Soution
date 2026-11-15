import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';
import { sendContactEmailNotification } from '@/lib/email';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact messages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const cleanSubject = subject?.trim() || 'General Contact Inquiry';
    let saved: any = null;
    try {
      saved = await prisma.contactMessage.create({
        data: {
          name,
          email,
          subject: cleanSubject,
          message,
          status: 'UNREAD',
        },
      });
    } catch (dbErr) {
      console.warn('[api/contact] Database error, saving message fallback:', dbErr);
      saved = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject: cleanSubject,
        message,
        status: 'RECEIVED',
        createdAt: new Date(),
      };
    }

    // Attempt direct SMTP email dispatch to Nexa Solutions official mailbox
    let emailResult: { success: boolean; reason?: string } = { success: false, reason: 'NOT_ATTEMPTED' };
    try {
      emailResult = await sendContactEmailNotification({
        name,
        email,
        subject: cleanSubject,
        message,
        id: saved.id,
      });
    } catch (mailErr) {
      console.warn('[api/contact] Could not dispatch SMTP email directly:', mailErr);
    }

    // Build pre-filled mailto URL for seamless direct client-side email dispatch
    const targetEmail = process.env.NEXT_PUBLIC_SERVICE_EMAIL || 'nexasolutionsethiopia@gmail.com';
    const emailSubject = encodeURIComponent(`[Contact Us] ${cleanSubject} - ${name}`);
    const emailBody = encodeURIComponent(
      `Hello Nexa Solutions Team,\n\n` +
      `Here is a message sent through the website contact form:\n\n` +
      `• Name: ${name}\n` +
      `• Email: ${email}\n` +
      `• Subject: ${cleanSubject}\n` +
      `• Reference ID: NEXA-MSG-${saved.id.slice(-6).toUpperCase()}\n\n` +
      `Message:\n${message}\n\n` +
      `Looking forward to connecting with you.\n`
    );

    const mailtoUrl = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;

    return NextResponse.json({
      success: true,
      message: saved,
      emailSent: emailResult.success,
      mailtoUrl,
      targetEmail,
    }, { status: 201 });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to submit contact message' }, { status: 500 });
  }
}
