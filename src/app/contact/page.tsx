import React from 'react';
import { PublicLayout } from '@/components/PublicLayout';
import { ContactClient } from './ContactClient';

export const metadata = {
  title: 'Contact Us | Nexa Solutions Ethiopia',
  description: 'General inquiries for Nexa Solutions office in Addis Ababa, Ethiopia.',
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <ContactClient />
        </div>
      </section>
    </PublicLayout>
  );
}
