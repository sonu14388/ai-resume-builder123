import React, { useState, useEffect, useRef } from 'react';
import {
  ActiveView,
  ResumeDocument,
  TemplateId,
  UserAccount,
  ResumeData
} from './types';
import {
  getSavedDraft,
  saveDraft,
  getSavedResumes,
  saveResumesList,
  getUserAccount,
  setUserAccount
} from './utils/storage';
import { defaultResumeDocument, emptyResumeData, defaultResumeStyle } from './data/defaultResume';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { BuilderView } from './components/builder/BuilderView';
import { TemplatesGalleryView } from './components/TemplatesGalleryView';
import { DashboardView } from './components/DashboardView';
import { AuthModal } from './components/AuthModal';
import { LegalModal } from './components/LegalModal';
import { DonationModal } from './components/DonationModal';
import { PaymentDownloadModal } from './components/PaymentDownloadModal';
import { FeedbackModal } from './components/FeedbackModal';
import { exportResumeToPDF } from './utils/pdfExport';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [currentDoc, setCurrentDoc] = useState<ResumeDocument>(() => getSavedDraft());
  const [savedResumes, setSavedResumes] = useState<ResumeDocument[]>(() => getSavedResumes());
  const [user, setUser] = useState<UserAccount | null>(() => getUserAccount());
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');
  const [authPromptReason, setAuthPromptReason] = useState<string | undefined>(undefined);
  const [pendingDownloadAfterAuth, setPendingDownloadAfterAuth] = useState(false);

  // Legal modal state
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms'>('privacy');

  // Global Donation & Support modal state
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [donationDownloadTriggered, setDonationDownloadTriggered] = useState(false);

  // Global Feedback & Review modal state
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  // Global ₹10 Payment Modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentDocTarget, setPaymentDocTarget] = useState<ResumeDocument | null>(null);

  // Light / Dark Mode state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('resume_app_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('resume_app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Auto-save debounce timer
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-save document whenever currentDoc changes
  useEffect(() => {
    setSaveStatus('saving');
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveDraft(currentDoc);

      // If user is logged in, sync into savedResumes array as well
      if (user) {
        setSavedResumes((prev) => {
          const index = prev.findIndex((r) => r.id === currentDoc.id);
          let updatedList: ResumeDocument[];
          if (index >= 0) {
            updatedList = [...prev];
            updatedList[index] = currentDoc;
          } else {
            updatedList = [currentDoc, ...prev];
          }
          saveResumesList(updatedList);
          return updatedList;
        });
      }

      setSaveStatus('saved');
    }, 600);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [currentDoc, user]);

  const handleOpenAuth = (mode: 'login' | 'signup' = 'signup', reason?: string) => {
    setAuthModalMode(mode);
    setAuthPromptReason(reason);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser: UserAccount) => {
    setUser(authenticatedUser);
    setUserAccount(authenticatedUser);

    // If there was a pending download triggered before auth, proceed
    if (pendingDownloadAfterAuth) {
      setPendingDownloadAfterAuth(false);
      setTimeout(async () => {
        const fileName = `${currentDoc.data.personalInfo.fullName || 'Resume'}_CV.pdf`.replace(/\s+/g, '_');
        await exportResumeToPDF({
          fileName,
          elementId: 'resume-printable-area'
        });
        setDonationDownloadTriggered(true);
        setDonationModalOpen(true);
      }, 500);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserAccount(null);
    setActiveView('home');
  };

  const handleStartNewResume = () => {
    const newDoc: ResumeDocument = {
      id: `resume-${Date.now()}`,
      title: 'New Resume',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: {
        ...emptyResumeData,
        personalInfo: {
          ...emptyResumeData.personalInfo,
          fullName: user?.name || ''
        }
      },
      style: defaultResumeStyle
    };
    setCurrentDoc(newDoc);
    setActiveView('builder');
  };

  const handleSelectTemplate = (templateId: TemplateId) => {
    setCurrentDoc((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        templateId
      },
      updatedAt: new Date().toISOString()
    }));
    setActiveView('builder');
  };

  const handleSelectResumeFromDashboard = (id: string) => {
    const target = savedResumes.find((r) => r.id === id);
    if (target) {
      setCurrentDoc(target);
    }
  };

  const handleDuplicateResume = (doc: ResumeDocument) => {
    const duplicated: ResumeDocument = {
      ...doc,
      id: `resume-${Date.now()}`,
      title: `${doc.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [duplicated, ...savedResumes];
    setSavedResumes(updated);
    saveResumesList(updated);
  };

  const handleDeleteResume = (id: string) => {
    const updated = savedResumes.filter((r) => r.id !== id);
    setSavedResumes(updated);
    saveResumesList(updated);
  };

  const handleDownloadFromDashboard = async (doc: ResumeDocument) => {
    setCurrentDoc(doc);
    let isAlreadyPaid = false;
    try {
      const paidList: string[] = JSON.parse(localStorage.getItem('paid_resumes_list') || '[]');
      isAlreadyPaid = paidList.includes(doc.id);
    } catch {
      // ignore
    }

    if (isAlreadyPaid) {
      const fileName = `${doc.data.personalInfo.fullName || 'Resume'}_CV.pdf`.replace(/\s+/g, '_');
      await exportResumeToPDF({
        fileName,
        elementId: 'resume-printable-area'
      });
    } else {
      setPaymentDocTarget(doc);
      setPaymentModalOpen(true);
    }
  };

  const handleOpenLegal = (tab: 'privacy' | 'terms') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const handleOpenDonation = () => {
    setDonationDownloadTriggered(false);
    setDonationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafd] dark:bg-[#090d16] text-[#202124] dark:text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* Top Google-style Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        saveStatus={saveStatus}
        onStartNewResume={handleStartNewResume}
        onOpenDonation={handleOpenDonation}
        onOpenFeedback={() => setFeedbackModalOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            setActiveView={setActiveView}
            onSelectTemplate={handleSelectTemplate}
            onOpenLegal={handleOpenLegal}
            onOpenDonation={handleOpenDonation}
            onOpenFeedback={() => setFeedbackModalOpen(true)}
          />
        )}

        {activeView === 'templates' && (
          <TemplatesGalleryView
            setActiveView={setActiveView}
            onSelectTemplate={handleSelectTemplate}
            onOpenDonation={handleOpenDonation}
          />
        )}

        {activeView === 'builder' && (
          <BuilderView
            document={currentDoc}
            onChangeDocument={setCurrentDoc}
            user={user}
            onOpenAuth={(mode, reason) => {
              setPendingDownloadAfterAuth(true);
              handleOpenAuth(mode, reason);
            }}
            saveStatus={saveStatus}
          />
        )}

        {activeView === 'dashboard' && (
          <DashboardView
            user={user}
            resumes={savedResumes}
            activeResumeId={currentDoc.id}
            onSelectResume={handleSelectResumeFromDashboard}
            onCreateNewResume={handleStartNewResume}
            onDuplicateResume={handleDuplicateResume}
            onDeleteResume={handleDeleteResume}
            onDownloadResume={handleDownloadFromDashboard}
            setActiveView={setActiveView}
            onOpenAuth={handleOpenAuth}
            onOpenDonation={handleOpenDonation}
          />
        )}
      </main>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setPendingDownloadAfterAuth(false);
        }}
        initialMode={authModalMode}
        promptReason={authPromptReason}
        onSuccess={handleAuthSuccess}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

      {/* Global ₹10 Payment & Instant PDF Download Modal */}
      <PaymentDownloadModal
        isOpen={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false);
          setPaymentDocTarget(null);
        }}
        resumeTitle={paymentDocTarget?.title || currentDoc.title}
        candidateName={paymentDocTarget?.data.personalInfo.fullName || currentDoc.data.personalInfo.fullName || 'Candidate'}
        documentId={paymentDocTarget?.id || currentDoc.id}
        onOpenFeedback={() => setFeedbackModalOpen(true)}
      />

      {/* Global Feedback & Review Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        defaultName={user?.name || currentDoc.data.personalInfo.fullName || ''}
        defaultResumeTitle={currentDoc.title || 'Professional Resume'}
      />

      {/* Global Donation & UPI Support Modal */}
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        isDownloadTriggered={donationDownloadTriggered}
        title="Support Akash Vishwakarma"
      />
    </div>
  );
}
