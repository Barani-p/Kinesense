import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DateRangeSelector = ({ selectedRange, onRangeChange }) => {
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const predefinedRanges = [
    { label: '7 Days', value: '7d' },
    { label: '30 Days', value: '30d' },
    { label: '3 Months', value: '3m' },
    { label: '6 Months', value: '6m' },
    { label: 'Year', value: '1y' },
    { label: 'Custom', value: 'custom' }
  ];

  const handleRangeSelect = (range) => {
    if (range.value === 'custom') {
      setIsCustomOpen(true);
    } else {
      setIsCustomOpen(false);
      onRangeChange(range.value);
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg clinical-shadow clinical-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Date Range</h3>
        <Icon name="Calendar" size={20} className="text-text-secondary" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {predefinedRanges.map((range) => (
          <Button
            key={range.value}
            variant={selectedRange === range.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleRangeSelect(range)}
            className="text-xs"
          >
            {range.label}
          </Button>
        ))}
      </div>

      {isCustomOpen && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border clinical-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue="2025-01-01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border clinical-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue="2025-07-19"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCustomOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                onRangeChange('custom');
                setIsCustomOpen(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;