import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ArrowLeft, UserPlus, Heart } from 'lucide-react';
import { mockPatients } from '../data/dummyData';

export const Search: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filteredResults = mockPatients.filter(patient => 
    patient.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col p-4 bg-white space-y-4">
      {/* Search Input Bar */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-slate-600 hover:bg-slate-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
          <SearchIcon className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search patient, caregiver..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs font-semibold text-slate-700 outline-none placeholder-slate-400"
            autoFocus
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4 pt-2">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Results</h4>
        
        {filteredResults.length > 0 ? (
          <div className="space-y-3">
            {filteredResults.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">{item.name}</h5>
                    <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100/50">
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-xl shadow-sm transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Connect</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-2">
            <Heart className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
