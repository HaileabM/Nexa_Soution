import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await prisma.news.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'News article not found' }, { status: 404 });
    }

    return NextResponse.json({ news: article });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
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
      const existing = await prisma.news.findFirst({
        where: { OR: [{ id }, { slug: id }] },
      });

      let updated;
      if (existing) {
        updated = await prisma.news.update({
          where: { id: existing.id },
          data: {
            title: data.title,
            category: data.category,
            summary: data.summary,
            content: data.content,
            author: data.author,
            imageUrl: data.imageUrl || null,
            published: Boolean(data.published),
          },
        });
      } else {
        const baseSlug = (data.title || 'news')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        updated = await prisma.news.create({
          data: {
            title: data.title,
            slug: `${baseSlug}-${Date.now().toString().slice(-4)}`,
            category: data.category || 'Thought Leadership',
            summary: data.summary || '',
            content: data.content || '',
            author: data.author || 'Nexa SBCC Strategy Team',
            imageUrl: data.imageUrl || null,
            published: Boolean(data.published),
          },
        });
      }

      return NextResponse.json({ success: true, news: updated });
    } catch (dbErr: any) {
      console.warn('Failed to update news in DB:', dbErr);
      return NextResponse.json({ error: dbErr?.message || 'Database error updating news.' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update news' }, { status: 500 });
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
      const existing = await prisma.news.findFirst({
        where: { OR: [{ id }, { slug: id }] },
      });

      if (existing) {
        await prisma.news.delete({
          where: { id: existing.id },
        });
      }

      return NextResponse.json({ success: true, deletedId: id });
    } catch (dbErr: any) {
      console.warn('Failed to delete news from DB:', dbErr);
      return NextResponse.json({ error: dbErr?.message || 'Database error deleting news.' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete news' }, { status: 500 });
  }
}

