import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PromoCodeSection = ({ 
  appliedPromo, 
  onApplyPromo, 
  onRemovePromo 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const availablePromoCodes = [
    {
      code: 'WELCOME20',
      discount: 20,
      type: 'percentage',
      description: '20% off your first order',
      minOrder: 25
    },
    {
      code: 'FREESHIP',
      discount: 5,
      type: 'fixed',
      description: 'Free delivery',
      minOrder: 15
    },
    {
      code: 'SAVE10',
      discount: 10,
      type: 'fixed',
      description: '$10 off orders over $50',
      minOrder: 50
    }
  ];

  const handleApplyPromo = async () => {
    if (!promoCode?.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const foundPromo = availablePromoCodes?.find(
        promo => promo?.code?.toLowerCase() === promoCode?.toLowerCase()
      );

      if (foundPromo) {
        onApplyPromo(foundPromo);
        setPromoCode('');
        setError('');
      } else {
        setError('Invalid promo code. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleRemovePromo = () => {
    onRemovePromo();
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleApplyPromo();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <h2 className="font-body font-semibold text-foreground text-lg mb-4">
        Promo Code
      </h2>
      {!appliedPromo ? (
        <div className="space-y-4">
          {/* Promo Code Input */}
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e?.target?.value?.toUpperCase());
                  if (error) setError('');
                }}
                onKeyPress={handleKeyPress}
                error={error}
                className="font-mono"
              />
            </div>
            <Button
              variant="outline"
              onClick={handleApplyPromo}
              loading={isLoading}
              disabled={!promoCode?.trim()}
            >
              Apply
            </Button>
          </div>

          {/* Available Promo Codes */}
          <div className="space-y-2">
            <p className="font-body font-medium text-foreground text-sm">
              Available Offers:
            </p>
            {availablePromoCodes?.map((promo) => (
              <button
                key={promo?.code}
                onClick={() => setPromoCode(promo?.code)}
                className="w-full text-left p-3 bg-muted hover:bg-muted/80 rounded-lg transition-smooth"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-mono font-semibold text-primary text-sm">
                        {promo?.code}
                      </span>
                      <Icon name="Tag" size={14} className="text-primary" />
                    </div>
                    <p className="font-caption text-muted-foreground text-xs">
                      {promo?.description} • Min order ${promo?.minOrder}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Applied Promo Code */
        (<div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} className="text-success-foreground" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-mono font-semibold text-success text-sm">
                    {appliedPromo?.code}
                  </span>
                  <span className="font-body font-medium text-success text-sm">
                    Applied!
                  </span>
                </div>
                <p className="font-caption text-success text-xs">
                  {appliedPromo?.description}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemovePromo}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>)
      )}
      {/* Terms Notice */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="text-muted-foreground mt-0.5" />
          <p className="font-caption text-muted-foreground text-xs">
            Promo codes cannot be combined. Some restrictions may apply. Valid for limited time only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeSection;