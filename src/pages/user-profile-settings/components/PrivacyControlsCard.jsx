import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyControlsCard = ({ settings, onUpdate }) => {
  const [privacySettings, setPrivacySettings] = useState(settings);
  const [showDataDeletion, setShowDataDeletion] = useState(false);

  const handleToggle = (key) => {
    const newSettings = {
      ...privacySettings,
      [key]: !privacySettings[key]
    };
    setPrivacySettings(newSettings);
    onUpdate(newSettings);
  };

  const handleSelectChange = (key, value) => {
    const newSettings = {
      ...privacySettings,
      [key]: value
    };
    setPrivacySettings(newSettings);
    onUpdate(newSettings);
  };

  const dataRetentionOptions = [
    { value: '1-month', label: '1 Month', description: 'Minimal data retention' },
    { value: '6-months', label: '6 Months', description: 'Standard retention period' },
    { value: '1-year', label: '1 Year', description: 'Extended progress tracking' },
    { value: 'indefinite', label: 'Indefinite', description: 'Keep all historical data' }
  ];

  const sharingOptions = [
    {
      key: 'anonymousAnalytics',
      title: 'Anonymous Usage Analytics',
      description: 'Help improve the app with anonymized usage data',
      icon: 'BarChart3'
    },
    {
      key: 'researchParticipation',
      title: 'Research Participation',
      description: 'Contribute to healthcare research studies',
      icon: 'Search'
    },
    {
      key: 'performanceBenchmarks',
      title: 'Performance Benchmarks',
      description: 'Compare your progress with anonymized population data',
      icon: 'TrendingUp'
    },
    {
      key: 'marketingCommunications',
      title: 'Marketing Communications',
      description: 'Receive product updates and health tips',
      icon: 'Mail'
    }
  ];

  const handleDataDeletion = (type) => {
    // Mock data deletion
    console.log('Deleting data type:', type);
    setShowDataDeletion(false);
  };

  return (
    <div className="bg-card rounded-lg clinical-shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-warning/10 rounded-lg">
          <Icon name="Shield" size={20} className="text-warning" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">Privacy Controls</h2>
      </div>

      <div className="space-y-6">
        {/* Data Sharing Preferences */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Data Sharing Preferences</h3>
          <div className="space-y-4">
            {sharingOptions.map((option) => (
              <div key={option.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name={option.icon} size={20} className="text-text-secondary" />
                  <div>
                    <div className="font-medium">{option.title}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(option.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacySettings[option.key] ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacySettings[option.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Retention */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Data Retention Period</h3>
          <div className="space-y-3">
            {dataRetentionOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectChange('dataRetention', option.value)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  privacySettings.dataRetention === option.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    privacySettings.dataRetention === option.value
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {privacySettings.dataRetention === option.value && (
                      <Icon name="Check" size={12} color="white" className="m-0.5" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Location Data */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Location & Camera Privacy</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={20} className="text-text-secondary" />
                <div>
                  <div className="font-medium">Location Tracking</div>
                  <div className="text-sm text-text-secondary">Track exercise locations for context</div>
                </div>
              </div>
              <button
                onClick={() => handleToggle('locationTracking')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.locationTracking ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.locationTracking ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Camera" size={20} className="text-text-secondary" />
                <div>
                  <div className="font-medium">Camera Data Storage</div>
                  <div className="text-sm text-text-secondary">Store pose detection frames locally</div>
                </div>
              </div>
              <button
                onClick={() => handleToggle('cameraDataStorage')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.cameraDataStorage ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.cameraDataStorage ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Cloud" size={20} className="text-text-secondary" />
                <div>
                  <div className="font-medium">Cloud Backup</div>
                  <div className="text-sm text-text-secondary">Backup exercise data to secure cloud storage</div>
                </div>
              </div>
              <button
                onClick={() => handleToggle('cloudBackup')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  privacySettings.cloudBackup ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    privacySettings.cloudBackup ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Deletion */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Data Management</h3>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon name="Trash2" size={20} className="text-destructive" />
                <div>
                  <div className="font-medium">Delete Personal Data</div>
                  <div className="text-sm text-text-secondary">Permanently remove specific data types</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                onClick={() => setShowDataDeletion(!showDataDeletion)}
              >
                Manage
              </Button>
            </div>

            {showDataDeletion && (
              <div className="space-y-3 pt-4 border-t clinical-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Activity"
                    iconPosition="left"
                    onClick={() => handleDataDeletion('exercise-history')}
                    className="justify-start"
                  >
                    Delete Exercise History
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="BarChart3"
                    iconPosition="left"
                    onClick={() => handleDataDeletion('analytics')}
                    className="justify-start"
                  >
                    Delete Analytics Data
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Camera"
                    iconPosition="left"
                    onClick={() => handleDataDeletion('camera-data')}
                    className="justify-start"
                  >
                    Delete Camera Data
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => handleDataDeletion('communications')}
                    className="justify-start"
                  >
                    Delete Communications
                  </Button>
                </div>
                
                <div className="pt-3 border-t clinical-border">
                  <Button
                    variant="destructive"
                    size="sm"
                    iconName="AlertTriangle"
                    iconPosition="left"
                    onClick={() => handleDataDeletion('all')}
                    className="w-full"
                  >
                    Delete All Personal Data
                  </Button>
                  <p className="text-xs text-text-secondary mt-2 text-center">
                    This action cannot be undone and will close your account
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Summary */}
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success mt-0.5" />
            <div>
              <h4 className="font-medium text-success mb-2">Your Privacy is Protected</h4>
              <div className="text-sm text-text-secondary space-y-1">
                <div>• All data is encrypted in transit and at rest</div>
                <div>• Camera data is processed locally on your device</div>
                <div>• You control what data is shared and with whom</div>
                <div>• HIPAA compliant data handling practices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControlsCard;