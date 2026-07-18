import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Medication, Caregiver, ActivityLog, initialMedications, caregiverInfo, activityLogs } from './dummyData';

export interface PatientProfile {
  name: string;
  gender: 'male' | 'female' | 'other';
  birthYear: string;
  conditions: string[];
  avatar: string;
  bloodType: string;
  height: string;
  weight: string;
  primaryPhysician: {
    name: string;
    clinic: string;
  };
}

export interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  language: string;
}

export interface AppState {
  // State variables
  userRole: 'patient' | 'caregiver';
  isDispenserConnected: boolean;
  patientProfile: PatientProfile;
  caregiver: Caregiver;
  medications: Medication[];
  activityLogs: ActivityLog[];
  settings: AppSettings;

  // Actions
  setUserRole: (role: 'patient' | 'caregiver') => void;
  setDispenserConnected: (connected: boolean) => void;
  updatePatientProfile: (profile: Partial<PatientProfile>) => void;
  updateCaregiver: (caregiver: Partial<Caregiver>) => void;
  
  // Medications Actions
  addMedication: (med: Omit<Medication, 'id'>) => void;
  updateMedication: (id: string, med: Partial<Medication>) => void;
  removeMedication: (id: string) => void;
  setMedications: (meds: Medication[]) => void;
  toggleMedicationStatus: (id: string, customTime?: string) => void;
  
  // Settings Actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetAllData: () => void;
}

const defaultProfile: PatientProfile = {
  name: 'Sam Johnson',
  gender: 'male',
  birthYear: '1951',
  conditions: ['Hypertension', 'Type 2 Diabetes'],
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bloodType: 'B+',
  height: '178 cm',
  weight: '76 kg',
  primaryPhysician: {
    name: 'Dr. Michael Anderson',
    clinic: 'City General Hospital'
  }
};

const defaultSettings: AppSettings = {
  notifications: true,
  darkMode: false,
  language: 'English'
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      userRole: 'patient',
      isDispenserConnected: true,
      patientProfile: defaultProfile,
      caregiver: caregiverInfo,
      medications: initialMedications,
      activityLogs: activityLogs,
      settings: defaultSettings,

      // Actions
      setUserRole: (role) => set({ userRole: role }),
      setDispenserConnected: (connected) => set({ isDispenserConnected: connected }),
      updatePatientProfile: (profile) =>
        set((state) => ({
          patientProfile: { ...state.patientProfile, ...profile }
        })),
      updateCaregiver: (caregiver) =>
        set((state) => ({
          caregiver: { ...state.caregiver, ...caregiver }
        })),

      addMedication: (med) =>
        set((state) => {
          const newMed: Medication = {
            ...med,
            id: Date.now().toString()
          };
          return { medications: [...state.medications, newMed] };
        }),

      updateMedication: (id, updatedFields) =>
        set((state) => ({
          medications: state.medications.map((m) =>
            m.id === id ? { ...m, ...updatedFields } : m
          )
        })),

      removeMedication: (id) =>
        set((state) => ({
          medications: state.medications.filter((m) => m.id !== id)
        })),

      setMedications: (meds) => set({ medications: meds }),

      toggleMedicationStatus: (id, customTime) =>
        set((state) => {
          const timeString = customTime || new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          });

          let loggedMed: Medication | undefined;
          const updatedMeds = state.medications.map((m) => {
            if (m.id === id) {
              const newStatus = m.status === 'taken' ? 'pending' : 'taken';
              loggedMed = {
                ...m,
                status: newStatus,
                timeTaken: newStatus === 'taken' ? timeString : undefined
              };
              return loggedMed;
            }
            return m;
          });

          if (!loggedMed) return {};

          let updatedLogs = [...state.activityLogs];
          if (loggedMed.status === 'taken') {
            // Add a new activity log
            const newLog: ActivityLog = {
              id: Date.now().toString(),
              medicationName: loggedMed.name,
              status: 'taken',
              time: `Today, ${timeString}`,
              dosage: loggedMed.dosage
            };
            updatedLogs = [newLog, ...updatedLogs];
          } else {
            // Remove the latest log for this medication if changed back to pending
            const index = updatedLogs.findIndex(
              (l) => l.medicationName === loggedMed?.name && l.status === 'taken'
            );
            if (index !== -1) {
              updatedLogs.splice(index, 1);
            }
          }

          return {
            medications: updatedMeds,
            activityLogs: updatedLogs
          };
        }),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),

      resetAllData: () =>
        set({
          userRole: 'patient',
          isDispenserConnected: true,
          patientProfile: defaultProfile,
          caregiver: caregiverInfo,
          medications: initialMedications,
          activityLogs: activityLogs,
          settings: defaultSettings
        })
    }),
    {
      name: 'pillmate-app-store'
    }
  )
);
