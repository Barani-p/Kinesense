import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ExercisePreferencesCard = ({ preferences, onUpdate }) => {
  const [settings, setSettings] = useState(preferences);

  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    setSettings(newSettings);
    onUpdate(newSettings);
  };

  const handleSliderChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    onUpdate(newSettings);
  };

  const handleSelectChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    onUpdate(newSettings);
  };

  return (
    <div className="bg-card rounded-lg clinical-shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <Icon name="Activity" size={20} className="text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">Exercise Preferences</h2>
      </div>

      <div className="space-y-6">
        {/* Default Difficulty Level */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">Default Difficulty Level</label>
          <div className="grid grid-cols-3 gap-3">
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => handleSelectChange('defaultDifficulty', level)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  settings.defaultDifficulty === level
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-center">
                  <Icon 
                    name={level === 'beginner' ? 'Star' : level === 'intermediate' ? 'Zap' : 'Trophy'} 
                    size={20} 
                    className="mx-auto mb-1"
                  />
                  <div className="text-sm font-medium capitalize">{level}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Cues */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Audio Feedback</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Volume2" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Voice Prompts</div>
                <div className="text-sm text-text-secondary">Real-time posture corrections</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('voicePrompts')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.voicePrompts ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.voicePrompts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Sound Effects</div>
                <div className="text-sm text-text-secondary">Success and error sounds</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('soundEffects')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.soundEffects ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.soundEffects ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Volume Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-text-primary">Audio Volume</label>
              <span className="text-sm text-text-secondary">{settings.audioVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.audioVolume}
              onChange={(e) => handleSliderChange('audioVolume', parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Coaching Intensity */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text-primary">Coaching Intensity</label>
            <span className="text-sm text-text-secondary capitalize">{settings.coachingIntensity}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['gentle', 'moderate', 'strict'].map((intensity) => (
              <button
                key={intensity}
                onClick={() => handleSelectChange('coachingIntensity', intensity)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  settings.coachingIntensity === intensity
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-accent'
                }`}
              >
                {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Reminders */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-text-secondary" />
            <div>
              <div className="font-medium">Daily Exercise Reminders</div>
              <div className="text-sm text-text-secondary">Get notified to maintain your routine</div>
            </div>
          </div>
          <button
            onClick={() => handleToggle('dailyReminders')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.dailyReminders ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.dailyReminders ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Auto-start Sessions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Play" size={20} className="text-text-secondary" />
            <div>
              <div className="font-medium">Auto-start Camera</div>
              <div className="text-sm text-text-secondary">Automatically initialize camera on session start</div>
            </div>
          </div>
          <button
            onClick={() => handleToggle('autoStartCamera')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.autoStartCamera ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.autoStartCamera ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExercisePreferencesCard;