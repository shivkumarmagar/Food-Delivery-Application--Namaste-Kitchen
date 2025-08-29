import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';

import MetricsCard from './components/MetricsCard';
import OrderQueue from './components/OrderQueue';
import MenuManagement from './components/MenuManagement';
import AnalyticsChart from './components/AnalyticsChart';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // Mock data initialization
  useEffect(() => {
    // Mock user data
    setUser({
      id: 'rest_001',
      name: 'Mario Rossi',
      email: 'mario@pizzapalace.com',
      role: 'restaurant',
      restaurantName: 'Pizza Palace',
      canSwitchRoles: true
    });

    // Mock orders data
    const mockOrders = [
      {
        id: 'ORD001',
        customer: {
          name: 'John Smith',
          phone: '+1-555-0123',
          address: '123 Main St, Downtown'
        },
        items: [
          { name: 'Margherita Pizza', quantity: 2, price: 18.99 },
          { name: 'Caesar Salad', quantity: 1, price: 12.50 },
          { name: 'Garlic Bread', quantity: 1, price: 6.99 }
        ],
        total: 57.47,
        status: 'pending',
        priority: 'high',
        timestamp: new Date(Date.now() - 300000),
        estimatedTime: 25,
        specialInstructions: 'Extra cheese on pizza, no croutons on salad'
      },
      {
        id: 'ORD002',
        customer: {
          name: 'Sarah Johnson',
          phone: '+1-555-0456',
          address: '456 Oak Ave, Midtown'
        },
        items: [
          { name: 'Pepperoni Pizza', quantity: 1, price: 21.99 },
          { name: 'Buffalo Wings', quantity: 12, price: 15.99 }
        ],
        total: 37.98,
        status: 'accepted',
        priority: 'medium',
        timestamp: new Date(Date.now() - 600000),
        estimatedTime: 20,
        specialInstructions: null
      },
      {
        id: 'ORD003',
        customer: {
          name: 'Mike Davis',
          phone: '+1-555-0789',
          address: '789 Pine St, Uptown'
        },
        items: [
          { name: 'Veggie Supreme Pizza', quantity: 1, price: 19.99 },
          { name: 'Mozzarella Sticks', quantity: 8, price: 9.99 }
        ],
        total: 29.98,
        status: 'preparing',
        priority: 'medium',
        timestamp: new Date(Date.now() - 900000),
        estimatedTime: 15,
        specialInstructions: 'Make pizza well-done'
      },
      {
        id: 'ORD004',
        customer: {
          name: 'Lisa Wilson',
          phone: '+1-555-0321',
          address: '321 Elm St, Southside'
        },
        items: [
          { name: 'Hawaiian Pizza', quantity: 1, price: 20.99 }
        ],
        total: 20.99,
        status: 'ready',
        priority: 'low',
        timestamp: new Date(Date.now() - 1200000),
        estimatedTime: 5,
        specialInstructions: null
      }
    ];
    setOrders(mockOrders);

    // Mock categories
    const mockCategories = [
      { id: 'cat_001', name: 'Pizzas' },
      { id: 'cat_002', name: 'Appetizers' },
      { id: 'cat_003', name: 'Salads' },
      { id: 'cat_004', name: 'Beverages' },
      { id: 'cat_005', name: 'Desserts' }
    ];
    setCategories(mockCategories);

    // Mock menu items
    const mockMenuItems = [
      {
        id: 'item_001',
        name: 'Margherita Pizza',
        description: 'Fresh tomato sauce, mozzarella cheese, and basil',
        price: 18.99,
        categoryId: 'cat_001',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300',
        available: true,
        rating: 4.5,
        reviewCount: 128
      },
      {
        id: 'item_002',
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni with mozzarella cheese',
        price: 21.99,
        categoryId: 'cat_001',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
        available: true,
        rating: 4.7,
        reviewCount: 95
      },
      {
        id: 'item_003',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with Caesar dressing and croutons',
        price: 12.50,
        categoryId: 'cat_003',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300',
        available: true,
        rating: 4.2,
        reviewCount: 67
      },
      {
        id: 'item_004',
        name: 'Buffalo Wings',
        description: 'Spicy buffalo wings served with ranch dressing',
        price: 15.99,
        categoryId: 'cat_002',
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300',
        available: false,
        rating: 4.4,
        reviewCount: 89
      },
      {
        id: 'item_005',
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter and herbs',
        price: 6.99,
        categoryId: 'cat_002',
        image: 'https://images.unsplash.com/photo-1619985632461-f33748ef8d3d?w=300',
        available: true,
        rating: 4.1,
        reviewCount: 45
      }
    ];
    setMenuItems(mockMenuItems);

    // Mock notifications
    const mockNotifications = [
      {
        id: 'notif_001',
        type: 'order',
        priority: 'high',
        title: 'New Order Received',
        message: 'Order #ORD001 from John Smith - $57.47',
        timestamp: new Date(Date.now() - 120000),
        read: false,
        action: {
          label: 'View Order',
          handler: () => setActiveTab('orders')
        }
      },
      {
        id: 'notif_002',
        type: 'review',
        priority: 'medium',
        title: 'New Review',
        message: 'Sarah Johnson left a 5-star review for Pepperoni Pizza',
        timestamp: new Date(Date.now() - 1800000),
        read: false
      },
      {
        id: 'notif_003',
        type: 'system',
        priority: 'low',
        title: 'Menu Update',
        message: 'Buffalo Wings marked as unavailable',
        timestamp: new Date(Date.now() - 3600000),
        read: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  // Analytics data
  const revenueData = [
    { name: 'Mon', value: 1200 },
    { name: 'Tue', value: 1800 },
    { name: 'Wed', value: 1500 },
    { name: 'Thu', value: 2200 },
    { name: 'Fri', value: 2800 },
    { name: 'Sat', value: 3200 },
    { name: 'Sun', value: 2400 }
  ];

  const orderVolumeData = [
    { name: 'Mon', value: 45 },
    { name: 'Tue', value: 62 },
    { name: 'Wed', value: 58 },
    { name: 'Thu', value: 78 },
    { name: 'Fri', value: 89 },
    { name: 'Sat', value: 95 },
    { name: 'Sun', value: 72 }
  ];

  const popularItemsData = [
    { name: 'Margherita Pizza', value: 45 },
    { name: 'Pepperoni Pizza', value: 38 },
    { name: 'Caesar Salad', value: 28 },
    { name: 'Buffalo Wings', value: 22 },
    { name: 'Garlic Bread', value: 18 }
  ];

  // Event handlers
  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => prev?.map(order => 
      order?.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleBulkUpdate = (orderIds, newStatus) => {
    setOrders(prev => prev?.map(order => 
      orderIds?.includes(order?.id) ? { ...order, status: newStatus } : order
    ));
  };

  const handleViewOrderDetails = (order) => {
    console.log('Viewing order details:', order);
  };

  const handleUpdateMenuItem = (updatedItem) => {
    setMenuItems(prev => prev?.map(item => 
      item?.id === updatedItem?.id ? updatedItem : item
    ));
  };

  const handleToggleAvailability = (itemId) => {
    setMenuItems(prev => prev?.map(item => 
      item?.id === itemId ? { ...item, available: !item?.available } : item
    ));
  };

  const handleAddMenuItem = (newItem) => {
    const item = {
      ...newItem,
      id: `item_${Date.now()}`,
      rating: 0,
      reviewCount: 0
    };
    setMenuItems(prev => [...prev, item]);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'toggle-online':
        setIsOnline(!isOnline);
        break;
      case 'bulk-disable':
        setMenuItems(prev => prev?.map(item => ({ ...item, available: false })));
        break;
      case 'update-hours': console.log('Update hours clicked');
        break;
      case 'promotional-banner': console.log('Promotional banner clicked');
        break;
      case 'export-data':
        console.log('Export data clicked');
        break;
      case 'customer-support': console.log('Customer support clicked');
        break;
      case 'pause-orders':
        setIsOnline(false);
        break;
      case 'emergency-close':
        setIsOnline(false);
        console.log('Emergency close activated');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => prev?.map(notif => 
      notif?.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev?.map(notif => ({ ...notif, read: true })));
  };

  const handleToggleSound = (enabled) => {
    console.log('Sound notifications:', enabled);
  };

  const handleAuthClick = (action) => {
    if (action === 'logout') {
      setUser(null);
      console.log('User logged out');
    }
  };

  const handleRoleSwitch = (newRole) => {
    setUser(prev => ({ ...prev, role: newRole }));
  };

  const tabs = [
    { id: 'orders', label: 'Orders', icon: 'Package', count: orders?.filter(o => o?.status !== 'completed')?.length },
    { id: 'menu', label: 'Menu', icon: 'UtensilsCrossed' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell', count: notifications?.filter(n => !n?.read)?.length }
  ];

  const todayMetrics = {
    revenue: 2847.50,
    orders: 89,
    avgOrderValue: 32.00,
    rating: 4.6
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        onAuthClick={handleAuthClick}
        onRoleSwitch={handleRoleSwitch}
      />
      <div className="pt-16">
        {/* Restaurant Status Bar */}
        <div className={`border-b ${isOnline ? 'bg-success/10 border-success/20' : 'bg-error/10 border-error/20'}`}>
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-error'}`} />
                <span className="font-body font-medium text-foreground">
                  {user?.restaurantName || 'Restaurant'} - {isOnline ? 'Online' : 'Offline'}
                </span>
                <span className="text-sm font-caption text-muted-foreground">
                  Last updated: {new Date()?.toLocaleTimeString()}
                </span>
              </div>
              <Button
                variant={isOnline ? 'destructive' : 'success'}
                size="sm"
                onClick={() => setIsOnline(!isOnline)}
                iconName={isOnline ? 'Pause' : 'Play'}
                iconPosition="left"
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Today's Revenue"
              value={`$${todayMetrics?.revenue?.toFixed(2)}`}
              change={12.5}
              changeType="positive"
              icon="DollarSign"
              color="success"
            />
            <MetricsCard
              title="Orders Today"
              value={todayMetrics?.orders}
              change={8.3}
              changeType="positive"
              icon="Package"
              color="primary"
            />
            <MetricsCard
              title="Avg Order Value"
              value={`$${todayMetrics?.avgOrderValue?.toFixed(2)}`}
              change={-2.1}
              changeType="negative"
              icon="TrendingUp"
              color="warning"
            />
            <MetricsCard
              title="Rating"
              value={todayMetrics?.rating?.toFixed(1)}
              change={0.2}
              changeType="positive"
              icon="Star"
              color="accent"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1 mb-6 overflow-x-auto">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-smooth whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
                {tab?.count > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-mono px-1.5 py-0.5 rounded-full">
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'orders' && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <OrderQueue
                    orders={orders}
                    onStatusUpdate={handleStatusUpdate}
                    onViewDetails={handleViewOrderDetails}
                    onBulkUpdate={handleBulkUpdate}
                  />
                </div>
                <div className="space-y-6">
                  <QuickActions onAction={handleQuickAction} />
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <MenuManagement
                menuItems={menuItems}
                categories={categories}
                onUpdateItem={handleUpdateMenuItem}
                onToggleAvailability={handleToggleAvailability}
                onAddItem={handleAddMenuItem}
              />
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                  title="Weekly Revenue"
                  data={revenueData}
                  type="bar"
                  color="#27AE60"
                />
                <AnalyticsChart
                  title="Order Volume"
                  data={orderVolumeData}
                  type="line"
                  color="#FF6B35"
                />
                <div className="lg:col-span-2">
                  <AnalyticsChart
                    title="Popular Items"
                    data={popularItemsData}
                    type="pie"
                    height={400}
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onToggleSound={handleToggleSound}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;