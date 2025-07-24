import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PatientDetailView = ({ patient, onAssignExercise, onStartMonitoring }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-full bg-card rounded-lg clinical-border">
        <div className="text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">Select a Patient</h3>
          <p className="text-text-secondary">Choose a patient from the list to view their details</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'exercises', label: 'Exercises', icon: 'Activity' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'sessions', label: 'Sessions', icon: 'Calendar' }
  ];

  const currentExercises = [
    {
      id: 1,
      name: "Shoulder Flexion",
      type: "Range of Motion",
      targetReps: 15,
      completedReps: 12,
      accuracy: 85,
      lastPerformed: "2 hours ago",
      status: "in-progress"
    },
    {
      id: 2,
      name: "Knee Extension",
      type: "Strengthening",
      targetReps: 20,
      completedReps: 20,
      accuracy: 92,
      lastPerformed: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      name: "Hip Abduction",
      type: "Mobility",
      targetReps: 10,
      completedReps: 0,
      accuracy: 0,
      lastPerformed: "Never",
      status: "pending"
    }
  ];

  const recentSessions = [
    {
      id: 1,
      date: "2025-01-19",
      time: "09:30 AM",
      duration: "25 min",
      exercises: 3,
      compliance: 90,
      notes: "Good progress on shoulder mobility"
    },
    {
      id: 2,
      date: "2025-01-17",
      time: "02:15 PM",
      duration: "30 min",
      exercises: 4,
      compliance: 75,
      notes: "Struggled with knee extension form"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'pending': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Patient Info */}
      <div className="bg-card rounded-lg p-6 clinical-border">
        <div className="flex items-start space-x-4">
          <Image
            src={patient.avatar}
            alt={patient.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-text-primary">{patient.name}</h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Message
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  iconName="Video"
                  iconPosition="left"
                  onClick={() => onStartMonitoring(patient)}
                >
                  Start Session
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Age:</span>
                <span className="ml-2 font-medium">{patient.age}</span>
              </div>
              <div>
                <span className="text-text-secondary">Condition:</span>
                <span className="ml-2 font-medium">{patient.condition}</span>
              </div>
              <div>
                <span className="text-text-secondary">Start Date:</span>
                <span className="ml-2 font-medium">{patient.startDate}</span>
              </div>
              <div>
                <span className="text-text-secondary">Compliance:</span>
                <span className="ml-2 font-medium text-success">{patient.compliance}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 clinical-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Sessions</p>
              <p className="text-2xl font-semibold text-text-primary">{patient.totalSessions}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 clinical-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Icon name="Target" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Avg Accuracy</p>
              <p className="text-2xl font-semibold text-text-primary">{patient.avgAccuracy}%</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 clinical-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Time</p>
              <p className="text-2xl font-semibold text-text-primary">{patient.totalTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExercises = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-text-primary">Current Exercise Plan</h3>
        <Button
          variant="primary"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => onAssignExercise(patient)}
        >
          Assign Exercise
        </Button>
      </div>
      
      <div className="space-y-3">
        {currentExercises.map((exercise) => (
          <div key={exercise.id} className="bg-card rounded-lg p-4 clinical-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-text-primary">{exercise.name}</h4>
                <p className="text-sm text-text-secondary">{exercise.type}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(exercise.status)}`}>
                {exercise.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Progress:</span>
                <span className="ml-2 font-medium">{exercise.completedReps}/{exercise.targetReps}</span>
              </div>
              <div>
                <span className="text-text-secondary">Accuracy:</span>
                <span className="ml-2 font-medium">{exercise.accuracy}%</span>
              </div>
              <div>
                <span className="text-text-secondary">Last Done:</span>
                <span className="ml-2 font-medium">{exercise.lastPerformed}</span>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 rounded hover:bg-accent">
                  <Icon name="Edit" size={14} className="text-text-secondary" />
                </button>
                <button className="p-1 rounded hover:bg-accent">
                  <Icon name="Trash2" size={14} className="text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-text-primary">Recent Sessions</h3>
      <div className="space-y-3">
        {recentSessions.map((session) => (
          <div key={session.id} className="bg-card rounded-lg p-4 clinical-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-text-secondary" />
                <span className="font-medium text-text-primary">{session.date}</span>
                <span className="text-text-secondary">{session.time}</span>
              </div>
              <span className="text-sm text-success font-medium">{session.compliance}% compliance</span>
            </div>
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span>{session.duration} • {session.exercises} exercises</span>
              <button className="text-primary hover:underline">View Details</button>
            </div>
            {session.notes && (
              <p className="mt-2 text-sm text-text-secondary italic">{session.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg clinical-border h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b clinical-border">
        <nav className="flex space-x-1 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-accent'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'exercises' && renderExercises()}
        {activeTab === 'progress' && renderOverview()}
        {activeTab === 'sessions' && renderSessions()}
      </div>
    </div>
  );
};

export default PatientDetailView;