import React from 'react';

const CategoryNavigation = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="hidden lg:block w-64 bg-card border-r border-border">
      <div className="sticky top-48 p-4">
        <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">
          Menu Categories
        </h3>
        
        <nav className="space-y-1">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-body transition-smooth ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category?.name}</span>
                <span className="text-xs opacity-70">
                  {category?.items?.length}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryNavigation;