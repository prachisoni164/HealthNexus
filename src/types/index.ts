export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type PatientStatus = 'Active' | 'Critical' | 'Recovered' | 'Pending';

export type Department =
  | 'Cardiology'
  | 'Neurology'
  | 'Orthopedics'
  | 'Oncology'
  | 'Pediatrics'
  | 'Emergency'
  | 'General Medicine'
  | 'Dermatology'
  | 'Psychiatry'
  | 'Gastroenterology';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  status: PatientStatus;
  department: Department;
  doctor: string;
  admissionDate: string;
  lastVisit: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  insurance: string;
  notes: string;
  avatar?: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    oxygenSaturation: number;
    weight: number;
    height: number;
  };
  medications: string[];
  allergies: string[];
}

export interface StatsCard {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export interface ActivityItem {
  id: string;
  type: 'admission' | 'discharge' | 'appointment' | 'alert' | 'report';
  message: string;
  time: string;
  patient?: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
}

export interface ChartDataPoint {
  month: string;
  value: number;
  value2?: number;
}

export interface DepartmentData {
  name: string;
  patients: number;
  fill: string;
}

export interface DemographicsData {
  name: string;
  value: number;
  fill: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
}
