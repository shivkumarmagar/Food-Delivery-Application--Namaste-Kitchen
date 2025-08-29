import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RestaurantInfoCard = ({ restaurant, orderItems, onContactRestaurant }) => {
  const totalItems = orderItems?.reduce((sum, item) => sum + item?.quantity, 0);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start space-x-4">
        {/* Restaurant Image */}
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
          <Image 
            src={restaurant?.image} 
            alt={restaurant?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Restaurant Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
            {restaurant?.name}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-accent fill-current" />
              <span className="font-mono">{restaurant?.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span className="font-body">{restaurant?.distance}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span className="font-body">{restaurant?.deliveryTime}</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-muted rounded-md p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body font-medium text-foreground">
                Your Order ({totalItems} items)
              </span>
              <span className="font-mono font-semibold text-foreground">
                ${orderItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0)?.toFixed(2)}
              </span>
            </div>
            <div className="space-y-1">
              {orderItems?.slice(0, 3)?.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-body text-muted-foreground">
                    {item?.quantity}x {item?.name}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    ${(item?.price * item?.quantity)?.toFixed(2)}
                  </span>
                </div>
              ))}
              {orderItems?.length > 3 && (
                <div className="text-sm font-body text-accent">
                  +{orderItems?.length - 3} more items
                </div>
              )}
            </div>
          </div>

          {/* Contact Button */}
          <Button
            variant="outline"
            onClick={onContactRestaurant}
            iconName="Phone"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Contact Restaurant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfoCard;