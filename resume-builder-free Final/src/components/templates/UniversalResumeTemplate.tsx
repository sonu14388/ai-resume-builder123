import React from 'react';
import { ResumeData, ResumeStyle } from '../../types';
import { getTemplateById } from '../../data/templatesData';

interface Props {
  data: ResumeData;
  style: ResumeStyle;
}

export const UniversalResumeTemplate: React.FC<Props> = ({ data, style }) => {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    projects,
    certifications,
    languages,
    additionalSections
  } = data;

  // Map templateId or layoutVariant to specific CSS design variant class
  const getDesignClass = () => {
    const tplInfo = getTemplateById(style.templateId);
    const layout = tplInfo ? tplInfo.layoutVariant : style.templateId;

    switch (layout) {
      case 'sidebar':
        return 'design-sidebar';
      case 'bold':
        return 'design-bold';
      case 'accent':
        return 'design-accent';
      case 'compact':
        return 'design-compact';
      case 'elegant':
        return 'design-elegant';
      case 'tech':
        return 'design-tech';
      case 'executive':
        return 'design-executive';
      case 'minimal':
        return 'design-minimal';
      case 'creative':
        return 'design-sidebar';
      case 'professional':
        return 'design-accent';
      case 'split':
        return 'design-split';
      case 'nordic':
        return 'design-nordic';
      case 'metro':
        return 'design-metro';
      case 'timeline':
        return 'design-timeline';
      case 'swiss':
        return 'design-swiss';
      case 'infographic':
        return 'design-infographic';
      case 'grid':
        return 'design-grid';
      case 'cascade':
        return 'design-cascade';
      case 'modern':
      default:
        return '';
    }
  };

  const primaryColor = style.primaryColor || '#2563eb';
  const customStyle: React.CSSProperties = {
    // Pass custom accent variables to resume container
    ['--accent' as string]: primaryColor,
    ['--accent-light' as string]: `${primaryColor}14`
  };

  const getFontClass = () => {
    switch (style.fontFamily) {
      case 'poppins':
        return 'font-poppins';
      case 'outfit':
        return 'font-outfit';
      case 'jakarta':
        return 'font-jakarta';
      case 'montserrat':
        return 'font-montserrat';
      case 'raleway':
        return 'font-raleway';
      case 'dmsans':
        return 'font-dmsans';
      case 'space':
        return 'font-space';
      case 'serif':
      case 'merriweather':
        return 'font-merriweather';
      case 'playfair':
        return 'font-playfair';
      case 'roboto':
        return 'font-roboto';
      case 'editorial':
        return 'font-editorial';
      case 'lora':
        return 'font-lora';
      case 'crimson':
        return 'font-crimson';
      case 'cinzel':
        return 'font-cinzel';
      case 'mono':
        return 'font-mono-clean';
      case 'jetbrains':
        return 'font-jetbrains';
      case 'fira':
        return 'font-fira';
      case 'oswald':
        return 'font-oswald';
      case 'sans':
      default:
        return 'font-sans-modern';
    }
  };

  return (
    <div
      id="resume"
      className={`resume resume-a4-page bg-white shadow-2xl mx-auto transition-all ${getDesignClass()} ${getFontClass()}`}
      style={customStyle}
    >
      {/* Resume Header */}
      <div className="resume-header">
        <h1 className="resume-name">{personalInfo.fullName || 'Your Full Name'}</h1>
        {personalInfo.title && <div className="resume-title">{personalInfo.title}</div>}

        <div className="contact-line">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Resume Body */}
      <div className="resume-body">
        {/* Summary Section */}
        {summary && (
          <div className="resume-section">
            <div className="section-heading">
              <h2>Professional Summary</h2>
              <div className="section-line"></div>
            </div>
            <div className="summary">{summary}</div>
          </div>
        )}

        {/* Work Experience Section */}
        {workExperience && workExperience.length > 0 && (
          <div className="resume-section">
            <div className="section-heading">
              <h2>Work Experience</h2>
              <div className="section-line"></div>
            </div>
            {workExperience.map((exp) => (
              <div key={exp.id} className="experience">
                <div className="exp-top">
                  <div>
                    <div className="exp-role">{exp.jobTitle}</div>
                    <div className="exp-company">{exp.company}</div>
                    {exp.location && <div className="exp-location">{exp.location}</div>}
                  </div>
                  <div className="exp-date">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.description && (
                  <ul className="bullets">
                    {exp.description
                      .split('\n')
                      .filter((line) => line.trim().length > 0)
                      .map((line, idx) => (
                        <li key={idx}>
                          {line.startsWith('•') || line.startsWith('-')
                            ? line.replace(/^[\s•-]+/, '')
                            : line}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <div className="resume-section">
            <div className="section-heading">
              <h2>Education</h2>
              <div className="section-line"></div>
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="education">
                <div className="edu-top">
                  <div>
                    <div className="edu-degree">{edu.degree}</div>
                    <div className="edu-school">{edu.school}</div>
                  </div>
                  <div className="edu-date">
                    {edu.startYear} - {edu.endYear}
                  </div>
                </div>
                {edu.description && <div className="edu-grade">{edu.description}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="resume-section">
            <div className="section-heading">
              <h2>Skills & Competencies</h2>
              <div className="section-line"></div>
            </div>
            <div className="skill-group">
              <div className="skill-list">
                {skills.map((skill) => (
                  <span key={skill.id} className="skill">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <div className="resume-section">
            <div className="section-heading">
              <h2>Key Projects</h2>
              <div className="section-line"></div>
            </div>
            {projects.map((proj) => (
              <div key={proj.id} className="project">
                <div className="exp-top">
                  <div>
                    <div className="project-name">{proj.name}</div>
                    {proj.role && <div className="project-tech">{proj.role}</div>}
                  </div>
                  {proj.technologies && <div className="exp-date">{proj.technologies}</div>}
                </div>
                {proj.description && (
                  <div className="project-description mt-1.5">{proj.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <div className="resume-section">
            <div className="section-heading">
              <h2>Certifications</h2>
              <div className="section-line"></div>
            </div>
            {certifications.map((cert) => (
              <div key={cert.id} className="certification">
                <div className="exp-top">
                  <div>
                    <div className="cert-name">{cert.name}</div>
                    <div className="cert-org">{cert.issuer}</div>
                  </div>
                  {cert.date && <div className="cert-date">{cert.date}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages Section */}
        {languages && languages.length > 0 && (
          <div className="resume-section">
            <div className="section-heading">
              <h2>Languages</h2>
              <div className="section-line"></div>
            </div>
            <div className="skill-list">
              {languages.map((lang) => (
                <span key={lang.id} className="skill">
                  {lang.language} {lang.proficiency ? `(${lang.proficiency})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Sections */}
        {additionalSections && additionalSections.length > 0 && (
          <div className="resume-section">
            <div className="section-heading">
              <h2>Achievements & Activities</h2>
              <div className="section-line"></div>
            </div>
            {additionalSections.map((item) => (
              <div key={item.id} className="mb-2">
                <div className="exp-top">
                  <div className="exp-role">{item.title}</div>
                  {item.date && <div className="exp-date">{item.date}</div>}
                </div>
                {item.description && (
                  <div className="simple-text mt-0.5">{item.description}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
