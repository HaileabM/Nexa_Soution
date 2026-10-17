import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const inquiries = await prisma.serviceInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, organization, email, phone, serviceType, projectScope, targetAudience, timeline } = data;

    if (!name || !email || !serviceType || !projectScope) {
      return NextResponse.json(
        { error: 'Name, email, service type, and project details are required' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.serviceInquiry.create({
      data: {
        name,
        organization: organization || 'Individual / Not specified',
        email,
        phone: phone || null,
        serviceType,
        projectScope,
        targetAudience: targetAudience || null,
        timeline: timeline || 'Standard timeframe',
        status: 'PENDING',
      },
    });

    // Formatted mailto link for direct utilization email
    const emailSubject = encodeURIComponent(`[Service Utilization Request] ${serviceType} - ${organization || name}`);
    const emailBody = encodeURIComponent(
      `Hello Nexa Solutions SBCC Team,\n\n` +
      `I would like to request/utilize your services:\n\n` +
      `• Requested Service / Materials: ${serviceType}\n` +
      `• Client Name: ${name}\n` +
      `• Organization: ${organization || 'N/A'}\n` +
      `• Email: ${email}\n` +
      `• Phone: ${phone || 'N/A'}\n` +
      `• Target Audience: ${targetAudience || 'General / Not specified'}\n` +
      `• Desired Timeline: ${timeline || 'Flexible'}\n\n` +
      `Project Scope / Materials Description:\n${projectScope}\n\n` +
      `Reference ID: NEXA-REQ-${inquiry.id.slice(-6).toUpperCase()}\n\n` +
      `Looking forward to partnering with you for healthier and stronger Ethiopia.\n`
    );

    const mailtoUrl = `mailto:nexasolutionsethiopia@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    return NextResponse.json({
      success: true,
      inquiry,
      mailtoUrl,
      targetEmail: 'nexasolutionsethiopia@gmail.com',
    }, { status: 201 });
  } catch (error) {
    console.error('Error recording service inquiry:', error);
    return NextResponse.json({ error: 'Failed to submit service inquiry' }, { status: 500 });
  }
}
