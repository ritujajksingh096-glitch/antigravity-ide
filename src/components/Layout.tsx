import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Plus, MessageSquare, BarChart3, User, Battery, Wifi, Signal, Bell, ArrowLeft, Cpu, Menu } from 'lucide-react';
import { useAppStore } from '../data/store';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDispenserConnected, patientProfile } = useAppStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const path = location.pathname;

  // Determine if this path should show navigation bars
  const showNav = [
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

  // Determine if this is an onboarding or auth page
  const isOnboardingOrAuth = [
    '/',
    '/login',
    '/signup',
    '/otp-verify',
    '/signup-success',
    '/user-type',
    '/device-connect',
    '/patient-profile'
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

  const navItems = [
    { to: '/dashboard', label: 'Today\'s Schedule', icon: Home, activePath: '/dashboard' },
    { to: '/prescription/add', label: 'Add Prescription', icon: Plus, activePath: '/prescription' },
    { to: '/ai-chat', label: 'Ask AI Assistant', icon: MessageSquare, activePath: '/ai-chat' },
    { to: '/weekly-report', label: 'Weekly Analytics', icon: BarChart3, activePath: '/weekly-report' },
    { to: '/profile', label: 'Profile Settings', icon: User, activePath: '/profile' }
  ];

  const isWelcomeScreen = ['/'].includes(path);

  // For onboarding/auth, present a clean full screen page
  if (isOnboardingOrAuth) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-white overflow-y-auto">
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* 1. COLLAPSIBLE LEFT SIDEBAR NAVIGATION (Desktop Only: md and up) */}
      {showNav && (
        <aside className={`hidden md:flex flex-col bg-white border-r border-slate-200/60 p-5 fixed h-screen z-30 justify-between transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}>
          <div className="space-y-6">
            {/* Logo area with Toggle menu Button */}
            <div className={`flex items-center justify-between px-1 ${isCollapsed ? 'flex-col gap-5' : ''}`}>
              {!isCollapsed ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-teal-100">
                    P
                  </div>
                  <div className="text-left">
                    <span className="text-base font-black text-teal-800 tracking-tight block leading-none">Pillmate</span>
                    <span className="text-[9px] font-bold text-teal-600/70 tracking-wider uppercase block mt-1">Smart Companion</span>
                  </div>
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-teal-100">
                  P
                </div>
              )}
              
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Nav Links */}
            <nav className="space-y-1.5 pt-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = path.startsWith(item.activePath);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center transition-all ${
                      isCollapsed 
                        ? 'justify-center w-10 h-10 mx-auto rounded-xl' 
                        : 'gap-3 px-3.5 py-3 rounded-2xl'
                    } text-xs font-bold ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-100/50'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Device connectivity footer */}
          <div className={`bg-slate-50 border border-slate-100 rounded-2xl transition-all ${
            isCollapsed ? 'p-2 flex justify-center' : 'p-4 space-y-2'
          }`}>
            {isCollapsed ? (
              <div className="relative">
                <Cpu className="w-5.5 h-5.5 text-teal-600" />
                <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-white ${
                  isDispenserConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                }`} />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Cpu className="w-4 h-4 text-teal-600" />
                  <span>Smart Dispenser</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isDispenserConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                    {isDispenserConnected ? 'Connected' : 'Offline'}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-slate-700">
                    <span>95%</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </aside>
      )}

      {/* 2. MAIN CONTAINER WITH TRANSITION */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        showNav ? (isCollapsed ? 'md:pl-20' : 'md:pl-64') : ''
      }`}>
        
        {/* Dynamic App Header */}
        {!isWelcomeScreen && (
          <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200/40 bg-white sticky top-0 z-20">
            <div className="flex items-center gap-3">
              {hasBackButton && (
                <button 
                  onClick={() => navigate(-1)} 
                  className="p-1 rounded-lg hover:bg-slate-50 text-slate-655 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-base md:text-lg font-extrabold text-slate-900 leading-none">
                {getPageTitle()}
              </h1>
            </div>
            
            {path === '/dashboard' && (
              <div className="flex items-center gap-3">
                <Link to="/notification-alert" className="p-2 relative text-slate-600 hover:bg-slate-50 rounded-full transition-all border border-slate-100">
                  <Bell className="w-4.5 h-4.5 text-slate-655" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                </Link>
                <Link to="/profile" className="flex items-center gap-2">
                  <img 
                    src={patientProfile.avatar} 
                    alt="Profile" 
                    className="w-7 h-7 rounded-full border border-slate-200 object-cover"
                  />
                  <span className="hidden sm:inline text-xs font-bold text-slate-700">{patientProfile.name}</span>
                </Link>
              </div>
            )}
          </header>
        )}

        {/* Content Viewport Wrapper */}
        <main className="flex-grow overflow-y-auto bg-slate-50 p-5 sm:p-8 md:p-10 pb-24 md:pb-10 flex flex-col no-scrollbar">
          <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col">
            {children}
          </div>
        </main>

        {/* 3. MOBILE BOTTOM TAB NAVIGATION (Mobile Only: hidden on md and up) */}
        {showNav && (
          <nav className="md:hidden bg-white border-t border-slate-100 px-6 py-2.5 flex justify-between items-center fixed bottom-0 left-0 w-full z-30 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = path.startsWith(item.activePath);
              return (
                <Link 
                  key={item.to}
                  to={item.to} 
                  className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                    isActive ? 'text-teal-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span className="text-[9px]">
                    {item.to === '/dashboard' ? 'Today' : item.to === '/prescription/add' ? 'Add Rx' : item.to === '/ai-chat' ? 'AI Chat' : item.to === '/weekly-report' ? 'Summary' : 'Profile'}
                  </span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Layout;
