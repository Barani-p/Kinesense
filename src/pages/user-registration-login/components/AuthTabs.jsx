import React from 'react';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Login' },
    { id: 'register', label: 'Register' }
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-150 touch-target ${
            activeTab === tab.id
              ? 'bg-surface text-text-primary clinical-shadow'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;