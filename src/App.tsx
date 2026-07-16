import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';

// Import Pages
import OnboardingWelcome from './pages/OnboardingWelcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OtpVerify from './pages/OtpVerify';
import SignupSuccess from './pages/SignupSuccess';
import UserTypeSelection from './pages/UserTypeSelection';
import DeviceConnect from './pages/DeviceConnect';
import PatientProfileAdd from './pages/PatientProfileAdd';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import MedicineTaken from './pages/MedicineTaken';
import PrescriptionAdd from './pages/PrescriptionAdd';
import PrescriptionCamera from './pages/PrescriptionCamera';
import PrescriptionSuccess from './pages/PrescriptionSuccess';
import PrescriptionVerify from './pages/PrescriptionVerify';
import WeeklyReport from './pages/WeeklyReport';
import AIChat from './pages/AIChat';
import VoiceAssistant from './pages/VoiceAssistant';
import VoiceVerified from './pages/VoiceVerified';
import Profile from './pages/Profile';
import NotificationAlert from './pages/NotificationAlert';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Welcome and Auth */}
          <Route path="/" element={<OnboardingWelcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
          
          {/* Onboarding Wizard */}
          <Route path="/user-type" element={<UserTypeSelection />} />
          <Route path="/device-connect" element={<DeviceConnect />} />
          <Route path="/patient-profile" element={<PatientProfileAdd />} />

          {/* Main App */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/medicine-taken" element={<MedicineTaken />} />

          {/* Prescription Scans */}
          <Route path="/prescription/add" element={<PrescriptionAdd />} />
          <Route path="/prescription/camera" element={<PrescriptionCamera />} />
          <Route path="/prescription/success" element={<PrescriptionSuccess />} />
          <Route path="/prescription/verify" element={<PrescriptionVerify />} />

          {/* Reports, Chats and Assistants */}
          <Route path="/weekly-report" element={<WeeklyReport />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/voice-verified" element={<VoiceVerified />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification-alert" element={<NotificationAlert />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
