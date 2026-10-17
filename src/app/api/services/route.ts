import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (category && category !== 'ALL') where.category = category;
    if (type && type !== 'ALL') where.type = type;
    if (featured === 'true') where.isFeatured = true;

    const services = await prisma.service.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { title, category, type, shortDesc, description, features, fileUrl, imageUrl, priceInfo, isFeatured } = data;

    if (!title || !shortDesc || !description) {
      return NextResponse.json({ error: 'Title, short description and full description are required' }, { status: 400 });
    }

    // Generate unique slug
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newService = await prisma.service.create({
      data: {
        title,
        slug: uniqueSlug,
        category: category || 'Consulting',
        type: type || 'CONSULTING',
        shortDesc,
        description,
        features: features || '',
        fileUrl: fileUrl || null,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
        priceInfo: priceInfo || 'Custom Consultation / Inquire via Email',
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
