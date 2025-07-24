import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CameraFeed from './components/CameraFeed';
import ExerciseControls from './components/ExerciseControls';
import ExerciseInstructions from './components/ExerciseInstructions';
import FeedbackSystem from './components/FeedbackSystem';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const LiveExerciseSession = () => {
  const navigate = useNavigate();
  
  // Session state
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [repetitionCount, setRepetitionCount] = useState(0);
  const [validReps, setValidReps] = useState(0);
  const [invalidReps, setInvalidReps] = useState(0);
  
  // Camera and pose detection state
  const [cameraActive, setCameraActive] = useState(false);
  const [currentPose, setCurrentPose] = useState(null);
  const [exclusionViolations, setExclusionViolations] = useState([]);
  
  // UI state
  const [showInstructions, setShowInstructions] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const [goldenStandardVisible, setGoldenStandardVisible] = useState(false);
  
  // Exercise data
  const [currentExercise] = useState({
    id: 1,
    name: "Push-ups",
    description: "A fundamental upper body exercise that targets chest, shoulders, and triceps while engaging core muscles.",
    difficulty: "Beginner",
    targetMuscles: ["Chest", "Shoulders", "Triceps", "Core"],
    duration: "3 sets × 10-15 reps"
  });

  // Exclusion zones for safety
  const exclusionZones = [
    { x: 0.1, y: 0.1, width: 0.2, height: 0.3 }, // Top left corner
    { x: 0.7, y: 0.1, width: 0.2, height: 0.3 }  // Top right corner
  ];

  // Session timer
  useEffect(() => {
    let interval;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  // Initialize camera when component mounts
  useEffect(() => {
    setCameraActive(true);
    return () => setCameraActive(false);
  }, []);

  // Handle pose detection data
  const handlePoseDetected = (poseData) => {
    setCurrentPose(poseData);
    
    // Count repetitions based on pose validation
    if (poseData.isValidPose && isSessionActive) {
      // Mock repetition counting logic
      if (Math.random() > 0.95) { // Simulate rep detection
        setRepetitionCount(prev => prev + 1);
        setValidReps(prev => prev + 1);
      }
    } else if (!poseData.isValidPose && isSessionActive) {
      // Count invalid attempts
      if (Math.random() > 0.98) {
        setRepetitionCount(prev => prev + 1);
        setInvalidReps(prev => prev + 1);
      }
    }
  };

  // Handle exclusion zone violations
  const handleExclusionViolation = (violation) => {
    setExclusionViolations(prev => [...prev, {
      message: violation,
      timestamp: Date.now()
    }]);
    
    // Clear violation after 3 seconds
    setTimeout(() => {
      setExclusionViolations(prev => prev.slice(1));
    }, 3000);
  };

  // Session controls
  const handleStartSession = () => {
    setIsSessionActive(true);
    setSessionTime(0);
    setRepetitionCount(0);
    setValidReps(0);
    setInvalidReps(0);
    setCameraActive(true);
  };

  const handlePauseSession = () => {
    setIsSessionActive(false);
  };

  const handleStopSession = () => {
    setIsSessionActive(false);
    
    // Save session data (mock)
    const sessionData = {
      exerciseId: currentExercise.id,
      duration: sessionTime,
      totalReps: repetitionCount,
      validReps,
      invalidReps,
      formScore: currentPose?.formScore || 0,
      timestamp: new Date().toISOString()
    };
    
    console.log('Session completed:', sessionData);
    
    // Navigate to results or dashboard
    navigate('/exercise-dashboard', { 
      state: { sessionCompleted: true, sessionData } 
    });
  };

  // Toggle functions
  const handleToggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const handleToggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handleToggleSkeleton = () => {
    setSkeletonVisible(!skeletonVisible);
  };

  const handleToggleGoldenStandard = () => {
    setGoldenStandardVisible(!goldenStandardVisible);
  };

  const handleFeedbackGiven = (feedback) => {
    console.log('AI Feedback given:', feedback);
    
    // Track AI feedback metrics for analytics
    if (feedback.source === 'ai') {
      // Could send to analytics service
      console.log('AI feedback metrics:', {
        type: feedback.type,
        priority: feedback.priority,
        confidence: feedback.confidence,
        exercise: currentExercise.name,
        timestamp: feedback.timestamp
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-4">
        {/* Breadcrumb - Desktop only */}
        <div className="hidden md:block px-6 py-4">
          <Breadcrumb />
        </div>

        {/* Camera Feed Container */}
        <div className={`relative ${
          showInstructions 
            ? 'md:ml-80 md:mr-80' :'md:mr-80'
        } transition-all duration-300`}>
          
          {/* Camera Feed */}
          <div className="relative aspect-video md:aspect-[16/10] bg-gray-900">
            <CameraFeed
              isActive={cameraActive}
              onPoseDetected={handlePoseDetected}
              showSkeleton={skeletonVisible}
              showGoldenStandard={goldenStandardVisible}
              exclusionZones={exclusionZones}
              onExclusionViolation={handleExclusionViolation}
            />
            
            {/* Session Status Overlay */}
            {!isSessionActive && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Icon name="Play" size={64} className="mx-auto mb-4 opacity-80" />
                  <h2 className="text-2xl font-semibold mb-2">Ready to Start</h2>
                  <p className="text-lg opacity-80">Press play to begin your AI-guided exercise session</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Quick Actions */}
          <div className="md:hidden absolute top-4 right-4 flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              iconName="BookOpen"
              onClick={handleToggleInstructions}
              className="bg-surface/90 backdrop-blur-sm"
            />
            <Button
              variant="outline"
              size="icon"
              iconName={skeletonVisible ? "EyeOff" : "Eye"}
              onClick={handleToggleSkeleton}
              className="bg-surface/90 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Exercise Instructions */}
        <ExerciseInstructions
          exercise={currentExercise}
          isMinimized={!showInstructions}
          onToggleMinimize={handleToggleInstructions}
        />

        {/* Exercise Controls */}
        <ExerciseControls
          isSessionActive={isSessionActive}
          onStartSession={handleStartSession}
          onPauseSession={handlePauseSession}
          onStopSession={handleStopSession}
          sessionTime={sessionTime}
          repetitionCount={repetitionCount}
          validReps={validReps}
          invalidReps={invalidReps}
          currentExercise={currentExercise}
          onToggleAudio={handleToggleAudio}
          audioEnabled={audioEnabled}
          onToggleSkeleton={handleToggleSkeleton}
          skeletonVisible={skeletonVisible}
          onToggleGoldenStandard={handleToggleGoldenStandard}
          goldenStandardVisible={goldenStandardVisible}
        />

        {/* AI-Powered Feedback System */}
        <FeedbackSystem
          currentPose={currentPose}
          audioEnabled={audioEnabled}
          onFeedbackGiven={handleFeedbackGiven}
          exclusionViolations={exclusionViolations}
          exerciseName={currentExercise.name}
        />

        {/* Emergency Stop Button */}
        <div className="fixed top-20 right-4 z-50">
          <Button
            variant="destructive"
            size="icon"
            iconName="Square"
            onClick={handleStopSession}
            className="w-12 h-12 rounded-full clinical-shadow-lg"
            title="Emergency Stop"
          />
        </div>

        {/* Connection Status */}
        <div className="fixed bottom-4 left-4 z-30 hidden md:block">
          <div className="flex items-center space-x-2 bg-surface/90 backdrop-blur-sm px-3 py-2 rounded-lg clinical-border text-sm">
            <div className={`w-2 h-2 rounded-full ${
              cameraActive ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="text-text-secondary">
              Camera: {cameraActive ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveExerciseSession;