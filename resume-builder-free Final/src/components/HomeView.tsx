import React, { useState, useEffect } from 'react';
import { ActiveView, TemplateId, UserFeedback } from '../types';
import {
  Sparkles,
  CheckCircle2,
  FileText,
  Eye,
  Download,
  Smartphone,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Award,
  Star,
  MessageSquareHeart,
  User,
  Quote,
  ThumbsUp
} from 'lucide-react';
import { Footer } from './Footer';
import { getStoredFeedbacks, onFeedbackUpdate } from '../utils/feedbackStore';

interface Props {
  setActiveView: (view: ActiveView) => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onOpenLegal: (tab: 'privacy' | 'terms') => void;
  onOpenDonation?: () => void;
  onOpenFeedback?: () => void;
}

export const HomeView: React.FC<Props> = ({
  setActiveView,
  onSelectTemplate,
  onOpenLegal,
  onOpenDonation,
  onOpenFeedback
}) => {
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>(() => getStoredFeedbacks());

  useEffect(() => {
    const unsub = onFeedbackUpdate(() => {
      setFeedbacks(getStoredFeedbacks());
    });
    return unsub;
  }, []);
  const templatesList: { id: TemplateId; name: string; tag: string; desc: string; previewColor: string; industry: string }[] = [
    {
      id: 'modern',
      name: 'Silicon Valley Modern Clean',
      tag: 'Most Popular',
      desc: 'Clean two-column layout with contemporary skill badges and sharp hierarchy.',
      previewColor: 'from-blue-600 to-blue-800',
      industry: 'Software & IT'
    },
    {
      id: 'professional',
      name: 'Wall Street Corporate Standard',
      tag: 'Banking & Finance',
      desc: 'Classic formal structure perfect for corporate, finance, and legal careers.',
      previewColor: 'from-slate-700 to-slate-900',
      industry: 'Finance & Banking'
    },
    {
      id: 'minimal',
      name: 'Minimalist (100% ATS Bot Proof)',
      tag: '100% ATS-Friendly',
      desc: 'Pure high-contrast black-and-white layout designed for automated HR bots.',
      previewColor: 'from-zinc-800 to-black',
      industry: 'ATS Guaranteed'
    },
    {
      id: 'tech',
      name: 'Cyber Slate & Cyan Dev',
      tag: 'DevOps & Cloud',
      desc: 'Deep slate banner with vivid sky cyan accents and structured bullet achievements.',
      previewColor: 'from-slate-900 to-cyan-950',
      industry: 'Engineering'
    },
    {
      id: 'creative',
      name: 'Contemporary Design Studio',
      tag: 'UI/UX & Product',
      desc: 'Dynamic colored accent sidebar with contemporary typography and badge chips.',
      previewColor: 'from-purple-600 to-indigo-800',
      industry: 'Design & Media'
    },
    {
      id: 'executive',
      name: 'C-Suite Leadership Boardroom',
      tag: 'Senior Leadership',
      desc: 'Sophisticated typography, leadership summary framing, and strategic matrices.',
      previewColor: 'from-gray-900 to-blue-950',
      industry: 'Executive & CXO'
    }
  ];

  const faqs = [
    {
      q: 'How much does it cost to download a resume?',
      a: 'Building, customizing, choosing from 500+ templates, and live previewing are completely free. When you are ready to download your final watermark-free, high-resolution A4 PDF, there is a nominal fee of only ₹10 via UPI (Google Pay, PhonePe, Paytm, or BHIM).'
    },
    {
      q: 'Do I need to create an account or sign in to download?',
      a: 'No! Sign-in is 100% optional. You can build your resume as a guest, pay ₹10 directly via UPI QR code or any UPI app, and instantly download your clean PDF.'
    },
    {
      q: 'Are the templates ATS-friendly for corporate job applications?',
      a: 'Absolutely. All our templates follow standard semantic section headers, readable font hierarchy, and structured tables that applicant tracking systems like Workday, Greenhouse, and Lever parse effortlessly.'
    },
    {
      q: 'Can I use this on my mobile phone as well as laptop?',
      a: 'Yes! The application features a dedicated mobile responsive interface with a quick form editor, a sticky action bar, direct UPI app payment intents, and a zoomable live A4 preview designed specifically for phones and tablets.'
    },
    {
      q: 'Will my progress be saved if I accidentally close the tab?',
      a: 'Yes. The system automatically saves your ongoing draft to local browser storage in real-time. Once logged in, your resumes sync seamlessly to your personal dashboard.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-radial from-[#ffffff] via-[#f8fafd] to-[#edf2fa] border-b border-[#dadce0]">
        {/* Subtle decorative Google circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f0fe] border border-[#d2e3fc] text-[#1a73e8] text-xs font-semibold mb-6 shadow-xs animate-in fade-in slide-in-from-top-4 duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[#1a73e8]" />
            <span>Instant PDF Download at Just ₹10 • No Sign-Up Needed</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#202124] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Create Your Professional Resume <span className="text-[#1a73e8]">at Just ₹10</span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-lg sm:text-xl text-[#5f6368] max-w-2xl mx-auto font-normal leading-relaxed">
            Build a clean, modern, and professional ATS-friendly resume with live preview and instant watermark-free A4 PDF download via UPI for just ₹10.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="hero-create-btn"
              onClick={() => setActiveView('builder')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Build Resume (₹10 Download)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="hero-templates-btn"
              onClick={() => setActiveView('templates')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-gray-50 text-[#3c4043] hover:text-[#202124] border border-[#dadce0] rounded-xl font-semibold text-base shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#5f6368]" />
              <span>View 500+ Templates</span>
            </button>
          </div>

          {/* Hero Checklist Checklist badges */}
          <div className="mt-10 pt-6 border-t border-gray-200/80 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-[#3c4043]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0" /> Free Live Preview
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0" /> 500+ Designer Templates
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0" /> Only ₹10 via UPI
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0" /> No Sign-In Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#188038] shrink-0" /> Watermark-Free A4 PDF
            </span>
          </div>
        </div>
      </section>

      {/* Live Builder Mockup Preview Banner */}
      <section className="py-12 bg-white border-b border-[#dadce0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">
              Build, Customize & Download in 3 Steps
            </h2>
            <p className="text-sm text-[#5f6368] mt-2">
              Everything happens right inside your browser with zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f8fafd] border border-[#e8eaed] rounded-2xl p-6 relative hover:border-[#1a73e8]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a73e8] font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-lg text-[#202124]">Fill Your Details</h3>
              <p className="text-sm text-[#5f6368] mt-1.5 leading-relaxed">
                Add your personal contact info, work experiences, skills, education, projects, certifications, and languages with helpful guided fields.
              </p>
            </div>

            <div className="bg-[#f8fafd] border border-[#e8eaed] rounded-2xl p-6 relative hover:border-[#1a73e8]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a73e8] font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-lg text-[#202124]">Pick a Template & Style</h3>
              <p className="text-sm text-[#5f6368] mt-1.5 leading-relaxed">
                Switch instantly between Modern, Professional, Minimal ATS, Creative, and Executive styles with custom accent colors and typography.
              </p>
            </div>

            <div className="bg-[#f8fafd] border border-[#e8eaed] rounded-2xl p-6 relative hover:border-[#1a73e8]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1a73e8] font-bold flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-lg text-[#202124]">Instant PDF Download</h3>
              <p className="text-sm text-[#5f6368] mt-1.5 leading-relaxed">
                Download a pixel-perfect standard A4 resume formatted with high resolution, correct margins, and ATS-ready selectable text.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Showcase Grid */}
      <section className="py-16 bg-[#f8fafd] border-b border-[#dadce0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a73e8] uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>500+ Designer & ATS Templates</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">
                Choose from 500+ Professional Resume Templates
              </h2>
              <p className="text-sm text-[#5f6368] mt-1">
                Tailored for every industry: Tech, Finance, Healthcare, Creative, Legal, and Freshers.
              </p>
            </div>

            <button
              onClick={() => setActiveView('templates')}
              className="text-sm font-bold text-[#1a73e8] hover:text-blue-700 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span>Explore All 500+ Templates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templatesList.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-2xl border border-[#dadce0] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Visual Thumbnail Card */}
                <div className={`h-44 bg-linear-to-br ${tpl.previewColor} p-4 flex flex-col justify-between text-white relative overflow-hidden`}>
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white">
                      {tpl.tag}
                    </span>
                    <span className="text-xs font-semibold opacity-80 uppercase tracking-widest font-mono">
                      A4 Standard
                    </span>
                  </div>

                  <div className="z-10 bg-white/10 backdrop-blur-sm p-2.5 rounded-lg border border-white/20">
                    <div className="w-1/2 h-2.5 bg-white rounded-sm mb-1.5" />
                    <div className="w-3/4 h-1.5 bg-white/70 rounded-xs mb-1" />
                    <div className="w-2/3 h-1.5 bg-white/60 rounded-xs" />
                  </div>

                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#202124]">{tpl.name}</h3>
                    <p className="text-xs text-[#5f6368] mt-1 leading-relaxed">{tpl.desc}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">ATS Score: 98%</span>
                    <button
                      onClick={() => onSelectTemplate(tpl.id)}
                      className="px-3.5 py-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Use Template</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-16 bg-white border-b border-[#dadce0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">
              Everything You Need in a Modern Resume Tool
            </h2>
            <p className="text-sm text-[#5f6368] mt-2">
              Designed with simplicity, speed, and real-world hiring standards in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#f8fafd] border border-[#e8eaed]">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1a73e8] flex items-center justify-center mb-3.5">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#202124] text-base">Instant Live Preview</h3>
              <p className="text-xs text-[#5f6368] mt-1.5 leading-relaxed">
                Type in the form and watch the resume update in real-time on your screen. No page refresh or waiting required.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fafd] border border-[#e8eaed]">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-[#188038] flex items-center justify-center mb-3.5">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#202124] text-base">True A4 PDF Downloads</h3>
              <p className="text-xs text-[#5f6368] mt-1.5 leading-relaxed">
                Download crisp, high-resolution A4 resumes with perfect margins, no unnecessary website chrome, and selectable text.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fafd] border border-[#e8eaed]">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3.5">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#202124] text-base">Mobile & Laptop Optimized</h3>
              <p className="text-xs text-[#5f6368] mt-1.5 leading-relaxed">
                Use a clean 2-column layout on laptop/desktop, and a seamless stacked editor with sticky quick-bar on mobile phones.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fafd] border border-[#e8eaed]">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3.5">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#202124] text-base">Real-Time Auto-Save</h3>
              <p className="text-xs text-[#5f6368] mt-1.5 leading-relaxed">
                Never lose your progress. Your edits save automatically while you type in local storage and sync to your cloud account.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fafd] border border-[#e8eaed]">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#ea4335] flex items-center justify-center mb-3.5">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#202124] text-base">No Login to Build</h3>
              <p className="text-xs text-[#5f6368] mt-1.5 leading-relaxed">
                Start creating and testing immediately without filling out signup forms first. Sign in only when you download your PDF.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fafd] border border-[#e8eaed]">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#202124] text-base">Privacy First</h3>
              <p className="text-xs text-[#5f6368] mt-1.5 leading-relaxed">
                Your data stays strictly yours. We never sell your resume information to third-party recruiters or data brokers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews & Feedback Wall Section */}
      <section id="reviews-section" className="py-16 bg-white border-b border-[#dadce0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>User Reviews & Ratings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">
                Loved by 1,200+ Candidates Across India
              </h2>
              <p className="text-sm text-[#5f6368] mt-1">
                Real feedback from developers, freshers, analysts, and managers who downloaded their resume for ₹10.
              </p>
            </div>

            {onOpenFeedback && (
              <button
                type="button"
                onClick={onOpenFeedback}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-sm transition-all cursor-pointer shrink-0"
              >
                <MessageSquareHeart className="w-4 h-4" />
                <span>Give Your Feedback / Review</span>
              </button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 mb-8 text-center">
            <div>
              <div className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
                <span>4.9</span>
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">Average Rating</p>
            </div>
            <div>
              <div className="text-2xl font-black text-[#202124]">1,200+</div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">Resumes Downloaded</p>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">₹10</div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">Transparent Price</p>
            </div>
            <div>
              <div className="text-2xl font-black text-[#1a73e8]">100%</div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">ATS Approved</p>
            </div>
          </div>

          {/* Feedback Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {feedbacks.slice(0, 6).map((fb) => (
              <div
                key={fb.id}
                className="bg-[#f8fafd] border border-[#e8eaed] rounded-2xl p-5 hover:border-amber-400/60 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top rating & date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(fb.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#5f6368] font-medium">{fb.createdAt}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-[#3c4043] leading-relaxed italic">
                    "{fb.comment}"
                  </p>

                  {/* Tags */}
                  {fb.tags && fb.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {fb.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Candidate Info */}
                <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                      {fb.name ? fb.name[0] : 'U'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#202124]">{fb.name}</h4>
                      <p className="text-[10px] text-[#5f6368]">{fb.role || 'Job Seeker'}</p>
                    </div>
                  </div>
                  {fb.resumeTitle && (
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium max-w-[110px] truncate">
                      {fb.resumeTitle}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#f8fafd] border-b border-[#dadce0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">Frequently Asked Questions</h2>
            <p className="text-sm text-[#5f6368] mt-1">Everything you need to know about Resume Builder Free.</p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-[#dadce0] p-4.5 open:shadow-xs transition-all"
              >
                <summary className="font-bold text-sm text-[#202124] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-xs text-[#5f6368] mt-3 leading-relaxed border-t border-gray-100 pt-2.5">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#202124] tracking-tight">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-sm text-[#5f6368] mt-2 max-w-xl mx-auto">
            Join thousands of professionals creating clean, recruiter-approved resumes in minutes.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setActiveView('builder')}
              className="px-8 py-3.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <span>Create My Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Footer with Creator Akash Vishwakarma and Contact Info */}
      <Footer
        setActiveView={setActiveView}
        onOpenLegal={onOpenLegal}
        onOpenDonation={onOpenDonation}
        onOpenFeedback={onOpenFeedback}
      />
    </div>
  );
};
