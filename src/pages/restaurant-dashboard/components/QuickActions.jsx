import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'toggle-online',
      title: 'Toggle Online Status',
      description: 'Go online/offline for new orders',
      icon: 'Power',
      color: 'success',
      action: () => onAction('toggle-online')
    },
    {
      id: 'bulk-disable',
      title: 'Bulk Disable Items',
      description: 'Disable out-of-stock items',
      icon: 'EyeOff',
      color: 'warning',
      action: () => onAction('bulk-disable')
    },
    {
      id: 'update-hours',
      title: 'Update Hours',
      description: 'Change operating hours',
      icon: 'Clock',
      color: 'primary',
      action: () => onAction('update-hours')
    },
    {
      id: 'promotional-banner',
      title: 'Promotional Banner',
      description: 'Add special offers banner',
      icon: 'Megaphone',
      color: 'accent',
      action: () => onAction('promotional-banner')
    },
    {
      id: 'export-data',
      title: 'Export Data',
      description: 'Download reports and analytics',
      icon: 'Download',
      color: 'secondary',
      action: () => onAction('export-data')
    },
    {
      id: 'customer-support',
      title: 'Customer Support',
      description: 'View pending support tickets',
      icon: 'MessageCircle',
      color: 'primary',
      action: () => onAction('customer-support')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      error: 'bg-error/10 text-error hover:bg-error/20',
      accent: 'bg-accent/10 text-accent-foreground hover:bg-accent/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-4 border-b border-border">
        <h2 className="font-heading font-bold text-xl text-foreground">
          Quick Actions
        </h2>
        <p className="text-sm font-body text-muted-foreground mt-1">
          Common restaurant management tasks
        </p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions?.map(action => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="p-4 bg-background border border-border rounded-lg hover:shadow-card transition-smooth text-left group"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg transition-smooth ${getColorClasses(action?.color)}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-semibold text-foreground group-hover:text-primary transition-smooth">
                    {action?.title}
                  </h3>
                  <p className="text-xs font-caption text-muted-foreground mt-1">
                    {action?.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Emergency Actions */}
      <div className="p-4 border-t border-border bg-error/5">
        <h3 className="font-body font-semibold text-foreground mb-3">
          Emergency Actions
        </h3>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onAction('pause-orders')}
            iconName="Pause"
            iconPosition="left"
            className="flex-1"
          >
            Pause All Orders
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction('emergency-close')}
            iconName="AlertTriangle"
            iconPosition="left"
            className="flex-1 border-error text-error hover:bg-error/10"
          >
            Emergency Close
          </Button>
        </div>
        <p className="text-xs font-caption text-muted-foreground mt-2">
          Use these actions only in emergency situations
        </p>
      </div>
    </div>
  );
};

export default QuickActions;