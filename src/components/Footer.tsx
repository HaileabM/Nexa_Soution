'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, ShieldCheck, HeartHandshake, ArrowUpRight, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'var(--c1-blue-soft)',
                border: '1px solid var(--c1-blue-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--c1-blue)',
              }}>
                <HeartHandshake size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                Nexa <span style={{ color: 'var(--c1-blue)' }}>Solutions</span>
              </span>
            </div>
            <p style={{ fontSize: '0.925rem', marginBottom: '1.25rem', maxWidth: '320px' }}>
              Evidence-informed Social and Behavior Change Communication (SBCC), research, strategy, and health awareness production for Ethiopian development initiatives.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--c2-teal-soft)', color: 'var(--c2-teal)', border: '1px solid var(--c2-teal-border)', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>Evidence • Creativity • Impact</span>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', fontWeight: 700 }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/" className="nav-link">Home</Link></li>
              <li><Link href="/about" className="nav-link">About Nexa Solutions</Link></li>
              <li><Link href="/services" className="nav-link">Services & Health Materials</Link></li>
              <li><Link href="/contact" className="nav-link">Contact General Office</Link></li>
            </ul>
          </div>

          {/* Services & Materials */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', fontWeight: 700 }}>Our Deliverables</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li>Formative & Behavioral Research</li>
              <li>SBCC Strategy Roadmaps</li>
              <li>Health Awareness PDFs & Toolkits</li>
              <li>Behavior Change PNG Infographics</li>
              <li>Educational Videos & Media</li>
              <li>Frontline Worker Training Aids</li>
            </ul>
          </div>

          {/* Service Utilization Notice */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', fontWeight: 700 }}>Service Orders & Inquiries</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
              To utilize our consulting services or procure tailored health awareness materials (PDF, visuals, videos):
            </p>
            <a
              href="mailto:nexasolutionsethiopia@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 0.95rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c1-blue-soft)',
                border: '1px solid var(--c1-blue-border)',
                color: 'var(--c1-blue)',
                fontWeight: 600,
                fontSize: '0.85rem',
                wordBreak: 'break-all',
              }}
            >
              <Mail size={16} />
              <span>nexasolutionsethiopia@gmail.com</span>
            </a>

            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <MapPin size={16} style={{ color: 'var(--c2-teal)', flexShrink: 0 }} />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Access */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Nexa Solutions SBCC. All rights reserved. For healthier and stronger Ethiopia.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link
              href="/admin/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--text-muted)',
                fontSize: '0.825rem',
                transition: 'var(--transition)',
              }}
              title="Admin Portal"
            >
              <ShieldCheck size={14} style={{ color: 'var(--c1-blue)' }} />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
