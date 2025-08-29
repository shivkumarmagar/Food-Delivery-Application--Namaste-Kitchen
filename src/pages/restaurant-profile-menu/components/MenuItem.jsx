import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MenuItem = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showCustomization, setShowCustomization] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleOptionChange = (optionId, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: value
    }));
  };

  const calculateTotalPrice = () => {
    let total = item?.price * quantity;
    
    Object.entries(selectedOptions)?.forEach(([optionId, value]) => {
      const option = item?.customizations?.find(opt => opt?.id === optionId);
      if (option && option?.type === 'addon') {
        const addon = option?.options?.find(opt => opt?.value === value);
        if (addon && addon?.price) {
          total += addon?.price * quantity;
        }
      }
    });
    
    return total;
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    const cartItem = {
      ...item,
      quantity,
      selectedOptions,
      totalPrice: calculateTotalPrice(),
      cartId: `${item?.id}-${Date.now()}`
    };
    
    await onAddToCart(cartItem);
    
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
      setSelectedOptions({});
      setShowCustomization(false);
    }, 1000);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-smooth">
      {/* Item Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item?.image}
          alt={item?.name}
          className="w-full h-full object-cover"
        />
        
        {item?.isPopular && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-caption rounded-full">
              Popular
            </span>
          </div>
        )}
        
        {item?.isVegetarian && (
          <div className="absolute top-2 right-2">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-success-foreground rounded-full"></div>
            </div>
          </div>
        )}
      </div>
      {/* Item Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {item?.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-accent fill-current" />
            <span className="text-sm font-body text-muted-foreground">
              {item?.rating}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item?.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-heading font-bold text-primary">
              ${item?.price?.toFixed(2)}
            </span>
            {item?.originalPrice && item?.originalPrice > item?.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${item?.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
          
          {item?.preparationTime && (
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-caption">
                {item?.preparationTime}
              </span>
            </div>
          )}
        </div>

        {/* Customization Options */}
        {item?.customizations && item?.customizations?.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowCustomization(!showCustomization)}
              className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              <Icon name="Settings" size={14} />
              <span>Customize</span>
              <Icon 
                name={showCustomization ? "ChevronUp" : "ChevronDown"} 
                size={14} 
              />
            </button>

            {showCustomization && (
              <div className="mt-3 space-y-3 p-3 bg-muted rounded-md">
                {item?.customizations?.map((customization) => (
                  <div key={customization?.id}>
                    <label className="block text-sm font-body font-medium text-foreground mb-2">
                      {customization?.name}
                      {customization?.required && (
                        <span className="text-error ml-1">*</span>
                      )}
                    </label>
                    
                    <div className="space-y-1">
                      {customization?.options?.map((option) => (
                        <label
                          key={option?.value}
                          className="flex items-center justify-between p-2 rounded border border-border hover:bg-card cursor-pointer transition-smooth"
                        >
                          <div className="flex items-center space-x-2">
                            <input
                              type={customization?.type === 'single' ? 'radio' : 'checkbox'}
                              name={customization?.id}
                              value={option?.value}
                              checked={selectedOptions?.[customization?.id] === option?.value}
                              onChange={(e) => handleOptionChange(customization?.id, e?.target?.value)}
                              className="text-primary"
                            />
                            <span className="text-sm font-body">{option?.label}</span>
                          </div>
                          
                          {option?.price && (
                            <span className="text-sm text-muted-foreground">
                              +${option?.price?.toFixed(2)}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            >
              <Icon name="Minus" size={14} />
            </button>
            
            <span className="font-body font-semibold text-foreground min-w-[2rem] text-center">
              {quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-smooth"
            >
              <Icon name="Plus" size={14} />
            </button>
          </div>

          <Button
            variant="default"
            onClick={handleAddToCart}
            loading={isAdding}
            iconName={isAdding ? "Check" : "ShoppingCart"}
            iconPosition="left"
            className="flex-1 ml-4"
          >
            {isAdding ? 'Added!' : `Add $${calculateTotalPrice()?.toFixed(2)}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;