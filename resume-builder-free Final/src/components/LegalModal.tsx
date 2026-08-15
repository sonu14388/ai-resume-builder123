import React, { useState } from 'react';
import { X, ShieldCheck, FileCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [tab, setTab] = useState<'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-[#dadce0] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dadce0] bg-[#f8fafd]">
          <div className="flex items-center gap-2">
            {tab === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-[#1a73e8]" />
            ) : (
              <FileCheck className="w-5 h-5 text-[#1a73e8]" />
            )}
            <h2 className="text-lg font-bold text-[#202124]">
              {tab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-gray-200/70 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setTab('privacy')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  tab === 'privacy' ? 'bg-white text-[#1a73e8] shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Privacy
              </button>
              <button
                onClick={() => setTab('terms')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  tab === 'terms' ? 'bg-white text-[#1a73e8] shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Terms
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs md:text-sm text-[#3c4043] leading-relaxed">
          {tab === 'privacy' ? (
            <>
              <p className="font-semibold text-[#202124]">
                Last updated: August 2026. Your privacy and resume data security are paramount to us.
              </p>
              <h3 className="font-bold text-[#202124] text-sm">1. Data Ownership & Storage</h3>
              <p>
                All resume information entered into <strong>Resume Builder Free</strong> remains your sole intellectual property. For unauthenticated users, data is temporarily stored locally in your browser's private storage (localStorage). When you sign up, your documents are synced securely to your personal account.
              </p>
              <h3 className="font-bold text-[#202124] text-sm">2. No Unsolicited Third-Party Sharing</h3>
              <p>
                We do not sell, rent, monetize, or disclose your resume data, employment history, or contact information to recruiters or third-party advertisers without your explicit consent.
              </p>
              <h3 className="font-bold text-[#202124] text-sm">3. PDF Rendering & Client-Side Privacy</h3>
              <p>
                Resume compilation and PDF generation operate with client-side processing, meaning your information is rendered directly on your machine into high-resolution A4 vector/canvas documents.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-[#202124]">
                Terms of Service & Usage Guidelines for Resume Builder Free.
              </p>
              <h3 className="font-bold text-[#202124] text-sm">1. Free Access & Fair Use</h3>
              <p>
                Resume Builder Free provides free access to online resume creation, template switching, real-time live preview, and high-resolution PDF downloads.
              </p>
              <h3 className="font-bold text-[#202124] text-sm">2. Account Responsibility</h3>
              <p>
                You are responsible for maintaining the accuracy of your career details and safeguarding any credentials used to access your saved resume library.
              </p>
              <h3 className="font-bold text-[#202124] text-sm">3. ATS Template Compatibility</h3>
              <p>
                Our templates are engineered according to modern Applicant Tracking System (ATS) readability standards. However, hiring criteria vary by employer.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#dadce0] bg-[#f8fafd] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-lg text-xs font-semibold"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
