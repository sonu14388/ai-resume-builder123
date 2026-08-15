import React from 'react';
import { ResumeData, ResumeStyle } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink, Calendar } from 'lucide-react';

interface Props {
  data: ResumeData;
  style: ResumeStyle;
}

export const ModernTemplate: React.FC<Props> = ({ data, style }) => {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, additionalSections } = data;
  const primaryColor = style.primaryColor || '#1a73e8';

  const fontClass = {
    sans: 'font-sans-modern',
    serif: 'font-serif-classic',
    roboto: 'font-roboto',
    editorial: 'font-editorial',
    mono: 'font-mono-clean'
  }[style.fontFamily] || 'font-sans-modern';

  const sizeClass = {
    compact: 'text-xs space-y-3.5',
    normal: 'text-sm space-y-4.5',
    spacious: 'text-base space-y-6'
  }[style.fontSize] || 'text-sm space-y-4.5';

  const formatDescription = (desc: string) => {
    if (!desc) return null;
    const lines = desc.split('\n').filter(Boolean);
    return (
      <ul className="space-y-1 mt-1.5 text-gray-700 leading-relaxed">
        {lines.map((line, idx) => {
          const cleanLine = line.replace(/^[•\-\*]\s*/, '');
          return (
            <li key={idx} className="flex items-start gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: primaryColor }} />
              <span>{cleanLine}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={`w-full bg-white text-[#202124] p-8 md:p-10 ${fontClass} ${sizeClass} min-h-[297mm]`}>
      {/* Header */}
      <div className="border-b pb-5 flex flex-col md:flex-row items-start justify-between gap-6" style={{ borderColor: `${primaryColor}30` }}>
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase" style={{ color: primaryColor }}>
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-700 mt-1">
            {personalInfo.title || 'Professional Title'}
          </p>

          {/* Contact Details */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs md:text-sm text-gray-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
          </div>
        </div>

        {style.showPhoto && personalInfo.photoUrl && (
          <div className="shrink-0">
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border-2 shadow-sm"
              style={{ borderColor: primaryColor }}
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Left 2 Cols: Experience, Summary, Projects */}
        <div className="md:col-span-2 space-y-5">
          {/* Summary */}
          {summary && (
            <div>
              <h2 className="text-xs uppercase font-bold tracking-wider mb-2 flex items-center gap-2" style={{ color: primaryColor }}>
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: primaryColor }} />
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <h2 className="text-xs uppercase font-bold tracking-wider mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: primaryColor }} />
                Work Experience
              </h2>
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: `${primaryColor}40` }}>
                    <div className="flex flex-wrap justify-between items-baseline gap-1">
                      <h3 className="font-bold text-gray-900">{exp.jobTitle || 'Job Title'}</h3>
                      <span className="text-xs text-gray-500 font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 flex items-center gap-2 mt-0.5">
                      <span>{exp.company}</span>
                      {exp.location && <span className="text-gray-400 font-normal">• {exp.location}</span>}
                    </div>
                    {formatDescription(exp.description)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs uppercase font-bold tracking-wider mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: primaryColor }} />
                Key Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-gray-50/70 p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
                        {proj.name}
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            <ExternalLink className="w-3 h-3 inline" />
                          </a>
                        )}
                      </h3>
                      {proj.role && <span className="text-xs font-medium text-gray-500">{proj.role}</span>}
                    </div>
                    {proj.technologies && (
                      <p className="text-xs text-gray-600 mt-0.5 font-mono">
                        <span className="font-semibold text-gray-500">Tech: </span>
                        {proj.technologies}
                      </p>
                    )}
                    {proj.description && <p className="text-xs text-gray-700 mt-1">{proj.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Skills, Education, Certifications, Languages, Additional */}
        <div className="space-y-5">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100">
              <h2 className="text-xs uppercase font-bold tracking-wider mb-2.5" style={{ color: primaryColor }}>
                Core Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      borderColor: `${primaryColor}30`,
                      color: primaryColor
                    }}
                  >
                    {skill.name}
                    {skill.level && <span className="ml-1 text-[10px] opacity-75">({skill.level[0]})</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs uppercase font-bold tracking-wider mb-2.5" style={{ color: primaryColor }}>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900 leading-snug">{edu.degree}</h3>
                    <p className="text-xs font-medium text-gray-700 mt-0.5">{edu.school}</p>
                    <div className="flex justify-between text-[11px] text-gray-500 mt-0.5">
                      <span>{edu.location}</span>
                      <span>{edu.startYear} – {edu.endYear || 'Present'}</span>
                    </div>
                    {edu.description && <p className="text-xs text-gray-600 mt-1 italic">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs uppercase font-bold tracking-wider mb-2.5" style={{ color: primaryColor }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <p className="font-semibold text-gray-900">{cert.name}</p>
                    <p className="text-[11px] text-gray-600">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-xs uppercase font-bold tracking-wider mb-2" style={{ color: primaryColor }}>
                Languages
              </h2>
              <div className="space-y-1 text-xs">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-gray-700">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-gray-500">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Sections */}
          {additionalSections.length > 0 && (
            <div>
              <h2 className="text-xs uppercase font-bold tracking-wider mb-2" style={{ color: primaryColor }}>
                Honors & More
              </h2>
              <div className="space-y-2">
                {additionalSections.map((sec) => (
                  <div key={sec.id} className="text-xs">
                    <p className="font-semibold text-gray-900">{sec.title}</p>
                    {sec.subtitle && <p className="text-[11px] text-gray-500">{sec.subtitle} {sec.date && `• ${sec.date}`}</p>}
                    {sec.description && <p className="text-gray-600 mt-0.5">{sec.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
