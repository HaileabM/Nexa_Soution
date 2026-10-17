'use client';

import React, { useState } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Layers,
  Download,
  Mail,
  CheckCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Filter,
  Eye,
} from 'lucide-react';
import { ServiceRequestModal } from '@/components/ServiceRequestModal';

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: string;
  shortDesc: string;
  description: string;
  features: string;
  fileUrl: string | null;
  imageUrl: string | null;
  priceInfo: string | null;
  isFeatured: boolean;
}

export function ServicesClient({ initialServices }: { initialServices: ServiceItem[] }) {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [selectedService, setSelectedService] = useState<{ title: string; type: string } | null>(null);
  const [previewMedia, setPreviewMedia] = useState<{ title: string; url: string; type: string } | null>(null);

  const filteredServices = initialServices.filter((s) => {
    if (filterType === 'ALL') return true;
    return s.type === filterType;
  });

  return (
    <>
      {/* Category / Type Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {[
          { label: 'All Deliverables', value: 'ALL', icon: <Layers size={15} /> },
          { label: 'Health Awareness PDFs', value: 'PDF', icon: <FileText size={15} /> },
          { label: 'Visuals & PNG Posters', value: 'IMAGE', icon: <ImageIcon size={15} /> },
          { label: 'Campaign Videos', value: 'VIDEO', icon: <Video size={15} /> },
          { label: 'Consulting Packages', value: 'PACKAGE', icon: <Sparkles size={15} /> },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilterType(btn.value)}
            className={`btn btn-sm ${filterType === btn.value ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.1rem' }}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid-3" style={{ marginBottom: '5rem' }}>
        {filteredServices.map((service) => (
          <div key={service.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Card Top / Thumbnail */}
            {service.imageUrl && (
              <div style={{
                height: '180px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                position: 'relative',
                backgroundColor: 'var(--bg-card-subtle)',
              }}>
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  <span className={`badge ${service.type === 'PDF' ? 'badge-blue' : service.type === 'VIDEO' ? 'badge-teal' : 'badge-neutral'}`}>
                    {service.type === 'PDF' && <FileText size={12} />}
                    {service.type === 'IMAGE' && <ImageIcon size={12} />}
                    {service.type === 'VIDEO' && <Video size={12} />}
                    {service.type}
                  </span>
                </div>
              </div>
            )}

            <div style={{ fontSize: '0.8rem', color: 'var(--c2-teal)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
              {service.category}
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', lineHeight: 1.25 }}>
              {service.title}
            </h3>

            <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1 }}>
              {service.shortDesc}
            </p>

            {/* Included Deliverables */}
            {service.features && (
              <div style={{
                marginBottom: '1.5rem',
                backgroundColor: 'var(--bg-card-subtle)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Core Deliverables
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {service.features.split(';').map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <CheckCircle size={14} style={{ color: 'var(--c1-blue)', marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-main)' }}>{feat.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginTop: 'auto',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--c1-blue)' }}>
                  {service.priceInfo || 'Direct Inquiry Package'}
                </span>

                {service.fileUrl && (
                  <a
                    href={service.fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    title="Download Preview Material"
                  >
                    <Download size={14} />
                    <span>Sample File</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedService({ title: service.title, type: service.type })}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <Mail size={16} />
                <span>Utilize / Order Service</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* =================================================================
          DEDICATED SERVICE UTILIZATION EMAIL PORTAL (Section #utilize)
          ================================================================= */}
      <section id="utilize" style={{
        backgroundColor: 'var(--bg-card)',
        border: '2px solid var(--c1-blue-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '3.5rem 2rem',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '4rem',
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--c1-blue-soft)', color: 'var(--c1-blue)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
            <Mail size={16} />
            <span>Dedicated Service Utilization Channel</span>
          </div>

          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Request & Utilize Nexa Solutions Services
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
            This portal is specifically for <strong>requesting our SBCC consulting services and ordering health awareness materials</strong> (PDFs, high-resolution PNG infographics, and campaign videos). All service procurement requests are directed to our official service desk:
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '2px solid var(--c1-blue)',
            marginBottom: '2rem',
          }}>
            <Mail size={22} style={{ color: 'var(--c1-blue)' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c1-blue)' }}>
              nexasolutionsethiopia@gmail.com
            </span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Click below to generate a formatted project brief, receive a tracking reference code, and send it directly via email to our team.
          </p>

          <button
            onClick={() => setSelectedService({ title: 'Full Health Awareness Deliverable & SBCC Consulting', type: 'CONSULTING' })}
            className="btn btn-primary btn-lg"
          >
            <Sparkles size={18} />
            <span>Launch Service Utilization Form</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Service Request Modal */}
      {selectedService && (
        <ServiceRequestModal
          isOpen={Boolean(selectedService)}
          onClose={() => setSelectedService(null)}
          preselectedService={selectedService.title}
          preselectedType={selectedService.type}
        />
      )}
    </>
  );
}
