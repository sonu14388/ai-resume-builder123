import React from 'react';
import { LanguageItem } from '../../types';
import { Plus, Trash2, Languages as LangIcon } from 'lucide-react';

interface Props {
  languages: LanguageItem[];
  onChange: (updated: LanguageItem[]) => void;
}

export const LanguagesForm: React.FC<Props> = ({ languages, onChange }) => {
  const handleAdd = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional Working'
    };
    onChange([...languages, newLang]);
  };

  const handleUpdate = (id: string, field: keyof LanguageItem, value: string) => {
    const updated = languages.map((l) => {
      if (l.id === id) {
        return { ...l, [field]: value };
      }
      return l;
    });
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    onChange(languages.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-4">
      {languages.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-[#dadce0] rounded-xl p-4 bg-gray-50/50">
          <LangIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-[#5f6368]">No languages added yet.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {languages.map((lang, index) => (
            <div
              key={lang.id}
              className="p-3 bg-white border border-[#dadce0] rounded-xl shadow-2xs flex flex-col sm:flex-row items-center gap-2.5"
            >
              <div className="flex-1 w-full">
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) => handleUpdate(lang.id, 'language', e.target.value)}
                  placeholder="e.g. English, Spanish, Hindi, French"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                />
              </div>

              <div className="w-full sm:w-48">
                <select
                  value={lang.proficiency}
                  onChange={(e) => handleUpdate(lang.id, 'proficiency', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none text-gray-700"
                >
                  <option value="Native / Bilingual">Native / Bilingual</option>
                  <option value="Professional Working">Professional Working</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Elementary">Elementary</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(lang.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        id="add-language-btn"
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-[#1a73e8]/40 hover:border-[#1a73e8] hover:bg-blue-50/50 text-[#1a73e8] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>+ Add Language</span>
      </button>
    </div>
  );
};
