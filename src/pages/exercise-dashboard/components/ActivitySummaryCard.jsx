import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivitySummaryCard = ({ todayStats }) => {
  return (
    <div className="bg-card rounded-xl clinical-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Today's Activity</h3>
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Activity" size={20} className="text-primary" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">{todayStats.exerciseCount}</div>
          <div className="text-sm text-text-secondary">Exercises</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{todayStats.accuracy}%</div>
          <div className="text-sm text-text-secondary">Accuracy</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t clinical-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Duration</span>
          <span className="font-medium text-text-primary">{todayStats.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivitySummaryCard;