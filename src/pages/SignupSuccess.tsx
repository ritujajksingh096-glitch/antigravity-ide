import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export const SignupSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white">
      <div className="text-center pt-8 space-y-2">
        {/* Checkmark */}
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold font-sans text-teal-900 tracking-tight px-4">
          Account Created Successfully!
        </h2>
        <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed">
          Welcome to Pillmate! Let's set up your profile and link your health tracking devices.
        </p>
      </div>

      {/* Illustration Card */}
      <div className="my-auto py-4 flex justify-center">
        <div className="w-full max-w-[280px] aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?w=600" 
            alt="Welcome to Pillmate" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="pb-6">
        <button 
          onClick={() => navigate('/user-type')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
export default SignupSuccess;
