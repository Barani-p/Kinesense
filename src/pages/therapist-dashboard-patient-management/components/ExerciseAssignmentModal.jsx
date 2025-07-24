import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExerciseAssignmentModal = ({ isOpen, onClose, patient, onAssign }) => {
  const [selectedExercise, setSelectedExercise] = useState('');
  const [customParameters, setCustomParameters] = useState({
    targetReps: 10,
    targetSets: 3,
    romMin: 0,
    romMax: 90,
    restTime: 30,
    frequency: 'daily'
  });
  const [notes, setNotes] = useState('');

  const exerciseLibrary = [
    {
      value: 'shoulder-flexion',
      label: 'Shoulder Flexion',
      description: 'Forward arm raising exercise for shoulder mobility',
      category: 'Upper Body',
      defaultReps: 15,
      defaultSets: 3
    },
    {
      value: 'knee-extension',
      label: 'Knee Extension',
      description: 'Leg straightening exercise for quadriceps strength',
      category: 'Lower Body',
      defaultReps: 20,
      defaultSets: 3
    },
    {
      value: 'hip-abduction',
      label: 'Hip Abduction',
      description: 'Side leg lift for hip stability and strength',
      category: 'Lower Body',
      defaultReps: 12,
      defaultSets: 2
    },
    {
      value: 'ankle-dorsiflexion',
      label: 'Ankle Dorsiflexion',
      description: 'Foot flexing exercise for ankle mobility',
      category: 'Lower Body',
      defaultReps: 15,
      defaultSets: 2
    },
    {
      value: 'neck-rotation',
      label: 'Neck Rotation',
      description: 'Gentle neck turning for cervical mobility',
      category: 'Upper Body',
      defaultReps: 8,
      defaultSets: 2
    }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'every-other-day', label: 'Every Other Day' },
    { value: 'twice-weekly', label: 'Twice Weekly' },
    { value: 'weekly', label: 'Weekly' }
  ];

  const handleExerciseSelect = (exerciseValue) => {
    setSelectedExercise(exerciseValue);
    const exercise = exerciseLibrary.find(ex => ex.value === exerciseValue);
    if (exercise) {
      setCustomParameters(prev => ({
        ...prev,
        targetReps: exercise.defaultReps,
        targetSets: exercise.defaultSets
      }));
    }
  };

  const handleParameterChange = (param, value) => {
    setCustomParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleAssign = () => {
    if (!selectedExercise) return;

    const exercise = exerciseLibrary.find(ex => ex.value === selectedExercise);
    const assignment = {
      exerciseId: selectedExercise,
      exerciseName: exercise.label,
      parameters: customParameters,
      notes: notes,
      assignedDate: new Date().toISOString(),
      patientId: patient.id
    };

    onAssign(assignment);
    onClose();
    
    // Reset form
    setSelectedExercise('');
    setCustomParameters({
      targetReps: 10,
      targetSets: 3,
      romMin: 0,
      romMax: 90,
      restTime: 30,
      frequency: 'daily'
    });
    setNotes('');
  };

  if (!isOpen) return null;

  const selectedExerciseData = exerciseLibrary.find(ex => ex.value === selectedExercise);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg clinical-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b clinical-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Assign Exercise</h2>
              <p className="text-text-secondary">Patient: {patient?.name}</p>
            </div>
            <Button variant="ghost" size="icon" iconName="X" onClick={onClose} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Exercise Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Select Exercise
            </label>
            <div className="grid gap-3">
              {exerciseLibrary.map((exercise) => (
                <div
                  key={exercise.value}
                  onClick={() => handleExerciseSelect(exercise.value)}
                  className={`p-4 rounded-lg clinical-border cursor-pointer transition-all ${
                    selectedExercise === exercise.value
                      ? 'bg-primary/10 border-primary' :'hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-text-primary">{exercise.label}</h3>
                        <span className="px-2 py-1 text-xs bg-muted text-text-secondary rounded">
                          {exercise.category}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{exercise.description}</p>
                      <p className="text-xs text-text-secondary mt-1">
                        Default: {exercise.defaultReps} reps × {exercise.defaultSets} sets
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedExercise === exercise.value
                        ? 'border-primary bg-primary' :'border-muted'
                    }`}>
                      {selectedExercise === exercise.value && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exercise Parameters */}
          {selectedExercise && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Exercise Parameters</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Target Repetitions"
                  type="number"
                  value={customParameters.targetReps}
                  onChange={(e) => handleParameterChange('targetReps', parseInt(e.target.value))}
                  min="1"
                  max="50"
                />
                <Input
                  label="Target Sets"
                  type="number"
                  value={customParameters.targetSets}
                  onChange={(e) => handleParameterChange('targetSets', parseInt(e.target.value))}
                  min="1"
                  max="10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ROM Min (degrees)"
                  type="number"
                  value={customParameters.romMin}
                  onChange={(e) => handleParameterChange('romMin', parseInt(e.target.value))}
                  min="0"
                  max="180"
                />
                <Input
                  label="ROM Max (degrees)"
                  type="number"
                  value={customParameters.romMax}
                  onChange={(e) => handleParameterChange('romMax', parseInt(e.target.value))}
                  min="0"
                  max="180"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Rest Time (seconds)"
                  type="number"
                  value={customParameters.restTime}
                  onChange={(e) => handleParameterChange('restTime', parseInt(e.target.value))}
                  min="10"
                  max="300"
                />
                <Select
                  label="Frequency"
                  options={frequencyOptions}
                  value={customParameters.frequency}
                  onChange={(value) => handleParameterChange('frequency', value)}
                />
              </div>

              {/* Exercise Preview */}
              {selectedExerciseData && (
                <div className="bg-accent/30 rounded-lg p-4">
                  <h4 className="font-medium text-text-primary mb-2">Exercise Summary</h4>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p><strong>Exercise:</strong> {selectedExerciseData.label}</p>
                    <p><strong>Target:</strong> {customParameters.targetReps} reps × {customParameters.targetSets} sets</p>
                    <p><strong>ROM Range:</strong> {customParameters.romMin}° - {customParameters.romMax}°</p>
                    <p><strong>Frequency:</strong> {frequencyOptions.find(f => f.value === customParameters.frequency)?.label}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any specific instructions or modifications..."
                  className="w-full p-3 border clinical-border rounded-lg bg-background text-text-primary placeholder-text-secondary resize-none"
                  rows="3"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t clinical-border">
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAssign}
              disabled={!selectedExercise}
              iconName="Plus"
              iconPosition="left"
            >
              Assign Exercise
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseAssignmentModal;