import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const OtpVerify: React.FC = () => {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // Auto-focus next input
    if (value !== '' && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && digits[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/signup-success');
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
          <h2 className="text-3xl font-black font-sans leading-tight">Securing Your Healthcare Account</h2>
          <p className="text-sm text-teal-100/80 leading-relaxed font-semibold">
            We send a secure verification code to verify your mobile identity, keeping your medical data locked and confidential.
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

        <div className="space-y-6 pt-4 text-center md:text-left">
          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black font-sans text-teal-900 tracking-tight leading-tight">Verify Code</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-[280px] mx-auto md:mx-0 leading-relaxed font-semibold">
              Enter the 4-digit code sent to your registered mobile number or email address.
            </p>
          </div>

          {/* OTP Input Fields */}
          <form onSubmit={handleVerify} className="space-y-6 max-w-[280px] mx-auto md:mx-0 w-full">
            <div className="flex justify-between gap-3">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 sm:w-14 sm:h-14 border border-slate-200 rounded-2xl text-center text-xl font-bold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
                  required
                />
              ))}
            </div>

            <div className="space-y-4">
              <button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
              >
                Verify
              </button>
              
              <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                Didn't receive the code?{' '}
                <button type="button" className="font-extrabold text-teal-655 hover:underline">
                  Resend Code
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="pb-4" />
      </div>

    </div>
  );
};

export default OtpVerify;
