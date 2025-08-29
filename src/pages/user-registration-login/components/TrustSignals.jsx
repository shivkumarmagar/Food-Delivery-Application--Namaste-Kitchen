import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Encrypted',
      description: 'Your data is protected with SSL encryption'
    },
    {
      icon: 'Clock',
      title: 'Quick Setup',
      description: 'Get started in under 2 minutes'
    },
    {
      icon: 'Users',
      title: 'Trusted by 50K+',
      description: 'Join thousands of satisfied customers'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 text-center md:text-left">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-body font-semibold text-sm text-foreground">
                {feature?.title}
              </h4>
              <p className="font-caption text-xs text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground font-caption">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground font-caption">Privacy Protected</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground font-caption">Verified Platform</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;