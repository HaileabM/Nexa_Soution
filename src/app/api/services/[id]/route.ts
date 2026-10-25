import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

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
    const data = await req.json();

    try {
      const existing = await prisma.service.findFirst({
        where: { OR: [{ id }, { slug: id }] },
      });

      let updated;
      if (existing) {
        updated = await prisma.service.update({
          where: { id: existing.id },
          data: {
            title: data.title,
            category: data.category,
            type: data.type,
            shortDesc: data.shortDesc,
            description: data.description,
            features: data.features || '',
            fileUrl: data.fileUrl || null,
            imageUrl: data.imageUrl || null,
            isFeatured: Boolean(data.isFeatured),
          },
        });
      } else {
        const baseSlug = (data.title || 'service')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        updated = await prisma.service.create({
          data: {
            title: data.title,
            slug: `${baseSlug}-${Date.now().toString().slice(-4)}`,
            category: data.category || 'Creative',
            type: data.type || 'PDF',
            shortDesc: data.shortDesc || '',
            description: data.description || '',
            features: data.features || '',
            fileUrl: data.fileUrl || null,
            imageUrl: data.imageUrl || null,
            isFeatured: Boolean(data.isFeatured),
          },
        });
      }

      return NextResponse.json({ success: true, service: updated });
    } catch (dbErr: any) {
      console.warn('Failed to update service in DB:', dbErr);
      return NextResponse.json({ error: dbErr?.message || 'Database error updating service.' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update service' }, { status: 500 });
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
      const existing = await prisma.service.findFirst({
        where: { OR: [{ id }, { slug: id }] },
      });

      if (existing) {
        await prisma.service.delete({
          where: { id: existing.id },
        });
      }

      return NextResponse.json({ success: true, deletedId: id });
    } catch (dbErr: any) {
      console.warn('Failed to delete service from DB:', dbErr);
      return NextResponse.json({ error: dbErr?.message || 'Database error deleting service.' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete service' }, { status: 500 });
  }
}
