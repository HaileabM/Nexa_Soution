import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    const where = admin ? {} : { published: true };

    const news = await prisma.news.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, category, summary, content, author, imageUrl, published } = await req.json();

    if (!title || !summary || !content) {
      return NextResponse.json(
        { error: 'Title, summary, and content are required' },
        { status: 400 }
      );
    }

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newArticle = await prisma.news.create({
      data: {
        title,
        slug: uniqueSlug,
        category: category || 'Insight',
        summary,
        content,
        author: author || 'Nexa SBCC Team',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
        published: published !== undefined ? Boolean(published) : true,
      },
    });

    return NextResponse.json({ success: true, news: newArticle }, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
