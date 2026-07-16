import React from 'react';
import { useNavigate } from 'react-router-dom';

export const OnboardingWelcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white">
      {/* App Header logo / title */}
      <div className="text-center pt-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-teal-100">
            P
          </div>
          <span className="text-xl font-extrabold text-teal-800 tracking-tight font-sans">Pillmate</span>
        </div>
      </div>

      {/* Center Image */}
      <div className="my-auto py-6 flex flex-col items-center">
        <div className="w-full max-w-[280px] aspect-[4/3] rounded-3xl overflow-hidden shadow-lg shadow-slate-100 border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?w=600&auto=format&fit=crop" 
            alt="Elderly couple taking care" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Description & Navigation Button */}
      <div className="space-y-6 pb-6 text-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold font-sans text-teal-900 tracking-tight">
            Taking Care, Made Simple.
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed max-w-[280px] mx-auto">
            With custom alerts, medication tracking, and intelligent AI recommendations.
          </p>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => navigate('/login')} 
            className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
          >
            Login
          </button>
          
          <button 
            onClick={() => navigate('/signup')} 
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
          >
            Don't have an account? Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
export default OnboardingWelcome;
