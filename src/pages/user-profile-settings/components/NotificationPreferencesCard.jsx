import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationPreferencesCard = ({ preferences, onUpdate }) => {
  const [settings, setSettings] = useState(preferences);

  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    setSettings(newSettings);
    onUpdate(newSettings);
  };

  const handleTimeChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    onUpdate(newSettings);
  };

  const notificationTypes = [
    {
      key: 'exerciseReminders',
      icon: 'Clock',
      title: 'Exercise Reminders',
      description: 'Daily workout notifications',
      hasTime: true,
      timeKey: 'reminderTime'
    },
    {
      key: 'achievements',
      icon: 'Trophy',
      title: 'Achievement Notifications',
      description: 'Celebrate your milestones and progress',
      hasTime: false
    },
    {
      key: 'therapistMessages',
      icon: 'MessageCircle',
      title: 'Therapist Communications',
      description: 'Messages and updates from your healthcare provider',
      hasTime: false
    },
    {
      key: 'progressReports',
      icon: 'BarChart3',
      title: 'Progress Reports',
      description: 'Weekly and monthly progress summaries',
      hasTime: false
    },
    {
      key: 'sessionReminders',
      icon: 'Calendar',
      title: 'Session Reminders',
      description: 'Upcoming scheduled exercise sessions',
      hasTime: true,
      timeKey: 'sessionReminderTime'
    },
    {
      key: 'streakAlerts',
      icon: 'Flame',
      title: 'Streak Alerts',
      description: 'Maintain your exercise streak',
      hasTime: false
    }
  ];

  const deliveryMethods = [
    {
      key: 'pushNotifications',
      icon: 'Smartphone',
      title: 'Push Notifications',
      description: 'Browser and mobile app notifications'
    },
    {
      key: 'emailNotifications',
      icon: 'Mail',
      title: 'Email Notifications',
      description: 'Receive updates via email'
    },
    {
      key: 'smsNotifications',
      icon: 'MessageSquare',
      title: 'SMS Notifications',
      description: 'Text message alerts for important updates'
    }
  ];

  return (
    <div className="bg-card rounded-lg clinical-shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="Bell" size={20} className="text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">Notification Preferences</h2>
      </div>

      <div className="space-y-8">
        {/* Notification Types */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Notification Types</h3>
          <div className="space-y-4">
            {notificationTypes.map((notification) => (
              <div key={notification.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3 flex-1">
                  <Icon name={notification.icon} size={20} className="text-text-secondary" />
                  <div className="flex-1">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-text-secondary">{notification.description}</div>
                    {notification.hasTime && settings[notification.key] && (
                      <div className="mt-2">
                        <input
                          type="time"
                          value={settings[notification.timeKey] || '09:00'}
                          onChange={(e) => handleTimeChange(notification.timeKey, e.target.value)}
                          className="px-2 py-1 border clinical-border rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(notification.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[notification.key] ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[notification.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Methods */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Delivery Methods</h3>
          <div className="space-y-4">
            {deliveryMethods.map((method) => (
              <div key={method.key} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name={method.icon} size={20} className="text-text-secondary" />
                  <div>
                    <div className="font-medium">{method.title}</div>
                    <div className="text-sm text-text-secondary">{method.description}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(method.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[method.key] ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[method.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Quiet Hours</h3>
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon name="Moon" size={20} className="text-text-secondary" />
                <div>
                  <div className="font-medium">Enable Quiet Hours</div>
                  <div className="text-sm text-text-secondary">Pause notifications during specified times</div>
                </div>
              </div>
              <button
                onClick={() => handleToggle('quietHours')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.quietHours ? 'bg-primary' : 'bg-border'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.quietHours ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {settings.quietHours && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Start Time</label>
                  <input
                    type="time"
                    value={settings.quietHoursStart || '22:00'}
                    onChange={(e) => handleTimeChange('quietHoursStart', e.target.value)}
                    className="w-full px-3 py-2 border clinical-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">End Time</label>
                  <input
                    type="time"
                    value={settings.quietHoursEnd || '08:00'}
                    onChange={(e) => handleTimeChange('quietHoursEnd', e.target.value)}
                    className="w-full px-3 py-2 border clinical-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferencesCard;