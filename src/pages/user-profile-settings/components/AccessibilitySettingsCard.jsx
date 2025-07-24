import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AccessibilitySettingsCard = ({ settings, onUpdate }) => {
  const [accessibilitySettings, setAccessibilitySettings] = useState(settings);

  const handleToggle = (key) => {
    const newSettings = {
      ...accessibilitySettings,
      [key]: !accessibilitySettings[key]
    };
    setAccessibilitySettings(newSettings);
    onUpdate(newSettings);
  };

  const handleSliderChange = (key, value) => {
    const newSettings = {
      ...accessibilitySettings,
      [key]: value
    };
    setAccessibilitySettings(newSettings);
    onUpdate(newSettings);
  };

  const handleSelectChange = (key, value) => {
    const newSettings = {
      ...accessibilitySettings,
      [key]: value
    };
    setAccessibilitySettings(newSettings);
    onUpdate(newSettings);
  };

  const fontSizes = [
    { value: 'small', label: 'Small', example: 'text-sm' },
    { value: 'medium', label: 'Medium', example: 'text-base' },
    { value: 'large', label: 'Large', example: 'text-lg' },
    { value: 'extra-large', label: 'Extra Large', example: 'text-xl' }
  ];

  const contrastModes = [
    { value: 'normal', label: 'Normal', description: 'Standard color scheme' },
    { value: 'high', label: 'High Contrast', description: 'Enhanced visibility' },
    { value: 'dark', label: 'Dark Mode', description: 'Reduced eye strain' }
  ];

  const feedbackMethods = [
    {
      key: 'hapticFeedback',
      title: 'Haptic Feedback',
      description: 'Vibration alerts for mobile devices',
      icon: 'Smartphone'
    },
    {
      key: 'visualIndicators',
      title: 'Enhanced Visual Indicators',
      description: 'Larger icons and clearer status indicators',
      icon: 'Eye'
    },
    {
      key: 'audioDescriptions',
      title: 'Audio Descriptions',
      description: 'Detailed voice descriptions of visual elements',
      icon: 'Volume2'
    },
    {
      key: 'screenReader',
      title: 'Screen Reader Support',
      description: 'Optimized for assistive technologies',
      icon: 'Headphones'
    }
  ];

  return (
    <div className="bg-card rounded-lg clinical-shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-success/10 rounded-lg">
          <Icon name="Accessibility" size={20} className="text-success" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">Accessibility Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Visual Accessibility */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Visual Accessibility</h3>
          
          {/* Font Size */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">Font Size</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => handleSelectChange('fontSize', size.value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    accessibilitySettings.fontSize === size.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`font-medium mb-1 ${size.example}`}>{size.label}</div>
                  <div className={`text-text-secondary ${size.example}`}>Aa</div>
                </button>
              ))}
            </div>
          </div>

          {/* Contrast Mode */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-3">Contrast Mode</label>
            <div className="space-y-3">
              {contrastModes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => handleSelectChange('contrastMode', mode.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    accessibilitySettings.contrastMode === mode.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{mode.label}</div>
                      <div className="text-sm text-text-secondary">{mode.description}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      accessibilitySettings.contrastMode === mode.value
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {accessibilitySettings.contrastMode === mode.value && (
                        <Icon name="Check" size={12} color="white" className="m-0.5" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Animation Preferences */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Reduce Motion</div>
                <div className="text-sm text-text-secondary">Minimize animations and transitions</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('reduceMotion')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                accessibilitySettings.reduceMotion ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.reduceMotion ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Alternative Feedback Methods */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Alternative Feedback Methods</h3>
          <div className="space-y-4">
            {feedbackMethods.map((method) => (
              <div key={method.key} className="flex items-center justify-between">
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
                    accessibilitySettings[method.key] ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      accessibilitySettings[method.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Control */}
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-4">Voice Control</h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Mic" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Voice Commands</div>
                <div className="text-sm text-text-secondary">Control exercises with voice</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('voiceCommands')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                accessibilitySettings.voiceCommands ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  accessibilitySettings.voiceCommands ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {accessibilitySettings.voiceCommands && (
            <div className="bg-muted rounded-lg p-4">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-text-primary">Voice Sensitivity</label>
                  <span className="text-sm text-text-secondary">{accessibilitySettings.voiceSensitivity}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={accessibilitySettings.voiceSensitivity || 70}
                  onChange={(e) => handleSliderChange('voiceSensitivity', parseInt(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              
              <div className="text-sm text-text-secondary">
                <div className="font-medium mb-2">Available Commands:</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>"Start exercise"</div>
                  <div>"Pause session"</div>
                  <div>"Next exercise"</div>
                  <div>"Repeat instructions"</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Keyboard Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Keyboard" size={20} className="text-text-secondary" />
            <div>
              <div className="font-medium">Enhanced Keyboard Navigation</div>
              <div className="text-sm text-text-secondary">Improved tab order and shortcuts</div>
            </div>
          </div>
          <button
            onClick={() => handleToggle('keyboardNavigation')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              accessibilitySettings.keyboardNavigation ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                accessibilitySettings.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettingsCard;