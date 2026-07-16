import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

export const PrescriptionSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white">
      <div className="py-12" />

      {/* Main Success Checkmark Block */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 shadow-md">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-sans text-teal-900 tracking-tight">
            Prescription Uploaded
          </h2>
          <p className="text-xs text-slate-500 max-w-[260px] mx-auto leading-relaxed">
            Our AI engine has successfully scanned and parsed the prescription. Let's verify the schedules.
          </p>
        </div>
      </div>

      <div className="py-12" />

      {/* Actions */}
      <div className="space-y-3 pb-6">
        <button 
          onClick={() => navigate('/prescription/verify')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
        >
          Verify Extracted Layout
        </button>

        <button 
          onClick={() => navigate('/prescription/add')} 
          className="w-full text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors block text-center"
        >
          Upload Another Document
        </button>
      </div>
    </div>
  );
};
export default PrescriptionSuccess;
