import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ 
  subtotal, 
  deliveryFee, 
  taxes, 
  discount, 
  total 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <h2 className="font-body font-semibold text-foreground text-lg mb-4">
        Order Summary
      </h2>
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="font-body text-muted-foreground text-sm">
            Subtotal
          </span>
          <span className="font-mono text-foreground text-sm">
            ${subtotal?.toFixed(2)}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-body text-muted-foreground text-sm">
              Delivery Fee
            </span>
            <Icon name="Truck" size={14} className="text-muted-foreground" />
          </div>
          <span className="font-mono text-foreground text-sm">
            {deliveryFee === 0 ? 'Free' : `$${deliveryFee?.toFixed(2)}`}
          </span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between items-center">
          <span className="font-body text-muted-foreground text-sm">
            Taxes & Fees
          </span>
          <span className="font-mono text-foreground text-sm">
            ${taxes?.toFixed(2)}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-body text-success text-sm">
                Discount
              </span>
              <Icon name="Tag" size={14} className="text-success" />
            </div>
            <span className="font-mono text-success text-sm">
              -${discount?.toFixed(2)}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-border my-3"></div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-body font-semibold text-foreground text-base">
            Total
          </span>
          <span className="font-mono font-bold text-primary text-lg">
            ${total?.toFixed(2)}
          </span>
        </div>
      </div>
      {/* Savings Badge */}
      {discount > 0 && (
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-caption text-success text-xs">
              You saved ${discount?.toFixed(2)} on this order!
            </span>
          </div>
        </div>
      )}
      {/* Free Delivery Badge */}
      {deliveryFee === 0 && subtotal >= 25 && (
        <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={16} className="text-accent-foreground" />
            <span className="font-caption text-accent-foreground text-xs">
              Free delivery on orders over $25!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;