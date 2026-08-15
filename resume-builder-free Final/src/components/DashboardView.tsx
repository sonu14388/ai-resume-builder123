import React, { useState } from 'react';
import { ResumeDocument, ActiveView, UserAccount } from '../types';
import {
  FolderKanban,
  Plus,
  FileText,
  Calendar,
  Edit3,
  Eye,
  Download,
  Copy,
  Trash2,
  Search,
  Sparkles,
  CheckCircle2,
  MoreVertical
} from 'lucide-react';
import { Footer } from './Footer';

interface Props {
  user: UserAccount | null;
  resumes: ResumeDocument[];
  activeResumeId: string;
  onSelectResume: (id: string) => void;
  onCreateNewResume: () => void;
  onDuplicateResume: (doc: ResumeDocument) => void;
  onDeleteResume: (id: string) => void;
  onDownloadResume: (doc: ResumeDocument) => void;
  setActiveView: (view: ActiveView) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenDonation?: () => void;
}

export const DashboardView: React.FC<Props> = ({
  user,
  resumes,
  activeResumeId,
  onSelectResume,
  onCreateNewResume,
  onDuplicateResume,
  onDeleteResume,
  onDownloadResume,
  setActiveView,
  onOpenAuth,
  onOpenDonation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredResumes = resumes.filter((r) => {
    const titleMatch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const nameMatch = r.data.personalInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const roleMatch = r.data.personalInfo.title.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || nameMatch || roleMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#dadce0] pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a73e8]">
              <FolderKanban className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202124]">My Resumes</h1>
          </div>
          <p className="text-xs sm:text-sm text-[#5f6368] mt-1">
            Manage, duplicate, edit, and download your saved resumes.
          </p>
        </div>

        {/* Create New Resume button */}
        <button
          id="dashboard-create-new-btn"
          onClick={() => {
            onCreateNewResume();
            setActiveView('builder');
          }}
          className="px-4 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-xl text-sm font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Resume</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, name, or role..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#dadce0] rounded-xl focus:outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-[#5f6368]">
          <span>Total Resumes: <strong>{resumes.length}</strong></span>
          <span>•</span>
          <span className="text-[#188038] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> All synced
          </span>
        </div>
      </div>

      {/* Resumes Grid */}
      {filteredResumes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#dadce0] p-8">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#202124]">No resumes found</h3>
          <p className="text-xs text-[#5f6368] mt-1 max-w-sm mx-auto">
            {searchQuery
              ? 'No resumes matched your search query.'
              : 'You haven\'t created any resumes yet. Start with our professional templates!'}
          </p>
          <button
            onClick={() => {
              onCreateNewResume();
              setActiveView('builder');
            }}
            className="mt-4 px-4 py-2 bg-[#1a73e8] text-white text-xs font-semibold rounded-lg shadow-xs"
          >
            Create Your First Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((doc) => {
            const isActive = doc.id === activeResumeId;
            const fullName = doc.data.personalInfo.fullName || 'Untitled Resume';
            const role = doc.data.personalInfo.title || 'Professional';
            const formattedDate = new Date(doc.updatedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div
                key={doc.id}
                className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  isActive ? 'border-[#1a73e8] ring-2 ring-blue-100' : 'border-[#dadce0]'
                }`}
              >
                {/* Card Top */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a73e8] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#202124] line-clamp-1">
                          {fullName}
                        </h3>
                        <p className="text-xs text-[#5f6368] line-clamp-1">{role}</p>
                      </div>
                    </div>

                    <span className="text-[11px] uppercase font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                      {doc.style.templateId}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[11px] text-[#5f6368]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Last updated: {formattedDate}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="bg-[#f8fafd] border-t border-[#dadce0] p-3 flex items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        onSelectResume(doc.id);
                        setActiveView('builder');
                      }}
                      title="Edit in builder"
                      className="px-2.5 py-1.5 bg-white hover:bg-gray-100 text-[#1a73e8] border border-[#dadce0] rounded-lg font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => onDownloadResume(doc)}
                      title="Download PDF"
                      className="px-2.5 py-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-lg font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDuplicateResume(doc)}
                      title="Duplicate Resume"
                      className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {deleteConfirmId === doc.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200">
                        <button
                          onClick={() => {
                            onDeleteResume(doc.id);
                            setDeleteConfirmId(null);
                          }}
                          className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-1.5 py-0.5 text-gray-500 text-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(doc.id)}
                        title="Delete Resume"
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stylish Creator & Contact Footer */}
      <div className="mt-20 -mx-4 sm:-mx-6 lg:-mx-8">
        <Footer setActiveView={setActiveView} onOpenDonation={onOpenDonation} />
      </div>
    </div>
  );
};
