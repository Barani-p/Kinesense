import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentExerciseHistory = ({ exercises }) => {
  const [expandedExercise, setExpandedExercise] = useState(null);
  const navigate = useNavigate();

  const handleToggleExpand = (exerciseId) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId);
  };

  const handleReplayExercise = (exercise) => {
    localStorage.setItem('selectedExercise', JSON.stringify(exercise.id));
    navigate('/live-exercise-session');
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return 'text-success';
    if (accuracy >= 70) return 'text-warning';
    return 'text-error';
  };

  const getAccuracyBg = (accuracy) => {
    if (accuracy >= 90) return 'bg-success/10';
    if (accuracy >= 70) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-card rounded-xl clinical-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Sessions</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          onClick={() => navigate('/progress-analytics-reports')}
        />
      </div>
      
      <div className="space-y-3">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="clinical-border border rounded-lg overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/50 transition-colors duration-150"
              onClick={() => handleToggleExpand(exercise.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${exercise.bgColor}`}>
                  <Icon name={exercise.icon} size={18} className={exercise.iconColor} />
                </div>
                <div>
                  <div className="font-medium text-text-primary">{exercise.name}</div>
                  <div className="text-sm text-text-secondary">{exercise.date} • {exercise.duration}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAccuracyBg(exercise.accuracy)} ${getAccuracyColor(exercise.accuracy)}`}>
                  {exercise.accuracy}%
                </div>
                <Icon 
                  name={expandedExercise === exercise.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-secondary" 
                />
              </div>
            </div>
            
            {expandedExercise === exercise.id && (
              <div className="px-4 pb-4 border-t clinical-border bg-accent/20">
                <div className="grid grid-cols-2 gap-4 mt-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-text-primary">{exercise.reps}</div>
                    <div className="text-xs text-text-secondary">Valid Reps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-error">{exercise.invalidReps}</div>
                    <div className="text-xs text-text-secondary">Invalid Reps</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={() => handleReplayExercise(exercise)}
                    className="flex-1"
                  >
                    Replay
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="BarChart3"
                    onClick={() => navigate('/progress-analytics-reports')}
                  >
                    Details
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {exercises.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-text-secondary mx-auto mb-3" />
          <div className="text-text-secondary">No recent exercises</div>
          <div className="text-sm text-text-secondary mt-1">Start your first exercise session</div>
        </div>
      )}
    </div>
  );
};

export default RecentExerciseHistory;