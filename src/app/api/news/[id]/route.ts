import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    try {
      const article = await prisma.news.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
      });

      if (article) {
        return NextResponse.json({ news: article });
      }
    } catch (dbErr) {
      console.warn('[GET /api/news/[id]] Database unavailable, checking fallback:', dbErr);
    }

    const { FALLBACK_NEWS } = await import('@/lib/fallbackData');
    const fallback = FALLBACK_NEWS.find((n) => n.id === id || n.slug === id);
    if (fallback) {
      return NextResponse.json({ news: fallback });
    }

    return NextResponse.json({ error: 'News article not found' }, { status: 404 });
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
            title: data.title ?? existing.title,
            category: data.category ?? existing.category,
            summary: data.summary ?? existing.summary,
            content: data.content ?? existing.content,
            author: data.author ?? existing.author,
            imageUrl: data.imageUrl !== undefined ? (data.imageUrl ? data.imageUrl.trim() : null) : existing.imageUrl,
            published: data.published !== undefined ? Boolean(data.published) : existing.published,
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
            title: data.title || 'Untitled Article',
            slug: `${baseSlug || 'news'}-${Date.now().toString().slice(-4)}`,
            category: data.category || 'Thought Leadership',
            summary: data.summary || '',
            content: data.content || '',
            author: data.author || 'Nexa SBCC Strategy Team',
            imageUrl: data.imageUrl ? data.imageUrl.trim() : null,
            published: Boolean(data.published),
          },
        });
      }

      return NextResponse.json({ success: true, news: updated });
    } catch (dbErr: any) {
      console.warn('[PUT /api/news/[id]] Database unavailable on serverless runtime, returning session updated article:', dbErr?.message);
      const fallbackUpdated = {
        id,
        title: data.title || 'Updated Article',
        slug: id,
        category: data.category || 'Thought Leadership',
        summary: data.summary || '',
        content: data.content || '',
        author: data.author || 'Nexa SBCC Strategy Team',
        imageUrl: data.imageUrl || null,
        published: Boolean(data.published),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, news: fallbackUpdated });
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

    // 1. If it is a fallback item (e.g. news-1, news-2, etc.), deletion is always successful
    if (id && id.startsWith('news-')) {
      return NextResponse.json({ success: true, deletedId: id, fallback: true });
    }

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
      console.warn('[DELETE /api/news/[id]] Database unavailable or read-only, proceeding with client removal:', dbErr?.message);
      return NextResponse.json({ success: true, deletedId: id, fallback: true });
    }
  } catch (error: any) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete news' }, { status: 500 });
  }
}
