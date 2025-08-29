import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ 
  user = null, 
  cartItemCount = 0, 
  cartTotal = 0, 
  onCartClick = () => {}, 
  onSearchClick = () => {},
  onAuthClick = () => {},
  onRoleSwitch = () => {}
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthenticated = !!user;
  const isRestaurantPartner = user?.role === 'restaurant';

  const navigationItems = [
    { 
      label: 'Browse', 
      path: '/restaurant-profile-menu', 
      icon: 'Search',
      description: 'Discover restaurants'
    },
    { 
      label: 'Orders', 
      path: '/order-tracking-status', 
      icon: 'Package',
      description: 'Track your orders'
    },
    ...(isRestaurantPartner ? [{
      label: 'Dashboard',
      path: '/restaurant-dashboard',
      icon: 'BarChart3',
      description: 'Restaurant management'
    }] : [])
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      onSearchClick();
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleCartClick = () => {
    onCartClick();
  };

  const handleRoleSwitch = (newRole) => {
    onRoleSwitch(newRole);
    setIsUserMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event?.target?.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 mr-8">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Utensils" size={20} color="white" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              FoodExpress
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              onClick={handleCartClick}
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Icon name="ShoppingCart" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-mono font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
              {cartTotal > 0 && (
                <span className="ml-2 font-mono text-sm">
                  ${cartTotal?.toFixed(2)}
                </span>
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <Button
                  variant="ghost"
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="User" size={20} />
                  <span className="font-body text-sm">{user?.name}</span>
                  <Icon name="ChevronDown" size={16} />
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevated animate-slide-in">
                    <div className="p-4 border-b border-border">
                      <p className="font-body font-semibold text-sm text-foreground">
                        {user?.name}
                      </p>
                      <p className="font-caption text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                      {user?.role && (
                        <span className="inline-block mt-2 px-2 py-1 bg-accent text-accent-foreground text-xs font-caption rounded-md">
                          {user?.role === 'restaurant' ? 'Restaurant Partner' : 'Customer'}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-2">
                      <Link
                        to="/user-profile-account-management"
                        className="flex items-center space-x-3 w-full px-3 py-2 text-left text-sm font-body text-foreground hover:bg-muted rounded-md transition-smooth"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="Settings" size={16} />
                        <span>Account Settings</span>
                      </Link>

                      {user?.canSwitchRoles && (
                        <>
                          <div className="border-t border-border my-2"></div>
                          <button
                            onClick={() => handleRoleSwitch(user?.role === 'restaurant' ? 'customer' : 'restaurant')}
                            className="flex items-center space-x-3 w-full px-3 py-2 text-left text-sm font-body text-foreground hover:bg-muted rounded-md transition-smooth"
                          >
                            <Icon name="RefreshCw" size={16} />
                            <span>
                              Switch to {user?.role === 'restaurant' ? 'Customer' : 'Restaurant'} View
                            </span>
                          </button>
                        </>
                      )}

                      <div className="border-t border-border my-2"></div>
                      <button
                        onClick={() => {
                          onAuthClick('logout');
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-3 py-2 text-left text-sm font-body text-error hover:bg-error/10 rounded-md transition-smooth"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="default"
                onClick={() => onAuthClick('login')}
                className="font-body"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="relative text-muted-foreground hover:text-foreground"
            >
              <Icon name="ShoppingCart" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-mono font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Button>

            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Hamburger Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-slide-in">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-body font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={18} />
                  <div>
                    <div>{item?.label}</div>
                    <div className="text-xs text-muted-foreground font-caption">
                      {item?.description}
                    </div>
                  </div>
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <div className="border-t border-border my-4"></div>
                  <Link
                    to="/user-profile-account-management"
                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="Settings" size={18} />
                    <div>
                      <div>Account Settings</div>
                      <div className="text-xs text-muted-foreground font-caption">
                        Manage your profile
                      </div>
                    </div>
                  </Link>

                  {user?.canSwitchRoles && (
                    <button
                      onClick={() => {
                        handleRoleSwitch(user?.role === 'restaurant' ? 'customer' : 'restaurant');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="RefreshCw" size={18} />
                      <div>
                        <div>Switch Role</div>
                        <div className="text-xs text-muted-foreground font-caption">
                          {user?.role === 'restaurant' ? 'View as Customer' : 'View as Restaurant'}
                        </div>
                      </div>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onAuthClick('logout');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-body font-medium text-error hover:bg-error/10 transition-smooth"
                  >
                    <Icon name="LogOut" size={18} />
                    <div>
                      <div>Sign Out</div>
                      <div className="text-xs text-muted-foreground font-caption">
                        {user?.name}
                      </div>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-border my-4"></div>
                  <Button
                    variant="default"
                    onClick={() => {
                      onAuthClick('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full font-body"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Search Overlay (Mobile) */}
      {isSearchExpanded && (
        <div className="lg:hidden fixed inset-0 z-[1100] bg-background">
          <div className="flex items-center h-16 px-4 border-b border-border">
            <div className="flex-1 flex items-center space-x-3">
              <Icon name="Search" size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none font-body"
                autoFocus
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchExpanded(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;