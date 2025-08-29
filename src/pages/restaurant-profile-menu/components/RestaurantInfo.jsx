import React from 'react';
import Icon from '../../../components/AppIcon';

const RestaurantInfo = ({ restaurant }) => {
  const infoSections = [
    {
      title: "Hours",
      icon: "Clock",
      content: (
        <div className="space-y-2">
          {restaurant?.hours?.map((day, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-body text-muted-foreground">{day?.day}</span>
              <span className="font-body text-foreground">{day?.hours}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Location & Contact",
      icon: "MapPin",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-body text-foreground">{restaurant?.address}</p>
            <p className="font-caption text-sm text-muted-foreground">
              {restaurant?.city}, {restaurant?.state} {restaurant?.zipCode}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-muted-foreground" />
            <span className="font-body text-foreground">{restaurant?.phone}</span>
          </div>
          
          {restaurant?.website && (
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <a 
                href={restaurant?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-primary hover:text-primary/80 transition-smooth"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Delivery Information",
      icon: "Truck",
      content: (
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-body text-muted-foreground">Delivery Time</span>
            <span className="font-body text-foreground">{restaurant?.deliveryTime}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-body text-muted-foreground">Delivery Fee</span>
            <span className="font-body text-foreground">
              {restaurant?.deliveryFee === 0 ? 'Free' : `$${restaurant?.deliveryFee?.toFixed(2)}`}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-body text-muted-foreground">Minimum Order</span>
            <span className="font-body text-foreground">${restaurant?.minimumOrder}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-body text-muted-foreground">Delivery Radius</span>
            <span className="font-body text-foreground">{restaurant?.deliveryRadius} miles</span>
          </div>
        </div>
      )
    },
    {
      title: "Food Safety & Certifications",
      icon: "Shield",
      content: (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-body text-foreground">Health Department Grade: A</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-body text-foreground">Food Handler Certified</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-body text-foreground">Allergen Information Available</span>
          </div>
          
          {restaurant?.certifications && restaurant?.certifications?.length > 0 && (
            <div className="pt-2">
              <p className="font-body font-medium text-foreground mb-2">Certifications:</p>
              <div className="flex flex-wrap gap-2">
                {restaurant?.certifications?.map((cert, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-success/10 text-success text-xs font-caption rounded-md"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {infoSections?.map((section, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={section?.icon} size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {section?.title}
            </h3>
          </div>
          
          {section?.content}
        </div>
      ))}
      {/* Map */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Map" size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Location
            </h3>
          </div>
        </div>
        
        <div className="h-64">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={`${restaurant?.name} location`}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${restaurant?.coordinates?.lat},${restaurant?.coordinates?.lng}&z=15&output=embed`}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;