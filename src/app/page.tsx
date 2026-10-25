import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/PublicLayout';
import { prisma } from '@/lib/prisma';
import {
  FileText,
  Image as ImageIcon,
  Video,
  ArrowRight,
  Sparkles,
  CheckCircle,
  BrainCircuit,
  TrendingUp,
  Mail,
  Layers,
  Search,
  PenTool,
  BarChart3,
  Users,
  Wrench,
  Download,
} from 'lucide-react';

import { FALLBACK_SERVICES, FALLBACK_NEWS, ServiceItem, NewsItem } from '@/lib/fallbackData';

export const revalidate = 0; // Fresh data for dynamic news and services

export default async function HomePage() {
  let featuredServices: ServiceItem[] = [];
  let recentNews: NewsItem[] = [];

  try {
    const [dbServices, dbNews] = await Promise.all([
      prisma.service.findMany({
        where: { isFeatured: true },
        take: 4,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.news.findMany({
        where: { published: true },
        take: 3,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    featuredServices = dbServices.length > 0 ? (dbServices as unknown as ServiceItem[]) : FALLBACK_SERVICES.filter((s) => s.isFeatured).slice(0, 4);
    recentNews = dbNews.length > 0 ? (dbNews as unknown as NewsItem[]) : FALLBACK_NEWS.slice(0, 3);
  } catch (err) {
    console.warn('[HomePage] Database unavailable, rendering with resilient fallback data:', err);
    featuredServices = FALLBACK_SERVICES.filter((s) => s.isFeatured).slice(0, 4);
    recentNews = FALLBACK_NEWS.slice(0, 3);
  }

  return (
    <PublicLayout>
      {/* =================================================================
          HERO SECTION
          ================================================================= */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag">
            <Sparkles size={16} />
            <span>Nexa Solutions • SBCC Strategies Ethiopia</span>
          </div>

          <h1 className="hero-title">
            Turning evidence to <span style={{ color: 'var(--c1-blue)' }}>practical solutions.</span>
          </h1>

          <p className="hero-subtitle">
            Evidence-informed Social and Behavior Change Communication (SBCC), research, strategy, and health awareness media for health and development programs across Ethiopia.
          </p>

          <div className="hero-actions">
            <Link href="/request-service" className="btn btn-primary btn-lg">
              <Mail size={18} />
              <span>Request Service</span>
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg">
              <span>Explore Materials & Packages</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================
          3 PILLARS SECTION (Evidence • Creativity • Impact)
          ================================================================= */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Core Foundation</span>
            <h2 className="section-title">Evidence • Creativity • Impact</h2>
            <p className="section-subtitle">
              We help organizations move beyond the question of "How do we communicate this?" to what truly drives real-world behavior change.
            </p>
          </div>

          <div className="grid-3">
            {/* Pillar 1: EVIDENCE */}
            <div className="card">
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c1-blue-soft)',
                color: 'var(--c1-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}>
                <BrainCircuit size={28} />
              </div>
              <div className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>01 — Understand</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>EVIDENCE</h3>
              <p style={{ marginBottom: '1.25rem' }}>
                We start with people, context, data and behavioral insight grounded in qualitative and quantitative research.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c1-blue)' }} />
                  <span>Formative behavioral research</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c1-blue)' }} />
                  <span>Barrier & facilitator mapping</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c1-blue)' }} />
                  <span>Audience segmentation</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: CREATIVITY */}
            <div className="card">
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c2-teal-soft)',
                color: 'var(--c2-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}>
                <Sparkles size={28} />
              </div>
              <div className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>02 — Design</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>CREATIVITY</h3>
              <p style={{ marginBottom: '1.25rem' }}>
                We translate insight into clear, relevant and engaging communication tailored to Ethiopia's diverse cultural fabric.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c2-teal)' }} />
                  <span>Health awareness guidelines</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c2-teal)' }} />
                  <span>PNG info graphics and posters</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c2-teal)' }} />
                  <span>Campaign videos</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: IMPACT */}
            <div className="card">
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c3-purple-soft)',
                color: 'var(--c3-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}>
                <TrendingUp size={28} />
              </div>
              <div className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>03 — Measure</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>IMPACT</h3>
              <p style={{ marginBottom: '1.25rem' }}>
                We connect communication work to measurable behavioral and program outcomes. What evidence tells us change is happening?
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c3-purple)' }} />
                  <span>Results & indicator frameworks</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c3-purple)' }} />
                  <span>Pre-testing & rapid iterations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          WHAT WE DO (Contents from Page 4 of Portfolio Document)
          ================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Our SBCC Approach & Core Offerings</h2>
            <p className="section-subtitle">
              Our services are designed around the work a client actually needs—not around abstract consulting labels.
            </p>
          </div>

          <div className="grid-3">
            {/* Domain 1: Formative & Behavioral Research */}
            <div className="card" style={{ borderLeft: '4px solid var(--c1-blue)' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c1-blue-soft)',
                color: 'var(--c1-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <Search size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Formative & Behavioral Research
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                Understand audiences, determinants, barriers, facilitators, norms, journeys and information ecosystems.
              </p>
            </div>

            {/* Domain 2: SBCC Strategy */}
            <div className="card" style={{ borderLeft: '4px solid var(--c2-teal)' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c2-teal-soft)',
                color: 'var(--c2-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <BrainCircuit size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                SBCC Strategy
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                Translate evidence into behavioral objectives, audience segments, strategic approaches, channels and implementation plans.
              </p>
            </div>

            {/* Domain 3: Message & Creative Development */}
            <div className="card" style={{ borderLeft: '4px solid var(--c1-blue)' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c1-blue-soft)',
                color: 'var(--c1-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <PenTool size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Message & Creative Development
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                Turn strategy into message architecture, content concepts, briefs, materials and pretesting plans.
              </p>
            </div>

            {/* Domain 4: Monitoring, Evaluation & Learning */}
            <div className="card" style={{ borderLeft: '4px solid var(--c3-purple)' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c3-purple-soft)',
                color: 'var(--c3-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Monitoring, Evaluation & Learning
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                Build indicators, learning questions, monitoring tools and evidence-to-action recommendations.
              </p>
            </div>

            {/* Domain 5: Training & Capacity Building */}
            <div className="card" style={{ borderLeft: '4px solid var(--c2-teal)' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c2-teal-soft)',
                color: 'var(--c2-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Training & Capacity Building
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                Practical training, facilitation and technical support for teams implementing communication and behavior change work.
              </p>
            </div>

            {/* Domain 6: Technical / Short-Term Support */}
            <div className="card" style={{ borderLeft: '4px solid var(--c1-blue)' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--c1-blue-soft)',
                color: 'var(--c1-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <Wrench size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Technical / Short-Term Support
              </h3>
              <p style={{ fontSize: '0.9rem' }}>
                Focused support for proposals, research tools, strategy reviews, content development and selected technical deliverables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          DELIVERABLES SHOWCASE (Prior Model Works & Materials Developed)
          ================================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="section-tag">Deliverables Showcase</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Prior Model Works & Developed Materials
              </h2>
              <p className="section-subtitle">
                Examples of communication packages, health awareness guidelines, PNG infographics, and campaign assets developed by our team.
              </p>
            </div>

            <Link href="/services" className="btn btn-outline">
              <span>View All Materials</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-2">
            {featuredServices.map((service) => (
              <div key={service.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className={`badge ${service.type === 'PDF' ? 'badge-orange' : service.type === 'VIDEO' ? 'badge-teal' : 'badge-neutral'}`}>
                    {service.type === 'PDF' && <FileText size={12} />}
                    {service.type === 'IMAGE' && <ImageIcon size={12} />}
                    {service.type === 'VIDEO' && <Video size={12} />}
                    {service.type}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--c2-teal)', fontWeight: 600 }}>
                    {service.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>{service.title}</h3>
                <p style={{ fontSize: '0.925rem', marginBottom: '1.25rem', flex: 1 }}>{service.shortDesc}</p>

                {service.features && (
                  <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-card-subtle)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      Included Deliverables
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      {service.features.split(';').slice(0, 3).join(' • ')}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Model Work Sample
                  </span>
                  {service.fileUrl && (
                    <a
                      href={service.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <Download size={14} />
                      <span>View Sample</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          LATEST NEWS & HEALTH INSIGHTS SECTION
          ================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Updates & Analysis</span>
            <h2 className="section-title">Latest SBCC News & Health Insights</h2>
            <p className="section-subtitle">
              Perspectives, evidence summaries, and field lessons from the Nexa Solutions strategy team.
            </p>
          </div>

          <div className="grid-3">
            {recentNews.map((article) => (
              <article key={article.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-teal">{article.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{article.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1 }}>{article.summary}</p>

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {article.author}</span>
                  <Link href="/about" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--c1-blue)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span>Read insight</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
