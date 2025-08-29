import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = (colorName) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-error/10 text-error',
      accent: 'bg-accent/10 text-accent-foreground'
    };
    return colors?.[colorName] || colors?.primary;
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-elevated transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon name={getChangeIcon(changeType)} size={16} />
            <span className="text-sm font-mono font-medium">
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-body text-sm text-muted-foreground">
          {title}
        </h3>
        <p className="font-heading font-bold text-2xl text-foreground">
          {value}
        </p>
      </div>

      {change !== undefined && (
        <p className="text-xs font-caption text-muted-foreground mt-2">
          {changeType === 'positive' ? '+' : changeType === 'negative' ? '-' : ''}
          {Math.abs(change)}% from yesterday
        </p>
      )}
    </div>
  );
};

export default MetricsCard;