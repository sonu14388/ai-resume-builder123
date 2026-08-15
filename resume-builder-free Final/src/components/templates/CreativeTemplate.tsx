import React from 'react';
import { ResumeData, ResumeStyle } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, ExternalLink, Sparkles } from 'lucide-react';

interface Props {
  data: ResumeData;
  style: ResumeStyle;
}

export const CreativeTemplate: React.FC<Props> = ({ data, style }) => {
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, additionalSections } = data;
  const primaryColor = style.primaryColor || '#7c3aed';

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
    spacious: 'text-base space-y-5.5'
  }[style.fontSize] || 'text-sm space-y-4.5';

  const formatDescription = (desc: string) => {
    if (!desc) return null;
    const lines = desc.split('\n').filter(Boolean);
    return (
      <ul className="space-y-1.5 mt-1.5 text-gray-700 leading-relaxed">
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
    <div className={`w-full bg-white text-[#1f2937] ${fontClass} min-h-[297mm] flex flex-col md:flex-row`}>
      {/* Creative Sidebar */}
      <aside className="w-full md:w-1/3 p-6 md:p-8 text-white flex flex-col justify-between" style={{ backgroundColor: primaryColor }}>
        <div className="space-y-6">
          {/* Profile Photo */}
          {style.showPhoto && personalInfo.photoUrl ? (
            <div className="flex justify-center md:justify-start">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white/30 shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-12 h-1.5 bg-white/40 rounded-full" />
          )}

          {/* Name & Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-sm font-medium text-white/80 mt-1 uppercase tracking-wider">
              {personalInfo.title || 'Professional Title'}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs text-white/90">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/60 border-b border-white/20 pb-1">
              Contact
            </h2>
            {personalInfo.email && (
              <p className="flex items-center gap-2 break-all">
                <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.email}</span>
              </p>
            )}
            {personalInfo.phone && (
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.phone}</span>
              </p>
            )}
            {personalInfo.location && (
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.location}</span>
              </p>
            )}
            {personalInfo.linkedin && (
              <p className="flex items-center gap-2 break-all">
                <Linkedin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </p>
            )}
            {personalInfo.website && (
              <p className="flex items-center gap-2 break-all">
                <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </p>
            )}
            {personalInfo.github && (
              <p className="flex items-center gap-2 break-all">
                <Github className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
              </p>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/60 border-b border-white/20 pb-1">
                Expertise
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/15 text-white backdrop-blur-sm border border-white/10"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/60 border-b border-white/20 pb-1">
                Languages
              </h2>
              <div className="space-y-1 text-xs text-white/90">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span>{lang.language}</span>
                    <span className="text-white/70">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 text-[10px] text-white/40 uppercase tracking-widest font-mono">
          Creative Profile
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 p-6 md:p-8 bg-white ${sizeClass}`}>
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-2 flex items-center gap-1.5" style={{ borderColor: primaryColor }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
              Profile Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor }}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id} className="relative pl-3.5 border-l-2" style={{ borderColor: `${primaryColor}40` }}>
                  <div className="flex flex-wrap justify-between items-baseline gap-1">
                    <h3 className="font-bold text-gray-900 text-sm">{exp.jobTitle || 'Job Title'}</h3>
                    <span className="text-xs text-gray-500 font-medium">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-700 flex items-center gap-2">
                    <span style={{ color: primaryColor }}>{exp.company}</span>
                    {exp.location && <span className="text-gray-400 font-normal">| {exp.location}</span>}
                  </div>
                  {formatDescription(exp.description)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor }}>
              Featured Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 text-xs">
                      {proj.name} {proj.role && <span className="font-normal text-gray-500">({proj.role})</span>}
                    </h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs hover:underline flex items-center gap-1" style={{ color: primaryColor }}>
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  {proj.technologies && <p className="text-[11px] text-gray-500 font-mono mt-0.5">{proj.technologies}</p>}
                  {proj.description && <p className="text-xs text-gray-700 mt-1">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b-2 pb-1 mb-2.5" style={{ borderColor: primaryColor }}>
              Education
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>{edu.degree}</span>
                    <span className="text-gray-500 font-normal">{edu.startYear} – {edu.endYear || 'Present'}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{edu.school} {edu.location && `• ${edu.location}`}</p>
                  {edu.description && <p className="text-gray-600 italic mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Additional */}
        {(certifications.length > 0 || additionalSections.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b pb-1 mb-1.5">
                  Certifications
                </h2>
                <div className="space-y-1 text-xs text-gray-700">
                  {certifications.map((c) => (
                    <p key={c.id}><strong className="text-gray-900">{c.name}</strong> – {c.issuer}</p>
                  ))}
                </div>
              </section>
            )}

            {additionalSections.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b pb-1 mb-1.5">
                  Achievements
                </h2>
                <div className="space-y-1 text-xs text-gray-700">
                  {additionalSections.map((s) => (
                    <p key={s.id}><strong className="text-gray-900">{s.title}</strong>: {s.description}</p>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
