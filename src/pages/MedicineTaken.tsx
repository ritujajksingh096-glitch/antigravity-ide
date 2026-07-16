import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

export const MedicineTaken: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-teal-50/20">
      <div className="py-12" />

      {/* Main Success Checkmark Block */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-24 h-24 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-teal-200 animate-scale">
          <Check className="w-12 h-12 stroke-[3]" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-sans text-teal-900 tracking-tight">
            Medicine Taken
          </h2>
          <p className="text-sm text-slate-500 max-w-[240px] mx-auto leading-relaxed">
            Your dose has been successfully recorded. The device log is now up to date.
          </p>
        </div>
      </div>

      <div className="py-12" />

      {/* Action Button */}
      <div className="pb-6">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
export default MedicineTaken;
