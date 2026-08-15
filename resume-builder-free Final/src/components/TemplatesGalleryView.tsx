import React, { useState, useMemo } from 'react';
import { ActiveView, TemplateId, ResumeStyle, TemplateStyleClassification } from '../types';
import { defaultResumeData } from '../data/defaultResume';
import { ResumeTemplateRenderer } from './templates/ResumeTemplateRenderer';
import {
  allTemplates,
  CATEGORY_OPTIONS,
  STYLE_OPTIONS,
  getTemplateById,
  filterAndPaginateTemplates,
  getTemplateRepositoryStats
} from '../data/templatesData';
import {
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Zap,
  Filter,
  Check,
  Palette,
  Briefcase,
  Brush,
  Award
} from 'lucide-react';
import { Footer } from './Footer';

interface Props {
  setActiveView: (view: ActiveView) => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onOpenDonation?: () => void;
}

const ITEMS_PER_PAGE = 18;

export const TemplatesGalleryView: React.FC<Props> = ({
  setActiveView,
  onSelectTemplate,
  onOpenDonation
}) => {
  const [selectedStyleType, setSelectedStyleType] = useState<TemplateStyleClassification | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLayout, setSelectedLayout] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'ats' | 'name'>('popularity');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activePreviewId, setActivePreviewId] = useState<string>('modern');
  const [showMobilePreviewModal, setShowMobilePreviewModal] = useState<boolean>(false);

  // Global repository stats
  const repositoryStats = useMemo(() => getTemplateRepositoryStats(), []);

  // Filter and sort the 500+ templates collection using the new repository engine
  const searchResult = useMemo(() => {
    return filterAndPaginateTemplates({
      query: searchQuery,
      styleType: selectedStyleType,
      category: selectedCategory,
      layoutVariant: selectedLayout,
      sortBy: sortBy,
      page: currentPage,
      limit: ITEMS_PER_PAGE
    });
  }, [searchQuery, selectedStyleType, selectedCategory, selectedLayout, sortBy, currentPage]);

  const { templates: paginatedTemplates, totalCount, totalPages, currentPage: currentSafePage } = searchResult;

  // Active previewed template metadata
  const currentPreviewTemplate = useMemo(() => {
    return getTemplateById(activePreviewId) || allTemplates[0];
  }, [activePreviewId]);

  // Active preview style configuration
  const previewStyle: ResumeStyle = useMemo(() => {
    return {
      templateId: currentPreviewTemplate.id,
      primaryColor: currentPreviewTemplate.color,
      fontFamily: currentPreviewTemplate.fontFamily,
      fontSize: currentPreviewTemplate.fontSize,
      lineSpacing: 'normal',
      showPhoto: currentPreviewTemplate.layoutVariant !== 'minimal'
    };
  }, [currentPreviewTemplate]);

  const handleSelectStyleType = (styleType: TemplateStyleClassification | 'all') => {
    setSelectedStyleType(styleType);
    setCurrentPage(1);
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleApplyTemplate = (tplId: string) => {
    onSelectTemplate(tplId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 text-[#1a73e8] text-xs font-bold mb-3.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>500+ Designer & ATS-Optimized Templates</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e293b] tracking-tight">
          Explore Over 500+ Resume Templates
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
          Engineered for top recruiters, Fortune 500 applicant tracking systems (ATS), and modern job roles across Tech, Finance, Healthcare, Creative, and C-Suite.
        </p>

        {/* Live Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5 max-w-2xl mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search 500+ templates by Job Title, Skill, Industry (e.g. React, Doctor, CA, C-Suite)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs cursor-pointer"
            >
              <option value="popularity">🔥 Most Popular</option>
              <option value="ats">⭐ Highest ATS Rating</option>
              <option value="name">🔤 Name (A-Z)</option>
              <option value="newest">✨ Newest First</option>
            </select>
          </div>
        </div>

        {/* Primary Style Classification Tabs (Professional vs Creative Styles) */}
        <div className="mt-5 flex items-center justify-center gap-2 p-1.5 bg-slate-100/90 dark:bg-slate-800/80 rounded-2xl max-w-xl mx-auto border border-slate-200/80 shadow-xs">
          <button
            type="button"
            onClick={() => handleSelectStyleType('all')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedStyleType === 'all'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/80'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Styles</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold">
              {repositoryStats.totalCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectStyleType('professional')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedStyleType === 'professional'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/80'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
            <span>Professional Styles</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold">
              {repositoryStats.professionalCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectStyleType('creative')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              selectedStyleType === 'creative'
                ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-sm border border-slate-200/80'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Brush className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Creative Styles</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-extrabold">
              {repositoryStats.creativeCount}
            </span>
          </button>
        </div>

        {/* Category Filter Pills (Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-4 no-scrollbar justify-start sm:justify-center">
          {CATEGORY_OPTIONS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Quick Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">
            Showing {totalCount} templates
          </span>
          {selectedStyleType !== 'all' && (
            <span className="capitalize font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              {selectedStyleType} Style
            </span>
          )}
          {searchQuery && (
            <span className="text-slate-500">for &quot;{searchQuery}&quot;</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Free & Unlimited PDF Exports</span>
          </span>
          <span className="text-slate-500 hidden sm:inline">
            Page {currentSafePage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Main Grid + Live Preview Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 500+ Templates Grid & Cards */}
        <div className="lg:col-span-7 space-y-4">
          {paginatedTemplates.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
              <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-base text-slate-800">No templates found</h3>
              <p className="text-xs text-slate-500 mt-1">Try searching for a different job role or clear your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedStyleType('all');
                }}
                className="mt-4 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {paginatedTemplates.map((template) => {
                const isSelected = activePreviewId === template.id;
                return (
                  <div
                    key={template.id}
                    onClick={() => setActivePreviewId(template.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/50 border-blue-500 shadow-md ring-2 ring-blue-400/30'
                        : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Top Header with Color Badge, Style Badge, and Tag */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 truncate">
                          <span
                            className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: template.color }}
                          />
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                            {template.industry}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                              template.styleType === 'professional'
                                ? 'bg-slate-100 text-slate-700 border border-slate-200'
                                : 'bg-purple-50 text-purple-700 border border-purple-200'
                            }`}
                          >
                            {template.styleType === 'professional' ? '👔 Pro' : '🎨 Creative'}
                          </span>
                          <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                            {template.tag}
                          </span>
                        </div>
                      </div>

                      {/* Template Title */}
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {template.name}
                      </h3>

                      {/* Description & Recommended */}
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>

                      <div className="mt-2 text-[10px] text-slate-600 bg-slate-50 rounded-lg p-1.5 border border-slate-100 line-clamp-1">
                        <span className="font-semibold text-slate-700">Best for: </span>
                        {template.recommendedFor}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>ATS {template.atsRating}%</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePreviewId(template.id);
                            setShowMobilePreviewModal(true);
                          }}
                          className="lg:hidden p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyTemplate(template.id);
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          <span>Use Template</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-6 flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentSafePage === 1}
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                <span>Page</span>
                <span className="font-bold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md border border-blue-200">
                  {currentSafePage}
                </span>
                <span>of {totalPages}</span>
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentSafePage === totalPages}
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Live Sticky Preview Panel */}
        <div className="hidden lg:block lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm sticky top-20">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-xs"
                  style={{ backgroundColor: currentPreviewTemplate.color }}
                />
                <span className="text-xs font-black text-slate-900 tracking-tight">
                  {currentPreviewTemplate.name}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Font: {currentPreviewTemplate.fontFamily} • ATS Score: {currentPreviewTemplate.atsRating}%
              </span>
            </div>

            <button
              onClick={() => handleApplyTemplate(currentPreviewTemplate.id)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Use This Template</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Live Sample Canvas */}
          <div className="overflow-x-auto max-h-[720px] overflow-y-auto border border-slate-200 rounded-2xl bg-slate-50 p-3 shadow-inner">
            <div className="origin-top scale-70 sm:scale-75 md:scale-80 transform-gpu shadow-xl mx-auto bg-white rounded-md">
              <ResumeTemplateRenderer data={defaultResumeData} style={previewStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Live Preview Modal */}
      {showMobilePreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex flex-col p-4">
          <div className="bg-white rounded-2xl p-4 flex items-center justify-between mb-3 shadow-lg">
            <div>
              <h3 className="font-bold text-sm text-slate-900">{currentPreviewTemplate.name}</h3>
              <p className="text-[10px] text-slate-500">{currentPreviewTemplate.industry}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowMobilePreviewModal(false);
                  handleApplyTemplate(currentPreviewTemplate.id);
                }}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold"
              >
                Use Template
              </button>
              <button
                onClick={() => setShowMobilePreviewModal(false)}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-slate-100 rounded-2xl p-2">
            <div className="origin-top scale-60 transform-gpu shadow-lg mx-auto bg-white">
              <ResumeTemplateRenderer data={defaultResumeData} style={previewStyle} />
            </div>
          </div>
        </div>
      )}

      {/* Stylish Creator & Contact Footer */}
      <div className="mt-20 -mx-4 sm:-mx-6 lg:-mx-8">
        <Footer setActiveView={setActiveView} onOpenDonation={onOpenDonation} />
      </div>
    </div>
  );
};
