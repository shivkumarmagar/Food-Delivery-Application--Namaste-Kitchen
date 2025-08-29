import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemoveItem, 
  onEditItem 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      onUpdateQuantity(item?.id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemoveItem(item?.id);
    setShowRemoveDialog(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 shadow-card">
        <div className="flex items-start space-x-4">
          {/* Food Image */}
          <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-body font-semibold text-foreground text-sm">
                  {item?.name}
                </h3>
                <p className="font-caption text-xs text-muted-foreground mt-1">
                  {item?.restaurant}
                </p>
                <p className="font-mono font-semibold text-primary text-sm mt-1">
                  ${item?.price?.toFixed(2)}
                </p>
              </div>

              {/* Expand Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleExpanded}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon 
                  name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                />
              </Button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1}
                  className="w-8 h-8"
                >
                  <Icon name="Minus" size={14} />
                </Button>
                <span className="font-mono font-medium text-foreground min-w-[2rem] text-center">
                  {item?.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  className="w-8 h-8"
                >
                  <Icon name="Plus" size={14} />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditItem(item?.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Edit2" size={14} />
                  <span className="ml-1 font-caption text-xs">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRemoveDialog(true)}
                  className="text-error hover:bg-error/10"
                >
                  <Icon name="Trash2" size={14} />
                  <span className="ml-1 font-caption text-xs">Remove</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border animate-slide-in">
            {item?.customizations && item?.customizations?.length > 0 && (
              <div className="mb-3">
                <h4 className="font-body font-medium text-foreground text-xs mb-2">
                  Customizations:
                </h4>
                <div className="space-y-1">
                  {item?.customizations?.map((customization, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-caption text-xs text-muted-foreground">
                        {customization?.name}
                      </span>
                      {customization?.price > 0 && (
                        <span className="font-mono text-xs text-muted-foreground">
                          +${customization?.price?.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item?.specialInstructions && (
              <div className="mb-3">
                <h4 className="font-body font-medium text-foreground text-xs mb-1">
                  Special Instructions:
                </h4>
                <p className="font-caption text-xs text-muted-foreground">
                  {item?.specialInstructions}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-border">
              <span className="font-body font-medium text-foreground text-sm">
                Item Total:
              </span>
              <span className="font-mono font-semibold text-primary text-sm">
                ${(item?.price * item?.quantity)?.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Remove Confirmation Dialog */}
      {showRemoveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-lg p-6 mx-4 max-w-sm w-full shadow-modal">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-foreground text-sm">
                  Remove Item
                </h3>
                <p className="font-caption text-xs text-muted-foreground mt-1">
                  Are you sure you want to remove this item from your cart?
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowRemoveDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleRemove}
                className="flex-1"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;