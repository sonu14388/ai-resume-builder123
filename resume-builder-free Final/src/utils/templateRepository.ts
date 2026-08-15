import {
  TemplateItem,
  BaseLayoutVariant,
  TemplateStyleClassification,
  TemplateFilterOptions,
  PaginatedTemplateResult,
  TemplateRepositoryStats,
  ResumeFontFamily
} from '../types';

// ============================================================================
// 1. SIGNATURE TEMPLATE DEFINITIONS (Foundational Core Templates)
// ============================================================================

export const signatureProfessionalTemplates: TemplateItem[] = [
  {
    id: 'minimal',
    name: 'Minimalist (100% ATS Bot Proof)',
    category: 'ats',
    styleType: 'professional',
    industry: 'All Industries / Enterprise',
    layoutVariant: 'minimal',
    tag: 'Zero-Distraction',
    description: 'Pure high-contrast typography engineered to score 100% on Workday, Taleo, and Greenhouse parsers.',
    atsRating: 100,
    recommendedFor: 'Enterprise HR Portals & Fortune 500 Job Applications',
    color: '#111827',
    fontFamily: 'roboto',
    fontSize: 'normal',
    popularity: 1000,
    features: ['100% ATS Compliant', 'Single-Column Flow', 'Universal OCR Parser Safe'],
    targetSeniority: 'all'
  },
  {
    id: 'professional',
    name: 'Wall Street Corporate Standard',
    category: 'finance',
    styleType: 'professional',
    industry: 'Finance & Banking',
    layoutVariant: 'professional',
    tag: 'Banking Standard',
    description: 'Traditional centered header with classic section dividers and authoritative hierarchy.',
    atsRating: 99,
    recommendedFor: 'Investment Bankers, Private Equity, Auditors, Finance Leads',
    color: '#0f2744',
    fontFamily: 'serif',
    fontSize: 'normal',
    popularity: 975,
    features: ['Formal Dividers', 'Financial Metrics Emphasis', 'Classical Proportions'],
    targetSeniority: 'senior'
  },
  {
    id: 'executive',
    name: 'Executive Boardroom Leadership',
    category: 'executive',
    styleType: 'professional',
    industry: 'Executive & Management',
    layoutVariant: 'executive',
    tag: 'C-Suite Ready',
    description: 'Executive summary callout matrix and strategic competency layout designed for VP & CXO level.',
    atsRating: 98,
    recommendedFor: 'Chief Executives, Managing Directors, Global VPs',
    color: '#0f172a',
    fontFamily: 'editorial',
    fontSize: 'spacious',
    popularity: 965,
    features: ['Core Competencies Matrix', 'P&L Ownership Callouts', 'Board-Level Presentation'],
    targetSeniority: 'executive'
  },
  {
    id: 'compact',
    name: 'Ultra Compact One-Page Density',
    category: 'ats',
    styleType: 'professional',
    industry: 'Executive & Management',
    layoutVariant: 'compact',
    tag: 'Dense 1-Page',
    description: 'Mathematically optimized margins to fit 10+ years of dense career accomplishments cleanly on 1 page.',
    atsRating: 100,
    recommendedFor: 'Mid-Senior Level Professionals with rich work histories',
    color: '#059669',
    fontFamily: 'roboto',
    fontSize: 'compact',
    popularity: 990,
    features: ['Tight Margin Geometry', 'Dual-Entry Bullets', '1-Page Guaranteed Fit'],
    targetSeniority: 'mid'
  },
  {
    id: 'elegant',
    name: 'Harvard Editorial Serif',
    category: 'academic',
    styleType: 'professional',
    industry: 'Legal & Law',
    layoutVariant: 'elegant',
    tag: 'Prestige',
    description: 'Refined serif typography with editorial italics and dignified classical section headers.',
    atsRating: 99,
    recommendedFor: 'Attorneys, Senior Consultants, Academics, C-Suite',
    color: '#1e293b',
    fontFamily: 'serif',
    fontSize: 'normal',
    popularity: 940,
    features: ['Editorial Typography', 'Publication References', 'Prestige Aesthetic'],
    targetSeniority: 'senior'
  }
];

export const signatureCreativeTemplates: TemplateItem[] = [
  {
    id: 'modern',
    name: 'Silicon Valley Modern Clean',
    category: 'modern',
    styleType: 'creative',
    industry: 'Software & IT',
    layoutVariant: 'modern',
    tag: 'Most Popular',
    description: 'Crisp two-column layout highlighting technical proficiencies, work impact, and contact badges.',
    atsRating: 99,
    recommendedFor: 'Software Engineers, Tech Leads, Product Managers',
    color: '#2563eb',
    fontFamily: 'sans',
    fontSize: 'normal',
    popularity: 995,
    features: ['Interactive Skill Badges', 'Two-Column Split', 'Impact-Driven Bullets'],
    targetSeniority: 'mid'
  },
  {
    id: 'creative',
    name: 'Creative Contemporary Studio',
    category: 'creative',
    styleType: 'creative',
    industry: 'Creative & Arts',
    layoutVariant: 'creative',
    tag: 'Portfolio Ready',
    description: 'Vibrant indigo accents, stylish tag chips, and modern typographic rhythm.',
    atsRating: 96,
    recommendedFor: 'UI/UX Designers, Brand Strategists, Art Directors',
    color: '#7c3aed',
    fontFamily: 'sans',
    fontSize: 'normal',
    popularity: 955,
    features: ['Portfolio Link Badges', 'Visual Skill Ratings', 'Creative Bio Section'],
    targetSeniority: 'mid'
  },
  {
    id: 'sidebar',
    name: 'Sidebar Border Accent Pro',
    category: 'modern',
    styleType: 'creative',
    industry: 'Engineering & Product',
    layoutVariant: 'sidebar',
    tag: 'Sleek & Visual',
    description: 'Left colored thick border with soft-tinted header band and clean hierarchical sections.',
    atsRating: 98,
    recommendedFor: 'Architects, Systems Engineers, UX Designers',
    color: '#3b82f6',
    fontFamily: 'sans',
    fontSize: 'normal',
    popularity: 970,
    features: ['Accent Sidebar Stripe', 'Tinted Header Block', 'Quick Skill Overview'],
    targetSeniority: 'all'
  },
  {
    id: 'bold',
    name: 'Bold Hero High Impact',
    category: 'marketing',
    styleType: 'creative',
    industry: 'Marketing & Sales',
    layoutVariant: 'bold',
    tag: 'High Impact',
    description: 'Solid colored hero banner with crisp white typography for instant visual presence.',
    atsRating: 96,
    recommendedFor: 'Creative Directors, Marketing Heads, Founders',
    color: '#1e40af',
    fontFamily: 'sans',
    fontSize: 'normal',
    popularity: 960,
    features: ['Full-Width Header Band', 'High-Contrast Identity', 'Key Metric Highlights'],
    targetSeniority: 'senior'
  },
  {
    id: 'tech',
    name: 'Silicon Cyber Terminal Slate',
    category: 'tech',
    styleType: 'creative',
    industry: 'Software & IT',
    layoutVariant: 'tech',
    tag: 'Dev Favorite',
    description: 'Deep slate banner with vivid sky cyan accents and structured bullet achievements.',
    atsRating: 98,
    recommendedFor: 'Full-Stack Developers, Cloud Architects, DevOps Engineers',
    color: '#0f172a',
    fontFamily: 'mono',
    fontSize: 'normal',
    popularity: 985,
    features: ['Monospace Code Hierarchy', 'Tech Stack Pills', 'Project Showcase Grid'],
    targetSeniority: 'all'
  }
];

// ============================================================================
// 2. PALETTES & COLOR MATRICES (64 Distinct Professional & Creative Hex Colors)
// ============================================================================

const professionalColors = [
  '#0f172a', '#1e293b', '#334155', '#1e1b4b', '#312e81', '#1e3a8a', '#172554', '#091e3a',
  '#0f2744', '#142850', '#204051', '#27496d', '#111827', '#1f2937', '#374151', '#18181b',
  '#27272a', '#042f2e', '#064e3b', '#065f46', '#14532d', '#15803d', '#365314', '#713f12',
  '#7c2d12', '#991b1b', '#9f1239', '#831843', '#581c87', '#3b0764', '#082f49', '#083344'
];

const creativeColors = [
  '#2563eb', '#1d4ed8', '#0284c7', '#0369a1', '#0891b2', '#0d9488', '#059669', '#16a34a',
  '#ca8a04', '#d97706', '#ea580c', '#e11d48', '#be123c', '#db2777', '#c026d3', '#9333ea',
  '#7c3aed', '#6366f1', '#4f46e5', '#4338ca', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981',
  '#f59e0b', '#f97316', '#ef4444', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6', '#3b82f6'
];

// ============================================================================
// 3. INDUSTRY ROLE ARCHETYPES FOR PROFESSIONAL & CREATIVE STYLES
// ============================================================================

interface RoleTemplateSeed {
  title: string;
  category: TemplateItem['category'];
  styleType: TemplateStyleClassification;
  industry: string;
  recommended: string;
  tag: string;
  defaultLayout: BaseLayoutVariant;
  defaultFont: ResumeFontFamily;
  fontSize: 'compact' | 'normal' | 'spacious';
  targetSeniority: 'entry' | 'mid' | 'senior' | 'executive' | 'all';
}

const professionalRoleSeeds: RoleTemplateSeed[] = [
  // Finance & Banking
  { title: 'Investment Banking VP', category: 'finance', styleType: 'professional', industry: 'Finance & Banking', recommended: 'M&A, Equity Research & Valuation Leads', tag: 'Wall Street', defaultLayout: 'professional', defaultFont: 'serif', fontSize: 'compact', targetSeniority: 'senior' },
  { title: 'Chartered Accountant (CA/CPA)', category: 'finance', styleType: 'professional', industry: 'Finance & Banking', recommended: 'Audit, Statutory Compliance & Tax Leaders', tag: 'Audit Elite', defaultLayout: 'professional', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'mid' },
  { title: 'Corporate FP&A Director', category: 'finance', styleType: 'professional', industry: 'Finance & Banking', recommended: 'Corporate Finance & Budgeting Executives', tag: 'FP&A Strategic', defaultLayout: 'modern', defaultFont: 'roboto', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Private Equity Principal', category: 'finance', styleType: 'professional', industry: 'Finance & Banking', recommended: 'Deal Sourcing & Portfolio Asset Managers', tag: 'PE Capital', defaultLayout: 'executive', defaultFont: 'editorial', fontSize: 'normal', targetSeniority: 'executive' },
  { title: 'Chief Risk Officer (FRM)', category: 'finance', styleType: 'professional', industry: 'Finance & Banking', recommended: 'Credit, Market & Operational Risk Directors', tag: 'Risk Compliance', defaultLayout: 'professional', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'executive' },
  { title: 'Treasury & FX Liquidity Head', category: 'finance', styleType: 'professional', industry: 'Finance & Banking', recommended: 'Cash Flow & Global Hedging Specialists', tag: 'Treasury Pro', defaultLayout: 'compact', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'senior' },

  // Executive & Leadership
  { title: 'Chief Executive Officer (CEO)', category: 'executive', styleType: 'professional', industry: 'Executive & Management', recommended: 'CEOs, Co-Founders & Managing Directors', tag: 'C-Suite Elite', defaultLayout: 'executive', defaultFont: 'editorial', fontSize: 'spacious', targetSeniority: 'executive' },
  { title: 'Chief Operating Officer (COO)', category: 'executive', styleType: 'professional', industry: 'Executive & Management', recommended: 'Global Operations & Scaling VPs', tag: 'Operations CXO', defaultLayout: 'executive', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'executive' },
  { title: 'Strategic Tier-1 Consultant', category: 'executive', styleType: 'professional', industry: 'Executive & Management', recommended: 'McKinsey, BCG, Bain Alumni Consultants', tag: 'Strategy Tier-1', defaultLayout: 'professional', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Chief Human Resources Officer (CHRO)', category: 'executive', styleType: 'professional', industry: 'Executive & Management', recommended: 'People Operations & Talent VPs', tag: 'People Ops VP', defaultLayout: 'modern', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'executive' },
  { title: 'General Management P&L Owner', category: 'executive', styleType: 'professional', industry: 'Executive & Management', recommended: 'Country Heads, Business Unit Directors', tag: 'P&L Leader', defaultLayout: 'sidebar', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'senior' },

  // Healthcare & Medicine
  { title: 'Senior Medical Doctor (MD/MBBS)', category: 'healthcare', styleType: 'professional', industry: 'Healthcare & Medicine', recommended: 'Physicians, Surgeons & Hospital Specialists', tag: 'Clinical MD', defaultLayout: 'elegant', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Critical Care ICU Specialist', category: 'healthcare', styleType: 'professional', industry: 'Healthcare & Medicine', recommended: 'Emergency Medicine & Surgical Nurses', tag: 'ICU Certified', defaultLayout: 'modern', defaultFont: 'roboto', fontSize: 'compact', targetSeniority: 'mid' },
  { title: 'Clinical Trial Research Director', category: 'healthcare', styleType: 'professional', industry: 'Healthcare & Medicine', recommended: 'Biopharma & Oncology GCP Directors', tag: 'Pharma GCP', defaultLayout: 'professional', defaultFont: 'roboto', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Chief Hospital Pharmacist', category: 'healthcare', styleType: 'professional', industry: 'Healthcare & Medicine', recommended: 'Clinical Pharmacologists & Pharmacy Leads', tag: 'PharmD Lead', defaultLayout: 'sidebar', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'senior' },

  // Legal & Law
  { title: 'Senior Corporate Attorney (JD)', category: 'academic', styleType: 'professional', industry: 'Legal & Law', recommended: 'M&A Counsel, Corporate Law Partners', tag: 'Legal Partner', defaultLayout: 'elegant', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Regulatory Compliance Officer', category: 'academic', styleType: 'professional', industry: 'Legal & Law', recommended: 'GDPR, SEC, AML & Compliance Directors', tag: 'Compliance Top', defaultLayout: 'professional', defaultFont: 'serif', fontSize: 'compact', targetSeniority: 'senior' },
  { title: 'Patent & IP Litigation Lawyer', category: 'academic', styleType: 'professional', industry: 'Legal & Law', recommended: 'Patent Filings & Trademark Litigators', tag: 'Patent Shield', defaultLayout: 'elegant', defaultFont: 'editorial', fontSize: 'normal', targetSeniority: 'senior' },

  // ATS Guaranteed Standard Formats
  { title: 'ATS Workday Fast-Track Pure', category: 'ats', styleType: 'professional', industry: 'ATS Guaranteed', recommended: 'Enterprise Corporate Portals & ATS Bots', tag: 'ATS 100%', defaultLayout: 'minimal', defaultFont: 'roboto', fontSize: 'compact', targetSeniority: 'all' },
  { title: 'Taleo & Greenhouse Parser Clean', category: 'ats', styleType: 'professional', industry: 'ATS Guaranteed', recommended: 'High-Volume Enterprise Job Portals', tag: '100% Parsable', defaultLayout: 'minimal', defaultFont: 'roboto', fontSize: 'normal', targetSeniority: 'all' },
  { title: 'Single-Column Harvard ATS Form', category: 'ats', styleType: 'professional', industry: 'ATS Guaranteed', recommended: 'Universities, Enterprise Employers & Recruiters', tag: 'Harvard ATS', defaultLayout: 'compact', defaultFont: 'serif', fontSize: 'compact', targetSeniority: 'all' },

  // Engineering & Industrial
  { title: 'Senior Mechanical Systems Engineer', category: 'engineering', styleType: 'professional', industry: 'Engineering', recommended: 'CAD, SolidWorks & Robotics Leads', tag: 'CAD Master', defaultLayout: 'modern', defaultFont: 'roboto', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Civil & Structural Engineering Lead', category: 'engineering', styleType: 'professional', industry: 'Engineering', recommended: 'Infrastructure & Site Project Directors', tag: 'Infrastructure', defaultLayout: 'professional', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Global Supply Chain & Logistics VP', category: 'engineering', styleType: 'professional', industry: 'Engineering', recommended: 'Global Logistics, Procurement & 3PL Heads', tag: 'Supply Chain', defaultLayout: 'sidebar', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'executive' },

  // Education & Academia
  { title: 'Tenured University Professor & Chair', category: 'academic', styleType: 'professional', industry: 'Education & Research', recommended: 'Tenured Faculty & Academic Deans', tag: 'Ivy League', defaultLayout: 'elegant', defaultFont: 'serif', fontSize: 'spacious', targetSeniority: 'senior' },
  { title: 'Postdoctoral Research Fellow', category: 'academic', styleType: 'professional', industry: 'Education & Research', recommended: 'Nature & Science Published Scientists', tag: 'Peer-Reviewed', defaultLayout: 'professional', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'mid' }
];

const creativeRoleSeeds: RoleTemplateSeed[] = [
  // Tech & Software Development
  { title: 'Full Stack JavaScript Architect', category: 'tech', styleType: 'creative', industry: 'Software & IT', recommended: 'Full Stack React, Node, Next.js Developers', tag: 'Top Tech', defaultLayout: 'tech', defaultFont: 'mono', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'AI & Deep Learning Researcher', category: 'tech', styleType: 'creative', industry: 'Software & IT', recommended: 'Data Scientists, LLM & GenAI Engineers', tag: 'AI Ready', defaultLayout: 'modern', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Cloud DevOps & SRE Lead', category: 'tech', styleType: 'creative', industry: 'Software & IT', recommended: 'Kubernetes, AWS & Terraform Specialists', tag: 'Cloud SRE', defaultLayout: 'tech', defaultFont: 'mono', fontSize: 'compact', targetSeniority: 'senior' },
  { title: 'Frontend UI/UX Performance Lead', category: 'tech', styleType: 'creative', industry: 'Software & IT', recommended: 'Design Systems & Frontend Craftsmen', tag: 'Modern Web', defaultLayout: 'modern', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'mid' },
  { title: 'Mobile iOS/Android Flutter Lead', category: 'tech', styleType: 'creative', industry: 'Software & IT', recommended: 'Swift, Kotlin & Cross-Platform Leads', tag: 'App Store Pro', defaultLayout: 'modern', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'mid' },
  { title: 'Web3 & Smart Contract Developer', category: 'tech', styleType: 'creative', industry: 'Software & IT', recommended: 'Solidity, Rust & Blockchain Engineers', tag: 'Web3 / Crypto', defaultLayout: 'tech', defaultFont: 'mono', fontSize: 'normal', targetSeniority: 'mid' },
  { title: 'Chief Technology Officer (CTO)', category: 'tech', styleType: 'creative', industry: 'Software & IT', recommended: 'Startup Founders & VP of Engineering', tag: 'Tech Visionary', defaultLayout: 'tech', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'executive' },

  // Creative, Design & UI/UX
  { title: 'Principal Product Designer', category: 'creative', styleType: 'creative', industry: 'Creative & Arts', recommended: 'Figma Pros, Design System Creators', tag: 'Figma Pro', defaultLayout: 'creative', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Creative Agency Art Director', category: 'creative', styleType: 'creative', industry: 'Creative & Arts', recommended: 'Branding & Visual Campaign Directors', tag: 'Visual Vanguard', defaultLayout: 'bold', defaultFont: 'sans', fontSize: 'spacious', targetSeniority: 'senior' },
  { title: '3D Motion & VFX Artist', category: 'creative', styleType: 'creative', industry: 'Creative & Arts', recommended: 'After Effects, Blender & Cinema4D Artists', tag: 'Motion Studio', defaultLayout: 'creative', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'mid' },
  { title: 'Architectural & Spatial Designer', category: 'creative', styleType: 'creative', industry: 'Creative & Arts', recommended: 'BIM, Revit & Interior Designers', tag: 'Spatial Design', defaultLayout: 'elegant', defaultFont: 'serif', fontSize: 'normal', targetSeniority: 'mid' },
  { title: 'Brand Identity & Visual Strategist', category: 'creative', styleType: 'creative', industry: 'Creative & Arts', recommended: 'Brand Builders & Visual Storytellers', tag: 'Brand Story', defaultLayout: 'creative', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'senior' },

  // Marketing, Growth & Digital Media
  { title: 'Head of Growth Marketing', category: 'marketing', styleType: 'creative', industry: 'Marketing & Sales', recommended: 'Growth Hackers & Acquisition Leads', tag: '10x Growth', defaultLayout: 'bold', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'senior' },
  { title: 'Performance Media ROI Director', category: 'marketing', styleType: 'creative', industry: 'Marketing & Sales', recommended: 'Meta, Google & TikTok Paid Media Leads', tag: 'ROI Master', defaultLayout: 'modern', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'mid' },
  { title: 'Content & Editorial Creator', category: 'marketing', styleType: 'creative', industry: 'Marketing & Sales', recommended: 'SEO Content Directors & Visual Storytellers', tag: 'Editorial Lead', defaultLayout: 'elegant', defaultFont: 'editorial', fontSize: 'normal', targetSeniority: 'mid' },
  { title: 'D2C E-Commerce Brand Manager', category: 'marketing', styleType: 'creative', industry: 'Marketing & Sales', recommended: 'Shopify Plus & Amazon Omnichannel Leads', tag: 'D2C Master', defaultLayout: 'sidebar', defaultFont: 'sans', fontSize: 'normal', targetSeniority: 'mid' },

  // Freshers, Entry Level & Career Changers
  { title: 'CS Graduate & Bootcamp Fresher', category: 'entry', styleType: 'creative', industry: 'Freshers & Entry Level', recommended: 'Recent Grads, Self-Taught Devs & Interns', tag: 'Fresher First', defaultLayout: 'modern', defaultFont: 'sans', fontSize: 'compact', targetSeniority: 'entry' },
  { title: 'Career Transition & Switcher', category: 'entry', styleType: 'creative', industry: 'Freshers & Entry Level', recommended: 'Professionals pivoting into Tech / Design', tag: 'Pivot Ready', defaultLayout: 'sidebar', defaultFont: 'roboto', fontSize: 'normal', targetSeniority: 'entry' }
];

// Design Style Modifiers for Variety
interface StyleThemeDescriptor {
  prefix: string;
  styleType: TemplateStyleClassification;
  font: ResumeFontFamily;
  layout: BaseLayoutVariant;
  featureTag: string;
}

const professionalStyleModifiers: StyleThemeDescriptor[] = [
  { prefix: 'Corporate Wall Street', styleType: 'professional', font: 'serif', layout: 'professional', featureTag: 'Corporate Precision' },
  { prefix: 'Harvard Academic Standard', styleType: 'professional', font: 'serif', layout: 'elegant', featureTag: 'Prestige Serif' },
  { prefix: 'Executive Boardroom', styleType: 'professional', font: 'editorial', layout: 'executive', featureTag: 'C-Suite Authority' },
  { prefix: 'Minimalist Bot-Proof', styleType: 'professional', font: 'roboto', layout: 'minimal', featureTag: 'Zero ATS Friction' },
  { prefix: 'Dense 1-Page Compact', styleType: 'professional', font: 'roboto', layout: 'compact', featureTag: 'High Information Density' },
  { prefix: 'Oxford Classical', styleType: 'professional', font: 'lora', layout: 'elegant', featureTag: 'Classical Hierarchy' },
  { prefix: 'Royal Blue Corporate', styleType: 'professional', font: 'playfair', layout: 'professional', featureTag: 'Executive Balance' },
  { prefix: 'Cambridge Single Column', styleType: 'professional', font: 'crimson', layout: 'compact', featureTag: 'Single Column Clean' },
  { prefix: 'Executive Gold Crest', styleType: 'professional', font: 'cinzel', layout: 'executive', featureTag: 'Prestige Leadership' },
  { prefix: 'Swiss Grid Business', styleType: 'professional', font: 'montserrat', layout: 'swiss', featureTag: 'Geometric Precision' }
];

const creativeStyleModifiers: StyleThemeDescriptor[] = [
  { prefix: 'Silicon Modern Clean', styleType: 'creative', font: 'sans', layout: 'modern', featureTag: 'Modern High Impact' },
  { prefix: 'Cyber Slate Terminal', styleType: 'creative', font: 'jetbrains', layout: 'tech', featureTag: 'Dev Monospace Accent' },
  { prefix: 'Creative Studio Indigo', styleType: 'creative', font: 'poppins', layout: 'creative', featureTag: 'Visual Storytelling' },
  { prefix: 'Bold Hero High Contrast', styleType: 'creative', font: 'jakarta', layout: 'bold', featureTag: 'Full Banner Presence' },
  { prefix: 'Sidebar Slate Split', styleType: 'creative', font: 'outfit', layout: 'sidebar', featureTag: 'Modern Dual Column' },
  { prefix: 'Nordic Clean Minimal', styleType: 'creative', font: 'dmsans', layout: 'nordic', featureTag: 'Scandinavian Minimal' },
  { prefix: 'Dynamic Timeline Flow', styleType: 'creative', font: 'poppins', layout: 'timeline', featureTag: 'Chronological Impact' },
  { prefix: 'Split Matrix Cyan', styleType: 'creative', font: 'space', layout: 'split', featureTag: 'Two-Tone Modular' },
  { prefix: 'Cascade Hero Gradient', styleType: 'creative', font: 'jakarta', layout: 'cascade', featureTag: 'Contemporary Wave' },
  { prefix: 'Infographic Tech Visual', styleType: 'creative', font: 'raleway', layout: 'infographic', featureTag: 'Badge-Rich Visual' },
  { prefix: 'DevOps Terminal Green', styleType: 'creative', font: 'fira', layout: 'tech', featureTag: 'Cloud Architect Spec' }
];

// ============================================================================
// 4. TEMPLATE REPOSITORY BUILDER (Generates 550+ Unique Templates)
// ============================================================================

/**
 * Builds and returns the comprehensive repository of 500+ templates,
 * categorized strictly by Professional and Creative styles.
 */
export function buildTemplateRepository(targetCount: number = 550): TemplateItem[] {
  const repository: TemplateItem[] = [
    ...signatureProfessionalTemplates,
    ...signatureCreativeTemplates
  ];

  let counter = 11;

  // 1. Build Professional Styles Collection (~300 templates)
  for (let modIdx = 0; modIdx < professionalStyleModifiers.length; modIdx++) {
    const modifier = professionalStyleModifiers[modIdx];

    for (let seedIdx = 0; seedIdx < professionalRoleSeeds.length; seedIdx++) {
      const seed = professionalRoleSeeds[seedIdx];
      const color = professionalColors[(seedIdx * 5 + modIdx * 7) % professionalColors.length];
      const atsScore = 97 + ((seedIdx + modIdx) % 4); // 97 - 100

      const templateId = `tpl-pro-${modifier.prefix.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${seed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${counter}`;

      repository.push({
        id: templateId,
        name: `${modifier.prefix} • ${seed.title}`,
        category: seed.category,
        styleType: 'professional',
        industry: seed.industry,
        layoutVariant: modifier.layout || seed.defaultLayout,
        tag: modifier.featureTag,
        description: `Authoritative ${modifier.prefix} layout tailored for ${seed.title}. 100% formatted for ATS parsers, executive recruiters, and formal hiring panels.`,
        atsRating: atsScore,
        recommendedFor: seed.recommended,
        color: color,
        fontFamily: modifier.font || seed.defaultFont,
        fontSize: seed.fontSize,
        popularity: 820 + ((seedIdx * 17 + modIdx * 23) % 180),
        features: [
          'Professional Formal Hierarchy',
          `${modifier.featureTag}`,
          `Optimized for ${seed.industry}`,
          '100% Clean Section Headers'
        ],
        targetSeniority: seed.targetSeniority
      });

      counter++;
    }
  }

  // 2. Build Creative Styles Collection (~250 templates)
  for (let modIdx = 0; modIdx < creativeStyleModifiers.length; modIdx++) {
    const modifier = creativeStyleModifiers[modIdx];

    for (let seedIdx = 0; seedIdx < creativeRoleSeeds.length; seedIdx++) {
      const seed = creativeRoleSeeds[seedIdx];
      const color = creativeColors[(seedIdx * 7 + modIdx * 11) % creativeColors.length];
      const atsScore = 95 + ((seedIdx + modIdx) % 5); // 95 - 99

      const templateId = `tpl-crt-${modifier.prefix.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${seed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${counter}`;

      repository.push({
        id: templateId,
        name: `${modifier.prefix} • ${seed.title}`,
        category: seed.category,
        styleType: 'creative',
        industry: seed.industry,
        layoutVariant: modifier.layout || seed.defaultLayout,
        tag: modifier.featureTag,
        description: `Modern and expressive ${modifier.prefix} design for ${seed.title}. Highlights projects, modern skill tags, and portfolio achievements.`,
        atsRating: atsScore,
        recommendedFor: seed.recommended,
        color: color,
        fontFamily: modifier.font || seed.defaultFont,
        fontSize: seed.fontSize,
        popularity: 840 + ((seedIdx * 19 + modIdx * 31) % 160),
        features: [
          'Contemporary Visual Styling',
          `${modifier.featureTag}`,
          'Project & Portfolio Ready',
          'Modern Skill Tag Badges'
        ],
        targetSeniority: seed.targetSeniority
      });

      counter++;
      if (repository.length >= targetCount) break;
    }
    if (repository.length >= targetCount) break;
  }

  return repository;
}

// Master singleton instance of the 550+ scaled template repository
export const masterTemplateRepository: TemplateItem[] = buildTemplateRepository(550);

// ============================================================================
// 5. UTILITY FUNCTIONS & QUERY ENGINES
// ============================================================================

/**
 * Filter templates by style classification ('professional' | 'creative' | 'all')
 */
export function getTemplatesByStyle(style: 'professional' | 'creative' | 'all'): TemplateItem[] {
  if (style === 'all') return masterTemplateRepository;
  return masterTemplateRepository.filter((t) => t.styleType === style);
}

/**
 * High-performance search, filtering, and pagination utility for the 500+ templates.
 */
export function filterAndPaginateTemplates(options: TemplateFilterOptions = {}): PaginatedTemplateResult {
  const {
    query = '',
    styleType = 'all',
    category = 'all',
    industry = 'all',
    layoutVariant = 'all',
    sortBy = 'popularity',
    page = 1,
    limit = 18
  } = options;

  const cleanQ = query.trim().toLowerCase();

  // Filter pipeline
  let filtered = masterTemplateRepository.filter((t) => {
    // Style classification filter
    if (styleType !== 'all' && t.styleType !== styleType) return false;

    // Category filter
    if (category !== 'all' && t.category !== category) return false;

    // Industry filter
    if (industry !== 'all' && t.industry !== industry) return false;

    // Layout variant filter
    if (layoutVariant !== 'all' && t.layoutVariant !== layoutVariant) return false;

    // Text search filter
    if (cleanQ) {
      const matchFound =
        t.name.toLowerCase().includes(cleanQ) ||
        t.industry.toLowerCase().includes(cleanQ) ||
        t.recommendedFor.toLowerCase().includes(cleanQ) ||
        t.tag.toLowerCase().includes(cleanQ) ||
        t.description.toLowerCase().includes(cleanQ) ||
        (t.features && t.features.some((f) => f.toLowerCase().includes(cleanQ)));

      if (!matchFound) return false;
    }

    return true;
  });

  // Count professional vs creative inside the filtered set
  const professionalCount = filtered.filter((t) => t.styleType === 'professional').length;
  const creativeCount = filtered.filter((t) => t.styleType === 'creative').length;

  // Sorting
  if (sortBy === 'ats') {
    filtered.sort((a, b) => b.atsRating - a.atsRating);
  } else if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'newest') {
    filtered.sort((a, b) => b.id.localeCompare(a.id));
  } else {
    // popularity
    filtered.sort((a, b) => b.popularity - a.popularity);
  }

  // Pagination slice
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * limit;
  const paginatedItems = filtered.slice(start, start + limit);

  return {
    templates: paginatedItems,
    totalCount,
    totalPages,
    currentPage,
    hasMore: currentPage < totalPages,
    stats: {
      professionalCount,
      creativeCount
    }
  };
}

/**
 * Compute global repository statistics
 */
export function getTemplateRepositoryStats(): TemplateRepositoryStats {
  let professionalCount = 0;
  let creativeCount = 0;
  let totalScore = 0;
  const categoryCounts: Record<string, number> = {};
  const industryCounts: Record<string, number> = {};

  for (let i = 0; i < masterTemplateRepository.length; i++) {
    const tpl = masterTemplateRepository[i];
    if (tpl.styleType === 'professional') professionalCount++;
    if (tpl.styleType === 'creative') creativeCount++;
    totalScore += tpl.atsRating;

    categoryCounts[tpl.category] = (categoryCounts[tpl.category] || 0) + 1;
    industryCounts[tpl.industry] = (industryCounts[tpl.industry] || 0) + 1;
  }

  return {
    totalCount: masterTemplateRepository.length,
    professionalCount,
    creativeCount,
    categoryCounts,
    industryCounts,
    averageAtsScore: Math.round((totalScore / masterTemplateRepository.length) * 10) / 10
  };
}

/**
 * Quick retrieval by template ID with safe fallback
 */
export function getTemplateById(id: string): TemplateItem {
  return (
    masterTemplateRepository.find((t) => t.id === id) ||
    masterTemplateRepository[0]
  );
}

/**
 * Recommends optimal templates based on candidate profile traits
 */
export function getRecommendedTemplates(profile: {
  industry?: string;
  stylePreference?: TemplateStyleClassification;
  targetRole?: string;
  limit?: number;
}): TemplateItem[] {
  const { stylePreference, industry, targetRole = '', limit = 6 } = profile;
  const cleanRole = targetRole.toLowerCase();

  return masterTemplateRepository
    .filter((t) => {
      if (stylePreference && t.styleType !== stylePreference) return false;
      if (industry && t.industry.toLowerCase().includes(industry.toLowerCase())) return true;
      if (cleanRole && (t.name.toLowerCase().includes(cleanRole) || t.recommendedFor.toLowerCase().includes(cleanRole))) return true;
      return true;
    })
    .slice(0, limit);
}

/**
 * Generates a random harmonious pairing
 */
export function getRandomTemplatePairing(stylePreference?: TemplateStyleClassification): TemplateItem {
  const pool = stylePreference
    ? masterTemplateRepository.filter((t) => t.styleType === stylePreference)
    : masterTemplateRepository;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || masterTemplateRepository[0];
}
