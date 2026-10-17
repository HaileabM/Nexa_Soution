import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth';

export default async function AdminRootPage() {
  const admin = await getCurrentAdmin();
  if (admin) {
    redirect('/admin/dashboard');
  } else {
    redirect('/admin/login');
  }
}
