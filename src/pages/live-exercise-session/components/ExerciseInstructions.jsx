import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExerciseInstructions = ({ isMinimized, onToggleMinimize }) => {
  const [selectedExerciseName, setSelectedExerciseName] = useState('Push-ups');

  const mockExercises = {
    "Push-ups": {
      name: "Push-ups",
      description: "A fundamental upper body exercise that targets chest, shoulders, and triceps while engaging core muscles.",
      difficulty: "Beginner",
      targetMuscles: ["Chest", "Shoulders", "Triceps", "Core"],
      duration: "3 sets × 10-15 reps",
      instructions: [
        "Start in a plank position with hands slightly wider than shoulder-width apart",
        "Keep your body in a straight line from head to heels",
        "Lower your chest toward the floor by bending your elbows",
        "Push back up to the starting position",
        "Maintain controlled movement throughout the exercise"
      ],
      tips: [
        "Keep your core engaged throughout the movement",
        "Don't let your hips sag or pike up",
        "Breathe in on the way down, out on the way up",
        "Start with knee push-ups if full push-ups are too difficult"
      ],
      commonMistakes: [
        "Allowing hips to sag or rise too high",
        "Not going through full range of motion",
        "Placing hands too wide or too narrow",
        "Moving too quickly without control"
      ]
    },
    "Squats": {
      name: "Squats",
      description: "A lower body exercise that targets quads, glutes, and hamstrings while improving core strength and stability.",
      difficulty: "Beginner",
      targetMuscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
      duration: "3 sets × 12-20 reps",
      instructions: [
        "Stand with your feet shoulder-width apart and toes slightly pointed out",
        "Engage your core and keep your chest up",
        "Lower your body by bending at the hips and knees",
        "Keep your knees in line with your toes and go as low as comfortable",
        "Push through your heels to return to standing"
      ],
      tips: [
        "Keep your weight on your heels",
        "Don’t let your knees cave inward",
        "Look straight ahead, not down",
        "Exhale as you push up from the squat"
      ],
      commonMistakes: [
        "Letting the knees go past the toes",
        "Rounding the back",
        "Lifting heels off the ground",
        "Not squatting deep enough"
      ]
    }
  };

  const currentExercise = mockExercises[selectedExerciseName];

  if (isMinimized) {
    return (
      <div className="fixed top-20 left-4 z-30 md:hidden">
        <Button
          variant="outline"
          size="sm"
          iconName="BookOpen"
          onClick={onToggleMinimize}
          className="bg-surface/90 backdrop-blur-sm clinical-shadow"
        >
          Instructions
        </Button>
      </div>
    );
  }

  const ExerciseContent = () => (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-primary mb-1">Choose Exercise:</label>
        <select
          className="w-full px-3 py-2 border rounded-md bg-surface text-text-primary clinical-border"
          value={selectedExerciseName}
          onChange={(e) => setSelectedExerciseName(e.target.value)}
        >
          {Object.keys(mockExercises).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Exercise Info */}
      <div className="bg-card rounded-lg p-4 clinical-border mb-4">
        <h3 className="font-semibold text-text-primary mb-2">{currentExercise.name}</h3>
        <p className="text-sm text-text-secondary mb-3">{currentExercise.description}</p>
        <div className="flex items-center space-x-4 text-xs">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{currentExercise.difficulty}</span>
          <span className="text-text-secondary">{currentExercise.duration}</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-card rounded-lg p-4 clinical-border mb-4">
        <h4 className="font-medium text-text-primary mb-3">Instructions</h4>
        <div className="space-y-3">
          {currentExercise.instructions.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <p className="text-sm text-text-secondary">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-card rounded-lg p-4 clinical-border mb-4">
        <h4 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2" />
          Pro Tips
        </h4>
        <ul className="space-y-2">
          {currentExercise.tips.map((tip, index) => (
            <li key={index} className="text-sm text-text-secondary flex items-start">
              <Icon name="Check" size={14} className="mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Mistakes */}
      <div className="bg-card rounded-lg p-4 clinical-border">
        <h4 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="AlertTriangle" size={16} className="mr-2" />
          Avoid These Mistakes
        </h4>
        <ul className="space-y-2">
          {currentExercise.commonMistakes.map((mistake, index) => (
            <li key={index} className="text-sm text-text-secondary flex items-start">
              <Icon name="X" size={14} className="mr-2 mt-0.5 text-red-500 flex-shrink-0" />
              {mistake}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Panel */}
      <div className="fixed inset-x-0 top-16 bottom-20 z-40 bg-surface/95 backdrop-blur-sm md:hidden overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Exercise Guide</h2>
            <Button variant="ghost" size="icon" iconName="X" onClick={onToggleMinimize} />
          </div>
          <ExerciseContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-16 bottom-0 w-80 bg-surface clinical-shadow border-r clinical-border z-40">
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Exercise Guide</h2>
            <Button variant="ghost" size="icon" iconName="Minimize2" onClick={onToggleMinimize} />
          </div>
          <ExerciseContent />
        </div>
      </div>
    </>
  );
};

export default ExerciseInstructions;
