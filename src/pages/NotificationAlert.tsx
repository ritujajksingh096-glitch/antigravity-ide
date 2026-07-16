import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Phone, MapPin, Check, X, ClipboardList } from 'lucide-react';

export const NotificationAlert: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6 bg-white overflow-y-auto">
      {/* Red Warning Card */}
      <div className="bg-red-50 border border-red-100 p-5 rounded-3xl space-y-4 text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shadow-sm">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[9px] uppercase font-bold tracking-wider text-red-500">Adherence Warning</span>
          <h3 className="text-base font-bold text-red-950">Missed Dose Alert!</h3>
          <p className="text-xs text-red-700/80 max-w-[260px] mx-auto leading-relaxed">
            <strong>Lisinopril (10mg)</strong> was scheduled for today at 08:00 AM. Please mark your status below.
          </p>
        </div>

        {/* Take / Skip Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={() => navigate('/medicine-taken')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md shadow-teal-700/10 flex items-center justify-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Take Now</span>
          </button>

          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white border border-red-200 hover:bg-red-50/50 text-red-600 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all"
          >
            <X className="w-4 h-4" />
            <span>Skip Dose</span>
          </button>
        </div>
      </div>

      {/* Preferred Pharmacy Card */}
      <div className="bg-slate-50/60 p-5 rounded-3xl border border-slate-200/50 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Preferred Pharmacy</h4>
            <p className="text-[10px] text-slate-400">Refill status and phone info</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-3">
          <div>
            <h5 className="text-xs font-bold text-slate-800">Walgreens Pharmacy</h5>
            <p className="text-[10px] text-teal-600 font-bold mt-0.5">2 Refills Remaining</p>
          </div>

          <div className="flex flex-col gap-2 pt-1 border-t border-slate-50 text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>1200 Pine St, San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>(555) 012-3456</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            alert('Refill order submitted successfully!');
            navigate('/dashboard');
          }}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-2xl transition-all text-xs"
        >
          Order Refill Now
        </button>
      </div>
    </div>
  );
};
export default NotificationAlert;
