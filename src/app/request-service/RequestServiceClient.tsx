'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, Copy, ExternalLink, Send, ArrowRight, Sparkles, FileText, Image as ImageIcon, Video, ShieldCheck, Phone } from 'lucide-react';

export function RequestServiceClient() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    serviceType: 'Creative: Health Awareness Guidelines, PNG Infographics & Posters',
    targetAudience: 'Maternal, Youth, or Community Health',
    timeline: 'Within 1-3 months',
    projectScope: '',
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const svc = params.get('service');
      if (svc) {
        setFormData((prev) => ({
          ...prev,
          serviceType: svc,
          projectScope: prev.projectScope || `Requesting details and customized assets for: ${svc}`,
        }));
      }
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ mailtoUrl: string; refId: string; bodyText: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit service request');
      }

      const bodyText = `To: nexasolutionsethiopia@gmail.com\nSubject: [Service Request] ${formData.serviceType} - ${formData.organization || formData.name}\n\n` +
        `Client: ${formData.name}\n` +
        `Organization: ${formData.organization}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Service / Domain: ${formData.serviceType}\n` +
        `Target Audience: ${formData.targetAudience}\n` +
        `Timeline: ${formData.timeline}\n` +
        `Scope & Deliverables:\n${formData.projectScope}\n\n` +
        `Reference ID: NEXA-REQ-${data.inquiry.id.slice(-6).toUpperCase()}`;

      setSuccessData({
        mailtoUrl: data.mailtoUrl,
        refId: `NEXA-REQ-${data.inquiry.id.slice(-6).toUpperCase()}`,
        bodyText,
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please email nexasolutionsethiopia@gmail.com directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (successData?.bodyText) {
      navigator.clipboard.writeText(successData.bodyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      {!successData ? (
        <div className="card" style={{ padding: '3rem 2.5rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-orange">
              <Mail size={14} />
              <span>Service Utilization Form</span>
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Direct dispatch to nexasolutionsethiopia@gmail.com
            </span>
          </div>

          <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
            Request Nexa Solutions Services & Materials
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.975rem', lineHeight: 1.6 }}>
            Use this official form to request customized health awareness deliverables (health awareness guidelines, PNG infographics, posters, campaign videos) or SBCC strategies and research for your health program.
          </p>

          {error && (
            <div style={{ padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.875rem', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Your Name / Focal Person *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Dr. Abebe Tadesse"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Organization / Program</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Health NGO / Ministry / Initiative"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Work Email *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="name@organization.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone / WhatsApp</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+251 9..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Deliverable Domain / Requested Service *</label>
              <select
                className="form-select"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              >
                {formData.serviceType && ![
                  'Research: Formative Behavioral Research Protocol & Determinant Analysis',
                  'Strategy: SBCC Strategy Roadmap & Channel Architecture',
                  'Creative: Health Awareness Guidelines, PNG Infographics & Posters',
                  'Creative: Campaign Video Suites & Micro-Learning Spots',
                  'M&E: Results Framework, Indicator Matrix & Learning Questions',
                  'Training: Facilitator Guide, Participant Materials & Coaching',
                  'Multi-Domain: Full Health Awareness & SBCC Package',
                ].includes(formData.serviceType) && (
                  <option value={formData.serviceType}>
                    Selected: {formData.serviceType}
                  </option>
                )}
                <option value="Research: Formative Behavioral Research Protocol & Determinant Analysis">
                  Research — Formative Protocol, FGD Guides, Stakeholder Maps & Insight Reports
                </option>
                <option value="Strategy: SBCC Strategy Roadmap & Channel Architecture">
                  Strategy — Situation Analysis, Audience Segmentation & Implementation Roadmap
                </option>
                <option value="Creative: Health Awareness Guidelines, PNG Infographics & Posters">
                  Creative — Health Awareness Guidelines, PNG Infographics & Posters
                </option>
                <option value="Creative: Campaign Video Suites & Micro-Learning Spots">
                  Creative — Campaign Videos, Storyboards & Counseling Aids
                </option>
                <option value="M&E: Results Framework, Indicator Matrix & Learning Questions">
                  M&E / MEL — Indicator Matrix, Monitoring Tools & Learning System
                </option>
                <option value="Training: Facilitator Guide, Participant Materials & Coaching">
                  Training — Facilitator Guide, Session Plans & Frontline Worker Aids
                </option>
                <option value="Multi-Domain: Full Health Awareness & SBCC Package">
                  Comprehensive Suite — Full SBCC Strategy & Health Deliverables Package
                </option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Target Audience / Geographical Focus</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Young adults, pregnant mothers, rural health workers"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Timeline / Target Completion</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Immediate / 1-2 months / Q3"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project Scope & Deliverable Details *</label>
              <textarea
                required
                rows={5}
                className="form-textarea"
                placeholder="Please describe the health problem, target behavioral changes, required formats (e.g., guidelines, PNG infographics, posters, campaign videos), and language requirements (Amharic, Afaan Oromo, Tigrinya, English)..."
                value={formData.projectScope}
                onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Link href="/services" className="btn btn-outline">
                Back to Services & Materials
              </Link>
              <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
                {loading ? 'Submitting...' : (
                  <>
                    <span>Submit Service Request</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="card" style={{ padding: '3.5rem 2.5rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: 'var(--c1-blue-soft)',
            color: 'var(--c1-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
          }}>
            <CheckCircle2 size={40} />
          </div>

          <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
            Service Request Successfully Submitted!
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            Your official reference ID is <strong style={{ color: 'var(--c1-blue)' }}>{successData.refId}</strong>.
          </p>

          <div style={{
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            textAlign: 'left',
            marginBottom: '2rem',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
              Official Dispatch Address:
            </div>
            <div style={{ fontWeight: 800, color: 'var(--c1-blue)', fontSize: '1.2rem', wordBreak: 'break-all' }}>
              nexasolutionsethiopia@gmail.com
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Your request is logged in our database. Click below to also open a pre-filled email from your email application or copy the formatted brief.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            <a
              href={successData.mailtoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <Mail size={18} />
              <span>Open Pre-Filled Email Client</span>
              <ExternalLink size={16} />
            </a>

            <button
              onClick={handleCopy}
              className="btn btn-outline"
              style={{ width: '100%' }}
            >
              {copied ? <CheckCircle2 size={18} style={{ color: 'var(--c2-teal)' }} /> : <Copy size={18} />}
              <span>{copied ? 'Draft Copied to Clipboard!' : 'Copy Formatted Request Brief'}</span>
            </button>

            <button
              onClick={() => {
                setSuccessData(null);
                setFormData({
                  name: '',
                  organization: '',
                  email: '',
                  phone: '',
                  serviceType: 'Creative: Health Awareness Guidelines, PNG Infographics & Posters',
                  targetAudience: '',
                  timeline: '',
                  projectScope: '',
                });
              }}
              className="btn btn-outline"
              style={{ marginTop: '0.5rem', border: 'none' }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
