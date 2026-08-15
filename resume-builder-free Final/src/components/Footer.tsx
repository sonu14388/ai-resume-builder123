import React, { useState } from 'react';
import {
  FileText,
  Mail,
  Heart,
  Sparkles,
  Check,
  Copy,
  ExternalLink,
  Code2,
  Send,
  Gift,
  QrCode
} from 'lucide-react';
import { ActiveView } from '../types';

interface FooterProps {
  setActiveView?: (view: ActiveView) => void;
  onOpenLegal?: (tab: 'privacy' | 'terms') => void;
  onOpenDonation?: () => void;
  onOpenFeedback?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView, onOpenLegal, onOpenDonation, onOpenFeedback }) => {
  const [copied, setCopied] = useState(false);
  const creatorEmail = 'sonuakash11121@gmail.com';
  const creatorName = 'Akash Vishwakarma';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(creatorEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="app-footer" className="bg-[#0f172a] text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Banner / Creator Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800/90 to-blue-950/80 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          {/* Subtle glow background elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Creator Profile Spotlight */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
              {/* Creator Monogram Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-blue-500/25">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-black text-xl text-white tracking-tight">
                    AV
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900 shadow-xs" title="Verified Creator">
                  <Sparkles className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Creator Identity & Meta */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-semibold mb-2">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Creator & Developer</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                  <span>{creatorName}</span>
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md">
                  Crafting modern, ATS-optimized, high-performance career tools to help professionals land top opportunities.
                </p>
              </div>
            </div>

            {/* Stylish Contact / Email & Donation Card */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="bg-slate-950/80 border border-slate-700/80 rounded-2xl p-2.5 sm:px-4 sm:py-3 flex flex-wrap items-center justify-between sm:justify-start gap-3 w-full sm:w-auto shadow-inner">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Direct Inquiries & Contact
                    </span>
                    <a
                      href={`mailto:${creatorEmail}`}
                      className="text-xs sm:text-sm font-bold text-white hover:text-blue-400 transition-colors truncate block"
                      title="Send email"
                    >
                      {creatorEmail}
                    </a>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`p-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      copied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                    title={copied ? 'Email Copied!' : 'Copy Email Address'}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] hidden sm:inline">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px] hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${creatorEmail}`}
                    className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1 shadow-md shadow-blue-600/30"
                    title="Send Email Directly"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline">Email</span>
                  </a>

                  {onOpenDonation && (
                    <button
                      type="button"
                      onClick={onOpenDonation}
                      className="p-2 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-rose-500/20 cursor-pointer"
                      title="Donate / Support via UPI"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
                      <span className="text-[11px]">Support / UPI</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation & Legal Row */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white">Resume Builder Free</span>
              <span className="mx-2 text-slate-600">•</span>
              <span>100% Free ATS Resume Maker</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {setActiveView && (
              <>
                <button
                  onClick={() => setActiveView('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveView('templates')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Templates ({10})
                </button>
                <button
                  onClick={() => setActiveView('builder')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Resume Builder
                </button>
              </>
            )}

            {onOpenFeedback && (
              <button
                onClick={onOpenFeedback}
                className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Give Feedback</span>
              </button>
            )}

            {onOpenLegal && (
              <>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bottom copyright line with Developer attribution and contact link */}
        <div className="mt-6 pt-5 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
            <span className="font-semibold text-slate-200">Developed by Akash Vishwakarma</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-500">All Rights Reserved © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-slate-500">Contact:</span>
            <a
              href={`mailto:${creatorEmail}`}
              className="font-medium text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{creatorEmail}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
