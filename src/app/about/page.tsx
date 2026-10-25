import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/PublicLayout';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  Search,
  PenTool,
  BarChart3,
  BookOpen,
  ArrowRight,
  HeartHandshake,
  Sparkles,
  Mail,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Nexa Solutions SBCC Ethiopia',
  description: 'Learn about Nexa Solutions, our evidence-informed SBCC methodology, our promise, and our core strategies in Ethiopia.',
};

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="hero" style={{ paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="hero-tag">
            <ShieldCheck size={16} />
            <span>01 | WHO WE ARE</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>
            Evidence-informed strategies for healthier and stronger{' '}
            <span style={{ color: 'var(--c1-blue)' }}>Ethiopia.</span>
          </h1>
          <p className="hero-subtitle">
            Nexa Solutions is focused on Social and Behavior Change Communication (SBCC), research, strategy and practical communication solutions for health and development programs.
          </p>
        </div>
      </section>

      {/* Core Mission & The Essential Questions */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="section-tag">Our Philosophy</span>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem' }}>
                Moving Beyond "How do we communicate this?"
              </h2>
              <p style={{ marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Traditional health communication often rushes to design posters or brochures before understanding what drives human decisions. At Nexa Solutions, we help public health partners ask the more useful questions:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                {[
                  'What is driving the behavior?',
                  'What needs to change in the environment or community norms?',
                  'Which communication and environmental levers can truly help?',
                  'And how will we know with measurable evidence?',
                ].map((q, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--c1-blue-soft)',
                      color: 'var(--c1-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.975rem' }}>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Promise Box */}
            <div className="card" style={{ border: '2px solid var(--c1-blue-border)', backgroundColor: 'var(--bg-card-subtle)' }}>
              <div className="badge badge-orange" style={{ marginBottom: '1rem' }}>OUR PROMISE</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--c1-blue)' }}>
                Useful in the real world—not just attractive on paper.
              </h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                We combine evidence, behavioral thinking and creativity to develop solutions that frontline health workers and communities can actually apply.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '0.9rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--c1-blue)', fontSize: '0.9rem' }}>01 — UNDERSTAND</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>What is happening, for whom, where and why?</div>
                </div>
                <div style={{ padding: '0.9rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--c2-teal)', fontSize: '0.9rem' }}>02 — DESIGN</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>What should change, and what communication response fits the context?</div>
                </div>
                <div style={{ padding: '0.9rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--c3-purple)', fontSize: '0.9rem' }}>03 — MEASURE</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>What evidence will tell us whether the work is contributing to change?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Add Value */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Value Proposition</span>
            <h2 className="section-title">Where We Add Value</h2>
            <p className="section-subtitle">
              Specialized expertise bridging public health science and behavioral creative execution.
            </p>
          </div>

          <div className="grid-3">
            {[
              {
                icon: <Target size={24} />,
                title: 'Health & Development Challenges',
                desc: 'Tackling complex public health issues where behavioral change, stigma, and community adoption are critical.',
              },
              {
                icon: <Search size={24} />,
                title: 'Behavioral & Audience Insight',
                desc: 'Deep-dive formative research, focus group facilitation, and determinant mapping across Ethiopian communities.',
              },
              {
                icon: <PenTool size={24} />,
                title: 'SBCC Strategy & Intervention Design',
                desc: 'Formulating end-to-end strategic frameworks, channel selection, and measurable behavioral milestones.',
              },
              {
                icon: <Sparkles size={24} />,
                title: 'Message & Content Development',
                desc: 'Authoring bilingual health awareness guidelines, high-impact PNG posters, and counseling video spot concepts.',
              },
              {
                icon: <BarChart3 size={24} />,
                title: 'Monitoring, Evaluation & Learning (MEL)',
                desc: 'Designing results frameworks, indicator matrices, and continuous evidence-to-action adaptation protocols.',
              },
              {
                icon: <Users size={24} />,
                title: 'Training & Technical Support',
                desc: 'Hands-on facilitation, capacity building for health program teams, and frontline provider job-aid coaching.',
              },
            ].map((val, idx) => (
              <div key={idx} className="card">
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: idx % 3 === 0 ? 'var(--c1-blue-soft)' : idx % 3 === 1 ? 'var(--c2-teal-soft)' : 'var(--c3-purple-soft)',
                  color: idx % 3 === 0 ? 'var(--c1-blue)' : idx % 3 === 1 ? 'var(--c2-teal)' : 'var(--c3-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>{val.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models & Why Nexa Solutions */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Collaboration</span>
            <h2 className="section-title">How We Can Engage</h2>
            <p className="section-subtitle">
              Not every client needs a full project. We structure support around the size and maturity of your need.
            </p>
          </div>

          <div className="grid-4">
            <div className="card">
              <h4 style={{ fontSize: '1.15rem', color: 'var(--c1-blue)', marginBottom: '0.5rem' }}>Project Partnership</h4>
              <p style={{ fontSize: '0.875rem' }}>End-to-end or multi-stage SBCC assignment from inception to field evaluation.</p>
            </div>
            <div className="card">
              <h4 style={{ fontSize: '1.15rem', color: 'var(--c2-teal)', marginBottom: '0.5rem' }}>Defined Deliverable</h4>
              <p style={{ fontSize: '0.875rem' }}>One standalone research protocol, strategy blueprint, creative toolkit, or M&E package.</p>
            </div>
            <div className="card">
              <h4 style={{ fontSize: '1.15rem', color: 'var(--c1-blue)', marginBottom: '0.5rem' }}>Technical Review</h4>
              <p style={{ fontSize: '0.875rem' }}>Review and strengthen an existing strategy, research tool, or program proposal.</p>
            </div>
            <div className="card">
              <h4 style={{ fontSize: '1.15rem', color: 'var(--c3-purple)', marginBottom: '0.5rem' }}>Training / Facilitation</h4>
              <p style={{ fontSize: '0.875rem' }}>Short practical learning workshops or facilitated behavioral design sessions for your team.</p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
