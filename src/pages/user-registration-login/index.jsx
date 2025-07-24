import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';

const UserRegistrationLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/exercise-dashboard');
    }
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl"></div>
      </div>

      {/* Main Authentication Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-surface clinical-shadow-lg rounded-2xl p-8 clinical-border">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl clinical-shadow">
                <Icon name="Activity" size={32} color="white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Welcome to Kinesense
            </h1>
            <p className="text-text-secondary text-sm">
              {activeTab === 'login' ?'Sign in to continue your exercise journey' :'Create your account to get started'
              }
            </p>
          </div>

          {/* Authentication Tabs */}
          <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* Form Content */}
          <div className="mb-6">
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>

          {/* Social Login */}
          <SocialLogin />

          {/* Trust Signals */}
          <TrustSignals />
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg clinical-border">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">Demo Credentials:</p>
              <p className="text-blue-700 text-xs">
                <strong>Patient:</strong> patient@kinesense.com / patient123<br />
                <strong>Therapist:</strong> therapist@kinesense.com / therapist123
              </p>
            </div>
          </div>
        </div>

        {/* Background Exercise Images */}
        <div className="hidden lg:block absolute -top-20 -left-40 w-32 h-32 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop"
            alt="Exercise demonstration"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        
        <div className="hidden lg:block absolute -bottom-20 -right-40 w-40 h-40 opacity-20">
          <Image
            src="https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?w=200&h=200&fit=crop"
            alt="Physical therapy session"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationLogin;