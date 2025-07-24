import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecuritySettingsCard = ({ onUpdate }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "2 minutes ago",
      current: true,
      ip: "192.168.1.100"
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, NY",
      lastActive: "1 hour ago",
      current: false,
      ip: "192.168.1.101"
    },
    {
      id: 3,
      device: "Chrome on Android",
      location: "New York, NY",
      lastActive: "3 days ago",
      current: false,
      ip: "192.168.1.102"
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = () => {
    // Mock password change
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      // Show success message
    }
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Mock 2FA setup/disable
  };

  const handleSessionTerminate = (sessionId) => {
    // Mock session termination
    console.log('Terminating session:', sessionId);
  };

  return (
    <div className="bg-card rounded-lg clinical-shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-destructive/10 rounded-lg">
          <Icon name="Shield" size={20} className="text-destructive" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary">Account Security</h2>
      </div>

      <div className="space-y-6">
        {/* Password Change */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Key" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Password</div>
                <div className="text-sm text-text-secondary">Last changed 3 months ago</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              {isChangingPassword ? 'Cancel' : 'Change Password'}
            </Button>
          </div>

          {isChangingPassword && (
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                required
              />
              <Input
                label="New Password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                description="Must be at least 8 characters with uppercase, lowercase, and numbers"
                required
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                error={passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword ? 'Passwords do not match' : ''}
                required
              />
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={handlePasswordSubmit}
                  disabled={!passwordForm.currentPassword || !passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirmPassword}
                >
                  Update Password
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-text-secondary">
                  {twoFactorEnabled ? 'Enabled via authenticator app' : 'Add an extra layer of security'}
                </div>
              </div>
            </div>
            <button
              onClick={handleTwoFactorToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorEnabled ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {twoFactorEnabled && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-success">
                <Icon name="CheckCircle" size={16} />
                <span>Two-factor authentication is active</span>
              </div>
              <Button variant="outline" size="sm">
                View Recovery Codes
              </Button>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Monitor" size={20} className="text-text-secondary" />
              <div>
                <div className="font-medium">Active Sessions</div>
                <div className="text-sm text-text-secondary">Manage your logged-in devices</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSessions(!showSessions)}
            >
              {showSessions ? 'Hide' : 'View All'}
            </Button>
          </div>

          {showSessions && (
            <div className="space-y-3">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-card rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={session.device.includes('iPhone') ? 'Smartphone' : session.device.includes('Android') ? 'Smartphone' : 'Monitor'} 
                      size={16} 
                      className="text-text-secondary" 
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {session.device}
                        {session.current && (
                          <span className="ml-2 px-2 py-1 bg-success text-success-foreground text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {session.location} • {session.lastActive} • {session.ip}
                      </div>
                    </div>
                  </div>
                  {!session.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => handleSessionTerminate(session.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      End
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="destructive" size="sm" className="w-full">
                End All Other Sessions
              </Button>
            </div>
          )}
        </div>

        {/* Login Alerts */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-text-secondary" />
            <div>
              <div className="font-medium">Login Alerts</div>
              <div className="text-sm text-text-secondary">Get notified of new sign-ins</div>
            </div>
          </div>
          <button
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors"
          >
            <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsCard;