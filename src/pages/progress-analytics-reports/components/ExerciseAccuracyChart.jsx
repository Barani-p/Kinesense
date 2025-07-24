import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ExerciseAccuracyChart = () => {
  const accuracyData = [
    { date: '07/13', accuracy: 72, exercises: 8 },
    { date: '07/14', accuracy: 78, exercises: 12 },
    { date: '07/15', accuracy: 85, exercises: 10 },
    { date: '07/16', accuracy: 82, exercises: 15 },
    { date: '07/17', accuracy: 89, exercises: 11 },
    { date: '07/18', accuracy: 91, exercises: 14 },
    { date: '07/19', accuracy: 94, exercises: 9 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg clinical-shadow clinical-border">
          <p className="text-sm font-medium text-text-primary">{`Date: ${label}`}</p>
          <p className="text-sm text-success">
            {`Accuracy: ${payload[0].value}%`}
          </p>
          <p className="text-sm text-text-secondary">
            {`Exercises: ${payload[0].payload.exercises}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card p-6 rounded-lg clinical-shadow clinical-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Exercise Accuracy Trend</h3>
          <p className="text-sm text-text-secondary">Form score percentage over time</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-sm text-text-secondary">Accuracy %</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={accuracyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              domain={[60, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2 text-success">
          <Icon name="TrendingUp" size={16} />
          <span>+22% improvement this week</span>
        </div>
        <div className="text-text-secondary">
          Average: 84.4%
        </div>
      </div>
    </div>
  );
};

export default ExerciseAccuracyChart;