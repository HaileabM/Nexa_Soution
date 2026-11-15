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
            title: data.title ?? existing.title,
            category: data.category ?? existing.category,
            type: data.type ?? existing.type,
            shortDesc: data.shortDesc ?? existing.shortDesc,
            description: data.description ?? existing.description,
            features: data.features !== undefined ? data.features : existing.features,
            fileUrl: data.fileUrl !== undefined ? (data.fileUrl ? data.fileUrl.trim() : null) : existing.fileUrl,
            imageUrl: data.imageUrl !== undefined ? (data.imageUrl ? data.imageUrl.trim() : null) : existing.imageUrl,
            priceInfo: data.priceInfo !== undefined ? data.priceInfo : existing.priceInfo,
            isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : existing.isFeatured,
          },
        });
      } else {
        const baseSlug = (data.title || 'deliverable')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        const cleanSlug = baseSlug || 'deliverable';
        updated = await prisma.service.create({
          data: {
            title: data.title || 'Untitled Deliverable',
            slug: `${cleanSlug}-${Date.now()}`,
            category: data.category || 'Creative',
            type: data.type || 'PDF',
            shortDesc: data.shortDesc || '',
            description: data.description || '',
            features: data.features || '',
            fileUrl: data.fileUrl ? data.fileUrl.trim() : null,
            imageUrl: data.imageUrl ? data.imageUrl.trim() : null,
            priceInfo: data.priceInfo || null,
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
