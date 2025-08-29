import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';


// Import all components
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoTab from './components/PersonalInfoTab';
import AddressTab from './components/AddressTab';
import PaymentTab from './components/PaymentTab';
import OrderHistoryTab from './components/OrderHistoryTab';
import NotificationTab from './components/NotificationTab';
import SecurityTab from './components/SecurityTab';
import LoyaltyTab from './components/LoyaltyTab';

const UserProfileAccountManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notificationPreferences, setNotificationPreferences] = useState({});
  const [loyaltyData, setLoyaltyData] = useState(null);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    memberSince: "March 2022",
    totalOrders: 47,
    loyaltyPoints: 2850,
    favoriteRestaurants: 12,
    twoFactorEnabled: false,
    canSwitchRoles: true,
    role: 'customer'
  };

  const mockAddresses = [
    {
      id: 1,
      type: "Home",
      street: "123 Main Street",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      instructions: "Ring doorbell twice",
      isPrimary: true
    },
    {
      id: 2,
      type: "Work",
      street: "456 Business Ave",
      apartment: "Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      instructions: "Leave with reception",
      isPrimary: false
    }
  ];

  const mockPaymentMethods = [
    {
      id: 1,
      type: "Visa",
      lastFour: "4242",
      expiryMonth: "12",
      expiryYear: "2027",
      cardholderName: "Sarah Johnson",
      isPrimary: true
    },
    {
      id: 2,
      type: "Mastercard",
      lastFour: "8888",
      expiryMonth: "08",
      expiryYear: "2026",
      cardholderName: "Sarah Johnson",
      isPrimary: false
    }
  ];

  const mockOrders = [
    {
      id: "ORD-2024-001",
      restaurant: {
        name: "Mario\'s Italian Kitchen",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop"
      },
      date: "2024-08-27T18:30:00Z",
      status: "delivered",
      items: [
        { name: "Margherita Pizza", quantity: 1 },
        { name: "Caesar Salad", quantity: 1 },
        { name: "Tiramisu", quantity: 2 }
      ],
      subtotal: 42.50,
      deliveryFee: 3.99,
      tax: 4.15,
      total: 50.64,
      deliveryAddress: {
        street: "123 Main Street, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      },
      paymentMethod: {
        type: "Visa",
        lastFour: "4242"
      }
    },
    {
      id: "ORD-2024-002",
      restaurant: {
        name: "Dragon Palace Chinese",
        image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=300&h=200&fit=crop"
      },
      date: "2024-08-25T19:15:00Z",
      status: "delivered",
      items: [
        { name: "Sweet & Sour Chicken", quantity: 1 },
        { name: "Fried Rice", quantity: 1 }
      ],
      subtotal: 28.90,
      deliveryFee: 2.99,
      tax: 2.84,
      total: 34.73,
      deliveryAddress: {
        street: "456 Business Ave, Suite 200",
        city: "New York",
        state: "NY",
        zipCode: "10002"
      },
      paymentMethod: {
        type: "Mastercard",
        lastFour: "8888"
      }
    }
  ];

  const mockNotificationPreferences = {
    orders: {
      email: true,
      sms: true,
      push: true
    },
    promotions: {
      email: true,
      sms: false,
      push: true
    },
    restaurants: {
      email: false,
      sms: false,
      push: true
    },
    account: {
      email: true,
      sms: true,
      push: true
    },
    reviews: {
      email: true,
      sms: false,
      push: false
    },
    doNotDisturb: true,
    marketing: false,
    weeklySummary: true
  };

  const mockLoyaltyData = {
    currentPoints: 2850,
    totalEarned: 4200,
    currentTier: {
      level: 2,
      name: "Gold",
      minPoints: 2000,
      benefits: [
        "Free delivery on orders over $25",
        "5% cashback on all orders",
        "Priority customer support",
        "Early access to new restaurants"
      ]
    },
    tiers: [
      {
        level: 1,
        name: "Silver",
        minPoints: 0,
        benefits: [
          "Earn 1 point per $1 spent",
          "Birthday reward",
          "Member-only promotions"
        ]
      },
      {
        level: 2,
        name: "Gold",
        minPoints: 2000,
        benefits: [
          "Free delivery on orders over $25",
          "5% cashback on all orders",
          "Priority customer support",
          "Early access to new restaurants"
        ]
      },
      {
        level: 3,
        name: "Platinum",
        minPoints: 5000,
        benefits: [
          "Free delivery on all orders",
          "10% cashback on all orders",
          "VIP customer support",
          "Exclusive restaurant partnerships",
          "Monthly bonus rewards"
        ]
      }
    ],
    availableRewards: [
      {
        id: 1,
        title: "$5 Off Next Order",
        description: "Get $5 off your next order of $25 or more",
        pointsCost: 500,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop"
      },
      {
        id: 2,
        title: "Free Delivery",
        description: "Free delivery on your next 3 orders",
        pointsCost: 750,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop"
      },
      {
        id: 3,
        title: "$10 Restaurant Credit",
        description: "$10 credit to use at any partner restaurant",
        pointsCost: 1000,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"
      },
      {
        id: 4,
        title: "Premium Membership",
        description: "1 month of premium benefits",
        pointsCost: 2500,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop"
      }
    ],
    pointsHistory: [
      {
        id: 1,
        type: "earned",
        points: 51,
        description: "Order from Mario\'s Italian Kitchen",
        date: "2024-08-27T18:30:00Z"
      },
      {
        id: 2,
        type: "earned",
        points: 35,
        description: "Order from Dragon Palace Chinese",
        date: "2024-08-25T19:15:00Z"
      },
      {
        id: 3,
        type: "redeemed",
        points: 500,
        description: "Redeemed $5 Off Next Order",
        date: "2024-08-20T14:20:00Z"
      }
    ]
  };

  useEffect(() => {
    // Initialize data
    setUser(mockUser);
    setAddresses(mockAddresses);
    setPaymentMethods(mockPaymentMethods);
    setOrders(mockOrders);
    setNotificationPreferences(mockNotificationPreferences);
    setLoyaltyData(mockLoyaltyData);
  }, []);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPin' },
    { id: 'payment', label: 'Payment', icon: 'CreditCard' },
    { id: 'orders', label: 'Order History', icon: 'Package' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'loyalty', label: 'Loyalty & Rewards', icon: 'Award' }
  ];

  // Handler functions
  const handleProfilePhotoChange = (newPhoto) => {
    setUser(prev => ({ ...prev, profilePhoto: newPhoto }));
  };

  const handleEditProfile = () => {
    setActiveTab('personal');
  };

  const handlePersonalInfoSave = (formData) => {
    setUser(prev => ({
      ...prev,
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      name: `${formData?.firstName} ${formData?.lastName}`,
      email: formData?.email,
      phone: formData?.phone,
      dateOfBirth: formData?.dateOfBirth,
      gender: formData?.gender
    }));
  };

  const handleAddAddress = (address) => {
    setAddresses(prev => [...prev, address]);
  };

  const handleEditAddress = (updatedAddress) => {
    setAddresses(prev => prev?.map(addr => 
      addr?.id === updatedAddress?.id ? updatedAddress : addr
    ));
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev?.filter(addr => addr?.id !== addressId));
  };

  const handleSetPrimaryAddress = (addressId) => {
    setAddresses(prev => prev?.map(addr => ({
      ...addr,
      isPrimary: addr?.id === addressId
    })));
  };

  const handleAddPayment = (payment) => {
    setPaymentMethods(prev => [...prev, payment]);
  };

  const handleDeletePayment = (paymentId) => {
    setPaymentMethods(prev => prev?.filter(payment => payment?.id !== paymentId));
  };

  const handleSetPrimaryPayment = (paymentId) => {
    setPaymentMethods(prev => prev?.map(payment => ({
      ...payment,
      isPrimary: payment?.id === paymentId
    })));
  };

  const handleReorder = (order) => {
    // Navigate to restaurant with pre-filled cart
    navigate('/restaurant-profile-menu', { 
      state: { 
        restaurantId: order?.restaurant?.id,
        reorderItems: order?.items 
      }
    });
  };

  const handleViewReceipt = (orderId) => {
    // Navigate to order details/receipt page
    navigate('/order-tracking-status', { 
      state: { orderId }
    });
  };

  const handleNotificationSave = (preferences) => {
    setNotificationPreferences(preferences);
  };

  const handlePasswordChange = (passwordData) => {
    // Handle password change
    console.log('Password changed:', passwordData);
  };

  const handleTwoFactorToggle = (enabled) => {
    setUser(prev => ({ ...prev, twoFactorEnabled: enabled }));
  };

  const handleRedeemReward = (reward) => {
    setLoyaltyData(prev => ({
      ...prev,
      currentPoints: prev?.currentPoints - reward?.pointsCost,
      pointsHistory: [
        {
          id: Date.now(),
          type: 'redeemed',
          points: reward?.pointsCost,
          description: `Redeemed ${reward?.title}`,
          date: new Date()?.toISOString()
        },
        ...prev?.pointsHistory
      ]
    }));
  };

  const handleCartClick = () => {
    navigate('/shopping-cart-checkout');
  };

  const handleSearchClick = () => {
    navigate('/restaurant-profile-menu');
  };

  const handleAuthClick = (action) => {
    if (action === 'logout') {
      navigate('/user-registration-login');
    }
  };

  const handleRoleSwitch = (newRole) => {
    setUser(prev => ({ ...prev, role: newRole }));
    if (newRole === 'restaurant') {
      navigate('/restaurant-dashboard');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Icon name="Loader2" size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoTab
            user={user}
            onSave={handlePersonalInfoSave}
          />
        );
      case 'addresses':
        return (
          <AddressTab
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetPrimary={handleSetPrimaryAddress}
          />
        );
      case 'payment':
        return (
          <PaymentTab
            paymentMethods={paymentMethods}
            onAddPayment={handleAddPayment}
            onDeletePayment={handleDeletePayment}
            onSetPrimary={handleSetPrimaryPayment}
          />
        );
      case 'orders':
        return (
          <OrderHistoryTab
            orders={orders}
            onReorder={handleReorder}
            onViewReceipt={handleViewReceipt}
          />
        );
      case 'notifications':
        return (
          <NotificationTab
            preferences={notificationPreferences}
            onSave={handleNotificationSave}
          />
        );
      case 'security':
        return (
          <SecurityTab
            user={user}
            onPasswordChange={handlePasswordChange}
            onTwoFactorToggle={handleTwoFactorToggle}
          />
        );
      case 'loyalty':
        return (
          <LoyaltyTab
            loyaltyData={loyaltyData}
            onRedeemReward={handleRedeemReward}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={user}
        cartItemCount={3}
        cartTotal={45.99}
        onCartClick={handleCartClick}
        onSearchClick={handleSearchClick}
        onAuthClick={handleAuthClick}
        onRoleSwitch={handleRoleSwitch}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Profile Header */}
          <ProfileHeader
            user={user}
            onProfilePhotoChange={handleProfilePhotoChange}
            onEditProfile={handleEditProfile}
          />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card border border-border rounded-lg p-4">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-smooth ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span className="font-body text-sm">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Mobile Tab Selector */}
              <div className="lg:hidden mt-4">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {tabs?.map((tab) => (
                    <option key={tab?.id} value={tab?.id}>
                      {tab?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileAccountManagement;