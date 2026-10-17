import React from 'react';
import { PublicLayout } from '@/components/PublicLayout';
import { prisma } from '@/lib/prisma';
import { ServicesClient } from './ServicesClient';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Layers,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const revalidate = 0; // Ensure live database items appear immediately

export const metadata = {
  title: 'Services & Health Awareness Materials | Nexa Solutions Ethiopia',
  description: 'Explore our health awareness packages (PDF handbooks, PNG infographics, videos) and SBCC consulting services. Order via nexasolutionsethiopia@gmail.com.',
};

import { FALLBACK_SERVICES, ServiceItem } from '@/lib/fallbackData';

export default async function ServicesPage() {
  let services: ServiceItem[] = [];

  try {
    const dbServices = await prisma.service.findMany({
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
    services = dbServices.length > 0 ? (dbServices as unknown as ServiceItem[]) : FALLBACK_SERVICES;
  } catch (err) {
    console.warn('[ServicesPage] Database unavailable, rendering with resilient fallback data:', err);
    services = FALLBACK_SERVICES;
  }

  return (
    <PublicLayout>
      {/* Services Header */}
      <section className="hero" style={{ paddingBottom: '3rem' }}>
        <div className="container">
          <div className="hero-tag">
            <Sparkles size={16} />
            <span>03 | WHAT WE DO & WHAT WE PROVIDE</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>
            Health Awareness Materials &{' '}
            <span style={{ color: 'var(--c1-blue)' }}>SBCC Consulting.</span>
          </h1>
          <p className="hero-subtitle">
            We produce customized health awareness assets (PDF handbooks, visual PNG infographics, video spots) and provide end-to-end behavioral consulting for Ethiopian health programs.
          </p>
        </div>
      </section>

      {/* Main Interactive Catalog & Utilization Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <ServicesClient initialServices={services} />

          {/* Section 04: What a Client Actually Receives (Table from Page 5 of PDF) */}
          <div style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <div className="section-header">
              <span className="section-tag">Tangible Deliverables</span>
              <h2 className="section-title">04 | What a Client Actually Receives</h2>
              <p className="section-subtitle">
                The portfolio should make the deliverable tangible. Below is the kind of output Nexa Solutions develops or supports, depending on the assignment.
              </p>
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Core Domain</th>
                    <th>Tangible Deliverables (PDFs, Assets & Strategy)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700, color: 'var(--c1-blue)' }}>Research</td>
                    <td>
                      Research protocol • interview/FGD guides • stakeholder map • audience profiles • behavioral determinant analysis • insight report • recommendations
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: 'var(--c2-teal)' }}>Strategy</td>
                    <td>
                      Situation analysis • audience segmentation • behavioral objectives • communication objectives • theory/framework selection • channel strategy • implementation roadmap
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: 'var(--c1-blue)' }}>Creative</td>
                    <td>
                      Message matrix • message concepts • content briefs • campaign concepts • communication materials (bilingual PDFs, PNG infographics, videos) • pretesting plan • revision recommendations
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: 'var(--c2-teal)' }}>M&E / MEL</td>
                    <td>
                      Results framework • indicator matrix • monitoring tools • learning questions • reporting structure • data interpretation • adaptation recommendations
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: 'var(--c1-blue)' }}>Training</td>
                    <td>
                      Training needs assessment • facilitator guide • participant materials • session plans • practical exercises • post-training assessment
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem', fontStyle: 'italic' }}>
              Illustrative outputs shown in this portfolio are examples of how we structure consulting work. Final deliverables are tailored to the client's scope, evidence and budget.
            </p>
          </div>

          {/* Section 05: Example Matrix (Page 6 of PDF) */}
          <div className="card" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="badge badge-teal" style={{ marginBottom: '1rem' }}>05 | EXAMPLE OUTPUTS & MATRIX</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
              Behavioral Barrier & Message Job Matrix
            </h3>
            <p style={{ fontSize: '0.925rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
              Instead of filling the portfolio with generic stock images, we use simple visual artifacts to demonstrate how we think.
            </p>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Audience</th>
                    <th>Behavioral Barrier</th>
                    <th>Message Job</th>
                    <th>Channel Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Young Adults</td>
                    <td>Low perceived relevance</td>
                    <td>Make benefits personally meaningful</td>
                    <td>Peer + digital (PNG / Social)</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Partners / Families</td>
                    <td>Norm uncertainty</td>
                    <td>Build supportive expectations</td>
                    <td>Community + interpersonal</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Frontline Providers</td>
                    <td>Time & communication constraints</td>
                    <td>Enable concise, respectful counseling</td>
                    <td>Training + PDF Job Aids</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
