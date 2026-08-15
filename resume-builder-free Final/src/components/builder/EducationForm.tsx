import React from 'react';
import { Education } from '../../types';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface Props {
  educationList: Education[];
  onChange: (updated: Education[]) => void;
}

export const EducationForm: React.FC<Props> = ({ educationList, onChange }) => {
  const handleAdd = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      school: '',
      location: '',
      startYear: '',
      endYear: '',
      description: ''
    };
    onChange([...educationList, newEdu]);
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    const updated = educationList.map((edu) => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    onChange(educationList.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      {educationList.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-[#dadce0] rounded-xl p-4 bg-gray-50/50">
          <GraduationCap className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-[#5f6368]">No education entries added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {educationList.map((edu, index) => (
            <div
              key={edu.id}
              className="p-4 bg-white border border-[#dadce0] rounded-xl shadow-2xs space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-bold text-[#202124] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-[#1a73e8] text-[10px] flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  {edu.degree || edu.school ? `${edu.degree || 'Degree'} at ${edu.school || 'School'}` : `Education #${index + 1}`}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemove(edu.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove this education"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                    Degree / Course <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science in Computer Science"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                    College / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => handleUpdate(edu.id, 'school', e.target.value)}
                    placeholder="e.g. Stanford University / MIT"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => handleUpdate(edu.id, 'location', e.target.value)}
                    placeholder="e.g. Stanford, CA"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#202124] mb-1">Start Year</label>
                    <input
                      type="text"
                      value={edu.startYear}
                      onChange={(e) => handleUpdate(edu.id, 'startYear', e.target.value)}
                      placeholder="e.g. 2018"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#202124] mb-1">End Year</label>
                    <input
                      type="text"
                      value={edu.endYear}
                      onChange={(e) => handleUpdate(edu.id, 'endYear', e.target.value)}
                      placeholder="e.g. 2022"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                  Description / Honors / GPA (Optional)
                </label>
                <textarea
                  rows={2}
                  value={edu.description}
                  onChange={(e) => handleUpdate(edu.id, 'description', e.target.value)}
                  placeholder="e.g. Major in Artificial Intelligence. GPA: 3.8/4.0. Dean's Honors List."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Education Button */}
      <button
        type="button"
        id="add-education-btn"
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-[#1a73e8]/40 hover:border-[#1a73e8] hover:bg-blue-50/50 text-[#1a73e8] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>+ Add Education</span>
      </button>
    </div>
  );
};
