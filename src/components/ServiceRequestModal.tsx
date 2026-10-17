'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Copy, ExternalLink, X, Send, FileText, Image, Video, Sparkles } from 'lucide-react';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedType?: string;
}

export function ServiceRequestModal({
  isOpen,
  onClose,
  preselectedService = '',
  preselectedType = 'CONSULTING',
}: ServiceRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    serviceType: preselectedService || 'Health Awareness Materials Package',
    targetAudience: 'Maternal, Youth, or Community health',
    timeline: 'Within 1-3 months',
    projectScope: '',
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ mailtoUrl: string; refId: string; bodyText: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

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
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      const bodyText = `To: nexasolutionsethiopia@gmail.com\nSubject: [Service Request] ${formData.serviceType} - ${formData.organization || formData.name}\n\n` +
        `Client: ${formData.name}\n` +
        `Organization: ${formData.organization}\n` +
        `Email: ${formData.email}\n` +
        `Service: ${formData.serviceType}\n` +
        `Scope:\n${formData.projectScope}\n\n` +
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!successData ? (
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--c1-blue-soft)', color: 'var(--c1-blue)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              <Mail size={14} />
              <span>Official Service Utilization Portal</span>
            </div>

            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Utilize Our Services & Health Materials
            </h3>
            <p style={{ fontSize: '0.925rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
              Order health awareness PDFs, photos/PNG infographics, campaign videos, or engage our SBCC consulting team directly through <strong>nexasolutionsethiopia@gmail.com</strong>.
            </p>

            {error && (
              <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
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
                <label className="form-label">Requested Service or Awareness Asset *</label>
                <select
                  className="form-select"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                >
                  <option value="Health Awareness Materials Package (PDF, PNG, Video)">Health Awareness Materials Package (PDF, PNG, Video)</option>
                  <option value="Maternal & Newborn Health Communication Suite">Maternal & Newborn Health Communication Suite</option>
                  <option value="Youth HIV Prevention & Testing Content Pack">Youth HIV Prevention & Testing Content Pack</option>
                  <option value="Positive Fatherhood & Healthy Relationships Toolkit">Positive Fatherhood & Healthy Relationships Toolkit</option>
                  <option value="Formative Behavioral Research & Determinant Mapping">Formative Behavioral Research & Determinant Mapping</option>
                  <option value="End-to-End SBCC Strategy Blueprint">End-to-End SBCC Strategy Blueprint</option>
                  <option value="High-Res PNG Infographics & Digital Posters">High-Res PNG Infographics & Digital Posters</option>
                  <option value="Community Health Worker Training Videos">Community Health Worker Training Videos</option>
                  <option value="Technical Review / Facilitation Workshop">Technical Review / Facilitation Workshop</option>
                  <option value="Custom Health Awareness Deliverable">Custom Health Awareness Deliverable</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Target Audience / Focus</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Young adults, mothers, rural providers"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Timeline / Urgency</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 1 month / Immediate / Q2"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Scope & Deliverable Requirements *</label>
                <textarea
                  required
                  rows={4}
                  className="form-textarea"
                  placeholder="Describe your health objective, required file types (e.g. PDF guides, PNG posters, video scripts), language preferences (Amharic, Afaan Oromo, English), and deliverables..."
                  value={formData.projectScope}
                  onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={onClose} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? 'Processing...' : (
                    <>
                      <span>Submit & Generate Email</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--c2-teal-soft)',
              color: 'var(--c2-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              Service Request Prepared!
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              Your request reference is <strong style={{ color: 'var(--c1-blue)' }}>{successData.refId}</strong> and has been recorded.
            </p>

            <div style={{
              backgroundColor: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '1.75rem',
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                Direct Dispatch to Nexa Solutions:
              </div>
              <div style={{ fontWeight: 700, color: 'var(--c1-blue)', fontSize: '1.1rem', wordBreak: 'break-all' }}>
                nexasolutionsethiopia@gmail.com
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Click below to launch your pre-filled email client, or copy the formatted brief.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={successData.mailtoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <Mail size={18} />
                <span>Open Pre-Filled Email (nexasolutionsethiopia@gmail.com)</span>
                <ExternalLink size={16} />
              </a>

              <button
                onClick={handleCopy}
                className="btn btn-outline"
                style={{ width: '100%' }}
              >
                {copied ? <CheckCircle2 size={18} style={{ color: 'var(--c2-teal)' }} /> : <Copy size={18} />}
                <span>{copied ? 'Draft Copied to Clipboard!' : 'Copy Formatted Email Brief'}</span>
              </button>

              <button
                onClick={() => {
                  setSuccessData(null);
                  onClose();
                }}
                className="btn btn-outline"
                style={{ marginTop: '0.5rem', border: 'none' }}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
