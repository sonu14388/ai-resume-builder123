import React, { useState } from 'react';
import { ActiveView, UserAccount } from '../types';
import {
  FileText,
  CheckCircle2,
  User,
  LogOut,
  LayoutTemplate,
  PlusCircle,
  Sparkles,
  FolderKanban,
  Settings,
  Heart,
  Sun,
  Moon
} from 'lucide-react';

interface Props {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  user: UserAccount | null;
  onOpenAuth: (mode?: 'login' | 'signup', reason?: string) => void;
  onLogout: () => void;
  saveStatus: 'saved' | 'saving';
  onStartNewResume: () => void;
  onOpenDonation?: () => void;
  onOpenFeedback?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeView,
  setActiveView,
  user,
  onOpenAuth,
  onLogout,
  saveStatus,
  onStartNewResume,
  onOpenDonation,
  onOpenFeedback,
  theme = 'light',
  onToggleTheme
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md border-b border-[#dadce0] dark:border-slate-800/80 px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            id="brand-logo-btn"
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              {/* Google Workspace / Docs inspired colorful logo */}
              <div className="relative flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#1a73e8] dark:text-blue-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ea4335] rounded-full border border-white dark:border-slate-900" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-[#202124] dark:text-white">Resume Builder</span>
                <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider border border-emerald-200/60 dark:border-emerald-800/60">
                  ₹10 PDF
                </span>
              </div>
              <p className="text-[10px] text-[#5f6368] dark:text-slate-400 hidden sm:block -mt-0.5">500+ Templates • Instant ₹10 Download</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-home-btn"
              onClick={() => setActiveView('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'home'
                  ? 'text-[#1a73e8] dark:text-blue-400 bg-[#e8f0fe] dark:bg-blue-950/50 font-bold'
                  : 'text-[#5f6368] dark:text-slate-300 hover:text-[#202124] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>
            <button
              id="nav-templates-btn"
              onClick={() => setActiveView('templates')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'templates'
                  ? 'text-[#1a73e8] dark:text-blue-400 bg-[#e8f0fe] dark:bg-blue-950/50 font-bold'
                  : 'text-[#5f6368] dark:text-slate-300 hover:text-[#202124] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Templates (500+)
            </button>
            <button
              id="nav-builder-btn"
              onClick={() => setActiveView('builder')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'builder'
                  ? 'text-[#1a73e8] dark:text-blue-400 bg-[#e8f0fe] dark:bg-blue-950/50 font-bold'
                  : 'text-[#5f6368] dark:text-slate-300 hover:text-[#202124] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Resume Builder
            </button>
            {user && (
              <button
                id="nav-dashboard-btn"
                onClick={() => setActiveView('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'dashboard'
                    ? 'text-[#1a73e8] dark:text-blue-400 bg-[#e8f0fe] dark:bg-blue-950/50 font-bold'
                    : 'text-[#5f6368] dark:text-slate-300 hover:text-[#202124] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800/60'
                }`}
              >
                My Resumes
              </button>
            )}
          </nav>
        </div>

        {/* Right Section: Auto-save status + CTA / Auth + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Auto-save badge */}
          {activeView === 'builder' && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#5f6368] dark:text-slate-300 bg-[#f1f3f4] dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-[#dadce0] dark:border-slate-700">
              {saveStatus === 'saving' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#188038] dark:text-emerald-400" />
                  <span>{user ? 'Saved to Cloud' : 'Saved'}</span>
                </>
              )}
            </div>
          )}

          {/* Theme Mode Toggle Button */}
          {onToggleTheme && (
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>
          )}

          {/* Give Feedback / Reviews Button */}
          {onOpenFeedback && (
            <button
              id="header-feedback-btn"
              onClick={onOpenFeedback}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 rounded-lg text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
              title="Give Feedback & Reviews"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Feedback</span>
              <span className="hidden sm:inline-block bg-amber-200/60 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200 text-[10px] px-1 py-0.2 rounded font-mono font-black">
                ★ 4.9
              </span>
            </button>
          )}

          {/* Donate / Support Creator Button */}
          {onOpenDonation && (
            <button
              id="header-support-btn"
              onClick={onOpenDonation}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
              title="Support Akash Vishwakarma (Creator)"
            >
              <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
              <span className="hidden sm:inline">Support</span>
            </button>
          )}

          {activeView !== 'builder' && (
            <button
              id="header-create-resume-btn"
              onClick={() => setActiveView('builder')}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white px-3.5 py-1.5 rounded-lg text-sm font-medium shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create My Resume</span>
            </button>
          )}

          {/* User Account / Auth buttons */}
          {user ? (
            <div className="relative">
              <button
                id="user-profile-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border border-[#dadce0] dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 focus:outline-none"
              >
                <div className="w-7 h-7 rounded-full bg-[#1a73e8] text-white font-bold text-xs flex items-center justify-center uppercase">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span className="text-xs font-semibold text-[#202124] dark:text-slate-200 max-w-[100px] truncate hidden md:inline">
                  {user.name}
                </span>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-[#dadce0] dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setShowUserMenu(false)}
                >
                  <div className="px-3.5 py-2 border-b border-gray-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-[#202124] dark:text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-[#5f6368] dark:text-slate-400 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveView('dashboard');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#202124] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
                  >
                    <FolderKanban className="w-4 h-4 text-[#1a73e8] dark:text-blue-400" />
                    <span>My Resumes</span>
                  </button>

                  <button
                    onClick={() => {
                      onStartNewResume();
                      setActiveView('builder');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#202124] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
                  >
                    <PlusCircle className="w-4 h-4 text-[#188038] dark:text-emerald-400" />
                    <span>Create New Resume</span>
                  </button>

                  <div className="border-t border-gray-100 dark:border-slate-800 my-1" />

                  <button
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-[#d93025] hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2.5"
                  >
                    <LogOut className="w-4 h-4 text-[#d93025]" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="header-login-btn"
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 text-xs md:text-sm font-medium text-[#1a73e8] dark:text-blue-400 hover:bg-[#e8f0fe] dark:hover:bg-blue-950/40 rounded-lg transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                id="header-signup-btn"
                onClick={() => onOpenAuth('signup')}
                className="px-3.5 py-1.5 text-xs md:text-sm font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
