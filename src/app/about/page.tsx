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
  description: 'Learn about Nexa Solutions, our evidence-informed SBCC methodology, our promise, and our core consulting pillars in Ethiopia.',
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
            Evidence-informed consulting for healthier and stronger{' '}
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
              <div className="badge badge-blue" style={{ marginBottom: '1rem' }}>OUR PROMISE</div>
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
                  <div style={{ fontWeight: 700, color: 'var(--c1-blue)', fontSize: '0.9rem' }}>03 — MEASURE</div>
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
                desc: 'Authoring bilingual health awareness PDFs, high-impact PNG posters, and counseling video spot concepts.',
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
                  backgroundColor: idx % 2 === 0 ? 'var(--c1-blue-soft)' : 'var(--c2-teal-soft)',
                  color: idx % 2 === 0 ? 'var(--c1-blue)' : 'var(--c2-teal)',
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

      {/* Demonstration Case Studies Breakdown (Pages 7, 8, 9) */}
      <section className="section" style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Demonstration Case Studies</span>
            <h2 className="section-title">Translating Theory Into Practice</h2>
            <p className="section-subtitle">
              Hypothetical scenarios created to demonstrate how Nexa Solutions approaches real health communication challenges in Ethiopia.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Case Study 1 */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="badge badge-blue">CASE STUDY 01</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--c2-teal)', fontWeight: 600 }}>Maternal & Newborn Health</span>
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Maternal & Newborn Health</h3>
              <p style={{ fontSize: '0.975rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                <strong>The Challenge:</strong> An illustrative health program wants to improve selected maternal and newborn health behaviors and service use. Knowledge may exist, but uptake is affected by social norms, confidence, access, trust, family decision-making, and service experience.
              </p>

              <div className="grid-3" style={{ gap: '1.25rem' }}>
                <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--c1-blue)' }}>What We Need to Know</h4>
                  <p style={{ fontSize: '0.85rem' }}>High priority behaviors, barriers/enablers, key family decision-makers, trusted information sources, and drop-off points.</p>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--c2-teal)' }}>How We Approach It</h4>
                  <p style={{ fontSize: '0.85rem' }}>Qualitative audience and stakeholder research, determinant segmentation, behavioral objectives, and pre-tested counseling aids.</p>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--c1-blue)' }}>Key Deliverables</h4>
                  <p style={{ fontSize: '0.85rem' }}>Formative research plan, audience profiles, SBCC channel strategy, message framework & briefs, M&E indicator framework.</p>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="badge badge-teal">CASE STUDY 02</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--c1-blue)', fontWeight: 600 }}>Youth HIV Prevention & Testing</span>
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Youth HIV Prevention & Testing</h3>
              <p style={{ fontSize: '0.975rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                <strong>The Challenge:</strong> An illustrative youth program wants to improve appropriate use of HIV prevention and testing services. Potential barriers include stigma, perceived low risk, confidentiality concerns, misinformation, and peer norms.
              </p>

              <div className="grid-3" style={{ gap: '1.25rem' }}>
                <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--c2-teal)' }}>What We Need to Know</h4>
                  <p style={{ fontSize: '0.85rem' }}>What "risk" and "safety" mean to young adults, influential peer norms, safe spaces, and why people drop out of testing services.</p>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--c1-blue)' }}>How We Approach It</h4>
                  <p style={{ fontSize: '0.85rem' }}>Journey mapping, exploring stigma and self-efficacy, creating segmented navigation concepts, and pre-testing youth digital spots.</p>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--c2-teal)' }}>Key Deliverables</h4>
                  <p style={{ fontSize: '0.85rem' }}>Audience segmentation, barrier/facilitator map, message matrix, service-navigation concepts, and testing uptake indicators.</p>
                </div>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="badge badge-blue">CASE STUDY 03</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--c2-teal)', fontWeight: 600 }}>Positive Fatherhood & Healthy Relationships</span>
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Positive Fatherhood & Healthy Relationships</h3>
              <p style={{ fontSize: '0.975rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                <strong>The Challenge:</strong> An illustrative higher-education program wants to prepare young adults for healthier relationships and positive future fatherhood before harmful behavioral patterns become established.
              </p>

              <div className="grid-3" style={{ gap: '1.25rem' }}>
                <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--c1-blue)' }}>What We Need to Know</h4>
                  <p style={{ fontSize: '0.85rem' }}>Beliefs on what a "good father" represents, relationship conflict norms, skill confidence, and peer/cultural expectations.</p>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--c2-teal)' }}>How We Approach It</h4>
                  <p style={{ fontSize: '0.85rem' }}>Participatory formative research, interactive SBCC activities around male role models, and peer digital communication.</p>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--c1-blue)' }}>Key Deliverables</h4>
                  <p style={{ fontSize: '0.85rem' }}>Formative research tools, session and facilitation guides, message briefs, and relationship practice indicators.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Credibility Note (Page 10 of PDF) */}
          <div className="card" style={{ marginTop: '2.5rem', border: '1px dashed var(--c1-blue-border)', backgroundColor: 'var(--bg-card-subtle)' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--c1-blue)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              CREDIBILITY & TRANSPARENCY NOTE
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              This portfolio is intentionally honest about the stage of the company. Demonstration case studies show our thinking, analytical rigor, and creative capability; they are not presented as past client results. As projects are completed, this section is supplemented with verified client case studies, testimonials, and evaluated outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement Models & Why Nexa Solutions */}
      <section className="section">
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
              <h4 style={{ fontSize: '1.15rem', color: 'var(--c2-teal)', marginBottom: '0.5rem' }}>Training / Facilitation</h4>
              <p style={{ fontSize: '0.875rem' }}>Short practical learning workshops or facilitated behavioral design sessions for your team.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/services#utilize" className="btn btn-primary btn-lg">
              <Mail size={18} />
              <span>Inquire & Utilize Services via Email</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
