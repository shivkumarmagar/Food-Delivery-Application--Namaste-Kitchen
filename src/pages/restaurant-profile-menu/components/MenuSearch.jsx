import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const MenuSearch = ({ onSearch, placeholder = "Search menu items..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="sticky top-32 z-30 bg-card p-4 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={20} className="text-muted-foreground" />
          </div>
          
          <Input
            type="search"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => handleSearch(e?.target?.value)}
            className="pl-10 pr-10"
          />
          
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSearch;