import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoCard from './components/PersonalInfoCard';
import ExercisePreferencesCard from './components/ExercisePreferencesCard';
import CameraSettingsCard from './components/CameraSettingsCard';
import NotificationPreferencesCard from './components/NotificationPreferencesCard';
import SecuritySettingsCard from './components/SecuritySettingsCard';
import TherapistConnectionCard from './components/TherapistConnectionCard';
import DataExportCard from './components/DataExportCard';
import AccessibilitySettingsCard from './components/AccessibilitySettingsCard';
import PrivacyControlsCard from './components/PrivacyControlsCard';
import Icon from '../../components/AppIcon';

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: "Alex Johnson",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "male",
    height: "175",
    weight: "70",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    accountType: "patient",
    isPremium: true,
    memberSince: "January 2024",
    stats: {
      totalSessions: 127,
      streakDays: 15,
      accuracy: 89
    }
  });

  const [exercisePreferences, setExercisePreferences] = useState({
    defaultDifficulty: "intermediate",
    voicePrompts: true,
    soundEffects: true,
    audioVolume: 75,
    coachingIntensity: "moderate",
    dailyReminders: true,
    autoStartCamera: false
  });

  const [cameraSettings, setCameraSettings] = useState({
    resolution: "1080p",
    frameRate: 30,
    sensitivity: 80,
    showSkeleton: true,
    privacyMode: false,
    saveRecordings: false,
    cameraSource: "default",
    lastCalibrated: "July 15, 2025"
  });

  const [notificationPreferences, setNotificationPreferences] = useState({
    exerciseReminders: true,
    reminderTime: "09:00",
    achievements: true,
    therapistMessages: true,
    progressReports: true,
    sessionReminders: true,
    sessionReminderTime: "08:30",
    streakAlerts: true,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    quietHours: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00"
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: "medium",
    contrastMode: "normal",
    reduceMotion: false,
    hapticFeedback: true,
    visualIndicators: false,
    audioDescriptions: false,
    screenReader: false,
    voiceCommands: false,
    voiceSensitivity: 70,
    keyboardNavigation: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    anonymousAnalytics: true,
    researchParticipation: false,
    performanceBenchmarks: true,
    marketingCommunications: false,
    dataRetention: "1-year",
    locationTracking: false,
    cameraDataStorage: true,
    cloudBackup: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'exercise', label: 'Exercise', icon: 'Activity' },
    { id: 'camera', label: 'Camera', icon: 'Camera' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'therapist', label: 'Therapist', icon: 'Users' },
    { id: 'accessibility', label: 'Accessibility', icon: 'Accessibility' },
    { id: 'privacy', label: 'Privacy', icon: 'Lock' },
    { id: 'data', label: 'Data Export', icon: 'Download' }
  ];

  const handleUserUpdate = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const handleAvatarChange = (newAvatar) => {
    setUser(prev => ({ ...prev, avatar: newAvatar }));
  };

  const handleDataExport = (exportData) => {
    console.log('Exporting data:', exportData);
    // Mock export functionality
  };

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply font size
    const fontSizeClasses = {
      'small': 'text-sm',
      'medium': 'text-base',
      'large': 'text-lg',
      'extra-large': 'text-xl'
    };
    
    // Apply contrast mode
    if (accessibilitySettings.contrastMode === 'high') {
      root.classList.add('high-contrast');
    } else if (accessibilitySettings.contrastMode === 'dark') {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('high-contrast', 'dark-mode');
    }
    
    // Apply motion preferences
    if (accessibilitySettings.reduceMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
    }
  }, [accessibilitySettings]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <PersonalInfoCard user={user} onUpdate={handleUserUpdate} />
          </div>
        );
      case 'exercise':
        return (
          <ExercisePreferencesCard 
            preferences={exercisePreferences} 
            onUpdate={setExercisePreferences} 
          />
        );
      case 'camera':
        return (
          <CameraSettingsCard 
            settings={cameraSettings} 
            onUpdate={setCameraSettings} 
          />
        );
      case 'notifications':
        return (
          <NotificationPreferencesCard 
            preferences={notificationPreferences} 
            onUpdate={setNotificationPreferences} 
          />
        );
      case 'security':
        return <SecuritySettingsCard onUpdate={() => {}} />;
      case 'therapist':
        return <TherapistConnectionCard connections={[]} onUpdate={() => {}} />;
      case 'accessibility':
        return (
          <AccessibilitySettingsCard 
            settings={accessibilitySettings} 
            onUpdate={setAccessibilitySettings} 
          />
        );
      case 'privacy':
        return (
          <PrivacyControlsCard 
            settings={privacySettings} 
            onUpdate={setPrivacySettings} 
          />
        );
      case 'data':
        return <DataExportCard onExport={handleDataExport} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Profile Header */}
          <ProfileHeader 
            user={user} 
            onAvatarChange={handleAvatarChange} 
          />

          {/* Settings Navigation */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Sidebar / Mobile Tabs */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card rounded-lg clinical-shadow p-4">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Settings</h2>
                
                {/* Mobile Tab Selector */}
                <div className="lg:hidden mb-4">
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="w-full px-3 py-2 border clinical-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-150 ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-text-primary hover:bg-accent'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileSettings;