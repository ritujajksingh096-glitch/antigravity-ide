import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search as SearchIcon, Check, Pill, ChevronRight, Mic, Calendar, Info } from 'lucide-react';
import { initialMedications, Medication } from '../data/dummyData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState<Medication[]>(initialMedications);

  const toggleStatus = (id: string) => {
    const updated = medications.map(med => {
      if (med.id === id) {
        const nextStatus = med.status === 'taken' ? 'pending' : 'taken';
        if (nextStatus === 'taken') {
          // If taken, navigate to Medicine Taken success screen
          setTimeout(() => navigate('/medicine-taken'), 300);
        }
        return {
          ...med,
          status: nextStatus,
          timeTaken: nextStatus === 'taken' ? '09:41 AM' : undefined
        };
      }
      return med;
    });
    setMedications(updated);
  };

  // Find next pending medication
  const nextMed = medications.find(m => m.status === 'pending') || medications[0];

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4">
      {/* Search Header Bar */}
      <div 
        onClick={() => navigate('/search')}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/60 rounded-2xl cursor-pointer text-slate-400 hover:text-slate-500 shadow-sm"
      >
        <SearchIcon className="w-4 h-4 text-slate-400" />
        <span className="text-xs font-medium">Search medication or patients...</span>
      </div>

      {/* Next Dose Banner */}
      {nextMed && (
        <div className="bg-teal-900 text-white p-5 rounded-3xl shadow-lg relative overflow-hidden border border-teal-800">
          {/* Background circles for decorative Figma look */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-teal-800/40" />
          <div className="absolute right-12 -top-12 w-24 h-24 rounded-full bg-teal-800/30" />

          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300">Next Medication</span>
                <h3 className="text-xl font-bold font-sans mt-0.5">{nextMed.name}</h3>
                <p className="text-xs text-teal-100/90 mt-0.5">{nextMed.dosage} • {nextMed.instructions}</p>
              </div>
              <div className="bg-teal-800/80 p-2 rounded-xl border border-teal-700/50">
                <Pill className="w-5 h-5 text-teal-200" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-teal-800/50">
              <div className="flex items-center gap-1.5 text-xs text-teal-200 font-medium">
                <Calendar className="w-4 h-4" />
                <span>Today at {nextMed.time}</span>
              </div>
              <button 
                onClick={() => toggleStatus(nextMed.id)}
                className="bg-white hover:bg-teal-50 text-teal-900 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                Take Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Section Header */}
      <div className="flex justify-between items-center px-1">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Schedule</h4>
        <span className="text-xs text-teal-600 font-bold">4 Medications</span>
      </div>

      {/* Schedule Timeline List */}
      <div className="space-y-3">
        {medications.map((med) => (
          <div 
            key={med.id}
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
              med.status === 'taken'
                ? 'bg-teal-50/20 border-teal-100'
                : 'bg-white border-slate-200/50 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3.5">
              {/* Custom Status Checkbox */}
              <button 
                onClick={() => toggleStatus(med.id)}
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  med.status === 'taken'
                    ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-100'
                    : 'border-slate-300 bg-white hover:border-teal-500'
                }`}
              >
                {med.status === 'taken' && <Check className="w-4 h-4" />}
              </button>

              {/* Medication Info */}
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className={`text-sm font-bold ${
                    med.status === 'taken' ? 'text-slate-500 line-through' : 'text-slate-800'
                  }`}>
                    {med.name}
                  </h5>
                  <span className="text-[10px] font-semibold text-slate-400">({med.dosage})</span>
                </div>
                
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <span>{med.time}</span>
                  <span>•</span>
                  <span>{med.instructions}</span>
                </div>
              </div>
            </div>

            {/* Taken Timestamp or Details Chevron */}
            <div>
              {med.status === 'taken' ? (
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md border border-teal-100/50">
                  Taken {med.timeTaken}
                </span>
              ) : (
                <Link to="/prescription/verify" className="text-slate-300 hover:text-slate-500 transition-colors p-1">
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Voice Assistant Banner */}
      <div 
        onClick={() => navigate('/voice-assistant')}
        className="mt-auto bg-slate-950 text-white p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-900 transition-all shadow-md border border-slate-850"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center text-white">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold">Voice Assistant Active</h5>
            <p className="text-[10px] text-slate-400">"Hey Pillmate, did I take my Lisinopril?"</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping" />
          <span className="text-[10px] font-bold text-teal-400">Speak</span>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
