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
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  Compass,
  Layers,
  HeartPulse,
  Mail,
  CheckCircle,
  Clock,
  UserCheck,
} from 'lucide-react';

export const revalidate = 0; // Fresh data for dynamic news and services

export default async function HomePage() {
  const [featuredServices, recentNews] = await Promise.all([
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

  return (
    <PublicLayout>
      {/* =================================================================
          HERO SECTION
          ================================================================= */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag">
            <Sparkles size={16} />
            <span>Nexa Solutions • SBCC Consulting Ethiopia</span>
          </div>

          <h1 className="hero-title">
            Turning evidence about people and behavior into{' '}
            <span style={{ color: 'var(--c1-blue)' }}>practical communication solutions.</span>
          </h1>

          <p className="hero-subtitle">
            Evidence-informed Social and Behavior Change Communication (SBCC), research, strategy, and health awareness media designed for health and development programs across Ethiopia.
          </p>

          <div className="hero-actions">
            <Link href="/services#utilize" className="btn btn-primary btn-lg">
              <Mail size={18} />
              <span>Utilize Our Services</span>
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg">
              <span>Explore Materials & Packages</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '4.5rem',
            maxWidth: '1000px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--c1-blue)', marginBottom: '0.25rem' }}>
                Evidence
              </div>
              <p style={{ fontSize: '0.875rem' }}>Grounded in qualitative and quantitative field insight</p>
            </div>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--c2-teal)', marginBottom: '0.25rem' }}>
                Creativity
              </div>
              <p style={{ fontSize: '0.875rem' }}>PDFs, high-impact PNG posters & campaign videos</p>
            </div>
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--c1-blue)', marginBottom: '0.25rem' }}>
                Impact
              </div>
              <p style={{ fontSize: '0.875rem' }}>Measurable behavior change for Ethiopia's future</p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3 PILLARS SECTION (Page 1 of Document)
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
            {/* Pillar 1 */}
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
              <div className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>01 — Understand</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>EVIDENCE</h3>
              <p style={{ marginBottom: '1.25rem' }}>
                We start with people, context, data and behavioral insight. What is happening, for whom, where and why?
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

            {/* Pillar 2 */}
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
                  <span>Health awareness PDF toolkits</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c2-teal)' }} />
                  <span>Bilingual PNG infographics & posters</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c2-teal)' }} />
                  <span>Campaign videos & counseling aids</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
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
                <TrendingUp size={28} />
              </div>
              <div className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>03 — Measure</div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>IMPACT</h3>
              <p style={{ marginBottom: '1.25rem' }}>
                We connect communication work to measurable behavioral and program outcomes. What evidence tells us change is happening?
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c1-blue)' }} />
                  <span>Results & indicator frameworks</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c1-blue)' }} />
                  <span>Pre-testing & rapid iterations</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={15} style={{ color: 'var(--c1-blue)' }} />
                  <span>Adaptive learning loops</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          SIGNATURE SBCC APPROACH (Page 3 of Document)
          ================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Methodology</span>
            <h2 className="section-title">Our Signature SBCC Approach</h2>
            <p className="section-subtitle">
              A simple, disciplined way we think: moving from the problem to evidence, from insight to action, and continuous measurement.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}>
            {[
              { num: '01', title: 'Define the Problem', desc: 'Identify behavioral challenges and structural barriers.' },
              { num: '02', title: 'Gather Evidence', desc: 'Synthesize existing literature, routine data, and field realities.' },
              { num: '03', title: 'Find Behavioral Insight', desc: 'Uncover deep determinants, social norms, and decision drivers.' },
              { num: '04', title: 'Design the SBCC Response', desc: 'Define precise behavioral objectives and segmented channels.' },
              { num: '05', title: 'Create & Pretest', desc: 'Produce PDFs, visual PNG posters, and videos with target audiences.' },
              { num: '06', title: 'Implement & Adapt', desc: 'Deploy tailored communication tools and support execution.' },
              { num: '07', title: 'Measure • Learn • Improve', desc: 'Track indicators to feed learning back into future cycles.' },
            ].map((step, idx) => (
              <div key={step.num} className="card" style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: idx % 2 === 0 ? 'var(--c1-blue)' : 'var(--c2-teal)',
                  marginBottom: '0.5rem',
                }}>
                  STEP {step.num}
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.875rem' }}>{step.desc}</p>
              </div>
            ))}

            <div className="card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--c1-blue-soft)',
              borderColor: 'var(--c1-blue-border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--c1-blue)', marginBottom: '0.5rem' }}>
                THE OUTCOME
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--c1-blue)' }}>
                Better-Informed Decisions & Stronger Programs
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
                This is not a rigid linear process; the cycle learns and adapts with real community feedback.
              </p>
            </div>
          </div>

          {/* The Difference Callout */}
          <div className="card" style={{ borderLeft: '4px solid var(--c2-teal)' }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--c2-teal)' }}>
              THE NEXA DIFFERENCE
            </h4>
            <p style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
              "We do not treat communication as the solution by default. We first examine the behavioral problem and the wider context, then determine where communication can make a meaningful contribution."
            </p>
          </div>
        </div>
      </section>

      {/* =================================================================
          FEATURED SERVICES & HEALTH AWARENESS MATERIALS
          ================================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="section-tag">Deliverables Showcase</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Health Awareness Materials & Packages
              </h2>
              <p className="section-subtitle">
                Available in PDFs, high-resolution PNG infographics, and campaign video suites.
              </p>
            </div>

            <Link href="/services" className="btn btn-outline">
              <span>View All Offerings</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-2">
            {featuredServices.map((service) => (
              <div key={service.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className={`badge ${service.type === 'PDF' ? 'badge-blue' : service.type === 'VIDEO' ? 'badge-teal' : 'badge-neutral'}`}>
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
                      Included Assets
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      {service.features.split(';').slice(0, 3).join(' • ')}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--c1-blue)' }}>
                    {service.priceInfo || 'Available for Deployment'}
                  </span>
                  <Link href="/services#utilize" className="btn btn-primary btn-sm">
                    <Mail size={14} />
                    <span>Request / Order</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          LATEST NEWS & INSIGHTS SECTION
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

      {/* =================================================================
          SERVICE UTILIZATION EMAIL CTA BANNER
          ================================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--c1-blue-soft)', borderTop: '1px solid var(--c1-blue-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-tag" style={{ backgroundColor: 'var(--bg-card)' }}>
              Dedicated Service Gateway
            </span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              Ready to collaborate on Health Awareness & SBCC?
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '2rem' }}>
              Whether you need customized health awareness packages (PDF handbooks, visual PNG infographics, or video spots) or comprehensive behavioral research, request your service directly via our dedicated dispatch email:
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--bg-card)',
              border: '2px solid var(--c1-blue)',
              padding: '1rem 1.75rem',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-md)',
            }}>
              <Mail size={24} style={{ color: 'var(--c1-blue)' }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--c1-blue)', letterSpacing: '-0.01em' }}>
                nexasolutionsethiopia@gmail.com
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/services#utilize" className="btn btn-primary btn-lg">
                <span>Open Service Request Portal</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn btn-outline btn-lg">
                <span>General Office Inquiries</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
