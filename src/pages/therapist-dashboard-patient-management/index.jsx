import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PatientListSidebar from './components/PatientListSidebar';
import PatientDetailView from './components/PatientDetailView';
import RealTimeMonitoringPanel from './components/RealTimeMonitoringPanel';
import ExerciseAssignmentModal from './components/ExerciseAssignmentModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TherapistDashboardPatientManagement = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [activePatients, setActivePatients] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Mock patient data
  const mockPatients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 45,
      condition: "Rotator Cuff Injury",
      status: "active",
      compliance: 92,
      lastSession: "2 hours ago",
      lastSessionDate: "2025-01-19",
      nextAppointment: "Jan 20",
      startDate: "Dec 15, 2024",
      totalSessions: 24,
      avgAccuracy: 87,
      totalTime: "12.5 hrs",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      isOnline: true,
      hasAlerts: false,
      currentExercise: "Shoulder Flexion"
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 32,
      condition: "ACL Recovery",
      status: "active",
      compliance: 78,
      lastSession: "1 day ago",
      lastSessionDate: "2025-01-18",
      nextAppointment: "Jan 21",
      startDate: "Jan 5, 2025",
      totalSessions: 12,
      avgAccuracy: 82,
      totalTime: "8.2 hrs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      isOnline: false,
      hasAlerts: true,
      currentExercise: "Knee Extension"
    },
    {
      id: 3,
      name: "Emma Davis",
      age: 67,
      condition: "Hip Replacement",
      status: "inactive",
      compliance: 45,
      lastSession: "5 days ago",
      lastSessionDate: "2025-01-14",
      nextAppointment: "Jan 22",
      startDate: "Nov 20, 2024",
      totalSessions: 18,
      avgAccuracy: 65,
      totalTime: "9.8 hrs",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      isOnline: false,
      hasAlerts: true,
      currentExercise: "Hip Abduction"
    },
    {
      id: 4,
      name: "Robert Wilson",
      age: 28,
      condition: "Ankle Sprain",
      status: "active",
      compliance: 95,
      lastSession: "Today",
      lastSessionDate: "2025-01-19",
      nextAppointment: "Jan 20",
      startDate: "Jan 10, 2025",
      totalSessions: 8,
      avgAccuracy: 94,
      totalTime: "4.5 hrs",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      isOnline: true,
      hasAlerts: false,
      currentExercise: "Ankle Dorsiflexion"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      age: 52,
      condition: "Lower Back Pain",
      status: "critical",
      compliance: 35,
      lastSession: "1 week ago",
      lastSessionDate: "2025-01-12",
      nextAppointment: "Jan 19",
      startDate: "Dec 1, 2024",
      totalSessions: 15,
      avgAccuracy: 58,
      totalTime: "6.2 hrs",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      isOnline: false,
      hasAlerts: true,
      currentExercise: "Spinal Extension"
    }
  ];

  // Simulate active patients (those currently exercising)
  useEffect(() => {
    const activeList = mockPatients.filter(patient => patient.isOnline && patient.status === 'active');
    setActivePatients(activeList);
  }, []);

  // Simulate notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'alert',
        message: 'Lisa Thompson missed her scheduled session',
        timestamp: '5 minutes ago',
        patientId: 5
      },
      {
        id: 2,
        type: 'success',
        message: 'Robert Wilson completed exercise with 95% accuracy',
        timestamp: '1 hour ago',
        patientId: 4
      },
      {
        id: 3,
        type: 'warning',
        message: 'Michael Chen showing form inconsistencies',
        timestamp: '2 hours ago',
        patientId: 2
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleQuickAction = (patient, action) => {
    console.log(`Quick action: ${action} for patient: ${patient.name}`);
    // Implement quick actions like messaging, calling, etc.
  };

  const handleAssignExercise = (patient) => {
    setSelectedPatient(patient);
    setIsAssignmentModalOpen(true);
  };

  const handleExerciseAssignment = (assignment) => {
    console.log('Exercise assigned:', assignment);
    // Implement exercise assignment logic
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: `Exercise "${assignment.exerciseName}" assigned to ${selectedPatient.name}`,
      timestamp: 'Just now',
      patientId: selectedPatient.id
    }]);
  };

  const handleStartMonitoring = (patient) => {
    console.log('Starting monitoring for:', patient.name);
    // Implement live monitoring logic
  };

  const handleInterventionSend = (patient, type, message) => {
    console.log(`Intervention sent to ${patient.name}: ${type} - ${message}`);
    // Implement intervention sending logic
  };

  const handleBulkAction = (action, selectedPatientIds) => {
    console.log(`Bulk action: ${action} for patients:`, selectedPatientIds);
    // Implement bulk actions
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Therapist Dashboard</h1>
              <p className="text-text-secondary">Manage patients and monitor rehabilitation progress</p>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon" iconName="Bell">
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </div>
              
              {/* Quick Actions */}
              <Button variant="outline" iconName="UserPlus" iconPosition="left">
                Add Patient
              </Button>
              <Button variant="primary" iconName="Calendar" iconPosition="left">
                Schedule
              </Button>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg p-4 clinical-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Total Patients</p>
                  <p className="text-2xl font-semibold text-text-primary">{mockPatients.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 clinical-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Icon name="Activity" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Active Sessions</p>
                  <p className="text-2xl font-semibold text-text-primary">{activePatients.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 clinical-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Alerts</p>
                  <p className="text-2xl font-semibold text-text-primary">
                    {mockPatients.filter(p => p.hasAlerts).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 clinical-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Icon name="TrendingUp" size={20} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Avg Compliance</p>
                  <p className="text-2xl font-semibold text-text-primary">
                    {Math.round(mockPatients.reduce((acc, p) => acc + p.compliance, 0) / mockPatients.length)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Patient List Sidebar - 3 columns on desktop */}
            <div className="lg:col-span-3">
              <PatientListSidebar
                patients={mockPatients}
                selectedPatient={selectedPatient}
                onPatientSelect={handlePatientSelect}
                onQuickAction={handleQuickAction}
              />
            </div>

            {/* Patient Detail View - 6 columns on desktop */}
            <div className="lg:col-span-6">
              <PatientDetailView
                patient={selectedPatient}
                onAssignExercise={handleAssignExercise}
                onStartMonitoring={handleStartMonitoring}
              />
            </div>

            {/* Real-time Monitoring Panel - 3 columns on desktop */}
            <div className="lg:col-span-3">
              <RealTimeMonitoringPanel
                activePatients={activePatients}
                onInterventionSend={handleInterventionSend}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Exercise Assignment Modal */}
      <ExerciseAssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        patient={selectedPatient}
        onAssign={handleExerciseAssignment}
      />
    </div>
  );
};

export default TherapistDashboardPatientManagement;