import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ActivitySummaryCard from './components/ActivitySummaryCard';
import QuickStartExercises from './components/QuickStartExercises';
import ProgressChart from './components/ProgressChart';
import MetricsWidget from './components/MetricsWidget';
import RecentExerciseHistory from './components/RecentExerciseHistory';
import ConnectionStatus from './components/ConnectionStatus';
import FloatingActionButton from './components/FloatingActionButton';

const ExerciseDashboard = () => {
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // Mock data for today's activity
  const todayStats = {
    exerciseCount: 3,
    accuracy: 87,
    duration: "45 min"
  };

  // Mock data for quick start exercises
  const quickStartExercises = [
    {
      id: 1,
      name: "Shoulder Flexion",
      duration: "10 min",
      icon: "ArrowUp",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      name: "Knee Extension",
      duration: "15 min",
      icon: "ArrowRight",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      name: "Hip Abduction",
      duration: "12 min",
      icon: "ArrowUpRight",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      name: "Elbow Flexion",
      duration: "8 min",
      icon: "RotateCw",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  // Mock data for weekly progress
  const weeklyData = [
    { day: 'Mon', accuracy: 78 },
    { day: 'Tue', accuracy: 82 },
    { day: 'Wed', accuracy: 85 },
    { day: 'Thu', accuracy: 88 },
    { day: 'Fri', accuracy: 91 },
    { day: 'Sat', accuracy: 87 },
    { day: 'Sun', accuracy: 89 }
  ];

  // Mock data for metrics
  const metrics = [
    {
      id: 1,
      label: "Current Streak",
      value: "7 days",
      icon: "Flame",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      change: "+2",
      changeBg: "bg-success/10",
      changeText: "text-success"
    },
    {
      id: 2,
      label: "Weekly Goal",
      value: "85%",
      icon: "Target",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      change: "On track",
      changeBg: "bg-success/10",
      changeText: "text-success"
    },
    {
      id: 3,
      label: "Improvement",
      value: "+12%",
      icon: "TrendingUp",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      change: "This week",
      changeBg: "bg-primary/10",
      changeText: "text-primary"
    }
  ];

  // Mock data for recent exercise history
  const recentExercises = [
    {
      id: 1,
      name: "Shoulder Flexion",
      date: "Today, 2:30 PM",
      duration: "12 min",
      accuracy: 92,
      reps: 15,
      invalidReps: 2,
      icon: "ArrowUp",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      name: "Knee Extension",
      date: "Today, 10:15 AM",
      duration: "18 min",
      accuracy: 78,
      reps: 20,
      invalidReps: 5,
      icon: "ArrowRight",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      name: "Hip Abduction",
      date: "Yesterday, 4:45 PM",
      duration: "15 min",
      accuracy: 85,
      reps: 12,
      invalidReps: 3,
      icon: "ArrowUpRight",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  useEffect(() => {
    // Set page title
    document.title = "Exercise Dashboard - Kinesense";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome back!
            </h1>
            <p className="text-text-secondary">
              {currentDate} • Ready to continue your rehabilitation journey?
            </p>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Activity Summary */}
              <ActivitySummaryCard todayStats={todayStats} />

              {/* Metrics Widget */}
              <MetricsWidget metrics={metrics} />

              {/* Progress Chart */}
              <ProgressChart weeklyData={weeklyData} />

              {/* Recent Exercise History */}
              <RecentExerciseHistory exercises={recentExercises} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Start Exercises */}
              <QuickStartExercises exercises={quickStartExercises} />

              {/* Connection Status */}
              <ConnectionStatus />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default ExerciseDashboard;