import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('patient'); // 'patient' or 'therapist'
  const location = useLocation();

  // Simulate user role detection from localStorage or auth context
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'patient';
    setUserRole(savedRole);
  }, []);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/exercise-dashboard',
      icon: 'LayoutDashboard',
      roles: ['patient', 'therapist']
    },
    {
      label: 'Exercise',
      path: '/live-exercise-session',
      icon: 'Activity',
      roles: ['patient', 'therapist']
    },
    {
      label: 'Analytics',
      path: '/progress-analytics-reports',
      icon: 'BarChart3',
      roles: ['patient', 'therapist']
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'User',
      roles: ['patient', 'therapist']
    },
    {
      label: 'Therapist Portal',
      path: '/therapist-dashboard-patient-management',
      icon: 'Users',
      roles: ['therapist']
    }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleRoleSwitch = () => {
    const newRole = userRole === 'patient' ? 'therapist' : 'patient';
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  const handleExerciseQuickAccess = () => {
    // Direct navigation to exercise session with camera initialization
    window.location.href = '/live-exercise-session';
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-100 bg-surface clinical-shadow">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <Link to="/exercise-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Activity" size={24} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary">
              Kinesense
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 micro-scale ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-accent'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Exercise Quick Access */}
            <Button
              variant="secondary"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={handleExerciseQuickAccess}
              className="micro-scale"
            >
              Start Exercise
            </Button>

            {/* Role Switch */}
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              onClick={handleRoleSwitch}
              className="micro-scale"
            >
              {userRole === 'patient' ? 'Therapist View' : 'Patient View'}
            </Button>

            {/* User Menu */}
            <Button
              variant="ghost"
              size="icon"
              iconName="User"
              className="micro-scale"
            />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden micro-scale"
          />
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface clinical-border border-t">
            <nav className="px-4 py-3 space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-150 touch-target ${
                    isActiveRoute(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-accent'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile Actions */}
              <div className="pt-3 mt-3 border-t clinical-border space-y-2">
                <Button
                  variant="secondary"
                  fullWidth
                  iconName="Play"
                  iconPosition="left"
                  onClick={() => {
                    handleExerciseQuickAccess();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start touch-target"
                >
                  Start Exercise
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => {
                    handleRoleSwitch();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start touch-target"
                >
                  Switch to {userRole === 'patient' ? 'Therapist' : 'Patient'} View
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-100 bg-surface clinical-shadow md:hidden">
        <nav className="flex items-center justify-around py-2">
          {filteredNavItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-150 touch-target ${
                isActiveRoute(item.path)
                  ? 'text-primary' :'text-text-secondary'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
          
          {/* Exercise Quick Access FAB */}
          <button
            onClick={handleExerciseQuickAccess}
            className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full clinical-shadow-lg micro-scale"
          >
            <Icon name="Play" size={24} color="white" />
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;