import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const OrderDetailsCard = ({ orderDetails, orderItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-6 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center space-x-3">
          <Icon name="Receipt" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">Order Details</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-mono text-sm text-muted-foreground">
            #{orderDetails?.orderNumber}
          </span>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground"
          />
        </div>
      </div>
      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          {/* Order Items */}
          <div className="mt-4 space-y-4">
            <h4 className="font-body font-semibold text-foreground">Items Ordered</h4>
            {orderItems?.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-md">
                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
                  <Image 
                    src={item?.image} 
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-body font-medium text-foreground">{item?.name}</h5>
                  {item?.customizations && item?.customizations?.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {item?.customizations?.join(', ')}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-body text-muted-foreground">
                      Qty: {item?.quantity}
                    </span>
                    <span className="font-mono font-semibold text-foreground">
                      ${(item?.price * item?.quantity)?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="mt-6 space-y-3">
            <h4 className="font-body font-semibold text-foreground">Price Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-body text-muted-foreground">Subtotal</span>
                <span className="font-mono text-foreground">${orderDetails?.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-muted-foreground">Delivery Fee</span>
                <span className="font-mono text-foreground">${orderDetails?.deliveryFee?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-muted-foreground">Service Fee</span>
                <span className="font-mono text-foreground">${orderDetails?.serviceFee?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-muted-foreground">Tax</span>
                <span className="font-mono text-foreground">${orderDetails?.tax?.toFixed(2)}</span>
              </div>
              {orderDetails?.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span className="font-body">Discount</span>
                  <span className="font-mono">-${orderDetails?.discount?.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="font-body text-foreground">Total</span>
                <span className="font-mono text-foreground">${orderDetails?.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h4 className="font-body font-semibold text-foreground mb-2">Payment Method</h4>
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="CreditCard" size={16} className="text-muted-foreground" />
              <span className="font-body text-muted-foreground">
                {orderDetails?.paymentMethod}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mt-6">
            <h4 className="font-body font-semibold text-foreground mb-2">Delivery Address</h4>
            <div className="flex items-start space-x-2 text-sm">
              <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
              <div>
                <p className="font-body text-foreground">{orderDetails?.deliveryAddress?.street}</p>
                <p className="font-body text-muted-foreground">
                  {orderDetails?.deliveryAddress?.city}, {orderDetails?.deliveryAddress?.state} {orderDetails?.deliveryAddress?.zipCode}
                </p>
                {orderDetails?.deliveryAddress?.instructions && (
                  <p className="font-body text-muted-foreground mt-1">
                    Note: {orderDetails?.deliveryAddress?.instructions}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsCard;