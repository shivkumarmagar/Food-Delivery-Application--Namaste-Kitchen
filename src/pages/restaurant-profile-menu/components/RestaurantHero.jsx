import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RestaurantHero = ({ restaurant }) => {
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        <Image
          src={restaurant?.coverImage}
          alt={`${restaurant?.name} restaurant cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      {/* Restaurant Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2">
            {restaurant?.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-accent fill-current" />
              <span className="font-body font-semibold">{restaurant?.rating}</span>
              <span className="font-caption text-sm opacity-80">
                ({restaurant?.reviewCount} reviews)
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} className="opacity-80" />
              <span className="font-body text-sm">{restaurant?.deliveryTime}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} className="opacity-80" />
              <span className="font-body text-sm">{restaurant?.distance}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-caption rounded-full">
              {restaurant?.cuisine}
            </span>
            
            {restaurant?.minimumOrder && (
              <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-caption rounded-full">
                Min. ${restaurant?.minimumOrder}
              </span>
            )}
            
            {restaurant?.freeDelivery && (
              <span className="px-3 py-1 bg-success text-success-foreground text-sm font-caption rounded-full">
                Free Delivery
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 text-sm font-caption rounded-full ${
          restaurant?.isOpen 
            ? 'bg-success text-success-foreground' 
            : 'bg-error text-error-foreground'
        }`}>
          {restaurant?.isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
    </div>
  );
};

export default RestaurantHero;