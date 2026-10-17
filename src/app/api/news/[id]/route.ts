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
      const updated = await prisma.news.update({
        where: { id },
        data: {
          title: data.title,
          category: data.category,
          summary: data.summary,
          content: data.content,
          author: data.author,
          imageUrl: data.imageUrl,
          published: Boolean(data.published),
        },
      });

      return NextResponse.json({ success: true, news: updated });
    } catch (dbErr) {
      console.warn('Failed to update news in DB:', dbErr);
      return NextResponse.json({ error: 'Database is in read-only mode or record was not found.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
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
      await prisma.news.delete({
        where: { id },
      });

      return NextResponse.json({ success: true });
    } catch (dbErr) {
      console.warn('Failed to delete news from DB:', dbErr);
      return NextResponse.json({ error: 'Database is in read-only mode or record was not found.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
