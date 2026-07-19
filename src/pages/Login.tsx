import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/user-type');
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

        {/* Feature info */}
        <div className="z-10 text-left max-w-sm mx-auto space-y-6">
          <h2 className="text-3xl font-black font-sans leading-tight">Secure Care Coordination</h2>
          <p className="text-sm text-teal-100/80 leading-relaxed font-semibold">
            Log in to manage prescriptions, sync with Bluetooth smart dispensers, and receive instant alert updates for missed doses.
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

        <div className="space-y-6 pt-4">
          {/* Title */}
          <div className="space-y-1.5 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black font-sans text-teal-900 tracking-tight leading-tight">Log In</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">Welcome back! Access your personalized health tracker.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email or Mobile Number</label>
              <input 
                type="text" 
                placeholder="Enter email or mobile number" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-500 transition-all bg-slate-50/50"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs font-extrabold text-teal-600 hover:underline">Forgot?</button>
              </div>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-500 transition-all bg-slate-50/50"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1.5 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-500 font-bold">Or log in with</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {/* Google Login option */}
          <button 
            onClick={() => navigate('/user-type')} 
            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.95-3.24 3.5v2.9h5.22c3.05-2.81 4.81-6.95 4.81-11.83c0-.62-.06-1.2-.13-1.7z" fill="#4285F4"/><path d="M12.18 20.36c2.72 0 5-.9 6.66-2.43l-5.22-2.91c-1.46.99-3.32 1.48-5.2 1.05c-3-1.01-5.17-3.7-5.59-6.84H.57v3c1.94 3.86 5.86 6.36 10.37 6.36z" fill="#34A853"/><path d="M6.82 14.23a6.83 6.83 0 0 1 0-4.3l-6.25-3a11.9 11.9 0 0 0 0 10.3l6.25-3z" fill="#FBBC05"/><path d="M12.18 5.7c1.48 0 2.82.51 3.87 1.51l2.9-2.9A11.9 11.9 0 0 0 .57 7.32l6.25 3c.42-3.14 2.59-5.83 5.59-6.84z" fill="#EA4335"/></svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="text-center pt-6 border-t border-slate-50 mt-6">
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="font-extrabold text-teal-600 hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
