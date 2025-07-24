import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onAvatarChange }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const handleNameSave = () => {
    // Mock save functionality
    setIsEditingName(false);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAvatarChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-card rounded-lg clinical-shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden clinical-border">
            <Image
              src={user.avatar}
              alt={`${user.name}'s profile picture`}
              className="w-full h-full object-cover"
            />
          </div>
          <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer clinical-shadow micro-scale">
            <Icon name="Camera" size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* User Info Section */}
        <div className="flex-1 text-center md:text-left">
          {/* Name Section */}
          <div className="mb-2">
            {isEditingName ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="text-2xl font-semibold bg-transparent border-b-2 border-primary focus:outline-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Check"
                  onClick={handleNameSave}
                  className="text-success"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={() => {
                    setIsEditingName(false);
                    setTempName(user.name);
                  }}
                  className="text-destructive"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <h1 className="text-2xl font-semibold text-text-primary">{user.name}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Edit2"
                  onClick={() => setIsEditingName(true)}
                  className="text-text-secondary hover:text-text-primary"
                />
              </div>
            )}
          </div>

          {/* Account Type Badge */}
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.accountType === 'therapist' ?'bg-secondary text-secondary-foreground' :'bg-primary text-primary-foreground'
            }`}>
              {user.accountType === 'therapist' ? 'Healthcare Professional' : 'Patient'}
            </span>
            {user.isPremium && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-warning text-warning-foreground">
                Premium
              </span>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-1 text-text-secondary">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Icon name="Mail" size={16} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Icon name="Phone" size={16} />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Icon name="Calendar" size={16} />
              <span>Member since {user.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
          <div>
            <div className="text-2xl font-semibold text-primary">{user.stats.totalSessions}</div>
            <div className="text-sm text-text-secondary">Sessions</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-secondary">{user.stats.streakDays}</div>
            <div className="text-sm text-text-secondary">Day Streak</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-warning">{user.stats.accuracy}%</div>
            <div className="text-sm text-text-secondary">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;