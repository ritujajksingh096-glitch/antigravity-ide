import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users } from 'lucide-react';

export const UserTypeSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'patient' | 'caregiver'>('patient');

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white">
      <div className="space-y-6 pt-4">
        {/* Title */}
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">
            Who will be using Pillmate?
          </h2>
          <p className="text-sm text-slate-500">
            Choose the option that describes your primary role.
          </p>
        </div>

        {/* Options Stack */}
        <div className="space-y-4 pt-4">
          {/* Patient Card */}
          <div 
            onClick={() => setSelectedType('patient')}
            className={`p-5 rounded-2xl border-2 cursor-pointer flex gap-4 items-center transition-all ${
              selectedType === 'patient' 
                ? 'border-teal-600 bg-teal-50/30' 
                : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              selectedType === 'patient' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-bold text-slate-800">Patient</h3>
              <p className="text-xs text-slate-400 mt-0.5">I am tracking my own medications and health routines.</p>
            </div>
          </div>

          {/* Caregiver Card */}
          <div 
            onClick={() => setSelectedType('caregiver')}
            className={`p-5 rounded-2xl border-2 cursor-pointer flex gap-4 items-center transition-all ${
              selectedType === 'caregiver' 
                ? 'border-teal-600 bg-teal-50/30' 
                : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              selectedType === 'caregiver' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-bold text-slate-800">Caregiver</h3>
              <p className="text-xs text-slate-400 mt-0.5">I am tracking medications for a family member or patient.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-6">
        <button 
          onClick={() => navigate('/device-connect')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
export default UserTypeSelection;
