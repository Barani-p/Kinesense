import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import all components
import MetricCard from './components/MetricCard';
import DateRangeSelector from './components/DateRangeSelector';
import ExerciseAccuracyChart from './components/ExerciseAccuracyChart';
import RepetitionChart from './components/RepetitionChart';
import JointAnalysisChart from './components/JointAnalysisChart';
import ExerciseFrequencyHeatmap from './components/ExerciseFrequencyHeatmap';
import DetailedBreakdownTable from './components/DetailedBreakdownTable';
import AchievementBadges from './components/AchievementBadges';
import ExportReportModal from './components/ExportReportModal';

const ProgressAnalyticsReports = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeMetricToggle, setActiveMetricToggle] = useState({
    accuracy: true,
    repetitions: true,
    joints: true,
    frequency: true
  });

  // Mock user data
  const userRole = localStorage.getItem('userRole') || 'patient';

  const keyMetrics = [
    {
      title: 'Average Form Score',
      value: '84.4%',
      change: '+12.3%',
      changeType: 'positive',
      icon: 'Target',
      color: 'success'
    },
    {
      title: 'Consistency Streak',
      value: '23 days',
      change: '+5 days',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'primary'
    },
    {
      title: 'Goal Achievement',
      value: '78%',
      change: '+8%',
      changeType: 'positive',
      icon: 'Trophy',
      color: 'warning'
    },
    {
      title: 'Total Sessions',
      value: '47',
      change: '+12',
      changeType: 'positive',
      icon: 'Activity',
      color: 'secondary'
    }
  ];

  const handleMetricToggle = (metric) => {
    setActiveMetricToggle(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  const handleShareProgress = () => {
    // Mock sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Exercise Progress',
        text: 'Check out my exercise progress from Kinesense!',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Progress link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Progress Analytics & Reports
              </h1>
              <p className="text-text-secondary">
                Track your exercise performance, identify improvement areas, and share progress with healthcare professionals
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                iconName="Share2"
                iconPosition="left"
                onClick={handleShareProgress}
              >
                Share Progress
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={() => setIsExportModalOpen(true)}
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* Date Range Selector */}
          <div className="mb-8">
            <DateRangeSelector 
              selectedRange={selectedDateRange}
              onRangeChange={setSelectedDateRange}
            />
          </div>

          {/* Metric Toggle Switches */}
          <div className="mb-8">
            <div className="bg-card p-4 rounded-lg clinical-shadow clinical-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Display Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(activeMetricToggle).map(([metric, isActive]) => (
                  <label key={metric} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => handleMetricToggle(metric)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm font-medium text-text-primary capitalize">
                      {metric === 'joints' ? 'Joint Analysis' : metric}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Exercise Accuracy Chart */}
            {activeMetricToggle.accuracy && (
              <ExerciseAccuracyChart />
            )}

            {/* Repetition Analysis Chart */}
            {activeMetricToggle.repetitions && (
              <RepetitionChart />
            )}

            {/* Joint Analysis Chart */}
            {activeMetricToggle.joints && (
              <div className="lg:col-span-2">
                <JointAnalysisChart />
              </div>
            )}

            {/* Exercise Frequency Heatmap */}
            {activeMetricToggle.frequency && (
              <div className="lg:col-span-2">
                <ExerciseFrequencyHeatmap />
              </div>
            )}
          </div>

          {/* Achievement Badges */}
          <div className="mb-8">
            <AchievementBadges />
          </div>

          {/* Detailed Breakdown Table */}
          <div className="mb-8">
            <DetailedBreakdownTable />
          </div>

          {/* Therapist-specific Section */}
          {userRole === 'therapist' && (
            <div className="bg-card p-6 rounded-lg clinical-shadow clinical-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Professional Insights</h3>
                  <p className="text-sm text-text-secondary">Advanced analytics for healthcare professionals</p>
                </div>
                <Icon name="Stethoscope" size={24} className="text-primary" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">92%</div>
                  <div className="text-sm text-text-secondary">Patient Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">+18%</div>
                  <div className="text-sm text-text-secondary">ROM Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning mb-1">3.2</div>
                  <div className="text-sm text-text-secondary">Risk Score</div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  iconName="FileText"
                  iconPosition="left"
                >
                  Generate Clinical Report
                </Button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Next Session
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="MessageSquare"
                iconPosition="left"
              >
                Contact Therapist
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Settings"
                iconPosition="left"
              >
                Adjust Goals
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Export Report Modal */}
      <ExportReportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

export default ProgressAnalyticsReports;