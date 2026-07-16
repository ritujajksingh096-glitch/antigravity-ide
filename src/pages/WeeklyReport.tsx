import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Clock, Battery, Pill, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { adherenceData, activityLogs } from '../data/dummyData';

export const WeeklyReport: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col p-4 space-y-5 overflow-y-auto">
      {/* Weekly Adherence Chart */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Weekly Performance</span>
          <h3 className="text-sm font-bold text-slate-800 mt-0.5">Medication Adherence</h3>
        </div>

        {/* Bar Chart Mock */}
        <div className="h-32 flex items-end justify-between gap-1.5 pt-4">
          {adherenceData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1 space-y-2">
              <span className="text-[9px] font-bold text-slate-500">{data.percentage}%</span>
              <div className="w-full relative rounded-t-md overflow-hidden bg-slate-100 flex flex-col justify-end" style={{ height: '70px' }}>
                <div 
                  className={`w-full rounded-t-md transition-all duration-500 ${
                    data.percentage === 100 
                      ? 'bg-teal-600' 
                      : data.percentage >= 90 
                        ? 'bg-teal-500' 
                        : 'bg-teal-400'
                  }`} 
                  style={{ height: `${data.percentage}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-slate-400">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Stats Block */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Missed Doses */}
        <div className="bg-white p-4 rounded-2xl border border-red-100/50 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <ShieldAlert className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400">Missed Doses</span>
            <p className="text-lg font-extrabold text-red-600 leading-none mt-1">2</p>
          </div>
        </div>

        {/* Taken Late */}
        <div className="bg-white p-4 rounded-2xl border border-amber-100/50 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Clock className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400">Taken Late</span>
            <p className="text-lg font-extrabold text-amber-600 leading-none mt-1">3</p>
          </div>
        </div>

        {/* Dispenser Status */}
        <div className="bg-white p-4 rounded-2xl border border-teal-100/50 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
            <Battery className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400">Dispenser</span>
            <p className="text-lg font-extrabold text-teal-700 leading-none mt-1">95%</p>
          </div>
        </div>

        {/* Total Medications */}
        <div className="bg-white p-4 rounded-2xl border border-purple-100/50 shadow-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <Pill className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400">Meds Loaded</span>
            <p className="text-lg font-extrabold text-purple-700 leading-none mt-1">8</p>
          </div>
        </div>
      </div>

      {/* Recent Logs Timeline */}
      <div className="space-y-3 flex-1">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Activity Logs</h4>
          <span className="text-xs text-teal-600 font-bold hover:underline cursor-pointer">View History</span>
        </div>

        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div 
              key={log.id} 
              className="p-4 rounded-2xl border border-slate-200/50 bg-white shadow-sm flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  log.status === 'taken' 
                    ? 'bg-teal-50 text-teal-600' 
                    : log.status === 'late' 
                      ? 'bg-amber-50 text-amber-600' 
                      : 'bg-red-50 text-red-500'
                }`}>
                  {log.status === 'taken' ? (
                    <CheckCircle className="w-4.5 h-4.5" />
                  ) : log.status === 'late' ? (
                    <Clock className="w-4.5 h-4.5" />
                  ) : (
                    <AlertCircle className="w-4.5 h-4.5" />
                  )}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-800">{log.medicationName}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">{log.time} • {log.dosage}</p>
                </div>
              </div>

              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                log.status === 'taken' 
                  ? 'bg-teal-50 border-teal-100/50 text-teal-600' 
                  : log.status === 'late' 
                    ? 'bg-amber-50 border-amber-100/50 text-amber-600' 
                    : 'bg-red-50 border-red-100/50 text-red-500'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default WeeklyReport;
