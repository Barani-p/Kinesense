import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Healthcare data protection'
    },
    {
      icon: 'Lock',
      title: 'SSL Encrypted',
      description: 'Secure data transmission'
    },
    {
      icon: 'Award',
      title: 'FDA Cleared',
      description: 'Medical device certification'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t clinical-border">
      <div className="text-center mb-4">
        <p className="text-sm text-text-secondary">Trusted by healthcare professionals</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {certifications.map((cert, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full">
                <Icon name={cert.icon} size={16} className="text-success" />
              </div>
            </div>
            <h4 className="text-xs font-medium text-text-primary mb-1">{cert.title}</h4>
            <p className="text-xs text-text-secondary">{cert.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} Kinesense. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;