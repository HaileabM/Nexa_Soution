import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin, comparePassword, hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Both current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    let user: any = null;
    try {
      user = await prisma.user.findUnique({
        where: { id: admin.userId },
      });
    } catch (dbErr) {
      console.warn('[change-password] Database unavailable:', dbErr);
    }

    if (!user) {
      // In serverless fallback mode without persistent DB
      const fallbackPassword = process.env.ADMIN_PASSWORD || 'nexaAdmin2026!';
      if (currentPassword !== fallbackPassword) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }
      return NextResponse.json({
        error: 'Database is in serverless demo mode. To persist new passwords across deployments, connect a PostgreSQL database (e.g. Supabase, Neon) or configure the ADMIN_PASSWORD environment variable in Vercel.',
      }, { status: 400 });
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    const hashedNew = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: admin.userId },
      data: { password: hashedNew },
    });

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
}
