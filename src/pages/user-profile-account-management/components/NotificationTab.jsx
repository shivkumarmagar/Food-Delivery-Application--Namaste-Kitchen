import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationTab = ({ preferences, onSave }) => {
  const [settings, setSettings] = useState(preferences);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (category, type) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [type]: !prev?.[category]?.[type]
      }
    }));
    setIsSaved(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      onSave(settings);
      setIsLoading(false);
      setIsSaved(true);
      
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  const notificationCategories = [
    {
      id: 'orders',
      title: 'Order Updates',
      description: 'Get notified about your order status, delivery updates, and confirmations',
      icon: 'Package'
    },
    {
      id: 'promotions',
      title: 'Promotions & Offers',
      description: 'Receive special deals, discounts, and promotional offers from restaurants',
      icon: 'Tag'
    },
    {
      id: 'restaurants',
      title: 'Restaurant Updates',
      description: 'New menu items, restaurant news, and updates from your favorite places',
      icon: 'Store'
    },
    {
      id: 'account',
      title: 'Account & Security',
      description: 'Important account updates, security alerts, and profile changes',
      icon: 'Shield'
    },
    {
      id: 'reviews',
      title: 'Reviews & Ratings',
      description: 'Reminders to rate your orders and responses to your reviews',
      icon: 'Star'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {isSaved && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <span className="text-success font-body">Notification preferences updated successfully!</span>
        </div>
      )}
      {/* Header */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Notification Preferences
        </h3>
        <p className="text-muted-foreground font-body">
          Choose how you'd like to receive notifications about your orders and account
        </p>
      </div>
      {/* Notification Categories */}
      <div className="space-y-6">
        {notificationCategories?.map((category) => (
          <div key={category?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={category?.icon} size={20} className="text-primary" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {category?.title}
                </h4>
                <p className="text-muted-foreground font-body text-sm mb-4">
                  {category?.description}
                </p>
                
                {/* Notification Types */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <span className="font-body text-foreground">Email</span>
                    </div>
                    <Checkbox
                      checked={settings?.[category?.id]?.email || false}
                      onChange={() => handleToggle(category?.id, 'email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                      <span className="font-body text-foreground">SMS</span>
                    </div>
                    <Checkbox
                      checked={settings?.[category?.id]?.sms || false}
                      onChange={() => handleToggle(category?.id, 'sms')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon name="Bell" size={16} className="text-muted-foreground" />
                      <span className="font-body text-foreground">Push Notifications</span>
                    </div>
                    <Checkbox
                      checked={settings?.[category?.id]?.push || false}
                      onChange={() => handleToggle(category?.id, 'push')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Global Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-heading font-semibold text-foreground mb-4">
          Global Settings
        </h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-body text-foreground">Do Not Disturb</div>
              <div className="text-muted-foreground font-caption text-sm">
                Pause all non-critical notifications (9 PM - 8 AM)
              </div>
            </div>
            <Checkbox
              checked={settings?.doNotDisturb || false}
              onChange={() => setSettings(prev => ({ ...prev, doNotDisturb: !prev?.doNotDisturb }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-body text-foreground">Marketing Communications</div>
              <div className="text-muted-foreground font-caption text-sm">
                Receive newsletters and marketing updates
              </div>
            </div>
            <Checkbox
              checked={settings?.marketing || false}
              onChange={() => setSettings(prev => ({ ...prev, marketing: !prev?.marketing }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-body text-foreground">Weekly Summary</div>
              <div className="text-muted-foreground font-caption text-sm">
                Get a weekly summary of your orders and activity
              </div>
            </div>
            <Checkbox
              checked={settings?.weeklySummary || false}
              onChange={() => setSettings(prev => ({ ...prev, weeklySummary: !prev?.weeklySummary }))}
            />
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
        >
          Save Preferences
        </Button>
      </div>
      {/* Information Notice */}
      <div className="bg-muted border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h5 className="font-body font-medium text-foreground mb-1">
              About Notifications
            </h5>
            <p className="text-muted-foreground font-caption text-sm">
              You can change these preferences at any time. Critical notifications about your orders and account security will always be sent regardless of your preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;