import React from 'react';
import { AdditionalItem } from '../../types';
import { Plus, Trash2, Award, Heart, BookOpen, Users, Bookmark } from 'lucide-react';

interface Props {
  sections: AdditionalItem[];
  onChange: (updated: AdditionalItem[]) => void;
}

export const AdditionalSectionsForm: React.FC<Props> = ({ sections, onChange }) => {
  const handleAdd = (type: AdditionalItem['type'] = 'achievement') => {
    const newItem: AdditionalItem = {
      id: `add-${Date.now()}`,
      type,
      title: '',
      subtitle: '',
      date: '',
      description: ''
    };
    onChange([...sections, newItem]);
  };

  const handleUpdate = (id: string, field: keyof AdditionalItem, value: string) => {
    const updated = sections.map((s) => {
      if (s.id === id) {
        return { ...s, [field]: value };
      }
      return s;
    });
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    onChange(sections.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      {sections.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-[#dadce0] rounded-xl p-4 bg-gray-50/50">
          <Bookmark className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-[#5f6368]">No extra sections added yet.</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Add achievements, awards, volunteer experience, publications, or references.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 bg-white border border-[#dadce0] rounded-xl shadow-2xs space-y-2.5 relative"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                <div className="flex items-center gap-2">
                  <select
                    value={item.type}
                    onChange={(e) => handleUpdate(item.id, 'type', e.target.value)}
                    className="px-2 py-1 text-xs font-bold bg-blue-50 text-[#1a73e8] border border-blue-100 rounded-md focus:outline-none uppercase"
                  >
                    <option value="achievement">Achievement</option>
                    <option value="award">Award</option>
                    <option value="volunteer">Volunteer Experience</option>
                    <option value="publication">Publication</option>
                    <option value="reference">Reference</option>
                    <option value="hobby">Hobby / Interest</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                    Title / Header <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                    placeholder="e.g. Hackathon 1st Place / Open Source Contributor"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                    Organization / Subtitle (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.subtitle || ''}
                    onChange={(e) => handleUpdate(item.id, 'subtitle', e.target.value)}
                    placeholder="e.g. TechCrunch Disrupt / Red Cross"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#202124] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                  placeholder="Details regarding this achievement, volunteer role, or reference..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Add Buttons for Section Types */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => handleAdd('achievement')}
          className="px-2.5 py-1 bg-white hover:bg-gray-50 text-[#1a73e8] border border-[#dadce0] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>+ Achievement</span>
        </button>
        <button
          type="button"
          onClick={() => handleAdd('award')}
          className="px-2.5 py-1 bg-white hover:bg-gray-50 text-[#1a73e8] border border-[#dadce0] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>+ Award</span>
        </button>
        <button
          type="button"
          onClick={() => handleAdd('volunteer')}
          className="px-2.5 py-1 bg-white hover:bg-gray-50 text-[#1a73e8] border border-[#dadce0] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>+ Volunteer</span>
        </button>
        <button
          type="button"
          onClick={() => handleAdd('publication')}
          className="px-2.5 py-1 bg-white hover:bg-gray-50 text-[#1a73e8] border border-[#dadce0] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>+ Publication</span>
        </button>
        <button
          type="button"
          onClick={() => handleAdd('hobby')}
          className="px-2.5 py-1 bg-white hover:bg-gray-50 text-[#1a73e8] border border-[#dadce0] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>+ Hobby</span>
        </button>
      </div>
    </div>
  );
};
