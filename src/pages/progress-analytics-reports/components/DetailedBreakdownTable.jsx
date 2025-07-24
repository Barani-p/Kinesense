import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DetailedBreakdownTable = () => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const exerciseData = [
    {
      id: 1,
      date: '2025-07-19',
      exercise: 'Squats',
      duration: '12:30',
      validReps: 15,
      invalidReps: 3,
      accuracy: 83,
      commonErrors: ['Knee alignment', 'Depth'],
      recommendation: 'Focus on keeping knees aligned with toes'
    },
    {
      id: 2,
      date: '2025-07-19',
      exercise: 'Push-ups',
      duration: '8:45',
      validReps: 12,
      invalidReps: 4,
      accuracy: 75,
      commonErrors: ['Elbow position', 'Back arch'],
      recommendation: 'Maintain straight line from head to heels'
    },
    {
      id: 3,
      date: '2025-07-18',
      exercise: 'Lunges',
      duration: '10:15',
      validReps: 18,
      invalidReps: 2,
      accuracy: 90,
      commonErrors: ['Step length'],
      recommendation: 'Excellent form, maintain consistency'
    },
    {
      id: 4,
      date: '2025-07-18',
      exercise: 'Planks',
      duration: '5:20',
      validReps: 8,
      invalidReps: 1,
      accuracy: 89,
      commonErrors: ['Hip position'],
      recommendation: 'Keep hips level with shoulders'
    },
    {
      id: 5,
      date: '2025-07-17',
      exercise: 'Arm Raises',
      duration: '6:40',
      validReps: 20,
      invalidReps: 5,
      accuracy: 80,
      commonErrors: ['Range of motion', 'Speed'],
      recommendation: 'Slow down movement for better control'
    }
  ];

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...exerciseData].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 85) return 'text-success';
    if (accuracy >= 70) return 'text-warning';
    return 'text-error';
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <Icon name="ArrowUpDown" size={14} className="text-text-secondary" />;
    return sortOrder === 'asc' ? 
      <Icon name="ArrowUp" size={14} className="text-primary" /> : 
      <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-card rounded-lg clinical-shadow clinical-border">
      <div className="p-6 border-b clinical-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Detailed Exercise Breakdown</h3>
            <p className="text-sm text-text-secondary">Session-by-session performance analysis</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-text-primary">
                <button 
                  className="flex items-center space-x-2 hover:text-primary"
                  onClick={() => handleSort('date')}
                >
                  <span>Date</span>
                  <SortIcon column="date" />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-primary">
                <button 
                  className="flex items-center space-x-2 hover:text-primary"
                  onClick={() => handleSort('exercise')}
                >
                  <span>Exercise</span>
                  <SortIcon column="exercise" />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-primary">Duration</th>
              <th className="text-left p-4 text-sm font-medium text-text-primary">Repetitions</th>
              <th className="text-left p-4 text-sm font-medium text-text-primary">
                <button 
                  className="flex items-center space-x-2 hover:text-primary"
                  onClick={() => handleSort('accuracy')}
                >
                  <span>Accuracy</span>
                  <SortIcon column="accuracy" />
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-text-primary">Common Errors</th>
              <th className="text-left p-4 text-sm font-medium text-text-primary">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'bg-background' : 'bg-card'}>
                <td className="p-4 text-sm text-text-primary">
                  {new Date(row.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </td>
                <td className="p-4 text-sm font-medium text-text-primary">{row.exercise}</td>
                <td className="p-4 text-sm text-text-secondary">{row.duration}</td>
                <td className="p-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-success font-medium">{row.validReps}</span>
                    <span className="text-text-secondary">/</span>
                    <span className="text-error">{row.invalidReps}</span>
                  </div>
                </td>
                <td className="p-4 text-sm">
                  <span className={`font-medium ${getAccuracyColor(row.accuracy)}`}>
                    {row.accuracy}%
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {row.commonErrors.map((error, errorIndex) => (
                      <span 
                        key={errorIndex}
                        className="px-2 py-1 bg-error/10 text-error text-xs rounded-full"
                      >
                        {error}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-sm text-text-secondary max-w-xs">
                  <p className="truncate" title={row.recommendation}>
                    {row.recommendation}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t clinical-border bg-muted">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Showing 5 of 47 exercise sessions</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs">1</span>
            <span className="px-3 py-1">2</span>
            <span className="px-3 py-1">3</span>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedBreakdownTable;