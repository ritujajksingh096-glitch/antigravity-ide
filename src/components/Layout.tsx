import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Plus, MessageSquare, BarChart3, User, Battery, Wifi, Signal, Bell, ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  // Determine if this path should show the bottom navigation bar
  // The bottom navigation bar appears on the main tabs: dashboard, prescription-add, weekly-report, ai-chat, profile
  const showBottomNav = [
    '/dashboard',
    '/prescription/add',
    '/weekly-report',
    '/ai-chat',
    '/profile'
  ].includes(path);

  // Determine header navigation based on current page
  const hasBackButton = ![
    '/',
    '/dashboard',
    '/signup-success',
    '/weekly-report',
    '/profile'
  ].includes(path);

  const getPageTitle = () => {
    switch (path) {
      case '/dashboard': return "Today's Schedule";
      case '/prescription/add': return "Add Prescription";
      case '/prescription/camera': return "Add Prescription";
      case '/prescription/success': return "Prescription Uploaded";
      case '/prescription/verify': return "Verify Prescription";
      case '/weekly-report': return "Weekly Analytics";
      case '/ai-chat': return "Ask Pillmate AI";
      case '/voice-assistant': return "Voice Assistant";
      case '/voice-verified': return "Voice Verified";
      case '/profile': return "Profile";
      case '/notification-alert': return "Adherence Alert";
      case '/search': return "Search";
      case '/medicine-taken': return "Medicine Taken";
      case '/login': return "Log In";
      case '/signup': return "Create Account";
      case '/otp-verify': return "Verify Code";
      case '/user-type': return "Who will be using Pillmate?";
      case '/device-connect': return "Connect Your Device";
      case '/patient-profile': return "Add Patient Profile";
      default: return "";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-0 sm:p-4">
      {/* Device Wrapper for pixel perfect preview */}
      <div className="relative w-full max-w-[420px] h-screen sm:h-[840px] bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden border border-slate-200/50 flex flex-col">
        
        {/* Device Status Bar */}
        <div className="bg-white px-6 pt-3 pb-2 flex justify-between items-center text-xs font-semibold text-slate-800 z-50 select-none">
          <span>09:41 AM</span>
          
          {/* Top Notch for Desktop Devices */}
          <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-2 w-32 h-5 bg-slate-900 rounded-b-xl z-50" />

          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Dynamic App Header (if not onboarding main screens) */}
        {!['/', '/signup-success'].includes(path) && (
          <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              {hasBackButton && (
                <button 
                  onClick={() => navigate(-1)} 
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-xl font-bold font-sans text-slate-900 leading-none">
                {getPageTitle()}
              </h1>
            </div>
            
            {path === '/dashboard' && (
              <div className="flex items-center gap-2">
                <Link to="/notification-alert" className="p-1.5 relative text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                </Link>
                <Link to="/profile">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                  />
                </Link>
              </div>
            )}
          </header>
        )}

        {/* Screen Content Panel */}
        <main className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
          {children}
        </main>

        {/* Bottom Tab Navigation */}
        {showBottomNav && (
          <nav className="bg-white border-t border-slate-100 px-6 py-2 flex justify-between items-center z-50">
            <Link 
              to="/dashboard" 
              className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                path === '/dashboard' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-medium">Today</span>
            </Link>

            <Link 
              to="/prescription/add" 
              className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                path.startsWith('/prescription') ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span className="text-[10px] font-medium">Add Rx</span>
            </Link>

            <Link 
              to="/ai-chat" 
              className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                path === '/ai-chat' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-[10px] font-medium">AI Chat</span>
            </Link>

            <Link 
              to="/weekly-report" 
              className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                path === '/weekly-report' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-[10px] font-medium">Summary</span>
            </Link>

            <Link 
              to="/profile" 
              className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                path === '/profile' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] font-medium">Profile</span>
            </Link>
          </nav>
        )}

        {/* Simulated iOS Home Indicator Line */}
        <div className="bg-white py-1.5 flex justify-center items-center select-none z-50">
          <div className="w-28 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
