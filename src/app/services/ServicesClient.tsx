'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Layers,
  Download,
  CheckCircle,
  Sparkles,
  Search,
  BrainCircuit,
  BarChart3,
  Users,
  Mail,
  ArrowRight,
} from 'lucide-react';

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
  isFeatured: boolean;
}

export function ServicesClient({ initialServices }: { initialServices: ServiceItem[] }) {
  const [filterDomain, setFilterDomain] = useState<string>('ALL');

  // Filter based on Page 5 Core Domains (Research, Strategy, Creative, M&E, Training)
  const filteredServices = initialServices.filter((s) => {
    if (filterDomain === 'ALL') return true;
    return s.category?.toLowerCase() === filterDomain.toLowerCase();
  });

  return (
    <>
      {/* Classification Filter Bar Using Page 5 Core Domains */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {[
          { label: 'All Deliverables', value: 'ALL', icon: <Layers size={15} /> },
          { label: 'Research', value: 'Research', icon: <Search size={15} /> },
          { label: 'Strategy', value: 'Strategy', icon: <BrainCircuit size={15} /> },
          { label: 'Creative', value: 'Creative', icon: <Sparkles size={15} /> },
          { label: 'M&E', value: 'M&E', icon: <BarChart3 size={15} /> },
          { label: 'Training', value: 'Training', icon: <Users size={15} /> },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilterDomain(btn.value)}
            className={`btn btn-sm ${filterDomain === btn.value ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.15rem' }}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Deliverables Grid Showcase (Prior Model Works & Developed Materials) */}
      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        {filteredServices.map((service) => (
          <div key={service.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Card Thumbnail */}
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
                  <span className={`badge ${service.category === 'Research' ? 'badge-orange' : service.category === 'Strategy' ? 'badge-teal' : service.category === 'M&E' ? 'badge-purple' : 'badge-neutral'}`}>
                    {service.category}
                  </span>
                </div>
              </div>
            )}

            <div style={{ fontSize: '0.8rem', color: 'var(--c2-teal)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
              {service.category} Deliverable
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {service.title}
            </h3>

            <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1 }}>
              {service.shortDesc}
            </p>

            {/* Core Tangible Outputs Included */}
            {service.features && (
              <div style={{
                marginBottom: '1.5rem',
                backgroundColor: 'var(--bg-card-subtle)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Model Outputs & Materials
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

            {/* Bottom: Sample Material Preview / Download & Direct Utilization Request */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              <div>
                {service.fileUrl ? (
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
                ) : (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Demonstration Material
                  </span>
                )}
              </div>

              <Link
                href={`/request-service?service=${encodeURIComponent(service.title)}`}
                className="btn btn-primary btn-sm"
                title={`Request customized ${service.title}`}
              >
                <Mail size={13} />
                <span>Request Deliverable</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
