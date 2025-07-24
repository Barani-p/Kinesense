import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = () => {
  const navigate = useNavigate();

  const handleStartExercise = () => {
    navigate('/live-exercise-session');
  };

  return (
    <button
      onClick={handleStartExercise}
      className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full clinical-shadow-lg hover:bg-primary/90 transition-all duration-200 micro-scale"
      aria-label="Start Exercise Session"
    >
      <Icon name="Play" size={24} color="white" />
    </button>
  );
};

export default FloatingActionButton;