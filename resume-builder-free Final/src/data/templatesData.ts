import { TemplateItem, TemplateStyleClassification } from '../types';
import {
  masterTemplateRepository,
  buildTemplateRepository,
  getTemplatesByStyle,
  filterAndPaginateTemplates,
  getTemplateRepositoryStats,
  getTemplateById as getTplById,
  getRecommendedTemplates,
  getRandomTemplatePairing,
  signatureProfessionalTemplates,
  signatureCreativeTemplates
} from '../utils/templateRepository';

// Master singleton of all 550+ templates
export const allTemplates: TemplateItem[] = masterTemplateRepository;

// Re-export utility functions
export {
  masterTemplateRepository,
  buildTemplateRepository,
  getTemplatesByStyle,
  filterAndPaginateTemplates,
  getTemplateRepositoryStats,
  getRecommendedTemplates,
  getRandomTemplatePairing,
  signatureProfessionalTemplates,
  signatureCreativeTemplates
};

// Style Classification Filter Options (Professional vs Creative Styles)
export const STYLE_OPTIONS: {
  id: TemplateStyleClassification | 'all';
  label: string;
  count: number;
  iconName?: string;
  badgeColor: string;
  description: string;
}[] = [
  {
    id: 'all',
    label: 'All Styles',
    count: allTemplates.length,
    badgeColor: 'bg-blue-100 text-blue-800',
    description: 'Browse all 550+ professional and creative resume designs'
  },
  {
    id: 'professional',
    label: 'Professional Styles',
    count: allTemplates.filter((t) => t.styleType === 'professional').length,
    badgeColor: 'bg-slate-100 text-slate-800',
    description: 'Wall Street, Harvard Academic, C-Suite, Minimalist ATS 100%, Healthcare & Legal'
  },
  {
    id: 'creative',
    label: 'Creative Styles',
    count: allTemplates.filter((t) => t.styleType === 'creative').length,
    badgeColor: 'bg-purple-100 text-purple-800',
    description: 'Silicon Valley Modern, Cyber Slate, UI/UX Studio, Bold Accent & Portfolio Designs'
  }
];

// Category Filter Definitions with Badges
export const CATEGORY_OPTIONS: {
  id: TemplateItem['category'] | 'all';
  label: string;
  count: number;
  iconName?: string;
}[] = [
  { id: 'all', label: 'All Templates', count: allTemplates.length },
  { id: 'ats', label: '100% ATS Optimized', count: allTemplates.filter((t) => t.category === 'ats').length },
  { id: 'tech', label: 'Software & IT Tech', count: allTemplates.filter((t) => t.category === 'tech').length },
  { id: 'modern', label: 'Modern Clean', count: allTemplates.filter((t) => t.category === 'modern').length },
  { id: 'executive', label: 'Executive & C-Suite', count: allTemplates.filter((t) => t.category === 'executive').length },
  { id: 'finance', label: 'Finance & Banking', count: allTemplates.filter((t) => t.category === 'finance').length },
  { id: 'healthcare', label: 'Healthcare & Medical', count: allTemplates.filter((t) => t.category === 'healthcare').length },
  { id: 'creative', label: 'Creative & UI/UX', count: allTemplates.filter((t) => t.category === 'creative').length },
  { id: 'marketing', label: 'Marketing & Sales', count: allTemplates.filter((t) => t.category === 'marketing').length },
  { id: 'engineering', label: 'Engineering & Ops', count: allTemplates.filter((t) => t.category === 'engineering').length },
  { id: 'academic', label: 'Legal & Academia', count: allTemplates.filter((t) => t.category === 'academic').length },
  { id: 'entry', label: 'Freshers & Entry Level', count: allTemplates.filter((t) => t.category === 'entry').length }
];

// Helper functions (backward-compatible)
export function getTemplateById(id: string): TemplateItem {
  return getTplById(id);
}

export function searchTemplates(
  query: string,
  category: string = 'all',
  styleType: TemplateStyleClassification | 'all' = 'all'
): TemplateItem[] {
  const result = filterAndPaginateTemplates({
    query,
    category,
    styleType,
    limit: 1000 // Return all matches for legacy search
  });
  return result.templates;
}
