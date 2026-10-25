'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, ShieldCheck, Phone, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col with Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src="/nexa-logo-transparent.png"
                alt="Nexa Solutions Logo"
                style={{
                  height: '42px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
              <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                <span style={{ color: 'var(--c1-blue)' }}>Nexa</span> <span style={{ color: 'var(--c2-teal)' }}>Solutions</span>
              </span>
            </div>
            <p style={{ fontSize: '0.925rem', marginBottom: '1.25rem', maxWidth: '320px' }}>
              Evidence-informed Social and Behavior Change Communication (SBCC), research, strategy, and health awareness media for Ethiopian health programs.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--c1-blue-soft)', color: 'var(--c1-blue)', border: '1px solid var(--c1-blue-border)', fontSize: '0.8rem', fontWeight: 700 }}>
              <span>Evidence • Creativity • Impact</span>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', fontWeight: 700 }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/" className="nav-link">Home</Link></li>
              <li><Link href="/about" className="nav-link">About Nexa Solutions</Link></li>
              <li><Link href="/services" className="nav-link">Services & Deliverables</Link></li>
              <li><Link href="/request-service" className="nav-link">Request Service Form</Link></li>
              <li><Link href="/contact" className="nav-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Core Domains (Page 5 Classification) */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', fontWeight: 700 }}>Our Deliverables</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li>Formative & Behavioral Research</li>
              <li>SBCC Strategy Roadmaps</li>
              <li>Health Awareness Guidelines</li>
              <li>PNG Infographics & Posters</li>
              <li>Campaign Videos & Counseling Aids</li>
              <li>M&E Frameworks & Learning Tools</li>
              <li>Facilitator Guides & Training Aids</li>
            </ul>
          </div>

          {/* Contact Us Via Column */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '1.25rem', fontWeight: 700, color: 'var(--c1-blue)' }}>
              Contact Us Via
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Email */}
              <a
                href="mailto:nexasolutionsethiopia@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--c1-blue)',
                  wordBreak: 'break-all',
                }}
              >
                <Mail size={16} style={{ flexShrink: 0 }} />
                <span>nexasolutionsethiopia@gmail.com</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+251911234567"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                }}
              >
                <Phone size={16} style={{ color: 'var(--c2-teal)', flexShrink: 0 }} />
                <span>+251 911 23 45 67</span>
              </a>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <MapPin size={16} style={{ color: 'var(--c3-purple)', flexShrink: 0 }} />
                <span>Addis Ababa, Ethiopia</span>
              </div>

              {/* Social Media Links */}
              <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Social Media Links
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <a
                    href="https://t.me/nexasolutionsethiopia"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-main)',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </a>

                  <a
                    href="https://linkedin.com/company/nexa-solutions-ethiopia"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-main)',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                    </svg>
                  </a>

                  <a
                    href="https://facebook.com/nexasolutionsethiopia"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-main)',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                    </svg>
                  </a>

                  <a
                    href="https://x.com/nexasolutionset"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter / X"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-main)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Access */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Nexa Solutions. All rights reserved. For healthier and stronger Ethiopia.
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
