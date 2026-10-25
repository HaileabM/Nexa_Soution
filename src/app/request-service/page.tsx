import React from 'react';
import { PublicLayout } from '@/components/PublicLayout';
import { RequestServiceClient } from './RequestServiceClient';
import { Sparkles, Mail, CheckCircle, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Request Service | Nexa Solutions Ethiopia',
  description: 'Submit your requirement for customized health awareness materials (guidelines, PNG infographics, posters, campaign videos) or SBCC strategies.',
};

export default function RequestServicePage() {
  return (
    <PublicLayout>
      <section className="hero" style={{ paddingBottom: '2.5rem' }}>
        <div className="container">
          <div className="hero-tag">
            <Sparkles size={16} />
            <span>NEXA SOLUTIONS • SERVICE REQUEST DESK</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>
            Request <span style={{ color: 'var(--c1-blue)' }}>Service</span>
          </h1>
          <p className="hero-subtitle">
            Directly submit your scope for health awareness packages, guidelines, PNG infographics, posters, campaign videos, or SBCC strategies.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '1rem' }}>
        <div className="container">
          <RequestServiceClient />
        </div>
      </section>
    </PublicLayout>
  );
}
