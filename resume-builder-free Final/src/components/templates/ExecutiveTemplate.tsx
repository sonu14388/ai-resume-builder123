import React from 'react';
import { ResumeData, ResumeStyle } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Shield } from 'lucide-react';

interface Props {
  data: ResumeData;
  style: ResumeStyle;
}

export const ExecutiveTemplate: React.FC<Props> = ({ data, style }) => {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, additionalSections } = data;
  const primaryColor = style.primaryColor || '#0f172a';

  const fontClass = {
    sans: 'font-sans-modern',
    serif: 'font-serif-classic',
    roboto: 'font-roboto',
    editorial: 'font-editorial',
    mono: 'font-mono-clean'
  }[style.fontFamily] || 'font-editorial';

  const sizeClass = {
    compact: 'text-xs space-y-3',
    normal: 'text-sm space-y-4',
    spacious: 'text-base space-y-5'
  }[style.fontSize] || 'text-sm space-y-4';

  const formatDescription = (desc: string) => {
    if (!desc) return null;
    const lines = desc.split('\n').filter(Boolean);
    return (
      <ul className="list-disc list-outside ml-4 space-y-1 mt-1 text-gray-700 leading-relaxed">
        {lines.map((line, idx) => {
          const cleanLine = line.replace(/^[•\-\*]\s*/, '');
          return <li key={idx}>{cleanLine}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className={`w-full bg-white text-[#0f172a] p-8 md:p-12 ${fontClass} ${sizeClass} min-h-[297mm]`}>
      {/* Executive Header Banner */}
      <div className="border-b-2 pb-5" style={{ borderColor: primaryColor }}>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase" style={{ color: primaryColor }}>
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-base md:text-lg font-semibold tracking-widest uppercase text-gray-600 mt-1">
              {personalInfo.title || 'Executive Leadership'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 mt-3 text-xs text-gray-600">
              {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{personalInfo.phone}</span>}
              {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{personalInfo.location}</span>}
              {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" />{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
            </div>
          </div>

          {style.showPhoto && personalInfo.photoUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-24 h-24 rounded-lg object-cover border shadow-sm"
                style={{ borderColor: primaryColor }}
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Executive Summary */}
      {summary && (
        <section className="bg-slate-50 p-4 rounded-lg border-l-4" style={{ borderColor: primaryColor }}>
          <h2 className="text-xs uppercase font-bold tracking-wider mb-1.5 flex items-center gap-1.5 text-gray-900">
            <Shield className="w-3.5 h-3.5" style={{ color: primaryColor }} />
            Executive Profile & Value Proposition
          </h2>
          <p className="text-gray-800 leading-relaxed text-justify italic">{summary}</p>
        </section>
      )}

      {/* Core Competencies Matrix */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs uppercase font-bold tracking-wider border-b pb-1 mb-2 text-gray-900" style={{ borderColor: primaryColor }}>
            Core Leadership & Strategic Competencies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-1.5 text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                <span className="font-semibold">{skill.name}</span>
                {skill.level && <span className="text-gray-500 text-[11px]">({skill.level})</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Executive Career History */}
      {workExperience.length > 0 && (
        <section>
          <h2 className="text-xs uppercase font-bold tracking-wider border-b pb-1 mb-3 text-gray-900" style={{ borderColor: primaryColor }}>
            Executive Experience & Career History
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-gray-950 text-sm">
                  <span>{exp.jobTitle || 'Executive Title'}</span>
                  <span className="text-xs text-gray-600 font-normal">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs font-semibold text-gray-700 mb-1">
                  <span>{exp.company}</span>
                  <span className="text-gray-500 font-normal">{exp.location}</span>
                </div>
                {formatDescription(exp.description)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 className="text-xs uppercase font-bold tracking-wider border-b pb-1 mb-2 text-gray-900" style={{ borderColor: primaryColor }}>
            Education & Executive Credentials
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-gray-900">{edu.degree}</span>
                  <span className="text-gray-600"> — {edu.school} {edu.location && `(${edu.location})`}</span>
                </div>
                <span className="text-gray-500 font-medium">{edu.startYear} – {edu.endYear || 'Present'}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Board, Certifications & Honors */}
      {(certifications.length > 0 || additionalSections.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs uppercase font-bold tracking-wider border-b pb-1 mb-1 text-gray-900" style={{ borderColor: primaryColor }}>
                Board & Professional Certifications
              </h2>
              <ul className="text-xs space-y-1 text-gray-700">
                {certifications.map((c) => (
                  <li key={c.id}>
                    <strong className="text-gray-900">{c.name}</strong> • {c.issuer}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {additionalSections.length > 0 && (
            <section>
              <h2 className="text-xs uppercase font-bold tracking-wider border-b pb-1 mb-1 text-gray-900" style={{ borderColor: primaryColor }}>
                Honors & Key Achievements
              </h2>
              <div className="text-xs space-y-1 text-gray-700">
                {additionalSections.map((s) => (
                  <p key={s.id}><strong className="text-gray-900">{s.title}</strong>: {s.description}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};
