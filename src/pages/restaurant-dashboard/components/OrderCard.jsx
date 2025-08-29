import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onStatusUpdate, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'accepted':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'preparing':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'ready':
        return 'bg-success/10 text-success border-success/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return { name: 'AlertTriangle', color: 'text-error' };
      case 'medium':
        return { name: 'Clock', color: 'text-warning' };
      default:
        return { name: 'Clock', color: 'text-muted-foreground' };
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const priorityIcon = getPriorityIcon(order?.priority);

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card hover:shadow-elevated transition-smooth">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-heading font-bold text-lg text-foreground">
            #{order?.id}
          </span>
          <Icon 
            name={priorityIcon?.name} 
            size={16} 
            className={priorityIcon?.color} 
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-md text-xs font-caption font-medium border ${getStatusColor(order?.status)}`}>
            {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {formatTime(order?.timestamp)}
          </span>
        </div>
      </div>
      {/* Customer Info */}
      <div className="flex items-center space-x-3 mb-3 p-2 bg-muted/50 rounded-md">
        <Icon name="User" size={16} className="text-muted-foreground" />
        <div className="flex-1">
          <p className="font-body font-medium text-sm text-foreground">
            {order?.customer?.name}
          </p>
          <p className="font-caption text-xs text-muted-foreground">
            {order?.customer?.phone}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.open(`tel:${order?.customer?.phone}`)}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="Phone" size={16} />
        </Button>
      </div>
      {/* Order Items */}
      <div className="space-y-2 mb-3">
        {order?.items?.slice(0, 3)?.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                {item?.quantity}x
              </span>
              <span className="font-body text-foreground">{item?.name}</span>
            </div>
            <span className="font-mono text-muted-foreground">
              ${(item?.price * item?.quantity)?.toFixed(2)}
            </span>
          </div>
        ))}
        {order?.items?.length > 3 && (
          <p className="text-xs font-caption text-muted-foreground">
            +{order?.items?.length - 3} more items
          </p>
        )}
      </div>
      {/* Special Instructions */}
      {order?.specialInstructions && (
        <div className="mb-3 p-2 bg-accent/10 border border-accent/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="MessageSquare" size={14} className="text-accent-foreground mt-0.5" />
            <p className="text-xs font-body text-accent-foreground">
              {order?.specialInstructions}
            </p>
          </div>
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground">
              {order?.estimatedTime} min
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="DollarSign" size={14} className="text-muted-foreground" />
            <span className="text-sm font-mono font-medium text-foreground">
              ${order?.total?.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(order)}
            className="text-xs"
          >
            Details
          </Button>
          {order?.status === 'pending' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onStatusUpdate(order?.id, 'accepted')}
              className="text-xs"
            >
              Accept
            </Button>
          )}
          {order?.status === 'accepted' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onStatusUpdate(order?.id, 'preparing')}
              className="text-xs"
            >
              Start Prep
            </Button>
          )}
          {order?.status === 'preparing' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onStatusUpdate(order?.id, 'ready')}
              className="text-xs"
            >
              Ready
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;