import React, { useRef } from 'react';
import { PersonalInfo } from '../../types';
import { User, Briefcase, Mail, Phone, MapPin, Linkedin, Globe, Github, Camera, Trash2, Upload } from 'lucide-react';

interface Props {
  data: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleFieldChange('photoUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo Upload & Preview */}
      <div className="flex items-center gap-4 p-3 bg-gray-50/80 rounded-xl border border-gray-200">
        <div className="relative w-16 h-16 rounded-xl bg-white border border-[#dadce0] overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <User className="w-8 h-8 text-gray-300" />
          )}
        </div>

        <div className="flex-1">
          <p className="text-xs font-semibold text-[#202124]">Profile Photo</p>
          <p className="text-[11px] text-[#5f6368]">Optional for ATS or European/Executive styles</p>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 bg-white hover:bg-gray-100 text-[#1a73e8] border border-[#dadce0] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Upload className="w-3 h-3" />
              <span>Upload Photo</span>
            </button>

            {data.photoUrl && (
              <button
                type="button"
                onClick={() => handleFieldChange('photoUrl', '')}
                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Standard Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">
            Professional Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Briefcase className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="rahul.sharma@example.com"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              placeholder="+1 (555) 234-5678"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">Location</label>
          <div className="relative">
            <MapPin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">LinkedIn Profile</label>
          <div className="relative">
            <Linkedin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={data.linkedin}
              onChange={(e) => handleFieldChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">Portfolio / Website</label>
          <div className="relative">
            <Globe className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={data.website}
              onChange={(e) => handleFieldChange('website', e.target.value)}
              placeholder="yourportfolio.com"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#202124] mb-1">GitHub / Code Link</label>
          <div className="relative">
            <Github className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={data.github || ''}
              onChange={(e) => handleFieldChange('github', e.target.value)}
              placeholder="github.com/username"
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
