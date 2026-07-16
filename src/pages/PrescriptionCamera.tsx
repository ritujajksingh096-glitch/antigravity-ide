import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, RefreshCw } from 'lucide-react';

export const PrescriptionCamera: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-900 text-white relative">
      {/* Top Banner overlay */}
      <div className="text-center pt-4 z-10 space-y-1">
        <h3 className="text-sm font-bold tracking-tight">Scan Paper Prescription</h3>
        <p className="text-[10px] text-slate-400">Position the prescription inside the frame</p>
      </div>

      {/* Camera Capture Area View */}
      <div className="relative my-auto flex items-center justify-center">
        {/* Mock prescription handwritten text card */}
        <div className="w-full max-w-[280px] aspect-[4/5] bg-stone-50 text-slate-800 p-5 rounded-2xl border-4 border-teal-500 shadow-xl relative overflow-hidden flex flex-col justify-between">
          
          {/* Laser scanning line animation effect */}
          <div className="absolute left-0 w-full h-1 bg-teal-500/80 shadow-md shadow-teal-300 top-1/3 animate-pulse" />

          {/* Dummy OCR text mockup */}
          <div className="space-y-4 font-serif text-[10px] opacity-75">
            <div className="border-b border-stone-200 pb-2 flex justify-between">
              <div>
                <p className="font-bold uppercase text-[8px] text-stone-400">Clinic Name</p>
                <p className="font-bold">HEALTHCARE ASSOCIATES</p>
              </div>
              <p className="text-right">Date: 12/06/2026</p>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-[8px] text-stone-400 uppercase">Prescriptions:</p>
              <div className="space-y-1 border-l-2 border-teal-600/30 pl-2">
                <p className="font-bold">1. Lisinopril 10mg</p>
                <p className="text-[9px] italic text-stone-500">Take 1 tablet daily by mouth in morning.</p>
              </div>
              <div className="space-y-1 border-l-2 border-teal-600/30 pl-2">
                <p className="font-bold">2. Metformin 500mg</p>
                <p className="text-[9px] italic text-stone-500">Take 1 tablet daily with dinner.</p>
              </div>
              <div className="space-y-1 border-l-2 border-teal-600/30 pl-2">
                <p className="font-bold">3. Atorvastatin 20mg</p>
                <p className="text-[9px] italic text-stone-500">Take 1 tablet daily at bedtime.</p>
              </div>
            </div>

            <div className="text-[7px] text-slate-400 pt-4 flex justify-between">
              <span>Signature: Dr. Alistair</span>
              <span>Refills: 2</span>
            </div>
          </div>
        </div>

        {/* Scan Frame Corners Overlay */}
        <div className="absolute top-0 left-4 w-6 h-6 border-t-4 border-l-4 border-teal-500 rounded-tl-lg" />
        <div className="absolute top-0 right-4 w-6 h-6 border-t-4 border-r-4 border-teal-500 rounded-tr-lg" />
        <div className="absolute bottom-0 left-4 w-6 h-6 border-b-4 border-l-4 border-teal-500 rounded-bl-lg" />
        <div className="absolute bottom-0 right-4 w-6 h-6 border-b-4 border-r-4 border-teal-500 rounded-br-lg" />
      </div>

      {/* Scanner Action Buttons */}
      <div className="space-y-4 pb-6 z-10">
        <button 
          onClick={() => navigate('/prescription/success')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-900/40 transition-all text-sm flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4" />
          <span>Capture & Scan</span>
        </button>

        <div className="flex justify-between items-center px-2">
          <button 
            onClick={() => navigate('/prescription/add')} 
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          
          <button 
            onClick={() => navigate('/prescription/success')} 
            className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Auto Scan Gallery</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default PrescriptionCamera;
