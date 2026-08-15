import React from 'react';
import { WorkExperience } from '../../types';
import { Plus, Trash2, Calendar, Building, Briefcase, MapPin, Sparkles } from 'lucide-react';

interface Props {
  experiences: WorkExperience[];
  onChange: (updated: WorkExperience[]) => void;
}

export const WorkExperienceForm: React.FC<Props> = ({ experiences, onChange }) => {
  const handleAdd = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([...experiences, newExp]);
  };

  const handleUpdate = (id: string, field: keyof WorkExperience, value: any) => {
    const updated = experiences.map((exp) => {
      if (exp.id === id) {
        return {
          ...exp,
          [field]: value,
          ...(field === 'current' && value === true ? { endDate: '' } : {})
        };
      }
      return exp;
    });
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  const insertBulletTemplate = (id: string, exp: WorkExperience) => {
    const bullets =
      '• Spearheaded key initiative resulting in 30% performance boost.\n• Designed and shipped scalable features adopted by 50,000+ active users.\n• Collaborated with cross-functional product and design teams in agile sprints.';
    handleUpdate(id, 'description', exp.description ? `${exp.description}\n${bullets}` : bullets);
  };

  return (
    <div className="space-y-4">
      {experiences.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-[#dadce0] rounded-xl p-4 bg-gray-50/50">
          <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-[#5f6368]">No work experience added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-4 bg-white border border-[#dadce0] rounded-xl shadow-2xs space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-bold text-[#202124] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-[#1a73e8] text-[10px] flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  {exp.jobTitle || exp.company ? `${exp.jobTitle || 'Role'} at ${exp.company || 'Company'}` : `Experience #${index + 1}`}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemove(exp.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove this experience"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleUpdate(exp.id, 'jobTitle', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                    placeholder="e.g. Google / TechCorp"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                    placeholder="e.g. New York, NY / Remote"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">Start Date</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2021-03 or Mar 2021"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <label className="block text-[11px] font-semibold text-[#202124] mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? 'Present' : exp.endDate}
                      onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                      placeholder="e.g. 2024-01 or Jan 2024"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#202124]">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => handleUpdate(exp.id, 'current', e.target.checked)}
                        className="rounded text-[#1a73e8] focus:ring-blue-200 w-4 h-4"
                      />
                      <span>Currently Working Here</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-semibold text-[#202124]">
                    Job Description & Key Achievements (bullet points recommended)
                  </label>
                  <button
                    type="button"
                    onClick={() => insertBulletTemplate(exp.id, exp)}
                    className="text-[10px] text-[#1a73e8] hover:underline font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Insert sample bullets</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={exp.description}
                  onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)}
                  placeholder="• Spearheaded development of...&#10;• Increased user engagement by 25%...&#10;• Mentored junior teammates and improved code review speed."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8] font-mono leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Experience Button */}
      <button
        type="button"
        id="add-experience-btn"
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-[#1a73e8]/40 hover:border-[#1a73e8] hover:bg-blue-50/50 text-[#1a73e8] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>+ Add Experience</span>
      </button>
    </div>
  );
};
