import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeliveryPersonCard = ({ deliveryPerson, estimatedArrival, onCallDriver, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">Delivery Driver</h3>
        <div className="flex items-center space-x-1 text-sm text-success">
          <Icon name="Truck" size={14} />
          <span className="font-body">On the way</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Driver Photo */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
          <Image 
            src={deliveryPerson?.photo} 
            alt={deliveryPerson?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Driver Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-body font-semibold text-foreground">
            {deliveryPerson?.name}
          </h4>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-accent fill-current" />
              <span className="font-mono">{deliveryPerson?.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Package" size={14} />
              <span className="font-body">{deliveryPerson?.deliveries} deliveries</span>
            </div>
          </div>
        </div>

        {/* Call Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={onCallDriver}
          className="flex-shrink-0"
        >
          <Icon name="Phone" size={18} />
        </Button>
      </div>
      {/* Vehicle Info */}
      <div className="mt-4 p-3 bg-muted rounded-md">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Car" size={16} className="text-muted-foreground" />
            <span className="font-body text-muted-foreground">
              {deliveryPerson?.vehicle?.type} • {deliveryPerson?.vehicle?.plateNumber}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-primary">
            <Icon name="Clock" size={14} />
            <span className="font-mono font-medium">
              Arrives in {estimatedArrival}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPersonCard;