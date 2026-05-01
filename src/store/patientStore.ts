import { create } from 'zustand';
import type { Patient, PatientStatus, Department } from '../types';
import { mockPatients } from '../utils/mockData';

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  searchQuery: string;
  statusFilter: PatientStatus | 'All';
  departmentFilter: Department | 'All';
  viewMode: 'grid' | 'list';
  sortBy: keyof Patient;
  sortOrder: 'asc' | 'desc';
  setSelectedPatient: (patient: Patient | null) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: PatientStatus | 'All') => void;
  setDepartmentFilter: (dept: Department | 'All') => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (key: keyof Patient) => void;
  getFilteredPatients: () => Patient[];
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: mockPatients,
  selectedPatient: null,
  searchQuery: '',
  statusFilter: 'All',
  departmentFilter: 'All',
  viewMode: 'grid',
  sortBy: 'name',
  sortOrder: 'asc',

  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setDepartmentFilter: (dept) => set({ departmentFilter: dept }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSortBy: (key) =>
    set((state) => ({
      sortBy: key,
      sortOrder: state.sortBy === key && state.sortOrder === 'asc' ? 'desc' : 'asc',
    })),

  getFilteredPatients: () => {
    const { patients, searchQuery, statusFilter, departmentFilter, sortBy, sortOrder } = get();
    let filtered = [...patients];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.condition.toLowerCase().includes(q) ||
          p.doctor.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    if (departmentFilter !== 'All') {
      filtered = filtered.filter((p) => p.department === departmentFilter);
    }

    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (aVal === undefined || bVal === undefined) return 0;
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  },
}));
