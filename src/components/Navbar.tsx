'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, ArrowRight, Shield } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If in admin dashboard, we use a specialized admin nav
  const isAdminRoute = pathname?.startsWith('/admin');

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services & Materials', href: '/services' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'var(--c1-blue-soft)',
              border: '1px solid var(--c1-blue-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--c1-blue)',
            }}>
              <svg width="26" height="26" viewBox="0 0 40 40" fill="currentColor">
                <circle cx="20" cy="11" r="5" fill="var(--c1-blue)" />
                <path d="M10 32 C10 24 14 20 20 20 C26 20 30 24 30 32 Z" fill="var(--c1-blue)" opacity="0.9" />
                <circle cx="10" cy="16" r="3.5" fill="var(--c2-teal)" />
                <path d="M4 33 C4 27 7 24 11 24 C13 26 14 28 14 33 Z" fill="var(--c2-teal)" />
                <circle cx="30" cy="16" r="3.5" fill="var(--c2-teal)" />
                <path d="M36 33 C36 27 33 24 29 24 C27 26 26 28 26 33 Z" fill="var(--c2-teal)" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Nexa <span style={{ color: 'var(--c1-blue)' }}>Solutions</span>
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--c2-teal)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                SBCC Consulting • Ethiopia
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav>
            <ul className="nav-links">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Items */}
          <div className="nav-actions">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Request Service Quick Button */}
            <Link href="/services#utilize" className="btn btn-primary btn-sm nav-cta-btn">
              <span>Utilize Services</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="mobile-menu-btn"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: '800', fontSize: '1.2rem' }}>
              Nexa <span style={{ color: 'var(--c1-blue)' }}>Solutions</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                  color: pathname === link.href ? 'var(--c1-blue)' : 'var(--text-main)',
                  backgroundColor: pathname === link.href ? 'var(--c1-blue-soft)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link
              href="/services#utilize"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Utilize Our Services
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Theme Mode</span>
              <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
