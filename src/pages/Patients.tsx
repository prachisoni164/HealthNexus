import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Grid3X3,
  List,
  Filter,
  X,
  ChevronUp,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Droplets,
  Pill,
  AlertTriangle,
  User,
  Stethoscope,
  Calendar,
  Activity,
} from 'lucide-react';
import { usePatientStore } from '../store/patientStore';
import StatusBadge from '../components/StatusBadge';
import type { Patient, PatientStatus, Department } from '../types';

const statusOptions: (PatientStatus | 'All')[] = ['All', 'Active', 'Critical', 'Recovered', 'Pending'];
const departmentOptions: (Department | 'All')[] = [
  'All',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Oncology',
  'Pediatrics',
  'Emergency',
  'General Medicine',
  'Dermatology',
  'Psychiatry',
  'Gastroenterology',
];

const avatarGradients = [
  'from-indigo-400 to-violet-500',
  'from-cyan-400 to-blue-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-pink-400 to-rose-500',
  'from-purple-400 to-indigo-500',
];

function getGradient(name: string) {
  const idx = name.charCodeAt(0) % avatarGradients.length;
  return avatarGradients[idx];
}

function PatientDetailPanel({ patient, onClose }: { patient: Patient; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto border-l border-gray-100 dark:border-gray-800"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-100 dark:border-gray-800 z-10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">Patient Details</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Patient Hero */}
        <div className="flex items-start gap-4">
          <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradient(patient.name)} text-white text-2xl font-bold flex-shrink-0 shadow-lg`}>
            {patient.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{patient.name}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{patient.id} • {patient.gender} • {patient.age} yrs</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <StatusBadge status={patient.status} />
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400">
                {patient.department}
              </span>
            </div>
          </div>
        </div>

        {/* Condition */}
        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Stethoscope className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">Primary Condition</span>
          </div>
          <p className="text-gray-900 dark:text-white font-medium">{patient.condition}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Attending: {patient.doctor}</p>
        </div>

        {/* Vitals */}
        <div>
          <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-500" />
            Current Vitals
          </h5>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'BP', value: patient.vitals.bloodPressure, unit: 'mmHg' },
              { label: 'Heart Rate', value: patient.vitals.heartRate, unit: 'bpm' },
              { label: 'Temp', value: `${patient.vitals.temperature}°`, unit: 'F' },
              { label: 'O2 Sat', value: `${patient.vitals.oxygenSaturation}%`, unit: '' },
              { label: 'Weight', value: patient.vitals.weight, unit: 'lbs' },
              { label: 'Height', value: patient.vitals.height, unit: 'in' },
            ].map(({ label, value, unit }) => (
              <div key={label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                <p className="text-base font-bold text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                {unit && <p className="text-xs text-gray-400 dark:text-gray-600">{unit}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            Contact Information
          </h5>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{patient.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 truncate">{patient.email}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">{patient.address}</span>
            </div>
          </div>
        </div>

        {/* Insurance & Blood */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Droplets className="w-4 h-4 text-red-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Blood Group</span>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white">{patient.bloodGroup}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Admitted</span>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{patient.admissionDate}</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Insurance</p>
          <p className="font-medium text-gray-900 dark:text-white">{patient.insurance}</p>
        </div>

        {/* Medications */}
        <div>
          <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Pill className="w-4 h-4 text-violet-500" />
            Current Medications
          </h5>
          <div className="flex flex-wrap gap-2">
            {patient.medications.map((med) => (
              <span
                key={med}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800"
              >
                {med}
              </span>
            ))}
          </div>
        </div>

        {/* Allergies */}
        {patient.allergies.length > 0 && (
          <div>
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Allergies
            </h5>
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map((allergy) => (
                <span
                  key={allergy}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {patient.notes && (
          <div>
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Clinical Notes</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 leading-relaxed">
              {patient.notes}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PatientCard({ patient, onClick }: { patient: Patient; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${getGradient(patient.name)} text-white text-lg font-bold flex-shrink-0`}>
          {patient.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white truncate">{patient.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{patient.gender} • {patient.age} yrs • {patient.bloodGroup}</p>
        </div>
        <StatusBadge status={patient.status} size="sm" />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-sm">
          <Stethoscope className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300 truncate">{patient.condition}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-gray-500 dark:text-gray-400 truncate">{patient.doctor}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Activity className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-gray-500 dark:text-gray-400">{patient.department}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Patients() {
  const {
    searchQuery,
    statusFilter,
    departmentFilter,
    viewMode,
    sortBy,
    sortOrder,
    selectedPatient,
    setSearchQuery,
    setStatusFilter,
    setDepartmentFilter,
    setViewMode,
    setSortBy,
    setSelectedPatient,
    getFilteredPatients,
  } = usePatientStore();

  const [showFilters, setShowFilters] = useState(false);
  const filtered = getFilteredPatients();

  const columns: { key: keyof Patient; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'condition', label: 'Condition' },
    { key: 'department', label: 'Department' },
    { key: 'doctor', label: 'Doctor' },
    { key: 'status', label: 'Status' },
    { key: 'lastVisit', label: 'Last Visit' },
  ];

  return (
    <div className="p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {filtered.length} of {usePatientStore.getState().patients.length} patients
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-3"
      >
        {/* Search */}
        <div className="relative flex-1 min-w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
            showFilters || statusFilter !== 'All' || departmentFilter !== 'All'
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
          {(statusFilter !== 'All' || departmentFilter !== 'All') && (
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white text-indigo-600 text-xs font-bold">
              {(statusFilter !== 'All' ? 1 : 0) + (departmentFilter !== 'All' ? 1 : 0)}
            </span>
          )}
        </button>

        {/* View Mode */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-indigo-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-indigo-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
                <div className="flex flex-wrap gap-1.5">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        statusFilter === s
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Department</label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value as Department | 'All')}
                  className="px-3 py-1.5 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                >
                  {departmentOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              {(statusFilter !== 'All' || departmentFilter !== 'All') && (
                <button
                  onClick={() => { setStatusFilter('All'); setDepartmentFilter('All'); }}
                  className="self-end px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onClick={() => setSelectedPatient(patient)}
              />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400 dark:text-gray-600">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No patients match your filters</p>
            </div>
          )}
        </motion.div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => setSortBy(col.key)}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors select-none"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {sortBy === col.key ? (
                          sortOrder === 'asc' ? (
                            <ChevronUp className="w-3 h-3 text-indigo-600" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-indigo-600" />
                          )
                        ) : null}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                <AnimatePresence>
                  {filtered.map((patient, i) => (
                    <motion.tr
                      key={patient.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() => setSelectedPatient(patient)}
                      className="hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${getGradient(patient.name)} text-white text-sm font-semibold`}>
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{patient.name}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{patient.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{patient.age}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-36 truncate">{patient.condition}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{patient.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-36 truncate">{patient.doctor}</td>
                      <td className="px-4 py-3"><StatusBadge status={patient.status} size="sm" /></td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-500">{patient.lastVisit}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400 dark:text-gray-600">
                <Search className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>No patients found</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Detail Panel Overlay */}
      <AnimatePresence>
        {selectedPatient && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPatient(null)}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 backdrop-blur-sm"
            />
            <PatientDetailPanel
              patient={selectedPatient}
              onClose={() => setSelectedPatient(null)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
