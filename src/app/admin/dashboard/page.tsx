import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { DashboardClient } from './DashboardClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Admin Dashboard | Nexa Solutions',
  description: 'Administrative portal for managing services, news, and service utilization inquiries.',
};

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  // Load live data from Prisma SQLite with try/catch safeguard
  let services: any[] = [];
  let newsList: any[] = [];
  let inquiries: any[] = [];
  let isDbOk = false;

  try {
    const results = await Promise.all([
      prisma.service.findMany({
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      }),
      prisma.news.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.serviceInquiry.findMany({
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    services = results[0];
    newsList = results[1];
    inquiries = results[2];
    isDbOk = true;
  } catch (err) {
    console.warn('[AdminDashboardPage] Database queries failed, loading fallback data:', err);
  }

  if (!isDbOk) {
    const { FALLBACK_SERVICES, FALLBACK_NEWS } = await import('@/lib/fallbackData');
    services = FALLBACK_SERVICES as any[];
    newsList = FALLBACK_NEWS as any[];
  }

  return (
    <DashboardClient
      adminUser={{
        id: admin.userId,
        username: admin.username,
        name: admin.name,
        role: admin.role,
      }}
      initialServices={JSON.parse(JSON.stringify(services))}
      initialNews={JSON.parse(JSON.stringify(newsList))}
      initialInquiries={JSON.parse(JSON.stringify(inquiries))}
    />
  );
}
