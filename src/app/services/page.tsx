import React from 'react';
import { PublicLayout } from '@/components/PublicLayout';
import { prisma } from '@/lib/prisma';
import { ServicesClient } from './ServicesClient';
import {
  FileText,
  Sparkles,
  ArrowRight,
  Search,
  BrainCircuit,
  PenTool,
  BarChart3,
  Users,
} from 'lucide-react';
import { FALLBACK_SERVICES, ServiceItem } from '@/lib/fallbackData';

export const revalidate = 0; // Ensure live database items appear immediately

export const metadata = {
  title: 'Services & Deliverables | Nexa Solutions Ethiopia',
  description: 'Explore what clients receive across Research, Strategy, Creative, M&E, and Training, and browse model health awareness materials.',
};

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
            Services & Health Awareness{' '}
            <span style={{ color: 'var(--c1-blue)' }}>Deliverables.</span>
          </h1>
          <p className="hero-subtitle">
            We provide evidence-informed behavioral strategies and develop customized health awareness assets (guidelines, PNG infographics, posters, campaign videos).
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '2rem' }}>
        <div className="container">
          {/* Section: What a Client Actually Receives (Brought ABOVE Deliverables) */}
          <div style={{ marginBottom: '4.5rem' }}>
            <div className="section-header" style={{ marginBottom: '2.5rem' }}>
              <span className="section-tag">Tangible Deliverables</span>
              <h2 className="section-title">What a Client Actually Receives</h2>
              <p className="section-subtitle">
                Below is the kind of output Nexa Solutions develops or supports, depending on the assignment.
              </p>
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Core Domain</th>
                    <th>Tangible Deliverables (Guidelines, Assets & Strategies)</th>
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
                      Message matrix • message concepts • content briefs • campaign concepts • communication materials (bilingual guidelines, PNG infographics, posters, videos) • pretesting plan • revision recommendations
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: 'var(--c3-purple)' }}>M&E / MEL</td>
                    <td>
                      Results framework • indicator matrix • monitoring tools • learning questions • reporting structure • data interpretation • adaptation recommendations
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: 'var(--c2-teal)' }}>Training</td>
                    <td>
                      Training needs assessment • facilitator guide • participant materials • session plans • practical exercises • post-training assessment
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.85rem', fontStyle: 'italic' }}>
              Illustrative outputs shown in this portfolio are examples of how we structure strategy and creative work. Final deliverables are tailored to the client's scope, evidence and budget.
            </p>
          </div>

          {/* Section: Deliverables Showcase (Categorized using Page 5) */}
          <div style={{ marginBottom: '2rem' }}>
            <div className="section-header" style={{ marginBottom: '2.5rem' }}>
              <span className="section-tag">Model Materials</span>
              <h2 className="section-title">Prior Model Works & Materials Developed</h2>
              <p className="section-subtitle">
                Classified by core consulting domains from Page 5 of our portfolio. Explore sample guidelines, PNG visual assets, and intervention packages.
              </p>
            </div>

            <ServicesClient initialServices={services} />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
