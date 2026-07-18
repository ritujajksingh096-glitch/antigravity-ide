import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search as SearchIcon, Check, Pill, ChevronRight, Mic, Calendar, BellRing, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../data/store';
import { Medication } from '../data/dummyData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { medications, toggleMedicationStatus, caregiver, patientProfile, isDispenserConnected } = useAppStore();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [countdown, setCountdown] = useState("00:42:12");

  // Simulate countdown ticking
  useEffect(() => {
    const timer = setInterval(() => {
      const parts = countdown.split(':').map(Number);
      let seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (seconds > 0) {
        seconds--;
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        setCountdown(`${h}:${m}:${s}`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleToggle = (id: string, isChecked: boolean) => {
    toggleMedicationStatus(id);
    if (!isChecked) {
      // If was pending and now marked taken, navigate to Medicine Taken success screen
      setTimeout(() => navigate('/medicine-taken'), 300);
    }
  };

  // Find next pending medication
  const nextMed = medications.find(m => m.status === 'pending') || medications[0];

  // Helper to categorize medications by schedule timing
  const getGroupedMeds = () => {
    const morning: Medication[] = [];
    const afternoon: Medication[] = [];
    const evening: Medication[] = [];
    
    medications.forEach(m => {
      const timeLower = m.time.toLowerCase();
      if (timeLower.includes('am') || timeLower.includes('8:') || timeLower.includes('10:')) {
        morning.push(m);
      } else if (timeLower.includes('12:') || timeLower.includes('1:') || timeLower.includes('2:') || timeLower.includes('3:')) {
        afternoon.push(m);
      } else {
        evening.push(m);
      }
    });

    return { morning, afternoon, evening };
  };

  const { morning, afternoon, evening } = getGroupedMeds();

  const handleRequestHelp = () => {
    setShowHelpModal(true);
  };

  return (
    <div className="space-y-6">
      
      {/* 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left/Main Column: Search and Timeline Schedule */}
        <div className="lg:col-span-2 space-y-5">
          {/* Search Header Bar */}
          <div 
            onClick={() => navigate('/search')}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200/60 rounded-2xl cursor-pointer text-slate-400 hover:text-slate-500 shadow-sm transition-all hover:border-slate-300"
          >
            <SearchIcon className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold">Search medications, medical records, or contacts...</span>
          </div>

          {/* Today's Schedule Timeline Grouped */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Schedule</h4>
              <span className="text-xs text-teal-600 font-extrabold bg-teal-50 px-2.5 py-1 rounded-md">
                {medications.length} Medications Loaded
              </span>
            </div>

            {/* Timeline Sections */}
            <div className="space-y-6 relative border-l-2 border-slate-100 pl-4 ml-3">
              
              {/* Morning Section */}
              {morning.length > 0 && (
                <div className="space-y-3 relative">
                  <div className="absolute -left-[21px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-sm" />
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Morning Schedule</h5>
                  
                  <div className="space-y-2.5">
                    {morning.map(med => (
                      <TimelineItem 
                        key={med.id} 
                        med={med} 
                        onToggle={() => handleToggle(med.id, med.status === 'taken')} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Afternoon Section */}
              {afternoon.length > 0 && (
                <div className="space-y-3 relative pt-1">
                  <div className="absolute -left-[21px] top-2.5 w-3.5 h-3.5 rounded-full bg-teal-500 border-2 border-white shadow-sm" />
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Afternoon Schedule</h5>
                  
                  <div className="space-y-2.5">
                    {afternoon.map(med => (
                      <TimelineItem 
                        key={med.id} 
                        med={med} 
                        onToggle={() => handleToggle(med.id, med.status === 'taken')} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Evening Section */}
              {evening.length > 0 && (
                <div className="space-y-3 relative pt-1">
                  <div className="absolute -left-[21px] top-2.5 w-3.5 h-3.5 rounded-full bg-indigo-500 border-2 border-white shadow-sm" />
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Evening Schedule</h5>
                  
                  <div className="space-y-2.5">
                    {evening.map(med => (
                      <TimelineItem 
                        key={med.id} 
                        med={med} 
                        onToggle={() => handleToggle(med.id, med.status === 'taken')} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Caregiver Link/Emergency Box */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={caregiver.avatar} 
                  alt={caregiver.name} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="text-left">
                  <h6 className="text-xs font-bold text-slate-800">{caregiver.name}</h6>
                  <p className="text-[10px] text-slate-400 font-semibold">{caregiver.relationship} • Active Caregiver</p>
                </div>
              </div>

              <button 
                onClick={handleRequestHelp}
                className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-bold text-xs py-2.5 px-5 rounded-2xl transition-all shadow-md shadow-rose-100 flex items-center justify-center gap-1.5"
              >
                <BellRing className="w-4 h-4" />
                <span>Request Help</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right/Secondary Column: Next Medication Banner & Side Widgets */}
        <div className="space-y-5">
          {/* Next Dose Banner Card */}
          {nextMed && (
            <div className="bg-teal-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden border border-teal-950 flex flex-col justify-between h-48">
              {/* Background circles for decorative Figma look */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-teal-800/40 pointer-events-none" />
              <div className="absolute right-12 -top-12 w-24 h-24 rounded-full bg-teal-800/30 pointer-events-none" />

              <div className="relative z-10 space-y-1">
                <span className="text-[9px] uppercase font-extrabold tracking-widest text-teal-300">Next Medication</span>
                <h3 className="text-xl font-extrabold font-sans mt-0.5 leading-none">{nextMed.name}</h3>
                <p className="text-xs text-teal-100/90 font-medium pt-0.5">{nextMed.dosage} • {nextMed.instructions}</p>
              </div>

              <div className="relative z-10 flex items-end justify-between border-t border-teal-800/50 pt-3">
                <div className="space-y-0.5 text-left">
                  <span className="text-[9px] text-teal-300 font-bold uppercase tracking-wider block">Dispensing In</span>
                  <div className="flex items-center gap-1.5 text-sm font-black text-white">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <span>{countdown}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleToggle(nextMed.id, nextMed.status === 'taken')}
                  className="bg-white hover:bg-teal-50 text-teal-900 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  Take Now
                </button>
              </div>
            </div>
          )}

          {/* Quick Dispenser Connection Summary */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Device Status</span>
                <h5 className="text-xs font-bold text-slate-800">Smart Dispenser Box</h5>
                <p className="text-[10px] text-teal-600 font-bold">{isDispenserConnected ? 'WiFi Linked • 95% Battery' : 'Not Connected'}</p>
              </div>
            </div>
            <Link to="/profile" className="text-slate-300 hover:text-slate-500 transition-colors p-1">
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Floating Voice Assistant Banner */}
          <div 
            onClick={() => navigate('/voice-assistant')}
            className="bg-gradient-to-r from-teal-950 via-slate-955 to-teal-955 text-white p-5 rounded-[24px] flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-all shadow-lg border border-teal-500/10 shadow-teal-950/10"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 bg-teal-500/15 border border-teal-500/30 rounded-2xl flex items-center justify-center text-teal-400 flex-shrink-0 relative shadow-inner">
                <div className="absolute inset-0 rounded-2xl bg-teal-500/10 animate-ping opacity-60 pointer-events-none" />
                <Mic className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest block leading-none">Voice Assistant Active</span>
                <p className="text-sm font-extrabold text-white mt-1 leading-tight tracking-wide italic truncate">
                  "Hey Pillmate, did I take my Metformin?"
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest">Speak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Request Help Modal Overlay */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-scale space-y-4">
            <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-800">Help Request Sent!</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                An urgent notification has been broadcast to your primary caregiver, <strong>{caregiver.name} ({caregiver.phone})</strong>. They have been alerted to check in on you immediately.
              </p>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setShowHelpModal(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all shadow-sm"
              >
                Dismiss Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface TimelineItemProps {
  med: Medication;
  onToggle: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ med, onToggle }) => {
  const isTaken = med.status === 'taken';

  return (
    <div 
      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
        isTaken
          ? 'bg-teal-50/20 border-teal-100/60 shadow-sm'
          : 'bg-white border-slate-200/50 hover:border-slate-300'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox Trigger */}
        <button 
          onClick={onToggle}
          className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center transition-all ${
            isTaken
              ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-100'
              : 'border-slate-300 bg-white hover:border-teal-500'
          }`}
        >
          {isTaken && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Text Details */}
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <h6 className={`text-xs font-bold ${
              isTaken ? 'text-slate-400 line-through' : 'text-slate-800'
            }`}>
              {med.name}
            </h6>
            <span className="text-[9px] font-bold text-slate-400">({med.dosage})</span>
            {med.slot && (
              <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded border leading-none ${
                isTaken ? 'bg-slate-50 border-slate-100 text-slate-400' : 'bg-teal-50 border-teal-100/30 text-teal-700'
              }`}>
                Slot {med.slot}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5 font-medium">
            <span>{med.time}</span>
            <span>•</span>
            <span>{med.instructions}</span>
          </div>
        </div>
      </div>

      <div>
        {isTaken ? (
          <span className="text-[9px] font-extrabold text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100/40">
            Taken {med.timeTaken}
          </span>
        ) : (
          <Link to="/prescription/verify" className="text-slate-300 hover:text-slate-500 transition-colors p-1">
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
