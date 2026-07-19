import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, CheckCircle2 } from 'lucide-react';

export const UserTypeSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'patient' | 'caregiver'>('patient');

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-slate-50/30 overflow-y-auto no-scrollbar relative">
      
      {/* Background soft blur blobs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none z-0" />

      {/* 1. LEFT GRAPHIC SIDEBAR (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 bg-teal-900 text-white p-12 relative flex-col justify-between overflow-hidden z-10">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-teal-850 pointer-events-none" />
        <div className="absolute right-36 -top-24 w-64 h-64 rounded-full bg-teal-850/50 pointer-events-none" />
        
        {/* Logo */}
        <div className="flex items-center gap-2.5 z-10 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-950 font-black text-xl shadow-lg">
            P
          </div>
          <span className="text-xl font-black text-white tracking-tight">Pillmate</span>
        </div>

        {/* Feature info */}
        <div className="z-10 text-left max-w-sm mx-auto space-y-6">
          <h2 className="text-3xl font-black font-sans leading-tight">Personalizing Your Journey</h2>
          <p className="text-sm text-teal-100/80 leading-relaxed font-semibold">
            Pillmate customizes itself depending on whether you are tracking your own prescriptions or taking care of a family member.
          </p>
        </div>

        <div className="text-xs text-teal-200/50 text-left z-10 font-bold">
          © 2026 Pillmate Technologies Inc.
        </div>
      </div>

      {/* 2. RIGHT FORM CONTAINER */}
      <div className="flex-grow flex flex-col justify-between p-6 md:p-12 md:w-1/2 max-w-md mx-auto w-full md:my-auto z-10 relative">
        
        {/* Mobile top logo header */}
        <div className="flex items-center justify-between md:hidden pb-4">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <span className="text-sm font-extrabold text-teal-800">Pillmate</span>
          </div>
        </div>

        <div className="space-y-6 pt-2">
          {/* Title */}
          <div className="space-y-2.5 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-teal-900 tracking-tight leading-tight">
              Who will be using Pillmate?
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-semibold leading-relaxed">
              Choose the option that describes your primary role.
            </p>
          </div>

          {/* Options Stack */}
          <div className="space-y-4 pt-2">
            {/* Patient Card */}
            <div 
              onClick={() => setSelectedType('patient')}
              className={`p-5 rounded-3xl border-2 cursor-pointer flex gap-4 items-center transition-all shadow-sm ${
                selectedType === 'patient' 
                  ? 'border-teal-600 bg-white scale-[1.01] shadow-lg shadow-teal-500/5' 
                  : 'border-slate-200/60 bg-white/60 hover:bg-white hover:scale-[1.005]'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 transition-colors ${
                selectedType === 'patient' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                <User className="w-5.5 h-5.5" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm sm:text-base font-black text-slate-800">Patient</h3>
                  {selectedType === 'patient' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">I am tracking my own medications and health routines.</p>
              </div>
            </div>

            {/* Caregiver Card */}
            <div 
              onClick={() => setSelectedType('caregiver')}
              className={`p-5 rounded-3xl border-2 cursor-pointer flex gap-4 items-center transition-all shadow-sm ${
                selectedType === 'caregiver' 
                  ? 'border-teal-600 bg-white scale-[1.01] shadow-lg shadow-teal-500/5' 
                  : 'border-slate-200/60 bg-white/60 hover:bg-white hover:scale-[1.005]'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 transition-colors ${
                selectedType === 'caregiver' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                <Users className="w-5.5 h-5.5" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm sm:text-base font-black text-slate-800">Caregiver</h3>
                  {selectedType === 'caregiver' && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">I am helping a family member or friend manage their health.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-2 pt-8">
          <button 
            onClick={() => navigate('/device-connect')} 
            className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-505 transition-all text-sm"
          >
            Continue
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserTypeSelection;
