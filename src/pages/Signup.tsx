import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/otp-verify');
  };

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

        {/* Feature stats card overlay */}
        <div className="z-10 text-left max-w-sm mx-auto space-y-6">
          <h2 className="text-3xl font-black font-sans leading-tight">Join the Family & Ensure Medication Safety</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-850 flex items-center justify-center text-teal-300 font-extrabold text-[10px]">✓</span>
              <p className="text-xs font-semibold text-teal-100/90 leading-normal">
                Reduce medical errors caused by visually identical pills.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-850 flex items-center justify-center text-teal-300 font-extrabold text-[10px]">✓</span>
              <p className="text-xs font-semibold text-teal-100/90 leading-normal">
                Coordinate care between primary caregivers and parents instantly.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-teal-850 flex items-center justify-center text-teal-300 font-extrabold text-[10px]">✓</span>
              <p className="text-xs font-semibold text-teal-100/90 leading-normal">
                UV-protected medicine storage tracking with dispenser alerts.
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-teal-200/50 text-left z-10 font-bold">
          © 2026 Pillmate Technologies Inc.
        </div>
      </div>

      {/* 2. RIGHT FORM CONTAINER */}
      <div className="flex-grow flex flex-col justify-between p-6 md:p-12 md:w-1/2 max-w-md mx-auto w-full md:my-auto">
        
        {/* Mobile top logo */}
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

        <div className="space-y-6 pt-4">
          {/* Title */}
          <div className="space-y-1.5 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black font-sans text-teal-900 tracking-tight leading-tight">Create Account</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">Join our family to simplify medication routines and ensure safety.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-500 transition-all bg-slate-50/50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-500 transition-all bg-slate-50/50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Mobile Number</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-500 transition-all bg-slate-50/50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Password</label>
              <input 
                type="password" 
                placeholder="Create a strong password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-500 transition-all bg-slate-50/50"
                required
              />
            </div>

            <div className="flex items-start gap-2 pt-1 text-left">
              <input type="checkbox" id="terms" className="mt-1 rounded text-teal-600 focus:ring-teal-500" required />
              <label htmlFor="terms" className="text-xs text-slate-600 leading-normal font-semibold">
                By creating an account, you agree to our Terms of Service & Privacy Policy.
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm mt-1"
            >
              Sign Up
            </button>
          </form>

          {/* Social Options */}
          <div className="space-y-3">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-3 text-xs text-slate-500 font-bold">Or sign up with</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 py-2.5 px-3 rounded-xl transition-all text-sm font-bold text-slate-700">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.75.8-.01 1.99-.77 3.55-.63 1.6.14 2.81.76 3.49 1.83-3.28 1.96-2.76 6.35.03 7.57-.69 1.63-1.61 3.25-2.15 3.45zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.51-3.74 4.25z"/></svg>
                <span>Apple</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 py-2.5 px-3 rounded-xl transition-all text-sm font-bold text-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.95-3.24 3.5v2.9h5.22c3.05-2.81 4.81-6.95 4.81-11.83c0-.62-.06-1.2-.13-1.7z" fill="#4285F4"/><path d="M12.18 20.36c2.72 0 5-.9 6.66-2.43l-5.22-2.91c-1.46.99-3.32 1.48-5.2 1.05c-3-1.01-5.17-3.7-5.59-6.84H.57v3c1.94 3.86 5.86 6.36 10.37 6.36z" fill="#34A853"/><path d="M6.82 14.23a6.83 6.83 0 0 1 0-4.3l-6.25-3a11.9 11.9 0 0 0 0 10.3l6.25-3z" fill="#FBBC05"/><path d="M12.18 5.7c1.48 0 2.82.51 3.87 1.51l2.9-2.9A11.9 11.9 0 0 0 .57 7.32l6.25 3c.42-3.14 2.59-5.83 5.59-6.84z" fill="#EA4335"/></svg>
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-slate-50 mt-6 bg-white">
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="font-extrabold text-teal-600 hover:underline">
              Log In
            </button>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Signup;
