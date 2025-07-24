import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatus = () => {
  const [cameraStatus, setCameraStatus] = useState('checking');
  const [poseDetectionStatus, setPoseDetectionStatus] = useState('checking');
  const [therapistConnection, setTherapistConnection] = useState('offline');

  useEffect(() => {
    // Simulate checking camera and pose detection status
    const checkSystemStatus = async () => {
      // Simulate camera check
      setTimeout(() => {
        setCameraStatus('ready');
      }, 1000);

      // Simulate pose detection check
      setTimeout(() => {
        setPoseDetectionStatus('ready');
      }, 1500);

      // Simulate therapist connection check
      setTimeout(() => {
        setTherapistConnection('online');
      }, 2000);
    };

    checkSystemStatus();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready': case'online':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'checking':
        return { icon: 'Clock', color: 'text-warning' };
      case 'offline': case'error':
        return { icon: 'XCircle', color: 'text-error' };
      default:
        return { icon: 'AlertCircle', color: 'text-text-secondary' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ready':
        return 'Ready';
      case 'online':
        return 'Connected';
      case 'checking':
        return 'Checking...';
      case 'offline':
        return 'Offline';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card rounded-xl clinical-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">System Status</h3>
        <Icon name="Wifi" size={20} className="text-primary" />
      </div>
      
      <div className="space-y-4">
        {/* Camera Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Camera" size={18} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Camera</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(cameraStatus).icon} 
              size={16} 
              className={getStatusIcon(cameraStatus).color} 
            />
            <span className={`text-sm ${getStatusIcon(cameraStatus).color}`}>
              {getStatusText(cameraStatus)}
            </span>
          </div>
        </div>

        {/* Pose Detection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Scan" size={18} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Pose Detection</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(poseDetectionStatus).icon} 
              size={16} 
              className={getStatusIcon(poseDetectionStatus).color} 
            />
            <span className={`text-sm ${getStatusIcon(poseDetectionStatus).color}`}>
              {getStatusText(poseDetectionStatus)}
            </span>
          </div>
        </div>

        {/* Therapist Connection */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={18} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Therapist</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(therapistConnection).icon} 
              size={16} 
              className={getStatusIcon(therapistConnection).color} 
            />
            <span className={`text-sm ${getStatusIcon(therapistConnection).color}`}>
              {getStatusText(therapistConnection)}
            </span>
          </div>
        </div>
      </div>

      {(cameraStatus === 'ready' && poseDetectionStatus === 'ready') && (
        <div className="mt-4 pt-4 border-t clinical-border">
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="CheckCircle" size={16} />
            <span>All systems ready for exercise</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;