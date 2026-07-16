import React, { useState } from 'react';
import { useNavigate } from 'react-serif'; // wait React Router is standard
import { useNavigate as useNav } from 'react-router-dom';
import { Edit2, RefreshCw, Check, Info } from 'lucide-react';

export const PrescriptionVerify: React.FC = () => {
  const navigate = useNav();
  
  // Compartment highlight states
  const [activeCompartment, setActiveCompartment] = useState<number | null>(1);

  // Parsed medications
  const [meds, setMeds] = useState([
    { id: 1, name: 'Lisinopril', dosage: '10mg', slot: 'Slots 1, 3', frequency: 'Twice daily (8am, 8pm)', instructions: 'Take with water' },
    { id: 2, name: 'Metformin', dosage: '500mg', slot: 'Slot 2', frequency: 'Once daily (1pm)', instructions: 'Take with food' },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', slot: 'Slot 4', frequency: 'Once daily (9pm)', instructions: 'Before bedtime' }
  ]);

  // Coordinates for compartments arranged in a circle
  // 8 slots
  const compartments = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 360) / 8;
    const x = 50 + 38 * Math.cos((angle * Math.PI) / 180);
    const y = 50 + 38 * Math.sin((angle * Math.PI) / 180);
    return { id: i + 1, x, y };
  });

  return (
    <div className="flex-1 flex flex-col p-4 space-y-5 bg-white overflow-y-auto">
      {/* Circular Dispenser Diagram Mock */}
      <div className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Compartment Mapping</span>
        
        {/* Interactive SVGs Layout */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Outer ring */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            
            {/* Center Core */}
            <circle cx="50" cy="50" r="16" fill="#115e59" className="shadow-sm" />
            <text x="50" y="52" fill="white" fontSize="5" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" className="transform rotate-90 origin-center">
              Active
            </text>

            {/* Compartment Circles */}
            {compartments.map((comp) => {
              const isAssigned = [1, 2, 3, 4].includes(comp.id);
              const isSelected = activeCompartment === comp.id;

              return (
                <g 
                  key={comp.id}
                  onClick={() => setActiveCompartment(comp.id)}
                  className="cursor-pointer transition-all duration-200"
                >
                  <circle
                    cx={comp.x}
                    cy={comp.y}
                    r="8"
                    fill={isSelected ? '#0d9488' : isAssigned ? '#ccfbf1' : '#f1f5f9'}
                    stroke={isSelected ? '#0f766e' : isAssigned ? '#99f6e4' : '#cbd5e1'}
                    strokeWidth="1"
                  />
                  <text
                    x={comp.x}
                    y={comp.y}
                    fontSize="6"
                    fontWeight="bold"
                    fill={isSelected ? 'white' : isAssigned ? '#0f766e' : '#64748b'}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="transform rotate-90 origin-center"
                  >
                    {comp.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        
        <p className="text-[10px] text-slate-400 mt-3 font-medium flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-teal-600" />
          <span>Tap numbered compartments to check layout assignments.</span>
        </p>
      </div>

      {/* Medication List Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Extracted Schedule</h4>
        
        <div className="space-y-3">
          {meds.map((med) => {
            const isHighlighted = activeCompartment !== null && med.slot.includes(activeCompartment.toString());
            return (
              <div 
                key={med.id} 
                className={`p-4 rounded-2xl border transition-all ${
                  isHighlighted 
                    ? 'border-teal-500 bg-teal-50/10 shadow-sm' 
                    : 'border-slate-200/50 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">{med.name} ({med.dosage})</h5>
                    <p className="text-[10px] font-bold text-teal-600 mt-0.5">{med.frequency}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{med.instructions} • {med.slot}</p>
                  </div>
                  <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm or Rescan Actions */}
      <div className="space-y-3 pb-6">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Confirm Layout & Schedule</span>
        </button>

        <button 
          onClick={() => navigate('/prescription/camera')} 
          className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4 text-slate-400" />
          <span>Rescan Prescription</span>
        </button>
      </div>
    </div>
  );
};
export default PrescriptionVerify;
