import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const RepetitionChart = () => {
  const repetitionData = [
    { exercise: 'Squats', valid: 45, invalid: 8, total: 53 },
    { exercise: 'Push-ups', valid: 32, invalid: 12, total: 44 },
    { exercise: 'Lunges', valid: 28, invalid: 6, total: 34 },
    { exercise: 'Planks', valid: 15, invalid: 3, total: 18 },
    { exercise: 'Arm Raises', valid: 38, invalid: 7, total: 45 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-lg clinical-shadow clinical-border">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-success">Valid: {data.valid} reps</p>
            <p className="text-sm text-error">Invalid: {data.invalid} reps</p>
            <p className="text-sm text-text-secondary">Total: {data.total} reps</p>
            <p className="text-sm text-primary">
              Success Rate: {Math.round((data.valid / data.total) * 100)}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card p-6 rounded-lg clinical-shadow clinical-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Repetition Analysis</h3>
          <p className="text-sm text-text-secondary">Valid vs Invalid repetitions by exercise</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-text-secondary">Valid</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-sm text-text-secondary">Invalid</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={repetitionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="exercise" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="valid" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
            <Bar dataKey="invalid" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-lg font-bold text-success">158</div>
          <div className="text-sm text-text-secondary">Valid Reps</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-error">36</div>
          <div className="text-sm text-text-secondary">Invalid Reps</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-primary">81.4%</div>
          <div className="text-sm text-text-secondary">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">194</div>
          <div className="text-sm text-text-secondary">Total Reps</div>
        </div>
      </div>
    </div>
  );
};

export default RepetitionChart;