import React, { useState } from 'react';
import { SkillItem } from '../../types';
import { Plus, X, Sparkles, Check, Tag } from 'lucide-react';

interface Props {
  skills: SkillItem[];
  onChange: (updated: SkillItem[]) => void;
}

export const SkillsForm: React.FC<Props> = ({ skills, onChange }) => {
  const [newSkillText, setNewSkillText] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Advanced');

  const popularSuggestions = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React.js',
    'Node.js',
    'Python',
    'MS Excel',
    'SQL',
    'Communication',
    'Problem Solving',
    'Project Management',
    'Git & GitHub',
    'Docker',
    'Leadership',
    'Agile / Scrum'
  ];

  const handleAddSkill = (nameToAdd?: string) => {
    const text = nameToAdd || newSkillText.trim();
    if (!text) return;

    // Prevent duplicate skill names
    if (skills.some((s) => s.name.toLowerCase() === text.toLowerCase())) {
      setNewSkillText('');
      return;
    }

    const newSkill: SkillItem = {
      id: `sk-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: text,
      level: newSkillLevel
    };

    onChange([...skills, newSkill]);
    setNewSkillText('');
  };

  const handleRemoveSkill = (id: string) => {
    onChange(skills.filter((s) => s.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-4">
      {/* Skill Input Area */}
      <div className="p-3 bg-white border border-[#dadce0] rounded-xl shadow-2xs space-y-3">
        <label className="block text-xs font-semibold text-[#202124]">
          Add Skills (Press Enter or comma to add)
        </label>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={newSkillText}
              onChange={(e) => setNewSkillText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. JavaScript, HTML, MS Excel, Communication..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none text-gray-700"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>

            <button
              type="button"
              onClick={() => handleAddSkill()}
              disabled={!newSkillText.trim()}
              className="px-3.5 py-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Current Skills Chips */}
        <div>
          <p className="text-[11px] font-semibold text-[#5f6368] mb-2">
            Active Skills ({skills.length}):
          </p>

          {skills.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No skills added yet.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-[#1a73e8] border border-blue-100 text-xs font-medium group"
                >
                  <span>{skill.name}</span>
                  {skill.level && (
                    <span className="text-[10px] text-blue-500 font-normal">({skill.level})</span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-blue-400 hover:text-red-500 p-0.5 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popular Suggestions */}
      <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-200">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#202124] mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick Add Popular Skills:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {popularSuggestions.map((item) => {
            const isAlreadyAdded = skills.some((s) => s.name.toLowerCase() === item.toLowerCase());
            return (
              <button
                key={item}
                type="button"
                onClick={() => !isAlreadyAdded && handleAddSkill(item)}
                disabled={isAlreadyAdded}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                  isAlreadyAdded
                    ? 'bg-gray-200 text-gray-400 cursor-default'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#1a73e8] hover:text-[#1a73e8] cursor-pointer'
                }`}
              >
                {isAlreadyAdded ? <Check className="w-3 h-3 text-green-600" /> : <Plus className="w-3 h-3 text-gray-400" />}
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
