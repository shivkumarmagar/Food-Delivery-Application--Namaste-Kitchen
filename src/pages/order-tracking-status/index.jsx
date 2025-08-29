import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import OrderHeader from './components/OrderHeader';
import OrderProgressTimeline from './components/OrderProgressTimeline';
import RestaurantInfoCard from './components/RestaurantInfoCard';
import DeliveryPersonCard from './components/DeliveryPersonCard';
import DeliveryMap from './components/DeliveryMap';
import OrderDetailsCard from './components/OrderDetailsCard';
import ActionButtons from './components/ActionButtons';

const OrderTrackingStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams?.get('orderId') || 'ORD-2025-001234';

  // Mock order data
  const [orderData] = useState({
    orderNumber: orderId,
    orderDate: "August 28, 2025",
    orderTime: "2:30 PM",
    currentStatus: "dispatched",
    restaurant: {
      id: "rest-001",
      name: "Namaste Kitchen",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      rating: 4.8,
      distance: "1.2 km away",
      deliveryTime: "25-35 min",
      phone: "+1 (555) 123-4567"
    },
    deliveryPerson: {
      id: "driver-001",
      name: "Viswas Kumar",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      deliveries: 1247,
      phone: "+1 (555) 987-6543",
      vehicle: {
        type: "Honda Civic",
        plateNumber: "ABC-1234",
        color: "Blue"
      }
    },
    orderItems: [
      {
        id: "item-001",
        name: "Margherita Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
        price: 18.99,
        quantity: 1,
        customizations: ["Extra cheese", "Thin crust"]
      },
      {
        id: "item-002",
        name: "Caesar Salad",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
        price: 12.99,
        quantity: 1,
        customizations: ["No croutons", "Extra dressing"]
      },
      {
        id: "item-003",
        name: "Tiramisu",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop",
        price: 8.99,
        quantity: 2,
        customizations: []
      }
    ],
    orderDetails: {
      orderNumber: orderId,
      subtotal: 49.96,
      deliveryFee: 3.99,
      serviceFee: 2.50,
      tax: 4.48,
      discount: 5.00,
      total: 55.93,
      paymentMethod: "Credit Card ending in 4567",
      deliveryAddress: {
        street: "123 Oak Street, Apt 4B",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
        instructions: "Ring doorbell twice, leave at door if no answer"
      }
    },
    locations: {
      restaurant: { lat: 37.7749, lng: -122.4194 },
      delivery: { lat: 37.7849, lng: -122.4094 },
      currentDriver: { lat: 37.7799, lng: -122.4144 }
    }
  });

  const [orderStages] = useState([
    {
      status: 'confirmed',
      title: 'Order Confirmed',
      description: 'Your order has been received and confirmed by the restaurant.',
      timestamp: '2:30 PM',
      completed: true
    },
    {
      status: 'preparing',
      title: 'Preparing Your Food',
      description: 'The kitchen is preparing your delicious meal with care.',
      timestamp: '2:45 PM',
      completed: true
    },
    {
      status: 'ready',
      title: 'Ready for Pickup',
      description: 'Your order is ready and waiting for the delivery driver.',
      timestamp: '3:15 PM',
      completed: true
    },
    {
      status: 'dispatched',
      title: 'Out for Delivery',
      description: 'Your order is on its way! Track the driver in real-time.',
      timestamp: '3:25 PM',
      completed: false,
      estimatedTime: '15-20 minutes'
    },
    {
      status: 'delivered',
      title: 'Delivered',
      description: 'Enjoy your meal! Don\'t forget to rate your experience.',
      timestamp: null,
      completed: false,
      estimatedTime: '3:45 PM'
    }
  ]);

  const [estimatedArrival] = useState("15-20 min");
  const [isDriverAssigned] = useState(orderData?.currentStatus === 'dispatched' || orderData?.currentStatus === 'delivered');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate status updates every 30 seconds for demo
      console.log('Checking for order updates...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleBackClick = () => {
    navigate('/user-profile-account-management');
  };

  const handleContactRestaurant = () => {
    window.open(`tel:${orderData?.restaurant?.phone}`, '_self');
  };

  const handleCallDriver = () => {
    if (orderData?.deliveryPerson?.phone) {
      window.open(`tel:${orderData?.deliveryPerson?.phone}`, '_self');
    }
  };

  const handleReportIssue = () => {
    // Navigate to support or open modal
    alert('Opening support chat...');
  };

  const handleReorder = () => {
    navigate(`/restaurant-profile-menu?restaurantId=${orderData?.restaurant?.id}`);
  };

  const handleRateOrder = () => {
    alert('Opening rating modal...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <OrderHeader
        orderNumber={orderData?.orderNumber}
        orderDate={orderData?.orderDate}
        currentStatus={orderData?.currentStatus}
        onBackClick={handleBackClick}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress & Restaurant Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Progress Timeline */}
            <OrderProgressTimeline
              currentStatus={orderData?.currentStatus}
              orderStages={orderStages}
              orderTime={orderData?.orderTime}
            />

            {/* Restaurant Info */}
            <RestaurantInfoCard
              restaurant={orderData?.restaurant}
              orderItems={orderData?.orderItems}
              onContactRestaurant={handleContactRestaurant}
            />

            {/* Delivery Person Card */}
            <DeliveryPersonCard
              deliveryPerson={orderData?.deliveryPerson}
              estimatedArrival={estimatedArrival}
              onCallDriver={handleCallDriver}
              isVisible={isDriverAssigned}
            />

            {/* Order Details (Mobile/Tablet) */}
            <div className="lg:hidden">
              <OrderDetailsCard
                orderDetails={orderData?.orderDetails}
                orderItems={orderData?.orderItems}
              />
            </div>
          </div>

          {/* Right Column - Map & Actions */}
          <div className="space-y-6">
            {/* Delivery Map */}
            <DeliveryMap
              restaurantLocation={orderData?.locations?.restaurant}
              deliveryLocation={orderData?.locations?.delivery}
              currentDriverLocation={orderData?.locations?.currentDriver}
              isDriverAssigned={isDriverAssigned}
            />

            {/* Action Buttons */}
            <ActionButtons
              currentStatus={orderData?.currentStatus}
              onContactRestaurant={handleContactRestaurant}
              onCallDriver={handleCallDriver}
              onReportIssue={handleReportIssue}
              onReorder={handleReorder}
              onRateOrder={handleRateOrder}
              isDriverAssigned={isDriverAssigned}
            />

            {/* Order Details (Desktop) */}
            <div className="hidden lg:block">
              <OrderDetailsCard
                orderDetails={orderData?.orderDetails}
                orderItems={orderData?.orderItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingStatus;