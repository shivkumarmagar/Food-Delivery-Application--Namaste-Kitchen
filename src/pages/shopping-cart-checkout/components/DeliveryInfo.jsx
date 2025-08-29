import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeliveryInfo = ({ 
  selectedAddress, 
  estimatedTime, 
  onEditAddress 
}) => {
  const [showAddressOptions, setShowAddressOptions] = useState(false);

  const savedAddresses = [
    {
      id: 1,
      type: "Home",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      isDefault: true
    },
    {
      id: 2,
      type: "Work",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10002",
      isDefault: false
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-body font-semibold text-foreground text-lg">
          Delivery Information
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAddressOptions(!showAddressOptions)}
          className="text-primary hover:text-primary/80"
        >
          <Icon name="Edit2" size={14} />
          <span className="ml-1 font-caption text-xs">Change</span>
        </Button>
      </div>
      {/* Current Address */}
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
            <Icon name="MapPin" size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-body font-medium text-foreground text-sm">
                {selectedAddress?.type}
              </span>
              {selectedAddress?.isDefault && (
                <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-caption rounded-md">
                  Default
                </span>
              )}
            </div>
            <p className="font-body text-muted-foreground text-sm">
              {selectedAddress?.address}
            </p>
            <p className="font-body text-muted-foreground text-sm">
              {selectedAddress?.city}
            </p>
          </div>
        </div>

        {/* Estimated Delivery Time */}
        <div className="flex items-center space-x-3 pt-3 border-t border-border">
          <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Clock" size={16} className="text-accent-foreground" />
          </div>
          <div>
            <p className="font-body font-medium text-foreground text-sm">
              Estimated Delivery
            </p>
            <p className="font-body text-muted-foreground text-sm">
              {estimatedTime} minutes
            </p>
          </div>
        </div>
      </div>
      {/* Address Options */}
      {showAddressOptions && (
        <div className="mt-4 pt-4 border-t border-border animate-slide-in">
          <h3 className="font-body font-medium text-foreground text-sm mb-3">
            Choose Address
          </h3>
          <div className="space-y-2">
            {savedAddresses?.map((address) => (
              <button
                key={address?.id}
                onClick={() => {
                  onEditAddress(address);
                  setShowAddressOptions(false);
                }}
                className={`w-full text-left p-3 rounded-lg border transition-smooth ${
                  selectedAddress?.id === address?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-body font-medium text-foreground text-sm">
                        {address?.type}
                      </span>
                      {address?.isDefault && (
                        <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-caption rounded-md">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="font-caption text-muted-foreground text-xs">
                      {address?.address}, {address?.city}
                    </p>
                  </div>
                  {selectedAddress?.id === address?.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => onEditAddress('new')}
            className="w-full mt-3"
          >
            <Icon name="Plus" size={16} />
            <span className="ml-2">Add New Address</span>
          </Button>
        </div>
      )}
      {/* Delivery Area Notice */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="text-muted-foreground mt-0.5" />
          <p className="font-caption text-muted-foreground text-xs">
            We deliver to this area. Delivery time may vary based on weather and traffic conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;