import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

export const VoiceVerified: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-950 text-white">
      <div className="py-12" />

      {/* Main Verification checkmark */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-teal-500/20 border-2 border-teal-500 rounded-full flex items-center justify-center text-teal-400 shadow-xl shadow-teal-500/20">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-sans text-white tracking-tight">
            Voice Verified
          </h2>
          <p className="text-xs text-slate-400 max-w-[260px] mx-auto leading-relaxed">
            Your audio print has been successfully authenticated. The automatic smart dispenser is now unlocked.
          </p>
        </div>
      </div>

      <div className="py-12" />

      {/* Action button */}
      <div className="pb-6">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-900/30 transition-all text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
export default VoiceVerified;
