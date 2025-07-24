import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraSettingsCard = ({ settings, onUpdate }) => {
  const [cameraSettings, setCameraSettings] = useState(settings);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const handleToggle = (key) => {
    const newSettings = {
      ...cameraSettings,
      [key]: !cameraSettings[key]
    };
    setCameraSettings(newSettings);
    onUpdate(newSettings);
  };

  const handleSelectChange = (key, value) => {
    const newSettings = {
      ...cameraSettings,
      [key]: value
    };
    setCameraSettings(newSettings);
    onUpdate(newSettings);
  };

  const handleCalibration = () => {
    setIsCalibrating(true);
    // Mock calibration process
    setTimeout(() => {
      setIsCalibrating(false);
      // Show success message
    }, 3000);
  };

  const handleSliderChange = (key, value) => {
    const newSettings = {
      ...cameraSettings,
      [key]: value
    };
    setCameraSettings(newSettings);
    onUpdate(newSettings);
  };

  return (
    <div className="bg-card rounded-lg clinical-shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-warning/10 rounded-lg">
          <Icon name="Camera" size={20} className="text-warning" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">Camera & Pose Detection</h2>
      </div>

      <div className="space-y-6">
        {/* Camera Resolution */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">Camera Resolution</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['480p', '720p', '1080p', 'Auto'].map((resolution) => (
              <button
                key={resolution}
                onClick={() => handleSelectChange('resolution', resolution)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                  cameraSettings.resolution === resolution
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium">{resolution}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Frame Rate */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text-primary">Frame Rate (FPS)</label>
            <span className="text-sm text-text-secondary">{cameraSettings.frameRate}</span>
          </div>
          <input
            type="range"
            min="15"
            max="60"
            step="15"
            value={cameraSettings.frameRate}
            onChange={(e) => handleSliderChange('frameRate', parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>15</span>
            <span>30</span>
            <span>45</span>
            <span>60</span>
          </div>
        </div>

        {/* Pose Detection Sensitivity */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-text-primary">Pose Detection Sensitivity</label>
            <span className="text-sm text-text-secondary">{cameraSettings.sensitivity}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={cameraSettings.sensitivity}
            onChange={(e) => handleSliderChange('sensitivity', parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>Less Sensitive</span>
            <span>More Sensitive</span>
          </div>
        </div>

        {/* Camera Calibration */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Icon name="Target" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Camera Calibration</div>
                <div className="text-sm text-text-secondary">Optimize pose detection accuracy</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Crosshair"
              iconPosition="left"
              onClick={handleCalibration}
              loading={isCalibrating}
              disabled={isCalibrating}
            >
              {isCalibrating ? 'Calibrating...' : 'Calibrate'}
            </Button>
          </div>
          <div className="text-sm text-text-secondary">
            Last calibrated: {cameraSettings.lastCalibrated}
          </div>
        </div>

        {/* Privacy Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Privacy Controls</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Eye" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Show Skeleton Overlay</div>
                <div className="text-sm text-text-secondary">Display pose detection visualization</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('showSkeleton')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                cameraSettings.showSkeleton ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  cameraSettings.showSkeleton ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="VideoOff" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Privacy Mode</div>
                <div className="text-sm text-text-secondary">Hide camera feed during exercises</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('privacyMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                cameraSettings.privacyMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  cameraSettings.privacyMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Save" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Save Session Recordings</div>
                <div className="text-sm text-text-secondary">Store video for review (local only)</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle('saveRecordings')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                cameraSettings.saveRecordings ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  cameraSettings.saveRecordings ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Camera Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">Camera Source</label>
          <select
            value={cameraSettings.cameraSource}
            onChange={(e) => handleSelectChange('cameraSource', e.target.value)}
            className="w-full px-3 py-2 border clinical-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="default">Default Camera</option>
            <option value="front">Front Camera</option>
            <option value="back">Back Camera</option>
            <option value="external">External Camera</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CameraSettingsCard;