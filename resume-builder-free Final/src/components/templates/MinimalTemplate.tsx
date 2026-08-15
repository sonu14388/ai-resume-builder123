import React from 'react';
import { ResumeData, ResumeStyle } from '../../types';

interface Props {
  data: ResumeData;
  style: ResumeStyle;
}

export const MinimalTemplate: React.FC<Props> = ({ data, style }) => {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, additionalSections } = data;

  const fontClass = {
    sans: 'font-sans-modern',
    serif: 'font-serif-classic',
    roboto: 'font-roboto',
    editorial: 'font-editorial',
    mono: 'font-mono-clean'
  }[style.fontFamily] || 'font-roboto';

  const sizeClass = {
    compact: 'text-xs space-y-3.5',
    normal: 'text-sm space-y-4.5',
    spacious: 'text-base space-y-5.5'
  }[style.fontSize] || 'text-sm space-y-4.5';

  const formatDescription = (desc: string) => {
    if (!desc) return null;
    const lines = desc.split('\n').filter(Boolean);
    return (
      <ul className="list-disc list-outside ml-4 space-y-1 mt-1 text-black leading-relaxed">
        {lines.map((line, idx) => {
          const cleanLine = line.replace(/^[•\-\*]\s*/, '');
          return <li key={idx}>{cleanLine}</li>;
        })}
      </ul>
    );
  };

  return (
    <div className={`w-full bg-white text-black p-8 md:p-12 ${fontClass} ${sizeClass} min-h-[297mm]`}>
      {/* ATS Header */}
      <header className="border-b-2 border-black pb-3">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-black">
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        {personalInfo.title && (
          <p className="text-sm font-semibold text-gray-800 uppercase tracking-wider mt-0.5">
            {personalInfo.title}
          </p>
        )}

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-black mt-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.website && <span>| {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.github && <span>| {personalInfo.github.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-400 pb-0.5 mb-1.5">
            Summary
          </h2>
          <p className="text-black leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-400 pb-0.5 mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-black text-sm">
                  <span>{exp.jobTitle || 'Job Title'}</span>
                  <span className="text-xs font-normal">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs font-semibold text-gray-800">
                  <span>{exp.company}</span>
                  <span className="font-normal text-gray-600">{exp.location}</span>
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-400 pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline font-bold text-black text-sm">
                  <span>{edu.degree}</span>
                  <span className="text-xs font-normal">
                    {edu.startYear} – {edu.endYear || 'Present'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-800">
                  <span>{edu.school}</span>
                  <span className="text-gray-600">{edu.location}</span>
                </div>
                {edu.description && <p className="text-xs text-black mt-0.5">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-400 pb-0.5 mb-1.5">
            Technical & Professional Skills
          </h2>
          <p className="text-xs text-black leading-relaxed">
            {skills.map((s) => s.name).join(' • ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-400 pb-0.5 mb-2">
            Key Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline font-bold text-xs text-black">
                  <span>
                    {proj.name} {proj.role && <span className="font-normal text-gray-700">({proj.role})</span>}
                  </span>
                  {proj.technologies && <span className="font-mono text-[11px] text-gray-600">{proj.technologies}</span>}
                </div>
                {proj.description && <p className="text-xs text-black mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages */}
      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-400 pb-0.5 mb-1">
                Certifications
              </h2>
              <ul className="list-disc list-outside ml-4 text-xs text-black space-y-0.5">
                {certifications.map((cert) => (
                  <li key={cert.id}>
                    <strong>{cert.name}</strong> – {cert.issuer} {cert.date && `(${cert.date})`}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-400 pb-0.5 mb-1">
                Languages
              </h2>
              <p className="text-xs text-black leading-relaxed">
                {languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
              </p>
            </section>
          )}
        </div>
      )}

      {/* Additional */}
      {additionalSections.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-gray-400 pb-0.5 mb-1">
            Additional Information
          </h2>
          <ul className="list-disc list-outside ml-4 text-xs text-black space-y-1">
            {additionalSections.map((sec) => (
              <li key={sec.id}>
                <strong>{sec.title}</strong>
                {sec.subtitle && ` – ${sec.subtitle}`}
                {sec.description && `: ${sec.description}`}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
