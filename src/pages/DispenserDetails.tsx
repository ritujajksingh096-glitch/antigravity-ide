import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Battery, Wifi, Cpu, Layers, CheckCircle2, AlertCircle, Info, Clock, Play, Bell, Zap, Pill, ChevronRight } from 'lucide-react';
import { useAppStore } from '../data/store';

export const DispenserDetails: React.FC = () => {
  const navigate = useNavigate();
  const { medications, isDispenserConnected } = useAppStore();
  const [selectedSlot, setSelectedSlot] = useState<string>('A1');
  const [testDispenseStatus, setTestDispenseStatus] = useState<string | null>(null);

  // 10 compartments arranged in a circular path (math match with PrescriptionVerify)
  const slotNames = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2'];
  const compartments = slotNames.map((name, index) => {
    // Offset by -90 deg so A1 starts at the absolute top (12 o'clock)
    const angle = (index * 360) / 10 - 90;
    const x = 50 + 36 * Math.cos((angle * Math.PI) / 180);
    const y = 50 + 36 * Math.sin((angle * Math.PI) / 180);
    return { name, x, y };
  });

  // Find medication assigned to a specific slot name
  const getMedForSlot = (slotName: string) => {
    return medications.find(m => m.slot === slotName);
  };

  const activeMed = getMedForSlot(selectedSlot);

  // Simulated test dispense blink
  const handleTestDispense = (slotName: string) => {
    setTestDispenseStatus(`Blinking LED on Slot ${slotName}...`);
    setTimeout(() => {
      setTestDispenseStatus(`Dispensing pill from Slot ${slotName} (Simulation)...`);
    }, 1500);
    setTimeout(() => {
      setTestDispenseStatus(`Dispense Test Successful!`);
    }, 3500);
    setTimeout(() => {
      setTestDispenseStatus(null);
    }, 5500);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. DEVICE HARDWARE STATUS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Connection status */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-4 text-left">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isDispenserConnected ? 'bg-teal-50 text-teal-600' : 'bg-rose-50 text-rose-500'
          }`}>
            <Wifi className="w-5.5 h-5.5" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Connection</span>
            <span className="text-xs font-black text-slate-800 block">
              {isDispenserConnected ? 'Connected' : 'Disconnected'}
            </span>
            <span className="text-[10px] text-teal-655 font-semibold">WiFi Link (Strong)</span>
          </div>
        </div>

        {/* Battery status */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Battery className="w-5.5 h-5.5 text-teal-600" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Battery Status</span>
            <span className="text-xs font-black text-slate-800 block">95% Remaining</span>
            <span className="text-[10px] text-teal-655 font-semibold">Healthy (AC Paired)</span>
          </div>
        </div>

        {/* Trays Loaded */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Layers className="w-5.5 h-5.5" />
          </div>
          <div className="text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Trays Setup</span>
            <span className="text-xs font-black text-slate-800 block">
              {medications.filter(m => m.slot).length} Trays Loaded
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">10 Slots Total Available</span>
          </div>
        </div>

      </div>

      {/* 2. SPLIT INTERACTIVE DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Interactive Circular Display */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-left w-full">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Circular Compartment Layout</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Click any compartment slot to inspect its medication contents.</p>
          </div>

          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Outer Casing */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="2" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 2" />
              
              {/* Center Core */}
              <circle cx="50" cy="50" r="14" fill="#0d9488" className="shadow-md" />
              <circle cx="50" cy="50" r="14" fill="none" stroke="#2dd4bf" strokeWidth="1" className="animate-pulse" />
              <text x="50" y="49" fill="white" fontSize="4.2" fontWeight="black" textAnchor="middle">
                PILLMATE
              </text>
              <text x="50" y="54" fill="#ccfbf1" fontSize="3" fontWeight="bold" textAnchor="middle" letterSpacing="0.2">
                ACTIVE
              </text>

              {/* Separators */}
              {compartments.map((comp, idx) => {
                const angle = (idx * 360) / 10 - 108;
                const x2 = 50 + 44 * Math.cos((angle * Math.PI) / 180);
                const y2 = 50 + 44 * Math.sin((angle * Math.PI) / 180);
                return (
                  <line 
                    key={idx} 
                    x1="50" 
                    y1="50" 
                    x2={x2} 
                    y2={y2} 
                    stroke="#f1f5f9" 
                    strokeWidth="0.75" 
                  />
                );
              })}

              {/* Compartment clickable buttons */}
              {compartments.map((comp) => {
                const isSelected = selectedSlot === comp.name;
                const mappedMed = getMedForSlot(comp.name);
                
                // Color schemes: loaded vs empty vs selected
                let circleColor = '#f8fafc';
                let strokeColor = '#cbd5e1';
                let textColor = '#64748b';

                if (mappedMed) {
                  circleColor = '#ccfbf1';
                  strokeColor = '#0d9488';
                  textColor = '#0f766e';
                }

                if (isSelected) {
                  circleColor = '#0d9488';
                  strokeColor = '#0f766e';
                  textColor = '#ffffff';
                }

                return (
                  <g 
                    key={comp.name} 
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedSlot(comp.name)}
                  >
                    <circle 
                      cx={comp.x} 
                      cy={comp.y} 
                      r="6.5" 
                      fill={circleColor} 
                      stroke={strokeColor} 
                      strokeWidth={isSelected ? '1.5' : '0.75'}
                    />
                    <text 
                      x={comp.x} 
                      y={comp.y + 1.5} 
                      fill={textColor} 
                      fontSize="4.5" 
                      fontWeight="black" 
                      textAnchor="middle"
                    >
                      {comp.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Slot Information Details */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col justify-between space-y-4 text-left">
          <div className="space-y-4">
            
            {/* Slot Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div className="text-left">
                <span className="text-[10px] font-black text-teal-600 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                  Compartment {selectedSlot}
                </span>
                <h3 className="text-base font-extrabold text-slate-800 mt-2">
                  {activeMed ? 'Dosage Loaded' : 'Empty Compartment'}
                </h3>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${activeMed ? 'bg-emerald-500 font-bold' : 'bg-slate-350'}`} />
            </div>

            {/* Slot Contents Card details */}
            {activeMed ? (
              <div className="space-y-3.5 text-left">
                
                {/* Medicine Title */}
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Medication</label>
                  <span className="text-sm font-black text-slate-800">{activeMed.name} ({activeMed.dosage})</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Schedule</label>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {activeMed.time}
                    </span>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Category</label>
                    <span className="text-xs font-bold text-slate-700 block mt-0.5">{activeMed.category || 'General'}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Instructions</label>
                  <span className="text-xs font-semibold text-slate-500 block mt-0.5">{activeMed.instructions}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100/50 flex items-center gap-2.5 mt-2">
                  <Info className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="text-[10px] font-semibold text-slate-500 leading-normal">
                    This slot will rotate and blink when it is time to take this dose.
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 space-y-2 flex-grow flex flex-col justify-center items-center">
                <Info className="w-8 h-8 text-slate-350" />
                <p className="text-xs font-semibold max-w-[200px] leading-relaxed">
                  No medication is assigned to slot {selectedSlot}. 
                </p>
                <button 
                  onClick={() => navigate('/prescription/verify')}
                  className="mt-2 text-[10px] font-extrabold text-teal-600 hover:text-teal-700 bg-teal-50 border border-teal-100 hover:bg-teal-100/50 px-3 py-1.5 rounded-xl transition-all"
                >
                  Configure Tray Mapping
                </button>
              </div>
            )}
          </div>

          {/* Dispenser Commands test panel */}
          {activeMed && (
            <div className="border-t border-slate-100 pt-4 space-y-3">
              {testDispenseStatus && (
                <div className="bg-teal-50 border border-teal-100 text-[10px] font-bold text-teal-850 px-3 py-2 rounded-xl text-left flex items-center gap-2 animate-pulse">
                  <Zap className="w-3.5 h-3.5 text-teal-600 animate-bounce" />
                  <span>{testDispenseStatus}</span>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleTestDispense(selectedSlot)}
                  disabled={!!testDispenseStatus}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 active:scale-95 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Test Cycle Slot</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 3. LIST OF ALL COMPARTMENTS (SECTION DETAIL GRID) */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider text-left">Dispenser Sections & Loaded Medicines</h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {slotNames.map((name) => {
            const med = getMedForSlot(name);
            const isSelected = selectedSlot === name;

            return (
              <div 
                key={name}
                onClick={() => setSelectedSlot(name)}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-teal-600 bg-teal-50/20 shadow-sm scale-[1.01]' 
                    : 'border-slate-100 hover:border-slate-350 bg-slate-50/20 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase">{name}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${med ? 'bg-teal-500' : 'bg-slate-300'}`} />
                </div>
                <div className="mt-2 min-w-0">
                  <h5 className="text-xs font-extrabold text-slate-800 truncate">
                    {med ? med.name : 'Empty'}
                  </h5>
                  <p className="text-[9px] font-semibold text-slate-400 mt-0.5 truncate">
                    {med ? `${med.dosage} • ${med.time}` : 'Available'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default DispenserDetails;
