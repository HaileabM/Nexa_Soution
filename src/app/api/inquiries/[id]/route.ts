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
      const updated = await prisma.serviceInquiry.update({
        where: { id },
        data: { status },
      });

      return NextResponse.json({ success: true, inquiry: updated });
    } catch (dbErr) {
      console.warn('Failed to update inquiry in DB:', dbErr);
      return NextResponse.json({ error: 'Database is in read-only mode or record was not found.' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
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
      await prisma.serviceInquiry.delete({
        where: { id },
      });

      return NextResponse.json({ success: true });
    } catch (dbErr) {
      console.warn('Failed to delete inquiry from DB:', dbErr);
      return NextResponse.json({ error: 'Database is in read-only mode or record was not found.' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
