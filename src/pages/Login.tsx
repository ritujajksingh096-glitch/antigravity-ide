import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and navigate to Who is using screen
    navigate('/user-type');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white">
      <div className="space-y-6 pt-4">
        {/* Title Block */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">Log In</h2>
          <p className="text-sm text-slate-500">Welcome back! Access your personalized health tracker.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Email or Mobile Number</label>
            <input 
              type="text" 
              placeholder="Enter email or mobile number" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all bg-slate-50/50"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-600">Password</label>
              <button type="button" className="text-xs text-teal-600 hover:underline">Forgot?</button>
            </div>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all bg-slate-50/50"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm mt-2"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">Or log in with</span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* Quick Email Login option */}
        <button 
          onClick={() => navigate('/user-type')} 
          className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
        >
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="text-center pb-4">
        <p className="text-xs text-slate-500">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="font-semibold text-teal-600 hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
export default Login;
