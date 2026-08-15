import { ResumeData, ResumeStyle, ResumeDocument } from '../types';

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: 'Rahul Sharma',
    title: 'Senior Full Stack Software Engineer',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    email: 'rahul.sharma@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/rahulsharma-dev',
    website: 'rahulsharma.dev',
    github: 'github.com/rahulsharma'
  },
  summary: 'Motivated and detail-oriented Senior Software Engineer with 6+ years of experience architecting high-scale web platforms, distributed cloud microservices, and intuitive user experiences. Proven track record of improving application throughput by 42% and mentoring agile engineering teams.',
  workExperience: [
    {
      id: 'exp-1',
      jobTitle: 'Senior Software Engineer',
      company: 'Apex Cloud Technologies',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: '• Spearheaded migration of legacy monolithic backend to modern event-driven microservices on Google Cloud Platform, reducing latency by 35%.\n• Designed and shipped core customer billing pipeline processing $12M+ in monthly transactions with 99.99% uptime.\n• Mentored 6 junior/mid-level engineers and established rigorous automated CI/CD and testing standards.'
    },
    {
      id: 'exp-2',
      jobTitle: 'Full Stack Engineer',
      company: 'Innovate Solutions Inc.',
      location: 'Austin, TX',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description: '• Developed responsive React and TypeScript frontend applications used by 250,000+ daily active enterprise users.\n• Optimized SQL query performance and implemented Redis caching layer, cutting average API response times from 450ms to 85ms.\n• Partnered with product and UX designers to build a reusable design system component library.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      location: 'Stanford, CA',
      startYear: '2017',
      endYear: '2019',
      description: 'Specialization in Distributed Systems & Cloud Computing. GPA: 3.9/4.0. Dean\'s Honor List.'
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Technology in Information Technology',
      school: 'National Institute of Technology',
      location: 'Delhi, India',
      startYear: '2013',
      endYear: '2017',
      description: 'Graduated with First Class Honors. Led the University Open Source Club.'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'TypeScript', level: 'Expert' },
    { id: 'sk-2', name: 'React.js', level: 'Expert' },
    { id: 'sk-3', name: 'Node.js', level: 'Expert' },
    { id: 'sk-4', name: 'Python', level: 'Advanced' },
    { id: 'sk-5', name: 'Google Cloud (GCP)', level: 'Advanced' },
    { id: 'sk-6', name: 'Docker & Kubernetes', level: 'Advanced' },
    { id: 'sk-7', name: 'PostgreSQL & Redis', level: 'Advanced' },
    { id: 'sk-8', name: 'System Design', level: 'Expert' },
    { id: 'sk-9', name: 'REST & GraphQL APIs', level: 'Expert' },
    { id: 'sk-10', name: 'CI/CD Pipelines', level: 'Advanced' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniStream Analytics Engine',
      role: 'Lead Architect',
      technologies: 'React, Node.js, Kafka, PostgreSQL, TailwindCSS',
      description: 'Built a real-time event streaming visualization dashboard handling 100,000+ events/sec with sub-second telemetry charts.',
      link: 'https://github.com/rahulsharma/omnistream'
    },
    {
      id: 'proj-2',
      name: 'DevSync Collaborative Editor',
      role: 'Creator & Maintainer',
      technologies: 'TypeScript, WebSockets, CRDTs, Docker',
      description: 'Engineered a real-time multiplayer markdown workspace featuring conflict-free peer syncing and offline-first storage.',
      link: 'https://devsync-app.example.com'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Google Cloud Certified Professional Cloud Architect',
      issuer: 'Google Cloud',
      date: '2023-08',
      credentialId: 'GCP-PCA-88934',
      credentialUrl: 'https://cloud.google.com/certification'
    },
    {
      id: 'cert-2',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2022-04',
      credentialId: 'AWS-SAA-10928',
      credentialUrl: 'https://aws.amazon.com/certification'
    }
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Professional Working' },
    { id: 'lang-2', language: 'Hindi', proficiency: 'Native / Bilingual' },
    { id: 'lang-3', language: 'Spanish', proficiency: 'Conversational' }
  ],
  additionalSections: [
    {
      id: 'add-1',
      type: 'achievement',
      title: 'Global Hackathon 1st Place Winner',
      subtitle: 'TechCrunch Disrupt',
      date: '2023',
      description: 'Built an AI-assisted accessibility tool for visually impaired coders in 48 hours among 300+ international teams.'
    },
    {
      id: 'add-2',
      type: 'volunteer',
      title: 'Volunteer Coding Mentor',
      subtitle: 'CodeForGood Non-Profit',
      date: '2021 – Present',
      description: 'Conduct bi-weekly coding workshops and resume reviews for underrepresented high school students pursuing STEM careers.'
    }
  ]
};

export const defaultResumeStyle: ResumeStyle = {
  templateId: 'modern',
  primaryColor: '#1a73e8', // Google Blue
  fontFamily: 'sans',
  fontSize: 'normal',
  lineSpacing: 'normal',
  showPhoto: true
};

export const sampleProfiles: Record<string, { label: string; role: string; data: ResumeData; style: ResumeStyle }> = {
  software: {
    label: 'Software Engineer',
    role: 'Tech & Engineering',
    data: defaultResumeData,
    style: {
      templateId: 'modern',
      primaryColor: '#1a73e8',
      fontFamily: 'sans',
      fontSize: 'normal',
      lineSpacing: 'normal',
      showPhoto: true
    }
  },
  marketing: {
    label: 'Marketing Director',
    role: 'Growth & Strategy',
    data: {
      personalInfo: {
        fullName: 'Elena Rostova',
        title: 'Senior Growth Marketing Director',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
        email: 'elena.rostova@example.com',
        phone: '+1 (555) 789-0123',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/elena-marketing',
        website: 'elenagrowth.com'
      },
      summary: 'Data-driven Growth Marketing Director with 8+ years scaling B2B SaaS ARR from $5M to $45M+. Expert in performance acquisition, lifecycle email funnels, product-led growth, and building high-velocity marketing squads.',
      workExperience: [
        {
          id: 'exp-m1',
          jobTitle: 'Head of Growth Marketing',
          company: 'Vanguard SaaS Platforms',
          location: 'New York, NY',
          startDate: '2021-01',
          endDate: '',
          current: true,
          description: '• Scaled paid acquisition spend to $300K/month while lowering CAC by 28% across Google Ads, LinkedIn, and Meta.\n• Launched interactive self-serve onboarding that lifted freemium-to-paid conversion rates from 3.2% to 6.8%.\n• Managed an 8-person multidisciplinary team across content, paid ads, SEO, and lifecycle marketing.'
        },
        {
          id: 'exp-m2',
          jobTitle: 'Senior Product Marketing Lead',
          company: 'HyperGrowth Media',
          location: 'Boston, MA',
          startDate: '2018-03',
          endDate: '2020-12',
          current: false,
          description: '• Executed 4 major product tier launches resulting in $8.5M in net-new pipeline within 90 days of rollout.\n• Revamped corporate positioning and sales enablement decks, boosting win rates against primary competitors by 19%.'
        }
      ],
      education: [
        {
          id: 'edu-m1',
          degree: 'Bachelor of Science in Marketing & Communications',
          school: 'Columbia University',
          location: 'New York, NY',
          startYear: '2013',
          endYear: '2017',
          description: 'Summa Cum Laude. President of the American Marketing Association Student Chapter.'
        }
      ],
      skills: [
        { id: 'sk-m1', name: 'Demand Generation', level: 'Expert' },
        { id: 'sk-m2', name: 'Google Ads & SEO', level: 'Expert' },
        { id: 'sk-m3', name: 'HubSpot & Marketo', level: 'Expert' },
        { id: 'sk-m4', name: 'Conversion Optimization (CRO)', level: 'Advanced' },
        { id: 'sk-m5', name: 'SQL & Tableau Analytics', level: 'Advanced' },
        { id: 'sk-m6', name: 'Brand Strategy', level: 'Expert' }
      ],
      projects: [
        {
          id: 'proj-m1',
          name: 'The SaaS Funnel Blueprint',
          role: 'Author & Strategist',
          technologies: 'HubSpot, Webflow, GA4',
          description: 'Published comprehensive guide on product-led growth downloaded by 15,000+ marketing executives.',
          link: 'https://growthblueprint.example.com'
        }
      ],
      certifications: [
        {
          id: 'cert-m1',
          name: 'Google Analytics Individual Qualification (GA4)',
          issuer: 'Google',
          date: '2023-05',
          credentialId: 'GA4-CERT-9901',
          credentialUrl: 'https://skillshop.exceedlms.com'
        }
      ],
      languages: [
        { id: 'lang-m1', language: 'English', proficiency: 'Native' },
        { id: 'lang-m2', language: 'French', proficiency: 'Professional' }
      ],
      additionalSections: [
        {
          id: 'add-m1',
          type: 'award',
          title: 'Top 40 Under 40 Growth Marketers',
          subtitle: 'MarTech Leaders Forum',
          date: '2023',
          description: 'Recognized for pioneering multi-touch attribution models in B2B subscription software.'
        }
      ]
    },
    style: {
      templateId: 'creative',
      primaryColor: '#7c3aed',
      fontFamily: 'serif',
      fontSize: 'normal',
      lineSpacing: 'relaxed',
      showPhoto: true
    }
  },
  executive: {
    label: 'Corporate Executive',
    role: 'Operations & Management',
    data: {
      personalInfo: {
        fullName: 'Marcus Vance',
        title: 'Chief Operating Officer (COO)',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        email: 'marcus.vance@example.com',
        phone: '+1 (555) 345-6789',
        location: 'Chicago, IL',
        linkedin: 'linkedin.com/in/marcus-vance-coo',
        website: 'vanceexecutive.com'
      },
      summary: 'Results-driven Chief Operating Officer with 15+ years of P&L leadership across global manufacturing, supply chain logistics, and digital transformation. Proven record driving $150M+ revenue growth and operational excellence across 1,200+ employees.',
      workExperience: [
        {
          id: 'exp-e1',
          jobTitle: 'Chief Operating Officer',
          company: 'Sterling Global Logistics',
          location: 'Chicago, IL',
          startDate: '2019-08',
          endDate: '',
          current: true,
          description: '• Directed enterprise operations across 14 distribution centers, reducing operational overhead by 22% ($14.2M annual savings).\n• Instituted company-wide Lean Six Sigma framework that enhanced on-time shipment reliability from 91% to 99.4%.\n• Managed $85M annual operational budget and led executive board quarterly strategic reporting.'
        },
        {
          id: 'exp-e2',
          jobTitle: 'Vice President of Global Operations',
          company: 'Apex Industrial Systems',
          location: 'Detroit, MI',
          startDate: '2014-04',
          endDate: '2019-07',
          current: false,
          description: '• Orchestrated post-merger operational consolidation of 3 acquired supply chain facilities with zero downtime.\n• Negotiated tier-1 vendor contracts delivering $6.8M in direct material cost reductions.'
        }
      ],
      education: [
        {
          id: 'edu-e1',
          degree: 'Master of Business Administration (MBA)',
          school: 'Northwestern University - Kellogg School of Management',
          location: 'Evanston, IL',
          startYear: '2011',
          endYear: '2013',
          description: 'Executive Leadership Concentration. Beta Gamma Sigma Honor Society.'
        },
        {
          id: 'edu-e2',
          degree: 'Bachelor of Science in Mechanical Engineering',
          school: 'University of Michigan',
          location: 'Ann Arbor, MI',
          startYear: '2005',
          endYear: '2009',
          description: 'Graduated Magna Cum Laude.'
        }
      ],
      skills: [
        { id: 'sk-e1', name: 'Executive P&L Management', level: 'Expert' },
        { id: 'sk-e2', name: 'Strategic Supply Chain', level: 'Expert' },
        { id: 'sk-e3', name: 'Lean Six Sigma Master Black Belt', level: 'Expert' },
        { id: 'sk-e4', name: 'Mergers & Acquisitions (M&A)', level: 'Advanced' },
        { id: 'sk-e5', name: 'Board Governance & Stakeholder Alignment', level: 'Expert' }
      ],
      projects: [
        {
          id: 'proj-e1',
          name: 'Enterprise ERP Modernization',
          role: 'Executive Sponsor',
          technologies: 'SAP S/4HANA, Salesforce',
          description: 'Led multi-year $18M digital transformation completed 2 months ahead of schedule and 8% under budget.',
          link: ''
        }
      ],
      certifications: [
        {
          id: 'cert-e1',
          name: 'Lean Six Sigma Master Black Belt',
          issuer: 'ASQ',
          date: '2016-10',
          credentialId: 'SS-MBB-44120',
          credentialUrl: 'https://asq.org'
        }
      ],
      languages: [
        { id: 'lang-e1', language: 'English', proficiency: 'Native' },
        { id: 'lang-e2', language: 'German', proficiency: 'Conversational' }
      ],
      additionalSections: [
        {
          id: 'add-e1',
          type: 'achievement',
          title: 'Executive of the Year Award',
          subtitle: 'Midwest Business Journal',
          date: '2022',
          description: 'Honored for spearheading sustainable carbon-neutral warehouse transitions across Illinois.'
        }
      ]
    },
    style: {
      templateId: 'executive',
      primaryColor: '#0f172a',
      fontFamily: 'editorial',
      fontSize: 'normal',
      lineSpacing: 'relaxed',
      showPhoto: true
    }
  },
  atsMinimal: {
    label: 'ATS Minimalist',
    role: 'HR / Recruiter Bot Friendly',
    data: defaultResumeData,
    style: {
      templateId: 'minimal',
      primaryColor: '#1e293b',
      fontFamily: 'roboto',
      fontSize: 'normal',
      lineSpacing: 'normal',
      showPhoto: false
    }
  }
};

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    photoUrl: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    github: ''
  },
  summary: '',
  workExperience: [
    {
      id: 'exp-new-1',
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ],
  education: [
    {
      id: 'edu-new-1',
      degree: '',
      school: '',
      location: '',
      startYear: '',
      endYear: '',
      description: ''
    }
  ],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  additionalSections: []
};

export const defaultResumeDocument: ResumeDocument = {
  id: 'resume-primary-default',
  title: 'My Professional Resume',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  data: defaultResumeData,
  style: defaultResumeStyle
};
