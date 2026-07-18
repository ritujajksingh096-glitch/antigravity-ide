import React, { useState } from 'react';
import { useNavigate as useNav } from 'react-router-dom';
import { Edit2, RefreshCw, Check, Info, Plus, Trash2, Sliders, X } from 'lucide-react';
import { useAppStore } from '../data/store';
import { Medication } from '../data/dummyData';

export const PrescriptionVerify: React.FC = () => {
  const navigate = useNav();
  const { medications, updateMedication, addMedication, removeMedication } = useAppStore();
  
  // Tab states: 'verify' (interactive SVG) vs 'manual' (add drug form)
  const [activeTab, setActiveTab] = useState<'verify' | 'manual'>('verify');

  // Selected compartment slot for detailed view/mapping
  const [selectedSlot, setSelectedSlot] = useState<string>('A1');

  // Manual medication state
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedTime, setNewMedTime] = useState('08:00 AM');
  const [newMedInstructions, setNewMedInstructions] = useState('');
  const [newMedCategory, setNewMedCategory] = useState('');
  const [newMedSlot, setNewMedSlot] = useState('C1');

  // Coordinate math for 10 compartments arranged in a circular path
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

  // Form submission handler for manual drug entries
  const handleAddManualMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !newMedDosage.trim()) return;

    // Check if slot is already occupied, remove old one if so
    const existing = getMedForSlot(newMedSlot);
    if (existing) {
      removeMedication(existing.id);
    }

    addMedication({
      name: newMedName,
      dosage: newMedDosage,
      time: newMedTime,
      instructions: newMedInstructions || 'Take with water',
      category: newMedCategory || 'General',
      status: 'pending',
      slot: newMedSlot
    });

    // Reset Form Fields
    setNewMedName('');
    setNewMedDosage('');
    setNewMedInstructions('');
    setNewMedCategory('');
    
    // Switch back to verify tab and show the added slot
    setSelectedSlot(newMedSlot);
    setActiveTab('verify');
  };

  // Re-assign slot handler
  const handleReassignSlot = (medId: string, targetSlot: string) => {
    // If target slot is already occupied, clear its mapping first
    const occupied = getMedForSlot(targetSlot);
    if (occupied) {
      updateMedication(occupied.id, { slot: undefined });
    }
    // Update active medication's slot
    updateMedication(medId, { slot: targetSlot });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
      
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-100 bg-white">
        <button 
          onClick={() => setActiveTab('verify')}
          className={`flex-1 py-3 text-center text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'verify' 
              ? 'border-teal-600 text-teal-600' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Dispenser Slot Mapping</span>
        </button>
        <button 
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-3 text-center text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'manual' 
              ? 'border-teal-600 text-teal-600' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Manual Entry Form</span>
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {activeTab === 'verify' ? (
          <>
            {/* Interactive Dispenser Section */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Circular Smart Dispenser (10 Compartments)</span>
              
              {/* Responsive SVG Circular Layout */}
              <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Outer circle casing */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="28" fill="none" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 2" />
                  
                  {/* Center glowing LED core */}
                  <circle cx="50" cy="50" r="14" fill="#0f766e" className="shadow-md" />
                  <circle cx="50" cy="50" r="14" fill="none" stroke="#2dd4bf" strokeWidth="0.8" className="animate-pulse" />
                  <text x="50" y="49" fill="white" fontSize="4.5" fontWeight="bold" textAnchor="middle">
                    PILLMATE
                  </text>
                  <text x="50" y="54" fill="#99f6e4" fontSize="3" fontWeight="bold" textAnchor="middle" letterSpacing="0.2">
                    ACTIVE
                  </text>

                  {/* Lines separating slots for a more technical/hardware blueprint visual */}
                  {compartments.map((comp, idx) => {
                    const angle = (idx * 360) / 10 - 108; // offset to fit in between circles
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
                        strokeWidth="0.5" 
                      />
                    );
                  })}

                  {/* Compartment Circles */}
                  {compartments.map((comp) => {
                    const mappedMed = getMedForSlot(comp.name);
                    const isSelected = selectedSlot === comp.name;
                    const hasMed = !!mappedMed;

                    return (
                      <g 
                        key={comp.name}
                        onClick={() => setSelectedSlot(comp.name)}
                        className="cursor-pointer group"
                      >
                        {/* Circle container */}
                        <circle
                          cx={comp.x}
                          cy={comp.y}
                          r="7.5"
                          fill={isSelected ? '#0d9488' : hasMed ? '#ccfbf1' : '#f8fafc'}
                          stroke={isSelected ? '#0f766e' : hasMed ? '#2dd4bf' : '#cbd5e1'}
                          strokeWidth={isSelected ? '1.5' : '1'}
                          className="transition-all duration-200 hover:scale-105"
                        />
                        {/* Text label */}
                        <text
                          x={comp.x}
                          y={comp.y}
                          fontSize="5"
                          fontWeight="extrabold"
                          fill={isSelected ? '#ffffff' : hasMed ? '#0f766e' : '#64748b'}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {comp.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <p className="text-[10px] text-slate-400 mt-2 text-center leading-normal">
                Click any slot circle to view slot details or manually change mappings.
              </p>
            </div>

            {/* Selected Slot Assignment Management Details */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Compartment</h4>
                  <p className="text-base font-extrabold text-slate-800">Compartment {selectedSlot}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  activeMed 
                    ? 'bg-teal-50 border-teal-100 text-teal-700' 
                    : 'bg-slate-50 border-slate-100 text-slate-400'
                }`}>
                  {activeMed ? 'Occupied' : 'Empty'}
                </span>
              </div>

              {activeMed ? (
                <div className="space-y-4">
                  {/* Active Medication Card */}
                  <div className="flex justify-between items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-slate-800">{activeMed.name} ({activeMed.dosage})</h5>
                      <p className="text-xs text-teal-700 font-semibold">{activeMed.time} • {activeMed.category}</p>
                      <p className="text-[11px] text-slate-400 italic">"{activeMed.instructions}"</p>
                    </div>
                    <button 
                      onClick={() => removeMedication(activeMed.id)}
                      className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all"
                      title="Clear Medication"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Manual Assignment Options */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Move to another slot</label>
                    <div className="flex flex-wrap gap-1.5">
                      {slotNames.map((slot) => {
                        const isOccupied = !!getMedForSlot(slot);
                        if (slot === selectedSlot) return null;
                        return (
                          <button
                            key={slot}
                            onClick={() => {
                              handleReassignSlot(activeMed.id, slot);
                              setSelectedSlot(slot);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                              isOccupied 
                                ? 'bg-amber-50 border-amber-100 text-amber-600' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600'
                            }`}
                            title={isOccupied ? 'Swap allocation slot' : 'Move to slot'}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <p className="text-xs text-slate-400 font-medium">No medication mapped to slot {selectedSlot}.</p>
                  
                  {/* Select medication to map dropdown list */}
                  {medications.filter(m => !m.slot).length > 0 ? (
                    <div className="space-y-2 max-w-[280px] mx-auto">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assign unmapped medication:</label>
                      <div className="flex flex-col gap-2">
                        {medications.filter(m => !m.slot).map(m => (
                          <button
                            key={m.id}
                            onClick={() => updateMedication(m.id, { slot: selectedSlot })}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all"
                          >
                            Map {m.name} ({m.dosage})
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setNewMedSlot(selectedSlot);
                        setActiveTab('manual');
                      }}
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Manually Add Medication</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Manual Medication Addition Form */
          <form onSubmit={handleAddManualMed} className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100">Add Medication Manually</h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Medicine Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Paracetamol"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dosage</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 500mg"
                    value={newMedDosage}
                    onChange={(e) => setNewMedDosage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500 bg-slate-50/50"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time</label>
                  <select
                    value={newMedTime}
                    onChange={(e) => setNewMedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  >
                    <option value="08:00 AM">08:00 AM (Morning)</option>
                    <option value="10:30 AM">10:30 AM (Midmorning)</option>
                    <option value="01:00 PM">01:00 PM (Afternoon)</option>
                    <option value="08:00 PM">08:00 PM (Evening)</option>
                    <option value="09:00 PM">09:00 PM (Bedtime)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Category</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Painkiller"
                    value={newMedCategory}
                    onChange={(e) => setNewMedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dispenser Slot</label>
                  <select
                    value={newMedSlot}
                    onChange={(e) => setNewMedSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  >
                    {slotNames.map(slot => (
                      <option key={slot} value={slot}>Slot {slot} {getMedForSlot(slot) ? '(Occupied)' : '(Empty)'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Instructions</label>
                <input 
                  type="text" 
                  placeholder="e.g. Take with water before food"
                  value={newMedInstructions}
                  onChange={(e) => setNewMedInstructions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-teal-500 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('verify')}
                className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold py-2.5 rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-teal-100"
              >
                Add & Assign Slot
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Confirm or Rescan Actions */}
      <div className="p-4 bg-white border-t border-slate-100 space-y-3 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Confirm Layout & Schedule</span>
        </button>

        {activeTab === 'verify' && (
          <button 
            onClick={() => navigate('/prescription/camera')} 
            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-slate-400" />
            <span>Rescan Prescription</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PrescriptionVerify;
