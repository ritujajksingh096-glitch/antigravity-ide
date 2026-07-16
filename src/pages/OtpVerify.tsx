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
    // Simulate OTP verification and redirect to Success Screen
    navigate('/signup-success');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white">
      <div className="space-y-8 pt-6 text-center">
        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">Verify Code</h2>
          <p className="text-xs text-slate-500 max-w-[260px] mx-auto leading-relaxed">
            Enter the 4-digit code sent to your registered mobile number or email address.
          </p>
        </div>

        {/* OTP Input Fields */}
        <form onSubmit={handleVerify} className="space-y-8 max-w-[280px] mx-auto">
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
                className="w-14 h-14 border border-slate-200 rounded-2xl text-center text-xl font-bold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all shadow-sm"
                required
              />
            ))}
          </div>

          <div className="space-y-6">
            <button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
            >
              Verify
            </button>
            
            <p className="text-xs text-slate-400">
              Didn't receive the code?{' '}
              <button type="button" className="font-semibold text-teal-600 hover:underline">
                Resend Code
              </button>
            </p>
          </div>
        </form>
      </div>

      <div className="pb-4" />
    </div>
  );
};
export default OtpVerify;
