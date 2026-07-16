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
    // Navigate to Dashboard
    navigate('/dashboard');
  };

  const availableConditions = ['Diabetes', 'Hypertension', 'Heart Condition', 'Asthma', 'Arthritis'];

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">Add Patient Profile</h2>
          <p className="text-xs text-slate-500">Provide medical context to personalize schedule suggestions.</p>
        </div>

        {/* Profile Picture Upload Mock */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden">
              <User className="w-12 h-12" />
            </div>
            <button type="button" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-teal-600 border-2 border-white text-white flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600">Full Name</label>
            <input 
              type="text" 
              placeholder="Sam Johnson" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all bg-slate-50/50"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Gender</label>
              <select 
                value={gender} 
                onChange={(e: any) => setGender(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 bg-slate-50/50"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Birth Year</label>
              <input 
                type="number" 
                placeholder="1951" 
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all bg-slate-50/50"
                required
              />
            </div>
          </div>

          {/* Medical Conditions Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 block">Medical Conditions (Optional)</label>
            <div className="flex flex-wrap gap-2">
              {availableConditions.map(condition => (
                <button
                  type="button"
                  key={condition}
                  onClick={() => toggleCondition(condition)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    conditions.includes(condition) 
                      ? 'border-teal-600 bg-teal-50 text-teal-700' 
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
export default PatientProfileAdd;
