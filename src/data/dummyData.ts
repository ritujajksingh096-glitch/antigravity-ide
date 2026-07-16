export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  instructions: string;
  status: 'taken' | 'pending' | 'missed' | 'late';
  timeTaken?: string;
  category?: string;
}

export interface Caregiver {
  name: string;
  phone: string;
  relationship: string;
  avatar: string;
}

export interface AdherenceDay {
  day: string;
  percentage: number;
}

export interface ActivityLog {
  id: string;
  medicationName: string;
  status: 'taken' | 'missed' | 'late';
  time: string;
  dosage: string;
}

export const initialMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    time: '08:00 AM',
    instructions: 'Take with water',
    status: 'taken',
    timeTaken: '08:00 AM',
    category: 'Blood Pressure'
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    time: '01:00 PM',
    instructions: 'Take with meal',
    status: 'pending',
    category: 'Diabetes'
  },
  {
    id: '3',
    name: 'Lisinopril',
    dosage: '10mg',
    time: '08:00 PM',
    instructions: 'Take with water',
    status: 'pending',
    category: 'Blood Pressure'
  },
  {
    id: '4',
    name: 'Atorvastatin',
    dosage: '20mg',
    time: '09:00 PM',
    instructions: 'Before bedtime',
    status: 'pending',
    category: 'Cholesterol'
  }
];

export const caregiverInfo: Caregiver = {
  name: 'Emily Carter',
  phone: '+1 (555) 0199',
  relationship: 'Daughter',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
};

export const adherenceData: AdherenceDay[] = [
  { day: 'Mon', percentage: 100 },
  { day: 'Tue', percentage: 80 },
  { day: 'Wed', percentage: 90 },
  { day: 'Thu', percentage: 100 },
  { day: 'Fri', percentage: 70 },
  { day: 'Sat', percentage: 95 },
  { day: 'Sun', percentage: 98 }
];

export const activityLogs: ActivityLog[] = [
  {
    id: 'l1',
    medicationName: 'Metformin',
    status: 'taken',
    time: 'Today, 8:00 AM',
    dosage: '500mg'
  },
  {
    id: 'l2',
    medicationName: 'Lisinopril',
    status: 'late',
    time: 'Yesterday, 8:15 AM',
    dosage: '10mg'
  },
  {
    id: 'l3',
    medicationName: 'Atorvastatin',
    status: 'missed',
    time: 'Yesterday, 9:00 PM',
    dosage: '20mg'
  }
];

export const mockPatients = [
  { id: 'p1', name: 'Sarah Johnson', type: 'Patient', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { id: 'p2', name: 'Robert Johnson', type: 'Caregiver', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 'p3', name: 'Kevin Johnson', type: 'Caregiver', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' }
];
