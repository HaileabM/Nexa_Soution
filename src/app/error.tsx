'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error with digest for debugging
    console.error('Captured application error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div className="card" style={{
        maxWidth: '540px',
        width: '100%',
        textAlign: 'center',
        padding: '3rem 2rem',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <AlertTriangle size={32} />
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Something went wrong
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          We encountered an unexpected error while loading this content. Please try again or return to the homepage.
        </p>

        {error.digest && (
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
            backgroundColor: 'var(--bg-main)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '2rem',
            wordBreak: 'break-all',
          }}>
            Error Reference ID: {error.digest}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => reset()}
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Home size={16} />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
