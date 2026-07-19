import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User } from 'lucide-react';

export const PatientProfileAdd: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [birthYear, setBirthYear] = useState('');
  const [conditions, setConditions] = useState<string[]>([]);

  const toggleCondition = (condition: string) => {
    if (conditions.includes(condition)) {
      setConditions(conditions.filter(c => c !== condition));
    } else {
      setConditions([...conditions, condition]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const availableConditions = ['Diabetes', 'Hypertension', 'Heart Condition', 'Asthma', 'Arthritis'];

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-y-auto no-scrollbar">
      
      {/* 1. LEFT GRAPHIC SIDEBAR (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 bg-teal-900 text-white p-12 relative flex-col justify-between overflow-hidden">
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
          <h2 className="text-3xl font-black font-sans leading-tight">Patient Personalization</h2>
          <p className="text-sm text-teal-100/80 leading-relaxed font-semibold">
            Setting up a clinical profile helps our AI customize dose schedules, flag potential drug interactions, and prioritize urgent refill notifications.
          </p>
        </div>

        <div className="text-xs text-teal-200/50 text-left z-10 font-bold">
          © 2026 Pillmate Technologies Inc.
        </div>
      </div>

      {/* 2. RIGHT FORM CONTAINER */}
      <div className="flex-grow flex flex-col justify-between p-6 md:p-12 md:w-1/2 max-w-md mx-auto w-full md:my-auto">
        
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

        <form onSubmit={handleSubmit} className="space-y-6 pt-2 flex-grow flex flex-col justify-between">
          
          <div className="space-y-6">
            {/* Title Block */}
            <div className="text-center md:text-left space-y-1.5">
              <h2 className="text-2xl md:text-3xl font-black font-sans text-slate-900 tracking-tight leading-tight">Add Patient Profile</h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">Provide medical context to personalize schedule suggestions.</p>
            </div>

            {/* Profile Picture Upload Mock */}
            <div className="flex justify-center md:justify-start my-2">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden">
                  <User className="w-10 h-10" />
                </div>
                <button type="button" className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-teal-600 border-2 border-white text-white flex items-center justify-center shadow-md hover:bg-teal-700 active:scale-95 transition-all">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Sam Johnson" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-500 transition-all bg-slate-50/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Gender</label>
                  <select 
                    value={gender} 
                    onChange={(e: any) => setGender(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Birth Year</label>
                  <input 
                    type="number" 
                    placeholder="1951" 
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-500 transition-all bg-slate-50/50"
                    required
                  />
                </div>
              </div>

              {/* Medical Conditions Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Medical Conditions (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {availableConditions.map(condition => (
                    <button
                      type="button"
                      key={condition}
                      onClick={() => toggleCondition(condition)}
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-extrabold border transition-all ${
                        conditions.includes(condition) 
                          ? 'border-teal-600 bg-teal-50 text-teal-800' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-350'
                      }`}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 pb-2">
            <button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default PatientProfileAdd;
