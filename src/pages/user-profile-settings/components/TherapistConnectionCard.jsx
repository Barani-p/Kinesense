import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TherapistConnectionCard = ({ connections, onUpdate }) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [therapistEmail, setTherapistEmail] = useState('');

  const mockConnections = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Physical Therapy",
      clinic: "Metro Rehabilitation Center",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      status: "active",
      connectedSince: "March 2024",
      permissions: ["view_progress", "assign_exercises", "modify_routines"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Sports Medicine",
      clinic: "Elite Sports Clinic",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      status: "pending",
      connectedSince: null,
      permissions: []
    }
  ];

  const handleInviteSubmit = () => {
    // Mock invite functionality
    if (inviteCode || therapistEmail) {
      setShowInviteForm(false);
      setInviteCode('');
      setTherapistEmail('');
      // Show success message
    }
  };

  const handlePermissionToggle = (connectionId, permission) => {
    // Mock permission update
    console.log('Toggling permission:', permission, 'for connection:', connectionId);
  };

  const handleDisconnect = (connectionId) => {
    // Mock disconnect functionality
    console.log('Disconnecting from therapist:', connectionId);
  };

  return (
    <div className="bg-card rounded-lg clinical-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="Users" size={20} className="text-secondary" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">Therapist Connections</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowInviteForm(!showInviteForm)}
        >
          Connect Therapist
        </Button>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-4">Connect with Your Therapist</h3>
          <div className="space-y-4">
            <Input
              label="Therapist Invitation Code"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Enter 6-digit code from your therapist"
              description="Your therapist will provide this code during your appointment"
            />
            
            <div className="flex items-center space-x-4">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-sm text-text-secondary">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>
            
            <Input
              label="Therapist Email Address"
              type="email"
              value={therapistEmail}
              onChange={(e) => setTherapistEmail(e.target.value)}
              placeholder="therapist@clinic.com"
              description="Send a connection request to your therapist"
            />
            
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handleInviteSubmit}
                disabled={!inviteCode && !therapistEmail}
              >
                Send Request
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowInviteForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Connected Therapists */}
      <div className="space-y-4">
        {mockConnections.map((connection) => (
          <div key={connection.id} className="bg-muted rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden clinical-border">
                <img
                  src={connection.avatar}
                  alt={`${connection.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-text-primary">{connection.name}</h3>
                    <p className="text-sm text-text-secondary">{connection.specialty}</p>
                    <p className="text-sm text-text-secondary">{connection.clinic}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      connection.status === 'active' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                    }`}>
                      {connection.status === 'active' ? 'Connected' : 'Pending'}
                    </span>
                    
                    {connection.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="MoreVertical"
                        className="text-text-secondary"
                      />
                    )}
                  </div>
                </div>
                
                {connection.status === 'active' && (
                  <>
                    <div className="text-sm text-text-secondary mb-3">
                      Connected since {connection.connectedSince}
                    </div>
                    
                    {/* Permissions */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-text-primary">Permissions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">View Progress</span>
                          <button
                            onClick={() => handlePermissionToggle(connection.id, 'view_progress')}
                            className="relative inline-flex h-5 w-9 items-center rounded-full bg-primary transition-colors"
                          >
                            <span className="inline-block h-3 w-3 transform rounded-full bg-white translate-x-5 transition-transform" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Assign Exercises</span>
                          <button
                            onClick={() => handlePermissionToggle(connection.id, 'assign_exercises')}
                            className="relative inline-flex h-5 w-9 items-center rounded-full bg-primary transition-colors"
                          >
                            <span className="inline-block h-3 w-3 transform rounded-full bg-white translate-x-5 transition-transform" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Modify Routines</span>
                          <button
                            onClick={() => handlePermissionToggle(connection.id, 'modify_routines')}
                            className="relative inline-flex h-5 w-9 items-center rounded-full bg-primary transition-colors"
                          >
                            <span className="inline-block h-3 w-3 transform rounded-full bg-white translate-x-5 transition-transform" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Emergency Contact</span>
                          <button
                            className="relative inline-flex h-5 w-9 items-center rounded-full bg-border transition-colors"
                          >
                            <span className="inline-block h-3 w-3 transform rounded-full bg-white translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="UserMinus"
                        iconPosition="left"
                        onClick={() => handleDisconnect(connection.id)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </>
                )}
                
                {connection.status === 'pending' && (
                  <div className="flex items-center space-x-3 mt-3">
                    <Button variant="default" size="sm">
                      Accept
                    </Button>
                    <Button variant="outline" size="sm">
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {mockConnections.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No Therapist Connections</h3>
            <p className="text-text-secondary mb-4">
              Connect with your healthcare provider to enable remote monitoring and personalized exercise programs.
            </p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowInviteForm(true)}
            >
              Connect Your First Therapist
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistConnectionCard;