import React from 'react';
import { useNavigate } from 'react-router-dom';

export const OnboardingWelcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-y-auto no-scrollbar">
      
      {/* 1. LEFT GRAPHIC SIDEBAR (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 bg-teal-900 text-white p-12 relative flex-col justify-between overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-teal-850 pointer-events-none" />
        <div className="absolute right-36 -top-24 w-64 h-64 rounded-full bg-teal-850/50 pointer-events-none" />
        
        {/* Logo */}
        <div className="flex items-center gap-2.5 z-10">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-950 font-black text-xl shadow-lg">
            P
          </div>
          <span className="text-xl font-black text-white tracking-tight">Pillmate</span>
        </div>

        {/* Feature stats card overlay */}
        <div className="z-10 text-left max-w-sm mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black font-sans leading-tight">Your Smart Medication Companion</h2>
            <p className="text-sm text-teal-100/80 leading-relaxed font-semibold">
              Avoid confusion with identical pills. Pillmate scans, sets schedules, and coordinates care seamlessly between caregivers and patients.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-850 flex items-center justify-center text-teal-300 font-extrabold text-[10px]">✓</span>
              <p className="text-xs font-semibold text-teal-100/90 leading-normal">
                Intelligent circular SVG slot verification system.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-850 flex items-center justify-center text-teal-300 font-extrabold text-[10px]">✓</span>
              <p className="text-xs font-semibold text-teal-100/90 leading-normal">
                Live Web Audio assistant checks for instant speech verification.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-850 flex items-center justify-center text-teal-300 font-extrabold text-[10px]">✓</span>
              <p className="text-xs font-semibold text-teal-100/90 leading-normal">
                UV-protected medicine compartments with sensor alerts.
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-teal-200/50 text-left z-10 font-bold">
          © 2026 Pillmate Technologies Inc.
        </div>
      </div>

      {/* 2. RIGHT PANEL ACTIONS */}
      <div className="flex-grow flex flex-col justify-between p-6 md:p-12 md:w-1/2 max-w-md mx-auto w-full md:my-auto">
        
        {/* Mobile top logo header */}
        <div className="flex items-center justify-between md:hidden pb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <span className="text-sm font-extrabold text-teal-800">Pillmate</span>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="py-6 flex flex-col items-center">
          <div className="w-full max-w-[240px] aspect-[4/3] rounded-3xl overflow-hidden shadow-lg shadow-slate-100 border border-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?w=600" 
              alt="Elderly couple taking care" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Title */}
        <div className="space-y-6 text-center md:text-left">
          <div className="space-y-2.5">
            <h2 className="text-xl md:text-2xl font-black font-sans text-teal-900 tracking-tight">
              Taking Care, Made Simple.
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[260px] md:max-w-none mx-auto md:mx-0 font-medium">
              Simplify your daily medicine routines with custom alerts, hardware tracking, and intelligent AI interaction.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 max-w-[260px] md:max-w-none mx-auto md:mx-0 w-full">
            <button 
              onClick={() => navigate('/login')} 
              className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-xs"
            >
              Login
            </button>
            
            <button 
              onClick={() => navigate('/signup')} 
              className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-2xl transition-all text-xs block text-center"
            >
              Create Account
            </button>
          </div>
        </div>

        <div className="pb-4 md:pb-0" />
      </div>

    </div>
  );
};

export default OnboardingWelcome;
