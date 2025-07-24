import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataExportCard = ({ onExport }) => {
  const [selectedDataTypes, setSelectedDataTypes] = useState({
    exerciseHistory: true,
    progressReports: true,
    postureAnalytics: true,
    personalInfo: false,
    therapistNotes: false
  });
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const dataTypes = [
    {
      key: 'exerciseHistory',
      title: 'Exercise History',
      description: 'Complete session logs, repetition counts, and form scores',
      icon: 'Activity',
      size: '2.3 MB'
    },
    {
      key: 'progressReports',
      title: 'Progress Reports',
      description: 'Weekly and monthly progress summaries and analytics',
      icon: 'TrendingUp',
      size: '1.1 MB'
    },
    {
      key: 'postureAnalytics',
      title: 'Posture Analytics',
      description: 'Joint angle measurements and posture correction data',
      icon: 'BarChart3',
      size: '4.7 MB'
    },
    {
      key: 'personalInfo',
      title: 'Personal Information',
      description: 'Profile data, preferences, and account settings',
      icon: 'User',
      size: '0.1 MB'
    },
    {
      key: 'therapistNotes',
      title: 'Therapist Notes',
      description: 'Professional assessments and treatment recommendations',
      icon: 'FileText',
      size: '0.8 MB'
    }
  ];

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Formatted document for printing' },
    { value: 'csv', label: 'CSV Data', icon: 'Database', description: 'Raw data for analysis' },
    { value: 'json', label: 'JSON Export', icon: 'Code', description: 'Complete data structure' }
  ];

  const handleDataTypeToggle = (key) => {
    setSelectedDataTypes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Mock export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const selectedTypes = Object.keys(selectedDataTypes).filter(key => selectedDataTypes[key]);
    onExport && onExport({ types: selectedTypes, format: exportFormat });
    
    setIsExporting(false);
  };

  const getTotalSize = () => {
    return dataTypes
      .filter(type => selectedDataTypes[type.key])
      .reduce((total, type) => {
        const size = parseFloat(type.size.replace(' MB', ''));
        return total + size;
      }, 0)
      .toFixed(1);
  };

  const getSelectedCount = () => {
    return Object.values(selectedDataTypes).filter(Boolean).length;
  };

  return (
    <div className="bg-card rounded-lg clinical-shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="Download" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Data Export</h2>
          <p className="text-sm text-text-secondary">Download your personal health records</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Data Types Selection */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Select Data to Export</h3>
          <div className="space-y-3">
            {dataTypes.map((dataType) => (
              <div
                key={dataType.key}
                className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  selectedDataTypes[dataType.key]
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleDataTypeToggle(dataType.key)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedDataTypes[dataType.key] ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={dataType.icon} 
                      size={20} 
                      className={selectedDataTypes[dataType.key] ? 'text-primary' : 'text-text-secondary'}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-text-primary">{dataType.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-text-secondary">{dataType.size}</span>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedDataTypes[dataType.key]
                            ? 'border-primary bg-primary' :'border-border'
                        }`}>
                          {selectedDataTypes[dataType.key] && (
                            <Icon name="Check" size={12} color="white" />
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">{dataType.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Format */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Export Format</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {exportFormats.map((format) => (
              <button
                key={format.value}
                onClick={() => setExportFormat(format.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  exportFormat === format.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon 
                    name={format.icon} 
                    size={20} 
                    className={exportFormat === format.value ? 'text-primary' : 'text-text-secondary'}
                  />
                  <span className="font-medium">{format.label}</span>
                </div>
                <p className="text-sm text-text-secondary">{format.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Export Summary */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-text-primary">Export Summary</h4>
            <div className="text-sm text-text-secondary">
              {getSelectedCount()} items • {getTotalSize()} MB
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-text-secondary">HIPAA compliant export format</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-success" />
              <span className="text-text-secondary">Password protected file</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-text-secondary">Export link expires in 24 hours</span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-between items-center pt-4 border-t clinical-border">
          <div className="text-sm text-text-secondary">
            Your data will be prepared and sent to your email address
          </div>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
            loading={isExporting}
            disabled={getSelectedCount() === 0 || isExporting}
          >
            {isExporting ? 'Preparing Export...' : 'Export Data'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataExportCard;