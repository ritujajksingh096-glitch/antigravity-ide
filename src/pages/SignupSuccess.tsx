import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export const SignupSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 bg-white overflow-y-auto no-scrollbar">
      <div className="w-full max-w-sm text-center space-y-8 my-auto">
        <div className="space-y-4">
          {/* Checkmark */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 shadow-sm border border-teal-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black font-sans text-teal-900 tracking-tight leading-tight">
              Account Created Successfully!
            </h2>
            <p className="text-sm text-slate-500 max-w-[290px] mx-auto leading-relaxed font-semibold">
              Welcome to Pillmate! Let's set up your profile and link your health tracking devices.
            </p>
          </div>
        </div>

        <div>
          <button 
            onClick={() => navigate('/user-type')} 
            className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100/50 transition-all text-sm"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignupSuccess;
