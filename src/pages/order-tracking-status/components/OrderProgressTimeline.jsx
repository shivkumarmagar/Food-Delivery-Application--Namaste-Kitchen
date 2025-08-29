import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderProgressTimeline = ({ currentStatus, orderStages, orderTime }) => {
  const getStatusIcon = (status, isActive, isCompleted) => {
    const iconMap = {
      'confirmed': 'CheckCircle',
      'preparing': 'ChefHat',
      'ready': 'Clock',
      'dispatched': 'Truck',
      'delivered': 'Package'
    };

    if (isCompleted) {
      return 'CheckCircle';
    }
    
    return iconMap?.[status] || 'Circle';
  };

  const getStatusColor = (status, isActive, isCompleted) => {
    if (isCompleted) return 'text-success';
    if (isActive) return 'text-primary';
    return 'text-muted-foreground';
  };

  const getConnectorColor = (isCompleted) => {
    return isCompleted ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-semibold text-foreground">Order Progress</h2>
        <span className="text-sm font-mono text-muted-foreground">
          Ordered at {orderTime}
        </span>
      </div>
      <div className="relative">
        {orderStages?.map((stage, index) => {
          const isActive = stage?.status === currentStatus;
          const isCompleted = stage?.completed;
          const isLast = index === orderStages?.length - 1;

          return (
            <div key={stage?.status} className="relative flex items-start">
              {/* Timeline connector */}
              {!isLast && (
                <div 
                  className={`absolute left-6 top-12 w-0.5 h-16 ${getConnectorColor(isCompleted)}`}
                />
              )}
              {/* Status icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                isCompleted 
                  ? 'bg-success border-success' 
                  : isActive 
                    ? 'bg-primary border-primary' :'bg-background border-border'
              }`}>
                <Icon 
                  name={getStatusIcon(stage?.status, isActive, isCompleted)} 
                  size={20} 
                  color={isCompleted || isActive ? 'white' : 'currentColor'}
                  className={!isCompleted && !isActive ? 'text-muted-foreground' : ''}
                />
              </div>
              {/* Status content */}
              <div className="ml-4 flex-1 pb-8">
                <div className="flex items-center justify-between">
                  <h3 className={`font-body font-semibold ${
                    isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {stage?.title}
                  </h3>
                  {stage?.timestamp && (
                    <span className="text-sm font-mono text-muted-foreground">
                      {stage?.timestamp}
                    </span>
                  )}
                </div>
                <p className="text-sm font-body text-muted-foreground mt-1">
                  {stage?.description}
                </p>
                {stage?.estimatedTime && !isCompleted && (
                  <p className="text-sm font-body text-accent mt-1">
                    Estimated: {stage?.estimatedTime}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgressTimeline;