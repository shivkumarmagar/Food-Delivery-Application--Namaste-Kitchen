import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderHeader = ({ orderNumber, orderDate, currentStatus, onBackClick }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      'confirmed': 'text-primary bg-primary/10',
      'preparing': 'text-warning bg-warning/10',
      'ready': 'text-accent bg-accent/10',
      'dispatched': 'text-success bg-success/10',
      'delivered': 'text-success bg-success/10'
    };
    return statusColors?.[status] || 'text-muted-foreground bg-muted';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'confirmed': 'Order Confirmed',
      'preparing': 'Being Prepared',
      'ready': 'Ready for Pickup',
      'dispatched': 'Out for Delivery',
      'delivered': 'Delivered'
    };
    return statusTexts?.[status] || 'Unknown Status';
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Back Navigation */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBackClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span className="font-body">Orders</span>
            <Icon name="ChevronRight" size={14} />
            <span className="font-body text-foreground">Tracking</span>
          </div>
        </div>

        {/* Order Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              Order #{orderNumber}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span className="font-body">Placed on {orderDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span className="font-body">Last updated: just now</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full font-body font-medium ${getStatusColor(currentStatus)}`}>
            <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
            <span>{getStatusText(currentStatus)}</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-body text-muted-foreground mb-2">
            <span>Order Progress</span>
            <span>
              {currentStatus === 'delivered' ? '100%' : 
               currentStatus === 'dispatched' ? '80%' :
               currentStatus === 'ready' ? '60%' :
               currentStatus === 'preparing' ? '40%' : '20%'} Complete
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                currentStatus === 'delivered' ? 'bg-success w-full' :
                currentStatus === 'dispatched' ? 'bg-primary w-4/5' :
                currentStatus === 'ready' ? 'bg-accent w-3/5' :
                currentStatus === 'preparing' ? 'bg-warning w-2/5' : 'bg-primary w-1/5'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;