import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, FileText } from 'lucide-react';

export const PrescriptionAdd: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white">
      <div className="space-y-6 pt-4 text-center sm:text-left">
        <div className="space-y-2">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Scan Prescription</p>
          <h2 className="text-xl font-bold font-sans text-slate-900 tracking-tight">Upload Medical Documents</h2>
          <p className="text-xs text-slate-500 max-w-[280px] sm:max-w-none mx-auto sm:mx-0 leading-relaxed">
            Our intelligent AI scanner will instantly analyze and schedule your medications.
          </p>
        </div>

        {/* Dashed Drag/Upload Area */}
        <div 
          onClick={() => navigate('/prescription/camera')}
          className="border-2 border-dashed border-slate-200 hover:border-teal-500 rounded-3xl p-8 cursor-pointer transition-all bg-slate-50/40 hover:bg-teal-50/10 flex flex-col items-center justify-center space-y-3"
        >
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner">
            <Upload className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-800">Drag & Drop prescription</span>
            <p className="text-[10px] text-slate-400">Supports PDF, JPG, PNG up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Upload and Capture Options */}
      <div className="space-y-3 pb-6">
        <button 
          onClick={() => navigate('/prescription/camera')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload from Gallery</span>
        </button>

        <button 
          onClick={() => navigate('/prescription/camera')} 
          className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4 text-slate-500" />
          <span>Take Photo</span>
        </button>

        <button 
          onClick={() => navigate('/prescription/camera')} 
          className="w-full text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors block text-center pt-2"
        >
          Scan Paper Document Instead
        </button>
      </div>
    </div>
  );
};
export default PrescriptionAdd;
