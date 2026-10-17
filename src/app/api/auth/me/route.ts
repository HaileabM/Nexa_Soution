import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    let user: any = null;
    try {
      user = await prisma.user.findUnique({
        where: { id: admin.userId },
        select: { id: true, username: true, name: true, role: true, createdAt: true },
      });
    } catch (dbErr) {
      console.warn('[api/auth/me] Database query failed, using token payload:', dbErr);
    }

    const safeUser = user || {
      id: admin.userId,
      username: admin.username,
      name: admin.name || 'Administrator',
      role: admin.role || 'ADMIN',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ authenticated: true, user: safeUser });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
