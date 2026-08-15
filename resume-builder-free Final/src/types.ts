export interface PersonalInfo {
  fullName: string;
  title: string;
  photoUrl: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  github?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  role: string;
  technologies: string;
  description: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string; // e.g., "Native", "Professional", "Conversational"
}

export interface AdditionalItem {
  id: string;
  type: 'achievement' | 'award' | 'hobby' | 'reference' | 'publication' | 'volunteer';
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export type BaseLayoutVariant =
  | 'modern'
  | 'professional'
  | 'minimal'
  | 'creative'
  | 'executive'
  | 'sidebar'
  | 'bold'
  | 'accent'
  | 'compact'
  | 'elegant'
  | 'tech'
  | 'split'
  | 'nordic'
  | 'metro'
  | 'timeline'
  | 'swiss'
  | 'infographic'
  | 'grid'
  | 'cascade';

export type TemplateId =
  | BaseLayoutVariant
  | string;

export type ResumeFontFamily =
  | 'sans'
  | 'serif'
  | 'roboto'
  | 'editorial'
  | 'mono'
  | 'poppins'
  | 'outfit'
  | 'jakarta'
  | 'montserrat'
  | 'raleway'
  | 'dmsans'
  | 'space'
  | 'playfair'
  | 'merriweather'
  | 'lora'
  | 'crimson'
  | 'cinzel'
  | 'jetbrains'
  | 'fira'
  | 'oswald';

export type ThemeMode = 'light' | 'dark';

export type TemplateStyleClassification = 'professional' | 'creative';

export interface TemplateItem {
  id: string;
  name: string;
  category: 'ats' | 'modern' | 'executive' | 'creative' | 'tech' | 'finance' | 'healthcare' | 'academic' | 'entry' | 'engineering' | 'marketing' | 'all';
  styleType: TemplateStyleClassification;
  industry: string;
  layoutVariant: BaseLayoutVariant;
  tag: string;
  description: string;
  atsRating: number;
  recommendedFor: string;
  color: string;
  fontFamily: ResumeFontFamily;
  fontSize: 'compact' | 'normal' | 'spacious';
  popularity: number;
  features?: string[];
  targetSeniority?: 'entry' | 'mid' | 'senior' | 'executive' | 'all';
}

export interface TemplateRepositoryStats {
  totalCount: number;
  professionalCount: number;
  creativeCount: number;
  categoryCounts: Record<string, number>;
  industryCounts: Record<string, number>;
  averageAtsScore: number;
}

export interface TemplateFilterOptions {
  query?: string;
  styleType?: 'all' | 'professional' | 'creative';
  category?: string;
  industry?: string;
  layoutVariant?: string;
  sortBy?: 'popularity' | 'ats' | 'name' | 'newest';
  page?: number;
  limit?: number;
}

export interface PaginatedTemplateResult {
  templates: TemplateItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
  stats: {
    professionalCount: number;
    creativeCount: number;
  };
}

export interface ResumeStyle {
  templateId: TemplateId;
  primaryColor: string; // hex
  fontFamily: ResumeFontFamily;
  fontSize: 'compact' | 'normal' | 'spacious';
  lineSpacing: 'normal' | 'relaxed';
  showPhoto: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillItem[];
  projects: Project[];
  certifications: Certification[];
  languages: LanguageItem[];
  additionalSections: AdditionalItem[];
}

export interface ResumeDocument {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  data: ResumeData;
  style: ResumeStyle;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isLoggedIn: boolean;
}

export interface UserFeedback {
  id: string;
  name: string;
  role?: string;
  rating: number;
  tags: string[];
  comment: string;
  createdAt: string;
  resumeTitle?: string;
}

export type ActiveView = 'home' | 'builder' | 'templates' | 'dashboard' | 'settings';
