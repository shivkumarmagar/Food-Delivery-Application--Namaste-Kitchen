import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead, onToggleSound }) => {
  const [filter, setFilter] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications?.length },
    { value: 'orders', label: 'Orders', count: notifications?.filter(n => n?.type === 'order')?.length },
    { value: 'system', label: 'System', count: notifications?.filter(n => n?.type === 'system')?.length },
    { value: 'reviews', label: 'Reviews', count: notifications?.filter(n => n?.type === 'review')?.length }
  ];

  const filteredNotifications = notifications?.filter(notification => 
    filter === 'all' || notification?.type === filter
  );

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const getNotificationIcon = (type, priority) => {
    const icons = {
      order: priority === 'high' ? 'AlertCircle' : 'Package',
      system: 'Settings',
      review: 'Star',
      message: 'MessageCircle'
    };
    return icons?.[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    
    const colors = {
      order: 'text-primary',
      system: 'text-warning',
      review: 'text-success',
      message: 'text-accent-foreground'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return notificationTime?.toLocaleDateString();
  };

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
    onToggleSound(!soundEnabled);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="font-heading font-bold text-xl text-foreground">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs font-mono font-medium px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleSound}
              className={soundEnabled ? 'text-success' : 'text-muted-foreground'}
            >
              <Icon name={soundEnabled ? 'Volume2' : 'VolumeX'} size={20} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {filterOptions?.map(option => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium transition-smooth ${
                filter === option?.value
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{option?.label}</span>
              {option?.count > 0 && (
                <span className="bg-primary/20 text-primary text-xs font-mono px-1.5 py-0.5 rounded">
                  {option?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredNotifications?.map(notification => (
              <div
                key={notification?.id}
                className={`p-4 hover:bg-muted/50 transition-smooth ${
                  !notification?.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-muted/50 ${getNotificationColor(notification?.type, notification?.priority)}`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type, notification?.priority)} 
                      size={16} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-body font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification?.title}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground ml-2">
                        {formatTime(notification?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm font-body text-muted-foreground mb-2">
                      {notification?.message}
                    </p>
                    {notification?.action && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => notification?.action?.handler()}
                        className="text-xs"
                      >
                        {notification?.action?.label}
                      </Button>
                    )}
                  </div>
                  {!notification?.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMarkAsRead(notification?.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="Check" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
              No Notifications
            </h3>
            <p className="font-body text-muted-foreground">
              {filter === 'all' ?'You\'re all caught up!'
                : `No ${filter} notifications found.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;