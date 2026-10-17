import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/PublicLayout';
import { Compass, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <PublicLayout>
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '520px', width: '100%' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--c1-blue-soft)',
            color: 'var(--c1-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <Compass size={36} />
          </div>

          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--c1-blue)', lineHeight: 1, marginBottom: '0.5rem' }}>
            404
          </h1>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
            Page Not Found
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
            The page or resource you are looking for doesn't exist or has been moved.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary btn-lg">
              <Home size={18} />
              <span>Return to Home</span>
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg">
              <span>View Services</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
