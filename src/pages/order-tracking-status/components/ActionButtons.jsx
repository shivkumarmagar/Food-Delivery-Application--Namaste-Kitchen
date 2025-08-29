import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ 
  currentStatus, 
  onContactRestaurant, 
  onCallDriver, 
  onReportIssue,
  onReorder,
  onRateOrder,
  isDriverAssigned 
}) => {
  const isDelivered = currentStatus === 'delivered';
  const canContactDriver = isDriverAssigned && !isDelivered;
  const canContactRestaurant = !isDelivered;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="font-heading font-semibold text-foreground mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Contact Restaurant */}
        {canContactRestaurant && (
          <Button
            variant="outline"
            onClick={onContactRestaurant}
            iconName="Phone"
            iconPosition="left"
            className="justify-start"
          >
            Contact Restaurant
          </Button>
        )}

        {/* Call Driver */}
        {canContactDriver && (
          <Button
            variant="outline"
            onClick={onCallDriver}
            iconName="MessageCircle"
            iconPosition="left"
            className="justify-start"
          >
            Call Driver
          </Button>
        )}

        {/* Report Issue */}
        {!isDelivered && (
          <Button
            variant="outline"
            onClick={onReportIssue}
            iconName="AlertTriangle"
            iconPosition="left"
            className="justify-start text-warning hover:text-warning"
          >
            Report Issue
          </Button>
        )}

        {/* Rate Order (only when delivered) */}
        {isDelivered && (
          <Button
            variant="default"
            onClick={onRateOrder}
            iconName="Star"
            iconPosition="left"
            className="justify-start"
          >
            Rate Order
          </Button>
        )}

        {/* Reorder (only when delivered) */}
        {isDelivered && (
          <Button
            variant="outline"
            onClick={onReorder}
            iconName="RotateCcw"
            iconPosition="left"
            className="justify-start"
          >
            Reorder
          </Button>
        )}

        {/* Help & Support */}
        <Button
          variant="ghost"
          onClick={() => window.open('/help', '_blank')}
          iconName="HelpCircle"
          iconPosition="left"
          className="justify-start"
        >
          Help & Support
        </Button>
      </div>

      {/* Emergency Contact */}
      {!isDelivered && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-muted-foreground" />
              <span className="text-sm font-body text-muted-foreground">
                Need immediate help?
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('tel:+1-800-FOOD-911', '_self')}
              className="text-error hover:text-error"
            >
              Emergency Contact
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;