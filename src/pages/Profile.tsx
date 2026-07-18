import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Bell, Globe, Phone, MessageCircle, LogOut, Cpu, ChevronRight, Moon, User2, Mail, Calendar, HelpCircle, Save, Edit2 } from 'lucide-react';
import { useAppStore } from '../data/store';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { 
    patientProfile, 
    caregiver, 
    medications, 
    activityLogs, 
    isDispenserConnected, 
    settings, 
    updateSettings, 
    updatePatientProfile 
  } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);
  
  // Local edit states
  const [name, setName] = useState(patientProfile.name);
  const [birthYear, setBirthYear] = useState(patientProfile.birthYear);
  const [weight, setWeight] = useState(patientProfile.weight);
  const [height, setHeight] = useState(patientProfile.height);

  // Stats calculation
  const totalMeds = medications.length;
  const currentYear = new Date().getFullYear();
  const calculatedAge = currentYear - parseInt(birthYear || '1951');

  const totalLogs = activityLogs.length;
  const takenLogs = activityLogs.filter(log => log.status === 'taken' || log.status === 'late').length;
  const adherenceRate = totalLogs > 0 ? Math.round((takenLogs / totalLogs) * 100) : 96;

  const handleSave = () => {
    updatePatientProfile({
      name,
      birthYear,
      weight,
      height
    });
    setIsEditing(false);
  };

  const toggleDarkMode = () => {
    const isDark = !settings.darkMode;
    updateSettings({ darkMode: isDark });
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Responsive layout: 2-columns on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (md:col-span-1): Profile Card & Caregiver Info */}
        <div className="space-y-5">
          
          {/* Patient Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <img 
                src={patientProfile.avatar} 
                alt={patientProfile.name} 
                className="w-20 h-20 rounded-full object-cover border-2 border-teal-500 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">✓</span>
            </div>

            <div className="space-y-1 w-full px-2">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-center text-sm font-bold border border-slate-200 rounded-xl px-2 py-1 focus:outline-none focus:border-teal-500 bg-slate-50/50"
                  />
                  <div className="flex gap-2 text-[10px]">
                    <div className="flex-1">
                      <label className="text-slate-400 font-bold block">Birth Year</label>
                      <input
                        type="text"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        className="w-full text-center border border-slate-200 rounded-lg p-0.5 bg-slate-50/50"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-slate-400 font-bold block">Weight</label>
                      <input
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full text-center border border-slate-200 rounded-lg p-0.5 bg-slate-50/50"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleSave}
                    className="mt-2 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-1.5">
                    <h3 className="text-base font-extrabold text-slate-800">{patientProfile.name}</h3>
                    <button 
                      onClick={() => setIsEditing(true)} 
                      className="p-1 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-teal-600 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold">sam.johnson@example.com</p>
                </>
              )}
            </div>

            {/* Badges Metrics */}
            <div className="flex justify-center gap-2 pt-1 w-full">
              <div className="text-center bg-teal-50/40 border border-teal-100/30 p-2 rounded-2xl flex-1">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Age</span>
                <span className="text-xs font-black text-teal-700">{calculatedAge}</span>
              </div>
              <div className="text-center bg-teal-50/40 border border-teal-100/30 p-2 rounded-2xl flex-1">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Meds</span>
                <span className="text-xs font-black text-teal-700">{totalMeds}</span>
              </div>
              <div className="text-center bg-teal-50/40 border border-teal-100/30 p-2 rounded-2xl flex-1">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">Adherence</span>
                <span className="text-xs font-black text-teal-700">{adherenceRate}%</span>
              </div>
            </div>
          </div>

          {/* Primary Caregiver Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-left">Primary Caregiver</h4>
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img 
                  src={caregiver.avatar} 
                  alt={caregiver.name} 
                  className="w-11 h-11 rounded-full object-cover border border-slate-100 flex-shrink-0"
                />
                <div className="text-left min-w-0 flex-1">
                  <h5 className="text-xs font-bold text-slate-800 truncate">{caregiver.name}</h5>
                  <p className="text-[10px] text-slate-400 font-semibold truncate">{caregiver.relationship}</p>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <a 
                  href={`tel:${caregiver.phone}`}
                  className="w-8 h-8 bg-slate-50 border border-slate-200/50 hover:bg-slate-100 text-teal-600 rounded-xl flex items-center justify-center transition-all shadow-sm"
                  title="Call Caregiver"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => alert(`Chatting with ${caregiver.name} is simulated.`)}
                  className="w-8 h-8 bg-slate-50 border border-slate-200/50 hover:bg-slate-100 text-teal-600 rounded-xl flex items-center justify-center transition-all shadow-sm"
                  title="Message Caregiver"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (md:col-span-2): Settings Toggles & Device Metadata */}
        <div className="md:col-span-2 space-y-5">
          
          {/* Smart Dispenser Device Details Card */}
          <div className="bg-white p-4.5 rounded-3xl border border-slate-200/50 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shadow-inner">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-800">Smart Dispenser Hardware</h4>
                <p className="text-[10px] text-teal-600 font-bold">
                  {isDispenserConnected ? 'Connected • 95% Battery Status' : 'Offline Mode'}
                </p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/20">
              Model P-4 (Dispenser)
            </span>
          </div>

          {/* Interactive Settings Menu */}
          <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden divide-y divide-slate-100">
            
            {/* Toggle 1: Notifications */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3.5 text-slate-700">
                <Bell className="w-5 h-5 text-slate-400" />
                <div className="text-left">
                  <span className="text-xs font-bold block text-slate-800">Notification Alerts</span>
                  <span className="text-[9px] text-slate-400 block font-medium">Daily pill alarms & refill reminders</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={settings.notifications} 
                  onChange={(e) => updateSettings({ notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>

            {/* Toggle 2: Dark Mode */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3.5 text-slate-700">
                <Moon className="w-5 h-5 text-slate-400" />
                <div className="text-left">
                  <span className="text-xs font-bold block text-slate-800">Dark Theme Mode</span>
                  <span className="text-[9px] text-slate-400 block font-medium">Switch between screen appearance themes</span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={settings.darkMode} 
                  onChange={toggleDarkMode}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>

            {/* Selector 3: Language */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3.5 text-slate-700">
                <Globe className="w-5 h-5 text-slate-400" />
                <div className="text-left">
                  <span className="text-xs font-bold block text-slate-800">App Language</span>
                  <span className="text-[9px] text-slate-400 block font-medium">Select primary translation interface</span>
                </div>
              </div>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-teal-500"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Marathi">Marathi (मराठी)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
              </select>
            </div>

            {/* Privacy Section */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer transition-colors" onClick={() => navigate('/voice-assistant')}>
              <div className="flex items-center gap-3.5 text-slate-700">
                <ShieldCheck className="w-5 h-5 text-slate-400" />
                <div className="text-left">
                  <span className="text-xs font-bold block text-slate-800">Voice Print & Security</span>
                  <span className="text-[9px] text-slate-400 block font-medium">Configure vocal security authorization</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>

          </div>

          {/* Logout Action */}
          <div className="pt-2">
            <button 
              onClick={() => {
                if (window.confirm("Are you sure you want to log out?")) {
                  navigate('/');
                }
              }}
              className="w-full border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold py-3.5 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span>Log Out Account</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
