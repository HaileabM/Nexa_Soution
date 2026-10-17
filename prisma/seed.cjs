const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Nexa Solutions database...');

  // 1. Create or update Default Admin
  const hashedPassword = await bcrypt.hash('nexaAdmin2026!', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Nexa Admin',
      role: 'ADMIN',
    },
  });
  console.log('Admin user ensured:', admin.username);

  // 2. Clear & Seed Services
  const servicesCount = await prisma.service.count();
  if (servicesCount === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: 'Maternal & Newborn Health Communication Package',
          slug: 'maternal-newborn-health-package',
          category: 'Maternal & Child Health',
          type: 'PACKAGE',
          shortDesc: 'Evidence-grounded SBCC campaign tools, antenatal care guides, and community mobilization assets.',
          description: 'A comprehensive communication suite designed to improve maternal and newborn health behaviors. Combines community-level dialogue materials, facility-level counseling aids, and household decision-maker engagement kits to shift norms and boost healthcare utilization.',
          features: 'Formative research protocol; Antenatal care infographics (PNG/PDF); Healthcare provider job aids; Community video scripts & brief; Monitoring indicators matrix',
          fileUrl: '/materials/sample-maternal-health-guide.pdf',
          imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
          priceInfo: 'Custom Project / Grant Scope',
          isFeatured: true,
        },
        {
          title: 'Youth HIV Prevention & Testing Awareness Suite',
          slug: 'youth-hiv-prevention-testing',
          category: 'Youth & Sexual Health',
          type: 'VIDEO',
          shortDesc: 'Multi-channel youth engagement content addressing stigma, risk perception, and confidential testing.',
          description: 'Designed to tackle barriers to HIV prevention and testing services among young adults. Replaces stigmatizing rhetoric with empowering, confidential service-navigation concepts and relatable peer-led communication.',
          features: 'Audience segmentation map; Peer educator interactive handbook (PDF); High-impact social media PNG carousels; 60s campaign video storyboards; Service navigation indicators',
          fileUrl: '/materials/sample-youth-prevention-brief.pdf',
          imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
          priceInfo: 'Tailored Content & Campaign Suite',
          isFeatured: true,
        },
        {
          title: 'Positive Fatherhood & Healthy Relationships Toolkit',
          slug: 'positive-fatherhood-healthy-relationships',
          category: 'Norm Change & Family Health',
          type: 'PDF',
          shortDesc: 'Interactive workshop guides, male engagement materials, and behavioral role-modeling frameworks.',
          description: 'Prepares young adults and fathers for healthier relationships and positive future fatherhood before harmful patterns take root. Focuses on emotional expression, shared caregiving, and non-violent conflict resolution.',
          features: 'Facilitator session guide (PDF); Community conversation cards (PNG); Norm transformation assessment; Multi-channel digital awareness kit; M&E learning plan',
          fileUrl: '/materials/sample-positive-fatherhood-toolkit.pdf',
          imageUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80',
          priceInfo: 'Defined Deliverable / Workshop Package',
          isFeatured: true,
        },
        {
          title: 'SBCC Strategy & Formative Behavioral Research',
          slug: 'sbcc-strategy-formative-research',
          category: 'Consulting & Strategy',
          type: 'CONSULTING',
          shortDesc: 'In-depth behavioral determinant analysis, barrier mapping, and strategic blueprints for Ethiopian health initiatives.',
          description: 'End-to-end consulting that takes health initiatives from ambiguous communication goals to data-driven, evidence-based behavioral solutions with clear monitoring and evaluation metrics.',
          features: 'Formative research protocol & FGD guides; Behavioral determinant map; Audience segmentation matrix; Channel & messaging strategy roadmap; M&E indicator framework',
          fileUrl: '/materials/sample-sbcc-methodology.pdf',
          imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
          priceInfo: 'End-to-End Partnership Scope',
          isFeatured: true,
        },
        {
          title: 'Health Awareness Digital Posters & Infographics Pack',
          slug: 'health-awareness-infographics-pack',
          category: 'Visual Design & Publications',
          type: 'IMAGE',
          shortDesc: 'High-resolution print and digital health awareness visual assets formatted in PNG and PDF for community outreach.',
          description: 'A curated visual library of culturally tailored health awareness materials, including nutrition, hygiene, immunization, and disease prevention infographics in bilingual formats.',
          features: 'Bilingual health infographics (Amharic & English); Clinic waiting room posters (High-Res PNG & Print PDF); Social media awareness carousels; Pre-tested visual iconography',
          fileUrl: '/materials/sample-infographic-preview.png',
          imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
          priceInfo: 'Resource Bundle / Custom Licensing',
          isFeatured: false,
        },
        {
          title: 'Community Health Worker Video Training Modules',
          slug: 'community-health-worker-video-modules',
          category: 'Multimedia & Capacity Building',
          type: 'VIDEO',
          shortDesc: 'Educational video series and micro-learning clips for frontline health extension workers and community advocates.',
          description: 'Production of bite-sized, practical counseling video modules designed for tablet and mobile viewing during field visits and health post training sessions.',
          features: 'Short video modules for mobile counseling; Standardized counseling guidelines (PDF); Visual scenario demonstrations; Post-training assessment rubrics',
          fileUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
          priceInfo: 'Modular Production / Project Scope',
          isFeatured: false,
        },
      ],
    });
    console.log('Seeded initial services and health awareness materials.');
  }

  // 3. Clear & Seed News
  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        {
          title: 'Turning Evidence into Action: Nexa Solutions SBCC Framework for Ethiopia',
          slug: 'turning-evidence-into-action',
          category: 'Thought Leadership',
          summary: 'How we move beyond "How do we communicate this?" to uncover what truly drives human behavior in health programs.',
          content: 'In development and public health programs across Ethiopia, communication is often treated merely as an afterthought—a brochure printed at the end of a project. At Nexa Solutions, our evidence-informed consulting approach flips this dynamic. We start by uncovering what is happening, for whom, where, and why. By examining behavioral determinants, cultural norms, and structural barriers before designing messages, we ensure communication levers achieve measurable real-world impact.',
          author: 'Nexa SBCC Strategy Team',
          imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
          published: true,
        },
        {
          title: 'Strengthening Maternal Care Uptake Through Behavioral Insight',
          slug: 'strengthening-maternal-care-uptake',
          category: 'Case Study & Insight',
          summary: 'Why awareness alone does not guarantee clinic attendance, and how social norms shape maternal healthcare journeys.',
          content: 'Our latest demonstration case study explores maternal and newborn health in Ethiopian regional settings. While knowledge regarding antenatal care visits is relatively widespread, uptake remains hindered by family decision dynamics, perceived quality of care, and transport barriers. Our intervention design focuses on shifting household support expectations and equipping frontline health workers with respectful, empathetic counseling aids.',
          author: 'Health & Behavior Lead',
          imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
          published: true,
        },
        {
          title: 'Designing Relatable Health Communication for Ethiopian Youth',
          slug: 'designing-relatable-youth-health-communication',
          category: 'Youth Innovation',
          summary: 'De-stigmatizing HIV testing and preventive behaviors through authentic peer-centered digital storytelling.',
          content: 'Reaching young adults requires understanding what risk and safety mean in their everyday lives. By combining peer-led digital media, discrete service-navigation messaging, and open dialogue on relationships, Nexa Solutions designs health communication that resonates with young Ethiopians without judgment or paternalistic tones.',
          author: 'Creative & Digital Team',
          imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
          published: true,
        },
      ],
    });
    console.log('Seeded initial news items.');
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
