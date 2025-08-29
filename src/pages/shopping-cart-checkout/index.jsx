import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import DeliveryInfo from './components/DeliveryInfo';
import PaymentSection from './components/PaymentSection';
import PromoCodeSection from './components/PromoCodeSection';
import DeliveryInstructions from './components/DeliveryInstructions';

const ShoppingCartCheckout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyCart, setShowEmptyCart] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Tony\'s Italian Kitchen",
      price: 18.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
      customizations: [
        { name: "Extra Cheese", price: 2.50 },
        { name: "Thin Crust", price: 0 }
      ],
      specialInstructions: "Please make it extra crispy"
    },
    {
      id: 2,
      name: "Chicken Caesar Salad",
      restaurant: "Fresh Garden Bistro",
      price: 14.50,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
      customizations: [
        { name: "Extra Dressing", price: 0.50 },
        { name: "No Croutons", price: 0 }
      ]
    },
    {
      id: 3,
      name: "Chocolate Brownie",
      restaurant: "Sweet Treats Bakery",
      price: 6.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      customizations: []
    }
  ]);

  // Order State
  const [selectedAddress, setSelectedAddress] = useState({
    id: 1,
    type: "Home",
    address: "123 Main Street, Apt 4B",
    city: "New York, NY 10001",
    isDefault: true
  });

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Calculations
  const subtotal = cartItems?.reduce((sum, item) => {
    const itemTotal = item?.price * item?.quantity;
    const customizationTotal = item?.customizations?.reduce((customSum, custom) => 
      customSum + (custom?.price * item?.quantity), 0);
    return sum + itemTotal + customizationTotal;
  }, 0);

  const deliveryFee = subtotal >= 25 ? 0 : 4.99;
  const taxes = subtotal * 0.08875; // NY tax rate
  const discount = appliedPromo ? 
    (appliedPromo?.type === 'percentage' ? 
      subtotal * (appliedPromo?.discount / 100) : 
      appliedPromo?.discount) : 0;
  const total = subtotal + deliveryFee + taxes - discount;

  const estimatedTime = 35;

  // Handlers
  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => prev?.map(item => 
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleEditItem = (itemId) => {
    // Navigate back to restaurant dashboard instead of restaurant menu
    navigate('/restaurant-dashboard', { 
      state: { editItemId: itemId } 
    });
  };

  const handleEditAddress = (address) => {
    if (address === 'new') {
      // Handle new address creation
      console.log('Add new address');
    } else {
      setSelectedAddress(address);
    }
  };

  const handlePaymentChange = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleApplyPromo = (promo) => {
    // Check if order meets minimum requirement
    if (subtotal >= promo?.minOrder) {
      setAppliedPromo(promo);
    } else {
      alert(`Minimum order of $${promo?.minOrder} required for this promo code.`);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const handleInstructionsChange = (instructions) => {
    setDeliveryInstructions(instructions);
  };

  const handlePlaceOrder = async () => {
    if (cartItems?.length === 0) {
      setShowEmptyCart(true);
      return;
    }

    setIsLoading(true);

    // Simulate order processing
    setTimeout(() => {
      const orderId = Math.random()?.toString(36)?.substr(2, 9)?.toUpperCase();
      
      // Navigate to order tracking with order details
      navigate('/order-tracking-status', {
        state: {
          orderId,
          orderTotal: total,
          estimatedTime,
          items: cartItems,
          address: selectedAddress
        }
      });
    }, 2000);
  };

  // Check if cart is empty
  useEffect(() => {
    if (cartItems?.length === 0) {
      setShowEmptyCart(true);
    } else {
      setShowEmptyCart(false);
    }
  }, [cartItems]);

  // Empty Cart State
  if (showEmptyCart) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link
                to="/restaurant-dashboard"
                className="flex items-center justify-center w-10 h-10 bg-muted hover:bg-muted/80 rounded-full transition-smooth"
              >
                <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
              </Link>
              <div>
                <h1 className="font-heading font-bold text-2xl text-foreground">
                  Your Cart
                </h1>
                <p className="font-body text-muted-foreground text-sm">
                  Review your order and checkout
                </p>
              </div>
            </div>
          </div>

          {/* Empty Cart */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Icon name="ShoppingCart" size={32} className="text-muted-foreground" />
            </div>
            <h2 className="font-heading font-bold text-xl text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="font-body text-muted-foreground text-center mb-8 max-w-md">
              Looks like you haven't added any items to your cart yet. 
              Browse our restaurants and add some delicious food!
            </p>
            <Button
              variant="default"
              onClick={() => navigate('/restaurant-dashboard')}
              className="px-8"
            >
              <Icon name="Search" size={16} />
              <span className="ml-2">Browse Restaurants</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/restaurant-dashboard"
              className="flex items-center justify-center w-10 h-10 bg-muted hover:bg-muted/80 rounded-full transition-smooth"
            >
              <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
            </Link>
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">
                Your Cart
              </h1>
              <p className="font-body text-muted-foreground text-sm">
                {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} • Review and checkout
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-primary/10 px-3 py-2 rounded-lg">
            <Icon name="ShoppingCart" size={16} className="text-primary" />
            <span className="font-mono font-semibold text-primary text-sm">
              {cartItems?.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              <h2 className="font-body font-semibold text-foreground text-lg">
                Order Items
              </h2>
              {cartItems?.map((item) => (
                <CartItem
                  key={item?.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onEditItem={handleEditItem}
                />
              ))}
            </div>

            {/* Delivery Information */}
            <DeliveryInfo
              selectedAddress={selectedAddress}
              estimatedTime={estimatedTime}
              onEditAddress={handleEditAddress}
            />

            {/* Promo Code */}
            <PromoCodeSection
              appliedPromo={appliedPromo}
              onApplyPromo={handleApplyPromo}
              onRemovePromo={handleRemovePromo}
            />

            {/* Delivery Instructions */}
            <DeliveryInstructions
              instructions={deliveryInstructions}
              onInstructionsChange={handleInstructionsChange}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              taxes={taxes}
              discount={discount}
              total={total}
            />

            {/* Payment Section */}
            <PaymentSection
              selectedPayment={selectedPayment}
              onPaymentChange={handlePaymentChange}
              onPaymentSubmit={{ total }}
            />

            {/* Place Order Button */}
            <div className="sticky top-24">
              <Button
                variant="default"
                onClick={handlePlaceOrder}
                loading={isLoading}
                fullWidth
                className="h-12 text-base font-semibold"
              >
                {isLoading ? (
                  'Processing Order...'
                ) : (
                  <>
                    <Icon name="CreditCard" size={18} />
                    <span className="ml-2">
                      Place Order • ${total?.toFixed(2)}
                    </span>
                  </>
                )}
              </Button>

              {/* Order Time Notice */}
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <p className="font-caption text-muted-foreground text-xs">
                    Estimated delivery: {estimatedTime} minutes after order confirmation
                  </p>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} className="text-success" />
                  <p className="font-caption text-success text-xs">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartCheckout;