import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsWidget = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-card rounded-xl clinical-shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${metric.bgColor}`}>
              <Icon name={metric.icon} size={18} className={metric.iconColor} />
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${metric.changeBg} ${metric.changeText}`}>
              {metric.change}
            </div>
          </div>
          
          <div className="text-2xl font-bold text-text-primary mb-1">
            {metric.value}
          </div>
          <div className="text-sm text-text-secondary">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsWidget;