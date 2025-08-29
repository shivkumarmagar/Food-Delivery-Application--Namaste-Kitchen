import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryMap = ({ 
  restaurantLocation, 
  deliveryLocation, 
  currentDriverLocation, 
  isDriverAssigned 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Mock coordinates for demonstration
  const mapCenter = currentDriverLocation || restaurantLocation;
  const mapUrl = `https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=14&output=embed`;

  return (
    <div className={`bg-card rounded-lg border border-border overflow-hidden ${
      isFullscreen ? 'fixed inset-4 z-50' : 'relative'
    }`}>
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            {isDriverAssigned ? 'Live Tracking' : 'Delivery Route'}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          {isDriverAssigned && (
            <div className="flex items-center space-x-1 text-sm text-success">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="font-body">Live</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={18} />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className={`relative ${isFullscreen ? 'h-[calc(100vh-8rem)]' : 'h-64 sm:h-80'}`}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Delivery Tracking Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          className="border-0"
        />

        {/* Map Overlay Info */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          {/* Restaurant Marker Info */}
          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border shadow-card">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="font-body text-foreground">Restaurant</span>
            </div>
          </div>

          {/* Driver Marker Info */}
          {isDriverAssigned && (
            <div className="bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border shadow-card">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="font-body text-foreground">Driver</span>
              </div>
            </div>
          )}

          {/* Delivery Marker Info */}
          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-2 border border-border shadow-card">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="font-body text-foreground">Your Location</span>
            </div>
          </div>
        </div>

        {/* Distance and ETA Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border shadow-card">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Navigation" size={14} className="text-primary" />
                  <span className="font-body text-muted-foreground">Distance:</span>
                  <span className="font-mono text-foreground">2.3 km</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} className="text-accent" />
                  <span className="font-body text-muted-foreground">ETA:</span>
                  <span className="font-mono text-foreground">15-20 min</span>
                </div>
              </div>
              {isDriverAssigned && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="Zap" size={14} />
                  <span className="font-body">Tracking</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close Fullscreen Button */}
      {isFullscreen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="absolute top-2 right-2 bg-card/80 backdrop-blur-sm"
        >
          <Icon name="X" size={20} />
        </Button>
      )}
    </div>
  );
};

export default DeliveryMap;