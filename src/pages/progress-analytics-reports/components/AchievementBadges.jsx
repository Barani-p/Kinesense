import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = () => {
  const achievements = [
    {
      id: 1,
      title: 'Perfect Week',
      description: 'Completed all exercises with 90%+ accuracy for 7 days',
      icon: 'Trophy',
      color: 'success',
      earned: true,
      earnedDate: '2025-07-15',
      progress: 100
    },
    {
      id: 2,
      title: 'Consistency Champion',
      description: 'Exercise streak of 30 consecutive days',
      icon: 'Calendar',
      color: 'primary',
      earned: true,
      earnedDate: '2025-07-10',
      progress: 100
    },
    {
      id: 3,
      title: 'Form Master',
      description: 'Achieve 95% accuracy in any exercise',
      icon: 'Target',
      color: 'warning',
      earned: true,
      earnedDate: '2025-07-19',
      progress: 100
    },
    {
      id: 4,
      title: 'Improvement Star',
      description: 'Improve accuracy by 20% in any exercise',
      icon: 'TrendingUp',
      color: 'secondary',
      earned: false,
      progress: 75
    },
    {
      id: 5,
      title: 'Endurance Hero',
      description: 'Complete 100 valid repetitions in a single session',
      icon: 'Zap',
      color: 'error',
      earned: false,
      progress: 60
    },
    {
      id: 6,
      title: 'Joint Specialist',
      description: 'Master all joint angle targets',
      icon: 'Circle',
      color: 'primary',
      earned: false,
      progress: 40
    }
  ];

  const colorClasses = {
    success: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20'
    },
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/20'
    },
    warning: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      border: 'border-warning/20'
    },
    secondary: {
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      border: 'border-secondary/20'
    },
    error: {
      bg: 'bg-error/10',
      text: 'text-error',
      border: 'border-error/20'
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg clinical-shadow clinical-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Achievement Badges</h3>
          <p className="text-sm text-text-secondary">Your progress milestones and rewards</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={20} className="text-warning" />
          <span className="text-sm font-medium text-text-primary">
            3 of 6 earned
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const colors = colorClasses[achievement.color];
          
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                achievement.earned 
                  ? `${colors.bg} ${colors.border}` 
                  : 'bg-muted border-border opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  achievement.earned ? colors.bg : 'bg-gray-100'
                }`}>
                  <Icon 
                    name={achievement.icon} 
                    size={20} 
                    className={achievement.earned ? colors.text : 'text-gray-400'}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-semibold ${
                      achievement.earned ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {achievement.title}
                    </h4>
                    {achievement.earned && (
                      <Icon name="Check" size={16} className={colors.text} />
                    )}
                  </div>
                  
                  <p className={`text-xs mb-3 ${
                    achievement.earned ? 'text-text-secondary' : 'text-text-secondary'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  {achievement.earned ? (
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={12} className="text-text-secondary" />
                      <span className="text-xs text-text-secondary">
                        Earned {new Date(achievement.earnedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-secondary">Progress</span>
                        <span className="text-xs font-medium text-text-primary">
                          {achievement.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            achievement.color === 'success' ? 'bg-success' :
                            achievement.color === 'primary' ? 'bg-primary' :
                            achievement.color === 'warning' ? 'bg-warning' :
                            achievement.color === 'secondary'? 'bg-secondary' : 'bg-error'
                          }`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Next Achievement</h4>
            <p className="text-xs text-text-secondary">Improvement Star - 75% complete</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-primary">5% more</div>
            <div className="text-xs text-text-secondary">to unlock</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;