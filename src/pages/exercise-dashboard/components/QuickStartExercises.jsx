import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStartExercises = ({ exercises }) => {
  const navigate = useNavigate();

  const handleStartExercise = (exerciseId) => {
    // Store selected exercise in localStorage for the live session
    localStorage.setItem('selectedExercise', JSON.stringify(exerciseId));
    navigate('/live-exercise-session');
  };

  return (
    <div className="bg-card rounded-xl clinical-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Quick Start</h3>
        <Icon name="Zap" size={20} className="text-warning" />
      </div>
      
      <div className="space-y-3">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="flex items-center justify-between p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors duration-150"
          >
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${exercise.bgColor}`}>
                <Icon name={exercise.icon} size={18} className={exercise.iconColor} />
              </div>
              <div>
                <div className="font-medium text-text-primary">{exercise.name}</div>
                <div className="text-sm text-text-secondary">{exercise.duration}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="Play"
              onClick={() => handleStartExercise(exercise.id)}
              className="micro-scale"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t clinical-border">
        <Button
          variant="outline"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={() => navigate('/live-exercise-session')}
        >
          Custom Exercise
        </Button>
      </div>
    </div>
  );
};

export default QuickStartExercises;