import React from 'react';
import { ResumeData, ResumeStyle } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink } from 'lucide-react';

interface Props {
  data: ResumeData;
  style: ResumeStyle;
}

export const ProfessionalTemplate: React.FC<Props> = ({ data, style }) => {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, additionalSections } = data;
  const primaryColor = style.primaryColor || '#1e293b';

  const fontClass = {
    sans: 'font-sans-modern',
    serif: 'font-serif-classic',
    roboto: 'font-roboto',
    editorial: 'font-editorial',
    mono: 'font-mono-clean'
  }[style.fontFamily] || 'font-sans-modern';

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
    <div className={`w-full bg-white text-[#111827] p-8 md:p-12 ${fontClass} ${sizeClass} min-h-[297mm]`}>
      {/* Centered Professional Header */}
      <div className="text-center pb-4 border-b-2" style={{ borderColor: primaryColor }}>
        {style.showPhoto && personalInfo.photoUrl && (
          <div className="flex justify-center mb-3">
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: primaryColor }}
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase" style={{ color: primaryColor }}>
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-sm md:text-base font-semibold text-gray-600 tracking-wide uppercase mt-0.5">
          {personalInfo.title || 'Professional Title'}
        </p>

        {/* Contact Strip */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-2.5 text-xs text-gray-600 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2.5" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span className="text-sm">{exp.jobTitle || 'Job Title'}</span>
                  <span className="text-xs text-gray-500 font-normal">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-700 font-semibold mb-1">
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
          <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2.5" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
            Education & Academic Background
          </h2>
          <div className="space-y-2.5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span className="text-sm">{edu.degree}</span>
                  <span className="text-xs text-gray-500 font-normal">
                    {edu.startYear} – {edu.endYear || 'Present'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-700 font-medium">
                  <span>{edu.school}</span>
                  <span className="text-gray-500">{edu.location}</span>
                </div>
                {edu.description && <p className="text-xs text-gray-600 mt-0.5">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
            Core Competencies & Skills
          </h2>
          <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-xs text-gray-800">
            {skills.map((skill, idx) => (
              <span key={skill.id} className="bg-gray-100 px-2.5 py-1 rounded text-gray-800 font-medium">
                {skill.name} {skill.level && <span className="text-gray-500">({skill.level})</span>}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
            Key Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-gray-900 text-xs">
                  <span>
                    {proj.name} {proj.role && <span className="font-normal text-gray-600">({proj.role})</span>}
                  </span>
                  {proj.technologies && <span className="text-[11px] text-gray-500 font-normal">{proj.technologies}</span>}
                </div>
                {proj.description && <p className="text-xs text-gray-700 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages Dual Grid */}
      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-1.5" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
                Certifications
              </h2>
              <ul className="space-y-1 text-xs text-gray-700">
                {certifications.map((cert) => (
                  <li key={cert.id} className="leading-snug">
                    <span className="font-semibold">{cert.name}</span> — {cert.issuer} {cert.date && `(${cert.date})`}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-1.5" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
                Languages
              </h2>
              <div className="flex flex-wrap gap-3 text-xs text-gray-700">
                {languages.map((lang) => (
                  <span key={lang.id}>
                    <strong className="text-gray-900">{lang.language}:</strong> {lang.proficiency}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Additional sections */}
      {additionalSections.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b pb-1 mb-1.5" style={{ color: primaryColor, borderColor: '#e5e7eb' }}>
            Additional Information
          </h2>
          <div className="space-y-1.5 text-xs text-gray-700">
            {additionalSections.map((sec) => (
              <div key={sec.id}>
                <span className="font-semibold text-gray-900">{sec.title}</span>
                {sec.subtitle && <span> ({sec.subtitle})</span>}
                {sec.description && <p className="text-gray-600 mt-0.5">{sec.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
