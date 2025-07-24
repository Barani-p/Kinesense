import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/ui/Button';


const JointAnalysisChart = () => {
  const [selectedJoint, setSelectedJoint] = useState('knee');

  const jointData = {
    knee: [
      { session: 'S1', angle: 85, target: 90, improvement: 0 },
      { session: 'S2', angle: 87, target: 90, improvement: 2 },
      { session: 'S3', angle: 89, target: 90, improvement: 4 },
      { session: 'S4', angle: 91, target: 90, improvement: 6 },
      { session: 'S5', angle: 88, target: 90, improvement: 3 },
      { session: 'S6', angle: 92, target: 90, improvement: 7 },
      { session: 'S7', angle: 94, target: 90, improvement: 9 }
    ],
    elbow: [
      { session: 'S1', angle: 78, target: 85, improvement: 0 },
      { session: 'S2', angle: 80, target: 85, improvement: 2 },
      { session: 'S3', angle: 82, target: 85, improvement: 4 },
      { session: 'S4', angle: 84, target: 85, improvement: 6 },
      { session: 'S5', angle: 83, target: 85, improvement: 5 },
      { session: 'S6', angle: 86, target: 85, improvement: 8 },
      { session: 'S7', angle: 87, target: 85, improvement: 9 }
    ],
    shoulder: [
      { session: 'S1', angle: 92, target: 95, improvement: 0 },
      { session: 'S2', angle: 93, target: 95, improvement: 1 },
      { session: 'S3', angle: 94, target: 95, improvement: 2 },
      { session: 'S4', angle: 96, target: 95, improvement: 4 },
      { session: 'S5', angle: 95, target: 95, improvement: 3 },
      { session: 'S6', angle: 97, target: 95, improvement: 5 },
      { session: 'S7', angle: 98, target: 95, improvement: 6 }
    ]
  };

  const joints = [
    { key: 'knee', label: 'Knee', icon: 'Circle' },
    { key: 'elbow', label: 'Elbow', icon: 'Circle' },
    { key: 'shoulder', label: 'Shoulder', icon: 'Circle' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg clinical-shadow clinical-border">
          <p className="text-sm font-medium text-text-primary mb-2">{`Session: ${label}`}</p>
          <div className="space-y-1">
            <p className="text-sm text-primary">Actual: {payload[0].value}°</p>
            <p className="text-sm text-text-secondary">Target: {payload[1].value}°</p>
            <p className="text-sm text-success">
              Improvement: +{payload[0].payload.improvement}°
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const currentData = jointData[selectedJoint];
  const latestAngle = currentData[currentData.length - 1].angle;
  const targetAngle = currentData[currentData.length - 1].target;
  const totalImprovement = currentData[currentData.length - 1].improvement;

  return (
    <div className="bg-card p-6 rounded-lg clinical-shadow clinical-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Joint Range of Motion</h3>
          <p className="text-sm text-text-secondary">Angle improvement tracking by joint</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          {joints.map((joint) => (
            <Button
              key={joint.key}
              variant={selectedJoint === joint.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedJoint(joint.key)}
              iconName={joint.icon}
              iconPosition="left"
            >
              {joint.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="session" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#6B7280" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="angle" 
              stroke="#2563EB" 
              strokeWidth={3}
              dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{latestAngle}°</div>
          <div className="text-sm text-text-secondary">Current Angle</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-text-secondary">{targetAngle}°</div>
          <div className="text-sm text-text-secondary">Target Angle</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-success">+{totalImprovement}°</div>
          <div className="text-sm text-text-secondary">Improvement</div>
        </div>
      </div>
    </div>
  );
};

export default JointAnalysisChart;