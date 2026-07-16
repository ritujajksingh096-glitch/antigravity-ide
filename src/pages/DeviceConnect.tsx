import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Settings } from 'lucide-react';

export const DeviceConnect: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<'pillbox' | 'dispenser'>('pillbox');

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white">
      <div className="space-y-6 pt-4">
        {/* Title Block */}
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold font-sans text-slate-900 tracking-tight">Connect Your Device</h2>
          <p className="text-sm text-slate-500">
            Connect your Pillmate tracking dispenser to get automatic schedule sync.
          </p>
        </div>

        {/* Device Selection Stack */}
        <div className="space-y-4 pt-4">
          <div 
            onClick={() => setSelectedDevice('pillbox')}
            className={`p-5 rounded-2xl border-2 cursor-pointer flex gap-4 items-center transition-all text-left ${
              selectedDevice === 'pillbox' 
                ? 'border-teal-600 bg-teal-50/30' 
                : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              selectedDevice === 'pillbox' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <Box className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800">Smart Pillbox</h3>
              <p className="text-xs text-slate-400 mt-0.5">Bluetooth, automatic tracking of compartments open/close.</p>
            </div>
          </div>

          <div 
            onClick={() => setSelectedDevice('dispenser')}
            className={`p-5 rounded-2xl border-2 cursor-pointer flex gap-4 items-center transition-all text-left ${
              selectedDevice === 'dispenser' 
                ? 'border-teal-600 bg-teal-50/30' 
                : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              selectedDevice === 'dispenser' ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <Settings className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800">Automatic Dispenser</h3>
              <p className="text-xs text-slate-400 mt-0.5">WiFi-enabled, automatic dose dispensing and tracking notifications.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pb-6">
        <button 
          onClick={() => navigate('/patient-profile')} 
          className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-100 transition-all text-sm"
        >
          Continue
        </button>

        <button 
          onClick={() => navigate('/patient-profile')} 
          className="w-full text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors block text-center"
        >
          Skip Device Connection
        </button>
      </div>
    </div>
  );
};
export default DeviceConnect;
