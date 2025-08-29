import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import MenuItem from './MenuItem';

const MenuCategory = ({ category, onAddToCart, searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredItems = category?.items?.filter(item =>
    item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    item?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  if (filteredItems?.length === 0 && searchTerm) {
    return null;
  }

  return (
    <div className="mb-8" id={`category-${category?.id}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-muted rounded-lg mb-4 hover:bg-muted/80 transition-smooth"
      >
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground text-left">
            {category?.name}
          </h2>
          <p className="text-sm text-muted-foreground text-left mt-1">
            {category?.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground font-caption">
            {filteredItems?.length} items
          </span>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </div>
      </button>
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems?.map((item) => (
            <MenuItem
              key={item?.id}
              item={item}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategory;