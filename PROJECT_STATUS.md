# PillMate Project Status

This document provides an overview of the current state of the PillMate frontend mockup application. Since this is currently a frontend-only mockup, the focus is on UI presentation, interactive transitions, and local mock states.

---

## 🚀 Completed Features

1. **Onboarding & Authentication Flow**
   - **Launch Screen (`OnboardingWelcome.tsx`)**: High-fidelity welcome page prompting login or account setup.
   - **Sign Up / Log In (`Signup.tsx`, `Login.tsx`)**: User credentials entries with quick Google/Apple single sign-on buttons.
   - **OTP Verification (`OtpVerify.tsx`)**: 4-digit code entry with auto-focus inputs and resend timers.
   - **User Role & Device Setup (`UserTypeSelection.tsx`, `DeviceConnect.tsx`)**: Prompts user roles (Patient/Caregiver) and paired hardware choices (Smart Pillbox / Automatic Dispenser).
   - **Patient Medical Profile (`PatientProfileAdd.tsx`)**: Form for entering name, gender, birth year, and choosing evolutionary tags for conditions (Diabetes, Hypertension, Heart Condition, etc.).

2. **Main Application Interface**
   - **Device Shell Frame (`Layout.tsx`)**: Encases all screen content in an interactive mobile phone container (complete with status indicators, back button, bottom navigation, and home swipe bar).
   - **Today's Schedule (`Dashboard.tsx`)**: Chronological daily list of pills (taken vs pending checks) with visual alerts highlighting upcoming doses.

3. **Prescription Scanner & Mapping**
   - **File Uploader (`PrescriptionAdd.tsx`)**: Drag-and-drop file interface for loading prescriptions.
   - **Camera Simulator (`PrescriptionCamera.tsx`)**: Emulates viewfinder scanning with live laser animations and overlay guidelines.
   - **Interactive Slot Allocator (`PrescriptionVerify.tsx`)**: Generates an interactive SVG representing an 8-compartment circular smart dispenser. Clicking slots highlights mapped dosages.

4. **Add-on Services**
   - **Pillmate AI Chat (`AIChat.tsx`)**: Simulated chat interaction addressing drug safety queries.
   - **Voice Link Assistant (`VoiceAssistant.tsx`, `VoiceVerified.tsx`)**: Audio wave mockups verifying user vocal prints to unlock physical dispensers.
   - **Caregiver Coordination & Pharmacy Refills (`NotificationAlert.tsx`, `Profile.tsx`)**: Walgreens quick refill ordering and instant contact linkages.

---

## 🚧 Incomplete Features (Mocked Only)

- **Persistent Storage**: Changes are not saved across page reloads (no LocalStorage or IndexedDB connectivity).
- **Global Store Sync**: States are isolated inside local component states. Actions like taking a pill on the dashboard do not propagate to the logs or charts in the Weekly Analytics page.
- **Hardware Integration**: Smart Pillbox status readings (battery percentage, device signal, compartment status) are static representations.
- **Biometric Processing**: Voice link and prescription OCR use hardcoded timeouts instead of actual audio/vision APIs.

---

## 📊 Dummy Data Structure

All dummy database entries reside in `src/data/dummyData.ts` and define:
- `Medication`: Tracking structures representing pill names, time slots, categories, and take times.
- `Caregiver`: Contact profile representing family links and avatars.
- `AdherenceDay`: Compliance percentage metrics mapping to weekly compliance reports.
- `ActivityLog`: Historical logs mapping medication taken/missed lists.
- `mockPatients`: Array representing auxiliary patients and caregiver connections.

---

## 🛠️ Known Issues & TODOs

- [ ] **Critical Build Issue**: In `src/pages/PrescriptionVerify.tsx` on line 2, there is an invalid import: `import { useNavigate } from 'react-serif';`. This package does not exist and will crash compilers/bundlers like Vite. The page uses standard router navigation declared on line 3 (`import { useNavigate as useNav } from 'react-router-dom';`). This unused line must be removed.
- [ ] **State Synchronization**: Integrate a global React Context or Zustand store to manage active pills and log history globally.
- [ ] **State Persistence**: Bind the global store to `localStorage` so schedules survive page reloads.
- [ ] **Prescription Form Mode**: Support manually adding a prescription's name and dosage in addition to the simulated camera OCR flow.
- [ ] **Profile Settings Switches**: Implement switch toggles in the Profile settings menu for notifications, dark mode, and languages.

---

## 📅 Suggested Next Milestones

### Milestone 1: Global State & Local Persistence (Zustand + LocalStorage)
- Install `zustand` for centralized data stores.
- Connect `medications`, `activityLogs`, and `patientProfile` to the store.
- Use `persist` middleware to sync the database to browser storage.
- Update `Dashboard.tsx` and `WeeklyReport.tsx` to read/write from this shared store.

### Milestone 2: Dynamic Input & Code Cleanups
- Delete the invalid `react-serif` import in `PrescriptionVerify.tsx`.
- Replace static OCR prescriptions with editable input forms on the verification screen.
- Allow users to custom-map any prescription to any tray slot (1-8) in the dispenser layout.

### Milestone 3: Advanced Frontend Simulations
- Use the Web Audio API to capture actual microphone waves on the Voice Assistant screen.
- Add simulated loader spinners when dragging a prescription image to make the OCR scan feel organic.
- Build basic theme toggles (light/dark mode) linked to Tailwind classes.
