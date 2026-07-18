import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Clock, Battery, Pill, CheckCircle2, AlertCircle, HelpCircle, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../data/store';
import { adherenceData } from '../data/dummyData';

export const WeeklyReport: React.FC = () => {
  const navigate = useNavigate();
  const { medications, activityLogs, isDispenserConnected } = useAppStore();

  // Calculate dynamic stats
  const missedCount = activityLogs.filter(log => log.status === 'missed').length;
  const lateCount = activityLogs.filter(log => log.status === 'late').length;
  const totalMeds = medications.length;

  // Adherence average calculation
  const totalLogs = activityLogs.length;
  const takenLogs = activityLogs.filter(log => log.status === 'taken' || log.status === 'late').length;
  const calculatedAdherence = totalLogs > 0 ? Math.round((takenLogs / totalLogs) * 100) : 95;

  return (
    <div className="space-y-6">
      
      {/* Responsive Grid Layout for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (lg:col-span-2): Adherence Chart & Activity Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Adherence Chart Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Weekly Performance</span>
                <h3 className="text-sm font-extrabold text-slate-800 mt-0.5">Medication Adherence</h3>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100/50">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+{calculatedAdherence - 90 > 0 ? calculatedAdherence - 90 : 4}% improvement</span>
              </div>
            </div>

            {/* Bar Chart Graphics */}
            <div className="h-36 flex items-end justify-between gap-2.5 pt-4">
              {adherenceData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 space-y-2">
                  <span className="text-[9px] font-extrabold text-slate-500">{data.percentage}%</span>
                  <div className="w-full relative rounded-t-lg overflow-hidden bg-slate-50 flex flex-col justify-end h-20 border border-slate-100/30">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-700 ease-out ${
                        data.percentage === 100 
                          ? 'bg-teal-600' 
                          : data.percentage >= 90 
                            ? 'bg-teal-500' 
                            : 'bg-teal-400/80'
                      }`} 
                      style={{ height: `${data.percentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Log Lists */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Activity Logs</h4>
              <span className="text-xs text-teal-600 font-extrabold hover:underline cursor-pointer">Export History</span>
            </div>

            <div className="space-y-3">
              {activityLogs.length > 0 ? (
                activityLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="p-3.5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all flex justify-between items-center shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        log.status === 'taken' 
                          ? 'bg-teal-50 text-teal-600' 
                          : log.status === 'late' 
                            ? 'bg-amber-50 text-amber-600' 
                            : 'bg-red-50 text-red-500'
                      }`}>
                        {log.status === 'taken' ? (
                          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                        ) : log.status === 'late' ? (
                          <Clock className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                      </div>
                      <div className="text-left">
                        <h5 className="text-xs font-bold text-slate-800">{log.medicationName}</h5>
                        <p className="text-[10px] text-slate-400 mt-0.5">{log.time} • {log.dosage}</p>
                      </div>
                    </div>

                    <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                      log.status === 'taken' 
                        ? 'bg-teal-50 border-teal-100/50 text-teal-600' 
                        : log.status === 'late' 
                          ? 'bg-amber-50 border-amber-100/50 text-amber-600' 
                          : 'bg-red-50 border-red-100/50 text-red-500'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 space-y-2">
                  <Pill className="w-8 h-8 text-slate-200 mx-auto" />
                  <p className="text-xs text-slate-400 font-medium">No activity logged yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-1): Dynamic Grid Stats block */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 block lg:hidden">Adherence Metrics</h4>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* Missed Doses widget */}
            <div className="bg-white p-4.5 rounded-2xl border border-red-100 bg-red-50/10 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Missed Doses</span>
                <p className="text-xl font-black text-red-600 leading-none mt-1">{missedCount}</p>
              </div>
            </div>

            {/* Taken Late widget */}
            <div className="bg-white p-4.5 rounded-2xl border border-amber-100 bg-amber-50/10 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Taken Late</span>
                <p className="text-xl font-black text-amber-600 leading-none mt-1">{lateCount}</p>
              </div>
            </div>

            {/* Smart Dispenser Status widget */}
            <div className="bg-white p-4.5 rounded-2xl border border-teal-100 bg-teal-50/10 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                <Battery className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Dispenser Box</span>
                <p className="text-xl font-black text-teal-700 leading-none mt-1">
                  {isDispenserConnected ? '95%' : 'Offline'}
                </p>
              </div>
            </div>

            {/* Total Meds widget */}
            <div className="bg-white p-4.5 rounded-2xl border border-purple-100 bg-purple-50/10 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Pill className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Meds Loaded</span>
                <p className="text-xl font-black text-purple-700 leading-none mt-1">{totalMeds}</p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeeklyReport;
