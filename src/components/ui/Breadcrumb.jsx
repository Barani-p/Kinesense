import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  // Route mapping for breadcrumb generation
  const routeMap = {
    '/exercise-dashboard': 'Dashboard',
    '/live-exercise-session': 'Live Exercise Session',
    '/progress-analytics-reports': 'Progress Analytics',
    '/therapist-dashboard-patient-management': 'Therapist Portal',
    '/user-profile-settings': 'Profile Settings',
    '/user-registration-login': 'Login'
  };

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/exercise-dashboard' }];

    if (location.pathname !== '/exercise-dashboard') {
      const currentRoute = routeMap[location.pathname];
      if (currentRoute) {
        breadcrumbs.push({
          label: currentRoute,
          path: location.pathname,
          isActive: true
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login page or if only home
  if (location.pathname === '/user-registration-login' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-text-secondary" />
          )}
          {crumb.isActive ? (
            <span className="text-text-primary font-medium" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-text-primary transition-colors duration-150"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;