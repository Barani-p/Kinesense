import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeMonitoringPanel = ({ activePatients, onInterventionSend }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (activePatients.length > 0 && !selectedPatient) {
      setSelectedPatient(activePatients[0]);
    }
  }, [activePatients, selectedPatient]);

  const mockLiveData = {
    currentExercise: "Shoulder Flexion",
    currentRep: 8,
    targetReps: 15,
    formScore: 87,
    jointAngles: {
      leftShoulder: 145,
      rightShoulder: 142,
      leftElbow: 90,
      rightElbow: 88
    },
    alerts: [
      { type: 'warning', message: 'Slight asymmetry detected in shoulder movement' },
      { type: 'info', message: 'Good range of motion maintained' }
    ]
  };

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "10:30 AM",
      type: "Follow-up",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "2:00 PM",
      type: "Initial Assessment",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      id: 3,
      patient: "Emma Davis",
      time: "3:30 PM",
      type: "Progress Review",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    }
  ];

  const handleInterventionSend = (type, message) => {
    onInterventionSend(selectedPatient, type, message);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning bg-warning/10';
      case 'error': return 'text-destructive bg-destructive/10';
      case 'info': return 'text-primary bg-primary/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Monitoring Section */}
      <div className="bg-card rounded-lg clinical-border">
        <div className="p-4 border-b clinical-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-text-primary">Live Monitoring</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-success font-medium">
                  {activePatients.length} Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {activePatients.length > 0 ? (
          <div className="p-4">
            {/* Patient Selector */}
            {activePatients.length > 1 && (
              <div className="mb-4">
                <select
                  value={selectedPatient?.id || ''}
                  onChange={(e) => {
                    const patient = activePatients.find(p => p.id === parseInt(e.target.value));
                    setSelectedPatient(patient);
                  }}
                  className="w-full p-2 border clinical-border rounded-lg bg-background"
                >
                  {activePatients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} - {patient.currentExercise}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedPatient && (
              <div className="space-y-4">
                {/* Live Feed Placeholder */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
                  <div className="text-center">
                    <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-text-secondary">Live Camera Feed</p>
                    <p className="text-xs text-text-secondary">{selectedPatient.name}</p>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <div className="px-2 py-1 bg-success text-white text-xs rounded">LIVE</div>
                    <Button variant="ghost" size="icon" iconName="Maximize2" />
                  </div>
                </div>

                {/* Exercise Progress */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text-secondary">Current Exercise</span>
                      <Icon name="Activity" size={16} className="text-primary" />
                    </div>
                    <p className="font-medium text-text-primary">{mockLiveData.currentExercise}</p>
                  </div>
                  <div className="bg-accent/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text-secondary">Progress</span>
                      <Icon name="Target" size={16} className="text-success" />
                    </div>
                    <p className="font-medium text-text-primary">
                      {mockLiveData.currentRep}/{mockLiveData.targetReps} reps
                    </p>
                  </div>
                </div>

                {/* Form Score */}
                <div className="bg-accent/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">Form Score</span>
                    <span className={`text-2xl font-bold ${getScoreColor(mockLiveData.formScore)}`}>
                      {mockLiveData.formScore}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        mockLiveData.formScore >= 85 ? 'bg-success' :
                        mockLiveData.formScore >= 70 ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${mockLiveData.formScore}%` }}
                    />
                  </div>
                </div>

                {/* Joint Angles */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-primary">Joint Angles</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(mockLiveData.jointAngles).map(([joint, angle]) => (
                      <div key={joint} className="flex justify-between p-2 bg-accent/30 rounded">
                        <span className="text-text-secondary capitalize">
                          {joint.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-medium">{angle}°</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts */}
                {mockLiveData.alerts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-text-primary">Live Alerts</h4>
                    {mockLiveData.alerts.map((alert, index) => (
                      <div key={index} className={`p-2 rounded-lg text-xs ${getAlertColor(alert.type)}`}>
                        {alert.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Intervention Controls */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-primary">Quick Interventions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Volume2"
                      onClick={() => handleInterventionSend('audio', 'Slow down your movement')}
                    >
                      Audio Cue
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      onClick={() => handleInterventionSend('message', 'Great form! Keep it up!')}
                    >
                      Encourage
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Monitor" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">No Active Sessions</h4>
            <p className="text-text-secondary">Patients will appear here when they start exercising</p>
          </div>
        )}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-card rounded-lg clinical-border">
        <div className="p-4 border-b clinical-border">
          <h3 className="text-lg font-medium text-text-primary">Today's Schedule</h3>
        </div>
        <div className="p-4 space-y-3">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Clock" size={14} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-primary text-sm">{appointment.patient}</p>
                <p className="text-xs text-text-secondary">{appointment.type}</p>
              </div>
              <span className="text-sm font-medium text-primary">{appointment.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg clinical-border">
        <div className="p-4 border-b clinical-border">
          <h3 className="text-lg font-medium text-text-primary">Quick Actions</h3>
        </div>
        <div className="p-4 space-y-2">
          <Button variant="outline" fullWidth iconName="UserPlus" iconPosition="left">
            Add New Patient
          </Button>
          <Button variant="outline" fullWidth iconName="Calendar" iconPosition="left">
            Schedule Appointment
          </Button>
          <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoringPanel;