import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PatientCard = ({ patient, isSelected, onClick, onQuickAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-warning bg-warning/10';
      case 'critical': return 'text-destructive bg-destructive/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getComplianceColor = (compliance) => {
    if (compliance >= 80) return 'text-success';
    if (compliance >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div
      onClick={() => onClick(patient)}
      className={`p-4 rounded-lg clinical-border cursor-pointer transition-all duration-200 hover:clinical-shadow-lg ${
        isSelected ? 'bg-primary/5 border-primary' : 'bg-card hover:bg-accent/50'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <Image
            src={patient.avatar}
            alt={patient.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            patient.isOnline ? 'bg-success' : 'bg-muted'
          }`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-text-primary truncate">{patient.name}</h3>
            {patient.hasAlerts && (
              <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0" />
            )}
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
              {patient.status}
            </span>
            <span className="text-xs text-text-secondary">
              {patient.condition}
            </span>
          </div>

          <div className="space-y-1 text-xs text-text-secondary">
            <div className="flex items-center justify-between">
              <span>Compliance:</span>
              <span className={`font-medium ${getComplianceColor(patient.compliance)}`}>
                {patient.compliance}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Session:</span>
              <span>{patient.lastSession}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Calendar" size={12} />
              <span>Next: {patient.nextAppointment}</span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAction(patient, 'message');
              }}
              className="p-1 rounded hover:bg-accent transition-colors"
            >
              <Icon name="MessageCircle" size={14} className="text-text-secondary hover:text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;