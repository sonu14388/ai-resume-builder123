import React from 'react';
import { ResumeData, ResumeStyle } from '../../types';
import { ModernTemplate } from './ModernTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { UniversalResumeTemplate } from './UniversalResumeTemplate';

interface Props {
  data: ResumeData;
  style: ResumeStyle;
}

export const ResumeTemplateRenderer: React.FC<Props> = ({ data, style }) => {
  switch (style.templateId) {
    case 'sidebar':
    case 'bold':
    case 'accent':
    case 'compact':
    case 'elegant':
    case 'tech':
      return <UniversalResumeTemplate data={data} style={style} />;
    case 'modern':
      return <ModernTemplate data={data} style={style} />;
    case 'professional':
      return <ProfessionalTemplate data={data} style={style} />;
    case 'minimal':
      return <MinimalTemplate data={data} style={style} />;
    case 'creative':
      return <CreativeTemplate data={data} style={style} />;
    case 'executive':
      return <ExecutiveTemplate data={data} style={style} />;
    default:
      return <UniversalResumeTemplate data={data} style={style} />;
  }
};
