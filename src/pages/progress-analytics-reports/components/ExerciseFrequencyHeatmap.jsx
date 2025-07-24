import React from 'react';
import Icon from '../../../components/AppIcon';

const ExerciseFrequencyHeatmap = () => {
  // Generate last 7 weeks of data
  const generateHeatmapData = () => {
    const weeks = [];
    const today = new Date();
    
    for (let week = 6; week >= 0; week--) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (week * 7) - today.getDay());
      
      const days = [];
      for (let day = 0; day < 7; day++) {
        const currentDay = new Date(weekStart);
        currentDay.setDate(weekStart.getDate() + day);
        
        // Mock exercise intensity (0-4)
        const intensity = Math.floor(Math.random() * 5);
        
        days.push({
          date: currentDay.getDate(),
          month: currentDay.getMonth() + 1,
          intensity: intensity,
          exercises: intensity * 2 + Math.floor(Math.random() * 3)
        });
      }
      weeks.push(days);
    }
    return weeks;
  };

  const heatmapData = generateHeatmapData();
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getIntensityColor = (intensity) => {
    const colors = [
      'bg-gray-100', // 0 - No exercise
      'bg-primary/20', // 1 - Light
      'bg-primary/40', // 2 - Moderate
      'bg-primary/60', // 3 - Good
      'bg-primary/80'  // 4 - Intense
    ];
    return colors[intensity] || colors[0];
  };

  const getIntensityLabel = (intensity) => {
    const labels = ['No exercise', 'Light', 'Moderate', 'Good', 'Intense'];
    return labels[intensity] || labels[0];
  };

  return (
    <div className="bg-card p-6 rounded-lg clinical-shadow clinical-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Exercise Frequency</h3>
          <p className="text-sm text-text-secondary">Weekly activity heatmap</p>
        </div>
        <Icon name="Calendar" size={20} className="text-text-secondary" />
      </div>

      <div className="space-y-2">
        {/* Day labels */}
        <div className="grid grid-cols-8 gap-1">
          <div></div>
          {dayLabels.map((day) => (
            <div key={day} className="text-xs text-text-secondary text-center py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        {heatmapData.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-8 gap-1">
            <div className="text-xs text-text-secondary py-1 pr-2 text-right">
              W{7 - weekIndex}
            </div>
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-8 h-8 rounded ${getIntensityColor(day.intensity)} 
                  border clinical-border cursor-pointer transition-all duration-150 
                  hover:scale-110 hover:clinical-shadow`}
                title={`${day.month}/${day.date}: ${day.exercises} exercises - ${getIntensityLabel(day.intensity)}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {day.intensity > 0 && (
                    <span className="text-xs font-medium text-primary">
                      {day.exercises}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Less</span>
          {[0, 1, 2, 3, 4].map((intensity) => (
            <div
              key={intensity}
              className={`w-3 h-3 rounded ${getIntensityColor(intensity)} border clinical-border`}
            ></div>
          ))}
          <span className="text-sm text-text-secondary">More</span>
        </div>
        
        <div className="text-sm text-text-secondary">
          Total: 47 exercise sessions
        </div>
      </div>
    </div>
  );
};

export default ExerciseFrequencyHeatmap;