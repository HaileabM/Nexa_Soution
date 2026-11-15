import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await req.json();

    try {
      const updated = await prisma.contactMessage.update({
        where: { id },
        data: { status },
      });

      return NextResponse.json({ success: true, message: updated });
    } catch (dbErr) {
      console.warn('Failed to update contact message in DB:', dbErr);
      return NextResponse.json({ error: 'Database record was not found or could not be updated.' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    try {
      const existing = await prisma.contactMessage.findUnique({
        where: { id },
      });

      if (existing) {
        await prisma.contactMessage.delete({
          where: { id: existing.id },
        });
      }

      return NextResponse.json({ success: true, deletedId: id });
    } catch (dbErr: any) {
      console.warn('Failed to delete contact message from DB:', dbErr);
      return NextResponse.json({ error: dbErr?.message || 'Database error deleting message.' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete message' }, { status: 500 });
  }
}
