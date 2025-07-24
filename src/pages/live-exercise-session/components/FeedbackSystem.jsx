import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { generateExerciseFeedback, generateSafetyFeedback } from '../../../services/openaiClient';

const FeedbackSystem = ({
  currentPose,
  audioEnabled,
  onFeedbackGiven,
  exclusionViolations = [],
  exerciseName = "Push-ups"
}) => {
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [audioQueue, setAudioQueue] = useState([]);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [lastFeedbackTime, setLastFeedbackTime] = useState(0);

  const FEEDBACK_COOLDOWN = 3000;

  useEffect(() => {
    if (!currentPose || isGeneratingFeedback) return;

    const now = Date.now();
    if (now - lastFeedbackTime < FEEDBACK_COOLDOWN) return;

    generateAIFeedback(currentPose);
  }, [currentPose, isGeneratingFeedback, lastFeedbackTime]);

  useEffect(() => {
    if (exclusionViolations.length > 0) {
      const violation = exclusionViolations[exclusionViolations.length - 1];
      generateAISafetyFeedback(violation);
    }
  }, [exclusionViolations]);

  useEffect(() => {
    if (audioEnabled && audioQueue.length > 0) {
      const nextAudio = audioQueue[0];
      playAudioFeedback(nextAudio);
      setAudioQueue((prev) => prev.slice(1));
    }
  }, [audioEnabled, audioQueue]);

  const generateAIFeedback = async (pose) => {
    try {
      setIsGeneratingFeedback(true);
      setLastFeedbackTime(Date.now());

      const aiResponse = await generateExerciseFeedback(pose, exerciseName);

      const feedback = {
        ...aiResponse,
        timestamp: Date.now(),
        source: 'ai'
      };

      setCurrentFeedback(feedback);
      addToHistory(feedback);

      if (audioEnabled) {
        queueAudioFeedback(feedback.message, feedback.priority);
      }

      onFeedbackGiven?.(feedback);

      const clearDelay = feedback.priority === 'urgent' ? 5000 :
                         feedback.priority === 'high' ? 4000 : 3000;

      setTimeout(() => setCurrentFeedback(null), clearDelay);

    } catch (error) {
      console.error('Error generating AI feedback:', error);
      generateBasicFeedback(pose);
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const generateAISafetyFeedback = async (violation) => {
    try {
      const aiResponse = await generateSafetyFeedback(violation);

      const feedback = {
        ...aiResponse,
        timestamp: Date.now(),
        source: 'ai_safety'
      };

      setCurrentFeedback(feedback);
      addToHistory(feedback);

      if (audioEnabled) {
        queueAudioFeedback(feedback.message, 'urgent');
      }

      setTimeout(() => setCurrentFeedback(null), 4000);

    } catch (error) {
      console.error('Error generating AI safety feedback:', error);

      const fallbackFeedback = {
        type: 'warning',
        message: "Move back to the safe exercise zone",
        priority: 'urgent',
        timestamp: Date.now(),
        source: 'fallback'
      };

      setCurrentFeedback(fallbackFeedback);
      addToHistory(fallbackFeedback);
    }
  };

  const generateBasicFeedback = (pose) => {
    const basicMessages = {
      goodForm: ["Excellent form! Keep it up!", "Perfect posture! You're doing great!"],
      corrections: ["Keep your back straight", "Engage your core muscles", "Align your shoulders"],
      motivational: ["You're doing amazing!", "Keep pushing forward!", "Great effort!"]
    };

    let feedback = null;

    if (pose.formScore >= 85) {
      if (Math.random() > 0.7) {
        feedback = {
          type: 'success',
          message: basicMessages.goodForm[Math.floor(Math.random() * basicMessages.goodForm.length)],
          priority: 'low',
          timestamp: Date.now(),
          source: 'basic'
        };
      }
    } else if (pose.formScore < 70) {
      feedback = {
        type: 'correction',
        message: basicMessages.corrections[Math.floor(Math.random() * basicMessages.corrections.length)],
        priority: 'high',
        timestamp: Date.now(),
        source: 'basic'
      };
    }

    if (feedback) {
      setCurrentFeedback(feedback);
      addToHistory(feedback);

      if (audioEnabled) {
        queueAudioFeedback(feedback.message, feedback.priority);
      }

      onFeedbackGiven?.(feedback);

      setTimeout(() => setCurrentFeedback(null), feedback.type === 'correction' ? 4000 : 2000);
    }
  };

  const addToHistory = (feedback) => {
    setFeedbackHistory((prev) => [feedback, ...prev.slice(0, 9)]);
  };

  const queueAudioFeedback = (message, priority) => {
    const audioFeedback = { message, priority, timestamp: Date.now() };
    if (priority === 'urgent') {
      setAudioQueue((prev) => [audioFeedback, ...prev]);
    } else {
      setAudioQueue((prev) => [...prev, audioFeedback]);
    }
  };

  const playAudioFeedback = (audioFeedback) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(audioFeedback.message);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not available.");
    }
  };

  const getFeedbackIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'correction': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'motivational': return 'Heart';
      default: return 'Info';
    }
  };

  const getFeedbackColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'correction': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning': return 'text-red-600 bg-red-50 border-red-200';
      case 'motivational': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getFeedbackSourceIcon = (source) => {
    switch (source) {
      case 'ai':
      case 'ai_safety': return 'Sparkles';
      case 'basic': return 'MessageSquare';
      default: return 'Info';
    }
  };

  return (
    <>
      {/* Current Feedback Display */}
      {currentFeedback && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-sm mx-4">
          <div className={`
            flex items-center space-x-3 p-4 rounded-lg border backdrop-blur-sm
            ${getFeedbackColor(currentFeedback.type)}
            animate-in slide-in-from-top duration-300
          `}>
            <Icon name={getFeedbackIcon(currentFeedback.type)} size={20} className="flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{currentFeedback.message}</p>
              {currentFeedback.source === 'ai' && (
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="Sparkles" size={12} className="text-current opacity-60" />
                  <span className="text-xs opacity-60">AI-powered</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feedback History Panel */}
      <div className="hidden lg:block fixed top-20 right-4 w-72 max-h-96 bg-surface/95 backdrop-blur-sm rounded-lg clinical-shadow border clinical-border z-30">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="MessageSquare" size={18} />
            <h3 className="font-medium text-text-primary">Live AI Feedback</h3>
            {isGeneratingFeedback && (
              <Icon name="Loader2" size={14} className="animate-spin text-blue-500" />
            )}
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {feedbackHistory.length === 0 ? (
              <p className="text-sm text-text-secondary text-center py-4">
                No feedback yet. Start exercising to receive AI guidance!
              </p>
            ) : (
              feedbackHistory.map((feedback, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 rounded bg-accent/50">
                  <Icon
                    name={getFeedbackIcon(feedback.type)}
                    size={14}
                    className={`mt-0.5 flex-shrink-0 ${
                      feedback.type === 'success' ? 'text-green-500' :
                      feedback.type === 'correction' ? 'text-blue-500' :
                      feedback.type === 'warning' ? 'text-red-500' : 'text-purple-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-secondary">{feedback.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-text-secondary/60">
                        {new Date(feedback.timestamp).toLocaleTimeString()}
                      </p>
                      <Icon name={getFeedbackSourceIcon(feedback.source)} size={10} className="text-text-secondary/40" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Audio Status Indicator */}
      {audioEnabled && audioQueue.length > 0 && (
        <div className="fixed bottom-24 right-4 md:bottom-4 bg-primary text-primary-foreground px-3 py-2 rounded-full text-sm font-medium z-40">
          <div className="flex items-center space-x-2">
            <Icon name="Volume2" size={16} className="animate-pulse" />
            <span>AI Audio Feedback Active</span>
          </div>
        </div>
      )}

      {/* Exclusion Zone Alert */}
      {exclusionViolations.length > 0 && (
        <div className="fixed inset-x-4 top-32 z-50">
          <div className="bg-red-500 text-white p-4 rounded-lg clinical-shadow animate-pulse">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={24} />
              <div>
                <h4 className="font-semibold">Safety Alert!</h4>
                <p className="text-sm">Please return to the designated exercise area</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Status Indicator */}
      {isGeneratingFeedback && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-2 rounded-full text-sm font-medium z-40">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={16} className="animate-pulse" />
            <span>AI analyzing...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackSystem;
