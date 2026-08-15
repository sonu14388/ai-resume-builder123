import React from 'react';
import { Certification } from '../../types';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';

interface Props {
  certifications: Certification[];
  onChange: (updated: Certification[]) => void;
}

export const CertificationsForm: React.FC<Props> = ({ certifications, onChange }) => {
  const handleAdd = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      credentialUrl: ''
    };
    onChange([...certifications, newCert]);
  };

  const handleUpdate = (id: string, field: keyof Certification, value: string) => {
    const updated = certifications.map((c) => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    });
    onChange(updated);
  };

  const handleRemove = (id: string) => {
    onChange(certifications.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      {certifications.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-[#dadce0] rounded-xl p-4 bg-gray-50/50">
          <Award className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-[#5f6368]">No certifications added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="p-3.5 bg-white border border-[#dadce0] rounded-xl shadow-2xs space-y-2.5 relative"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                <span className="text-xs font-bold text-[#202124]">
                  {cert.name || `Certification #${index + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(cert.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                    Certificate Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Solutions Architect / GCP Cloud Architect"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">
                    Issuing Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleUpdate(cert.id, 'issuer', e.target.value)}
                    placeholder="e.g. Google Cloud, Amazon Web Services"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => handleUpdate(cert.id, 'date', e.target.value)}
                    placeholder="e.g. 2023-08"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#202124] mb-1">Credential ID (Optional)</label>
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => handleUpdate(cert.id, 'credentialId', e.target.value)}
                    placeholder="e.g. GCP-PCA-12345"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#dadce0] rounded-lg focus:outline-none focus:border-[#1a73e8]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        id="add-certification-btn"
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-[#1a73e8]/40 hover:border-[#1a73e8] hover:bg-blue-50/50 text-[#1a73e8] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>+ Add Certification</span>
      </button>
    </div>
  );
};
