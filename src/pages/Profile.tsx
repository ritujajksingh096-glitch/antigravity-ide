import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Bell, Globe, Phone, MessageCircle, LogOut, Cpu, ChevronRight } from 'lucide-react';
import { caregiverInfo } from '../data/dummyData';

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col p-4 space-y-5 overflow-y-auto">
      {/* Header Profile Card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
            alt="Sam Johnson" 
            className="w-20 h-20 rounded-full object-cover border-2 border-teal-500 shadow-md"
          />
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">✓</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-800">Sam Johnson</h3>
          <p className="text-xs text-slate-400 font-medium">sam.johnson@example.com</p>
        </div>

        {/* Badges */}
        <div className="flex justify-center gap-2 pt-1.5 w-full">
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100/50 flex-1">
            Age: 75
          </span>
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100/50 flex-1">
            Meds: 5
          </span>
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100/50 flex-1">
            Adherence: 96%
          </span>
        </div>
      </div>

      {/* Product Device Info */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/50 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
            <Cpu className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Smart Dispenser</h4>
            <p className="text-[10px] text-teal-600 font-bold">Connected • 95% Battery</p>
          </div>
        </div>
        <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/20">
          Model P-4
        </span>
      </div>

      {/* Caregiver Information */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/50 shadow-sm space-y-3">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Caregiver</h4>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={caregiverInfo.avatar} 
              alt={caregiverInfo.name} 
              className="w-10 h-10 rounded-full object-cover border border-slate-100"
            />
            <div>
              <h5 className="text-xs font-bold text-slate-800">{caregiverInfo.name}</h5>
              <p className="text-[10px] text-slate-400 font-medium">{caregiverInfo.relationship}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <a 
              href={`tel:${caregiverInfo.phone}`}
              className="w-8 h-8 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-teal-600 rounded-lg flex items-center justify-center transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button className="w-8 h-8 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-teal-600 rounded-lg flex items-center justify-center transition-colors">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* App Settings Menu */}
      <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden divide-y divide-slate-100">
        <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3 text-slate-700">
            <Bell className="w-4.5 h-4.5 text-slate-400" />
            <span className="text-xs font-bold">Notification Alerts</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>

        <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3 text-slate-700">
            <ShieldCheck className="w-4.5 h-4.5 text-slate-400" />
            <span className="text-xs font-bold">Privacy & Security</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>

        <div className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3 text-slate-700">
            <Globe className="w-4.5 h-4.5 text-slate-400" />
            <span className="text-xs font-bold">Language</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>English</span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-2 pb-6">
        <button 
          onClick={() => navigate('/')}
          className="w-full border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold py-3.5 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
export default Profile;
