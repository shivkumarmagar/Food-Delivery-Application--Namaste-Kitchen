import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingCartSummary = ({ cartItems, cartTotal, onViewCart, onCheckout }) => {
  const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-modal">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Cart Summary */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon name="ShoppingCart" size={20} className="text-primary-foreground" />
              </div>
              
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                <span className="text-xs font-mono font-bold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              </div>
            </div>

            <div>
              <p className="font-body font-semibold text-foreground">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
              <p className="text-sm text-muted-foreground font-caption">
                Total: ${cartTotal?.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onViewCart}
              iconName="Eye"
              iconPosition="left"
              className="hidden sm:flex"
            >
              View Cart
            </Button>
            
            <Button
              variant="default"
              onClick={onCheckout}
              iconName="CreditCard"
              iconPosition="left"
            >
              Checkout
            </Button>
          </div>
        </div>

        {/* Cart Items Preview (Mobile) */}
        <div className="mt-3 sm:hidden">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {cartItems?.slice(0, 3)?.map((item) => (
              <div
                key={item?.cartId}
                className="flex-shrink-0 flex items-center space-x-2 bg-muted rounded-md p-2"
              >
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-primary">
                    {item?.quantity}
                  </span>
                </div>
                <span className="text-sm font-body text-foreground truncate max-w-24">
                  {item?.name}
                </span>
              </div>
            ))}
            
            {cartItems?.length > 3 && (
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-8 bg-muted rounded-md">
                <span className="text-xs font-caption text-muted-foreground">
                  +{cartItems?.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCartSummary;