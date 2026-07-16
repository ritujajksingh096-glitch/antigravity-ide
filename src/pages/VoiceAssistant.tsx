import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';

export const VoiceAssistant: React.FC = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(true);

  // Audio wave bars
  const waveBars = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-950 text-white overflow-hidden">
      {/* Top Description */}
      <div className="text-center pt-4 space-y-1">
        <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">Pillmate Audio Link</span>
        <h3 className="text-lg font-bold">Voice Assistant</h3>
        <p className="text-xs text-slate-400">Listening to your command...</p>
      </div>

      {/* Center Circle Mic & State Card */}
      <div className="my-auto flex flex-col items-center space-y-6">
        <button 
          onClick={() => navigate('/voice-verified')}
          className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 relative ${
            isListening 
              ? 'bg-teal-600/20 border-2 border-teal-500 shadow-2xl shadow-teal-500/20' 
              : 'bg-slate-900 border-2 border-slate-800'
          }`}
        >
          {/* Wave Ripple Ring */}
          {isListening && (
            <div className="absolute inset-0 rounded-full border border-teal-500/40 animate-ping" />
          )}
          
          <div className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-lg">
            <Mic className="w-8 h-8" />
          </div>
        </button>

        {/* Current Active Context Card */}
        <div className="w-full max-w-[280px] bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
          <div className="flex justify-center text-teal-400">
            <Volume2 className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Medication</span>
          <h4 className="text-sm font-bold text-slate-100">Lisinopril (10mg)</h4>
          <p className="text-[10px] text-slate-500">Taken: 08:00 AM • Next: 08:00 PM</p>
        </div>
      </div>

      {/* Waveform Visualizer & Action Trigger */}
      <div className="space-y-6 pb-6 text-center">
        {/* Simple Flexbox Audio Waveform with animation */}
        <div className="h-10 flex items-center justify-center gap-1.5 px-4 select-none">
          {waveBars.map((bar) => {
            // Random static heights or animations
            const heights = ['h-3', 'h-6', 'h-8', 'h-10', 'h-5', 'h-9', 'h-4', 'h-7', 'h-2'];
            const randomHeight = heights[(bar + 3) % heights.length];
            return (
              <div 
                key={bar} 
                className={`w-1 bg-teal-500 rounded-full transition-all duration-300 ${randomHeight} ${
                  isListening ? 'animate-pulse' : 'opacity-30'
                }`} 
              />
            );
          })}
        </div>

        <button 
          onClick={() => navigate('/voice-verified')} 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-900/30 transition-all text-sm flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4.5 h-4.5" />
          <span>Verify Voice ID</span>
        </button>
      </div>
    </div>
  );
};
export default VoiceAssistant;
