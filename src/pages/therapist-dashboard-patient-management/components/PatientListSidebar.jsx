import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import PatientCard from './PatientCard';

const PatientListSidebar = ({ patients, selectedPatient, onPatientSelect, onQuickAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const statusOptions = [
    { value: 'all', label: 'All Patients' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'critical', label: 'Critical' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'lastSession', label: 'Last Session' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'status', label: 'Status' }
  ];

  const filteredAndSortedPatients = patients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'compliance':
          return b.compliance - a.compliance;
        case 'status':
          return a.status.localeCompare(b.status);
        case 'lastSession':
          return new Date(b.lastSessionDate) - new Date(a.lastSessionDate);
        default:
          return 0;
      }
    });

  const getStatusCounts = () => {
    return {
      total: patients.length,
      active: patients.filter(p => p.status === 'active').length,
      inactive: patients.filter(p => p.status === 'inactive').length,
      critical: patients.filter(p => p.status === 'critical').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-card rounded-lg clinical-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b clinical-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Patients</h2>
          <span className="text-sm text-text-secondary">
            {filteredAndSortedPatients.length} of {patients.length}
          </span>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-success/10 rounded-lg p-2 text-center">
            <p className="text-xs text-text-secondary">Active</p>
            <p className="text-lg font-semibold text-success">{statusCounts.active}</p>
          </div>
          <div className="bg-warning/10 rounded-lg p-2 text-center">
            <p className="text-xs text-text-secondary">Inactive</p>
            <p className="text-lg font-semibold text-warning">{statusCounts.inactive}</p>
          </div>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />

        {/* Filters */}
        <div className="space-y-2">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredAndSortedPatients.length > 0 ? (
          <div className="space-y-3">
            {filteredAndSortedPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                isSelected={selectedPatient?.id === patient.id}
                onClick={onPatientSelect}
                onQuickAction={onQuickAction}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No patients found</h3>
            <p className="text-text-secondary">
              {searchTerm || statusFilter !== 'all' ?'Try adjusting your search or filters' :'No patients have been added yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats Footer */}
      <div className="p-4 border-t clinical-border">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-text-secondary">Avg Compliance</p>
            <p className="text-sm font-semibold text-text-primary">
              {Math.round(patients.reduce((acc, p) => acc + p.compliance, 0) / patients.length)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-text-secondary">Active Today</p>
            <p className="text-sm font-semibold text-text-primary">
              {patients.filter(p => p.lastSession === 'Today').length}
            </p>
          </div>
          <div>
            <p className="text-xs text-text-secondary">Alerts</p>
            <p className="text-sm font-semibold text-destructive">
              {patients.filter(p => p.hasAlerts).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientListSidebar;