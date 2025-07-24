import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExportReportModal = ({ isOpen, onClose }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    accuracy: true,
    repetitions: true,
    joints: true,
    frequency: true,
    breakdown: true,
    achievements: false
  });
  const [dateRange, setDateRange] = useState('30d');
  const [isGenerating, setIsGenerating] = useState(false);

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
    { value: 'csv', label: 'CSV Data', icon: 'Database' }
  ];

  const reportSections = [
    { key: 'summary', label: 'Performance Summary', description: 'Key metrics and overview' },
    { key: 'accuracy', label: 'Accuracy Trends', description: 'Form score progression charts' },
    { key: 'repetitions', label: 'Repetition Analysis', description: 'Valid vs invalid rep breakdown' },
    { key: 'joints', label: 'Joint Range Analysis', description: 'ROM improvement tracking' },
    { key: 'frequency', label: 'Exercise Frequency', description: 'Activity heatmap and patterns' },
    { key: 'breakdown', label: 'Detailed Breakdown', description: 'Session-by-session data table' },
    { key: 'achievements', label: 'Achievements & Badges', description: 'Progress milestones earned' }
  ];

  const dateRanges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
    { value: '1y', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  const handleSectionToggle = (section) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock download trigger
    const selectedSectionsList = Object.entries(selectedSections)
      .filter(([_, selected]) => selected)
      .map(([key, _]) => key);
    
    console.log('Generating report:', {
      format: exportFormat,
      sections: selectedSectionsList,
      dateRange: dateRange
    });
    
    setIsGenerating(false);
    onClose();
  };

  const selectedCount = Object.values(selectedSections).filter(Boolean).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-card rounded-lg clinical-shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b clinical-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Export Progress Report</h2>
            <p className="text-sm text-text-secondary">Generate a comprehensive report for sharing</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Export Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {exportFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setExportFormat(format.value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-150 ${
                    exportFormat === format.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={format.icon} 
                      size={20} 
                      className={exportFormat === format.value ? 'text-primary' : 'text-text-secondary'}
                    />
                    <span className={`font-medium ${
                      exportFormat === format.value ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {format.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Date Range</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {dateRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={dateRange === range.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange(range.value)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Report Sections */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-text-primary">Report Sections</h3>
              <span className="text-sm text-text-secondary">
                {selectedCount} of {reportSections.length} selected
              </span>
            </div>
            <div className="space-y-3">
              {reportSections.map((section) => (
                <div key={section.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted">
                  <Checkbox
                    checked={selectedSections[section.key]}
                    onChange={() => handleSectionToggle(section.key)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <label className="text-sm font-medium text-text-primary cursor-pointer">
                      {section.label}
                    </label>
                    <p className="text-xs text-text-secondary mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HIPAA Notice */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-primary">HIPAA Compliant Export</h4>
                <p className="text-xs text-text-secondary mt-1">
                  This report will be generated with HIPAA-compliant formatting and security measures. 
                  Personal health information will be properly protected and encrypted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t clinical-border bg-muted">
          <div className="text-sm text-text-secondary">
            Report will include data from {dateRange === '7d' ? 'last 7 days' : 
                                        dateRange === '30d' ? 'last 30 days' :
                                        dateRange === '3m' ? 'last 3 months' :
                                        dateRange === '6m' ? 'last 6 months' :
                                        dateRange === '1y' ? 'last year' : 'all time'}
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleGenerate}
              loading={isGenerating}
              iconName="Download"
              iconPosition="left"
              disabled={selectedCount === 0}
            >
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportReportModal;