'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Send, CheckCircle2, ArrowRight, MessageSquare, Clock } from 'lucide-react';

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid-2" style={{ gap: '3.5rem', alignItems: 'flex-start' }}>
      {/* Left Info Column */}
      <div>
        <span className="section-tag">General Inquiries</span>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>
          Connect with Nexa Solutions Office
        </h2>
        <p style={{ fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7 }}>
          Have general questions about our organization, research partnerships, or upcoming health communication initiatives? Reach out to our secretariat.
        </p>

        {/* Notice differentiating from Service Utilization */}
        <div style={{
          backgroundColor: 'var(--c1-blue-soft)',
          border: '1px solid var(--c1-blue-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--c1-blue)', marginBottom: '0.35rem' }}>
            <Mail size={16} />
            <span>Need to Order Health Materials or Hire Our SBCC Services?</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            For service utilization (ordering health awareness PDFs, photos, PNG infographics, or video campaigns), use our dedicated service channel:
          </p>
          <Link href="/services#utilize" className="btn btn-primary btn-sm">
            <span>Go to Service Utilization Portal</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Office Contact Meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--c1-blue-soft)', color: 'var(--c1-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Physical Location</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Addis Ababa, Ethiopia</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--c2-teal-soft)', color: 'var(--c2-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Mail size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Official Service Desk</div>
              <div style={{ color: 'var(--c1-blue)', fontSize: '0.9rem', fontWeight: 600 }}>
                nexasolutionsethiopia@gmail.com
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--c1-blue-soft)', color: 'var(--c1-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>Working Hours</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Monday – Friday, 8:30 AM – 5:30 PM (EAT)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Card */}
      <div className="card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
          Send General Message
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
          For partnerships, inquiries, and media. We respond within 24–48 hours.
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--c2-teal-soft)', color: 'var(--c2-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={32} />
            </div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Thank You for Reaching Out!</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Your message has been received by our office team. We will get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn btn-outline"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="your.email@organization.org"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Partnership inquiry, research collaboration"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea
                required
                rows={5}
                className="form-textarea"
                placeholder="How can we assist you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {loading ? 'Sending...' : (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
