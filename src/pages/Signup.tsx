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
    // Simulate signup, redirect to OTP code verification
    navigate('/otp-verify');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
      <div className="space-y-6 pt-4">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">Create Account</h2>
          <p className="text-xs text-slate-500">Join our family to simplify medication routines and ensure safety.</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all bg-slate-50/50"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Email</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all bg-slate-50/50"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Mobile Number</label>
            <input 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all bg-slate-50/50"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Password</label>
            <input 
              type="password" 
              placeholder="Create a strong password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all bg-slate-50/50"
              required
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" id="terms" className="mt-1 rounded text-teal-600 focus:ring-teal-500" required />
            <label htmlFor="terms" className="text-[11px] text-slate-500 leading-normal">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm mt-2"
          >
            Sign Up
          </button>
        </form>

        {/* Social Options */}
        <div className="space-y-3">
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">Or sign up with</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 px-4 rounded-xl transition-all text-xs font-semibold text-slate-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.75.8-.01 1.99-.77 3.55-.63 1.6.14 2.81.76 3.49 1.83-3.28 1.96-2.76 6.35.03 7.57-.69 1.63-1.61 3.25-2.15 3.45zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.51-3.74 4.25z"/></svg>
              <span>Apple</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 px-4 rounded-xl transition-all text-xs font-semibold text-slate-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.95-3.24 3.5v2.9h5.22c3.05-2.81 4.81-6.95 4.81-11.83c0-.62-.06-1.2-.13-1.7z" fill="#4285F4"/><path fill="currentColor" d="M12.18 20.36c2.72 0 5-.9 6.66-2.43l-5.22-2.91c-1.46.99-3.32 1.48-5.2 1.05c-3-1.01-5.17-3.7-5.59-6.84H.57v3c1.94 3.86 5.86 6.36 10.37 6.36z" fill="#34A853"/><path fill="currentColor" d="M6.82 14.23a6.83 6.83 0 0 1 0-4.3l-6.25-3a11.9 11.9 0 0 0 0 10.3l6.25-3z" fill="#FBBC05"/><path fill="currentColor" d="M12.18 5.7c1.48 0 2.82.51 3.87 1.51l2.9-2.9A11.9 11.9 0 0 0 .57 7.32l6.25 3c.42-3.14 2.59-5.83 5.59-6.84z" fill="#EA4335"/></svg>
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-slate-50 bg-white">
        <p className="text-xs text-slate-500">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="font-semibold text-teal-600 hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};
export default Signup;
