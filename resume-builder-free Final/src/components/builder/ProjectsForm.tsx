import React from 'react';
import { Project } from '../../types';
import { Plus, Trash2, FolderGit2, Link as LinkIcon } from 'lucide-react';

interface Props {
  projects: Project[];
  onChange: (updated: Project[]) => void;
}

export const ProjectsForm: React.FC<Props> = ({ projects, onChange }) => {
  const handleAdd = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      technologies: '',
      description: '',
      link: ''
    };
    onChange([...projects, newProj]);
  };

  const handleUpdate = (id: string, field: keyof Project, value: string) => {
    const updated = projects.map((p) => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-[#dadce0] rounded-xl p-4 bg-gray-50/50">
          <FolderGit2 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-[#5f6368]">No projects added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="p-4 bg-white border border-[#dadce0] rounded-xl shadow-2xs space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-bold text-[#202124] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-[#1a73e8] text-[10px] flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  {proj.name || `Project #${index + 1}`}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemove(proj.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove this project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => handleUpdate(proj.id, 'name', e.target.value)}
                    placeholder="e.g. Real-Time Telemetry Dashboard"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">Your Role</label>
                  <input
                    type="text"
                    value={proj.role}
                    onChange={(e) => handleUpdate(proj.id, 'role', e.target.value)}
                    placeholder="e.g. Lead Architect / Full Stack Creator"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">Technologies Used</label>
                  <input
                    type="text"
                    value={proj.technologies}
                    onChange={(e) => handleUpdate(proj.id, 'technologies', e.target.value)}
                    placeholder="e.g. React, Node.js, PostgreSQL, Docker"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">Project URL / Link</label>
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-2 text-gray-400" />
                    <input
                      type="text"
                      value={proj.link}
                      onChange={(e) => handleUpdate(proj.id, 'link', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                  Project Description & Outcomes
                </label>
                <textarea
                  rows={2}
                  value={proj.description}
                  onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
                  placeholder="Engineered a scalable analytics platform processing 10,000+ daily events with sub-second chart rendering..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Button */}
      <button
        type="button"
        id="add-project-btn"
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-[#1a73e8]/40 hover:border-[#1a73e8] hover:bg-blue-50/50 text-[#1a73e8] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>+ Add Project</span>
      </button>
    </div>
  );
};
