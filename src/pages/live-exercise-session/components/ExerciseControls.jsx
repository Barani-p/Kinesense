import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExerciseControls = ({
  isSessionActive,
  onStartSession,
  onPauseSession,
  onStopSession,
  sessionTime,
  repetitionCount,
  validReps,
  invalidReps,
  currentExercise,
  onToggleAudio,
  audioEnabled,
  onToggleSkeleton,
  skeletonVisible,
  onToggleGoldenStandard,
  goldenStandardVisible
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(75);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  const getSessionStatus = () => {
    if (!isSessionActive) return 'Ready to Start';
    return 'Session Active';
  };

  return (
    <>
      {/* Mobile Bottom Panel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Drag Handle */}
        <div 
          className="bg-surface/95 backdrop-blur-sm border-t clinical-border px-4 py-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">{formatTime(sessionTime)}</div>
                <div className="text-xs text-text-secondary">Time</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">{repetitionCount}</div>
                <div className="text-xs text-text-secondary">Reps</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{validReps}</div>
                <div className="text-xs text-text-secondary">Valid</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {!isSessionActive ? (
                <Button
                  variant="default"
                  size="icon"
                  iconName="Play"
                  onClick={onStartSession}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    iconName="Pause"
                    onClick={onPauseSession}
                    className="w-10 h-10"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    iconName="Square"
                    onClick={onStopSession}
                    className="w-10 h-10"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="bg-surface/95 backdrop-blur-sm border-t clinical-border p-4 max-h-80 overflow-y-auto">
            {/* Exercise Info */}
            <div className="mb-4">
              <h3 className="font-semibold text-text-primary mb-1">{currentExercise?.name || 'Push-ups'}</h3>
              <p className="text-sm text-text-secondary">{getSessionStatus()}</p>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-accent rounded-lg">
                <div className="text-xl font-bold text-text-primary">{repetitionCount}</div>
                <div className="text-xs text-text-secondary">Total Reps</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">{validReps}</div>
                <div className="text-xs text-green-700">Valid</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-xl font-bold text-red-600">{invalidReps}</div>
                <div className="text-xs text-red-700">Invalid</div>
              </div>
            </div>

            {/* Toggle Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Volume2" size={20} />
                  <span className="text-sm font-medium">Audio Cues</span>
                </div>
                <Button
                  variant={audioEnabled ? "default" : "outline"}
                  size="sm"
                  iconName={audioEnabled ? "VolumeX" : "Volume2"}
                  onClick={onToggleAudio}
                />
              </div>

              {audioEnabled && (
                <div className="flex items-center space-x-3 pl-7">
                  <Icon name="Volume1" size={16} />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-text-secondary w-8">{volume}%</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={20} />
                  <span className="text-sm font-medium">Pose Skeleton</span>
                </div>
                <Button
                  variant={skeletonVisible ? "default" : "outline"}
                  size="sm"
                  iconName="Eye"
                  onClick={onToggleSkeleton}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={20} />
                  <span className="text-sm font-medium">Golden Standard</span>
                </div>
                <Button
                  variant={goldenStandardVisible ? "default" : "outline"}
                  size="sm"
                  iconName="Star"
                  onClick={onToggleGoldenStandard}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed right-0 top-16 bottom-0 w-80 bg-surface clinical-shadow border-l clinical-border z-40">
        <div className="p-6 h-full overflow-y-auto">
          {/* Exercise Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              {currentExercise?.name || 'Push-ups'}
            </h2>
            <p className="text-sm text-text-secondary">{getSessionStatus()}</p>
          </div>

          {/* Session Timer */}
          <div className="bg-accent rounded-lg p-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary mb-1">
                {formatTime(sessionTime)}
              </div>
              <div className="text-sm text-text-secondary">Session Time</div>
            </div>
          </div>

          {/* Repetition Stats */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="bg-card rounded-lg p-4 clinical-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-text-primary">{repetitionCount}</div>
                  <div className="text-sm text-text-secondary">Total Reps</div>
                </div>
                <Icon name="RotateCcw" size={24} className="text-text-secondary" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-xl font-bold text-green-600">{validReps}</div>
                <div className="text-xs text-green-700">Valid</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-xl font-bold text-red-600">{invalidReps}</div>
                <div className="text-xs text-red-700">Invalid</div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="space-y-3 mb-6">
            {!isSessionActive ? (
              <Button
                variant="default"
                fullWidth
                iconName="Play"
                iconPosition="left"
                onClick={onStartSession}
                className="h-12"
              >
                Start Exercise
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  iconName="Pause"
                  iconPosition="left"
                  onClick={onPauseSession}
                  className="h-12"
                >
                  Pause
                </Button>
                <Button
                  variant="destructive"
                  iconName="Square"
                  iconPosition="left"
                  onClick={onStopSession}
                  className="h-12"
                >
                  Stop
                </Button>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="font-medium text-text-primary">Display Settings</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Volume2" size={20} />
                  <span className="text-sm font-medium">Audio Cues</span>
                </div>
                <Button
                  variant={audioEnabled ? "default" : "outline"}
                  size="sm"
                  iconName={audioEnabled ? "VolumeX" : "Volume2"}
                  onClick={onToggleAudio}
                />
              </div>

              {audioEnabled && (
                <div className="flex items-center space-x-3 pl-7">
                  <Icon name="Volume1" size={16} />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-text-secondary">{volume}%</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={20} />
                  <span className="text-sm font-medium">Pose Skeleton</span>
                </div>
                <Button
                  variant={skeletonVisible ? "default" : "outline"}
                  size="sm"
                  iconName="Eye"
                  onClick={onToggleSkeleton}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={20} />
                  <span className="text-sm font-medium">Golden Standard</span>
                </div>
                <Button
                  variant={skeletonVisible ? "default" : "outline"}
                  size="sm"
                  iconName="Star"
                  onClick={onToggleGoldenStandard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExerciseControls;