import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantHero from './components/RestaurantHero';
import TabNavigation from './components/TabNavigation';
import MenuSearch from './components/MenuSearch';
import CategoryNavigation from './components/CategoryNavigation';
import MenuCategory from './components/MenuCategory';
import RestaurantInfo from './components/RestaurantInfo';
import ReviewsSection from './components/ReviewsSection';
import FloatingCartSummary from './components/FloatingCartSummary';

const RestaurantProfileMenu = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Mock restaurant data
  const restaurant = {
    id: 'rest-001',
    name: "Namaste Kitchen",
    cuisine: "Indian",
    rating: 4.6,
    reviewCount: 1247,
    deliveryTime: "25-40 min",
    distance: "1.2 miles",
    minimumOrder: 15,
    deliveryFee: 2.99,
    deliveryRadius: 5,
    freeDelivery: false,
    isOpen: true,
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop",
    address: "1234 Main Street",
    city: "Delhi",
    state: "Delhi",
    zipCode: "94102",
    phone: "(415) 555-0123",
    website: "https://bellavista-kitchen.com",
    coordinates: {
      lat: 28.6139,
      lng: 77.2090
    },
    hours: [
      { day: "Monday", hours: "11:00 AM - 10:00 PM" },
      { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
      { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
      { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
      { day: "Friday", hours: "11:00 AM - 11:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
      { day: "Sunday", hours: "10:00 AM - 9:00 PM" }
    ],
    certifications: ["Organic Certified", "Farm-to-Table", "Gluten-Free Options"]
  };

  // Mock menu categories
  const menuCategories = [
    {
      id: 'appetizers',
      name: 'Appetizers',
      description: 'Start your meal with our delicious appetizers',
      items: [
        {
          id: 'app-001',
          name: "Bruschetta Trio",
          description: "Three varieties of our signature bruschetta with fresh tomatoes, basil, and mozzarella",
          price: 12.99,
          originalPrice: 14.99,
          image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop",
          rating: 4.8,
          isPopular: true,
          isVegetarian: true,
          preparationTime: "10-15 min",
          customizations: [
            {
              id: 'bread-type',
              name: 'Bread Type',
              type: 'single',
              required: true,
              options: [
                { value: 'sourdough', label: 'Sourdough', price: 0 },
                { value: 'ciabatta', label: 'Ciabatta', price: 1.00 },
                { value: 'gluten-free', label: 'Gluten-Free', price: 2.00 }
              ]
            }
          ]
        },
        {
          id: 'app-002',
          name: "Calamari Fritti",
          description: "Crispy fried squid rings served with marinara sauce and lemon wedges",
          price: 15.99,
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
          rating: 4.5,
          isPopular: false,
          isVegetarian: false,
          preparationTime: "12-18 min"
        }
      ]
    },
    {
      id: 'pasta',
      name: 'Pasta & Risotto',
      description: 'Handmade pasta and creamy risotto dishes',
      items: [
        {
          id: 'pasta-001',
          name: "Spaghetti Carbonara",
          description: "Classic Roman pasta with eggs, pancetta, pecorino cheese, and black pepper",
          price: 18.99,
          image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
          rating: 4.9,
          isPopular: true,
          isVegetarian: false,
          preparationTime: "15-20 min",
          customizations: [
            {
              id: 'pasta-type',
              name: 'Pasta Type',
              type: 'single',
              required: false,
              options: [
                { value: 'spaghetti', label: 'Spaghetti', price: 0 },
                { value: 'linguine', label: 'Linguine', price: 0 },
                { value: 'penne', label: 'Penne', price: 0 }
              ]
            },
            {
              id: 'extras',
              name: 'Add Extras',
              type: 'multiple',
              required: false,
              options: [
                { value: 'extra-cheese', label: 'Extra Cheese', price: 2.50 },
                { value: 'mushrooms', label: 'Mushrooms', price: 3.00 },
                { value: 'truffle-oil', label: 'Truffle Oil', price: 4.00 }
              ]
            }
          ]
        },
        {
          id: 'pasta-002',
          name: "Mushroom Risotto",
          description: "Creamy Arborio rice with mixed wild mushrooms, parmesan, and fresh herbs",
          price: 22.99,
          image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
          rating: 4.7,
          isPopular: false,
          isVegetarian: true,
          preparationTime: "20-25 min"
        }
      ]
    },
    {
      id: 'mains',
      name: 'Main Courses',
      description: 'Hearty main dishes featuring the finest ingredients',
      items: [
        {
          id: 'main-001',
          name: "Osso Buco Milanese",
          description: "Slow-braised veal shanks with saffron risotto and gremolata",
          price: 32.99,
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
          rating: 4.8,
          isPopular: true,
          isVegetarian: false,
          preparationTime: "25-30 min"
        }
      ]
    },
    {
      id: 'desserts',
      name: 'Desserts',
      description: 'Sweet endings to your perfect meal',
      items: [
        {
          id: 'dessert-001',
          name: "Tiramisu",
          description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream",
          price: 8.99,
          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
          rating: 4.9,
          isPopular: true,
          isVegetarian: true,
          preparationTime: "5 min"
        }
      ]
    }
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 'review-001',
      userName: "Sarah Johnson",
      userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      date: "2025-08-25",
      comment: `Absolutely amazing experience! The Spaghetti Carbonara was perfectly executed - creamy, rich, and authentic. The service was exceptional and the atmosphere was cozy and romantic. Will definitely be coming back!`,
      photos: [
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop"
      ],
      helpfulCount: 23,
      orderItems: ["Spaghetti Carbonara", "Tiramisu"]
    },
    {
      id: 'review-002',
      userName: "Michael Chen",
      userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      date: "2025-08-20",
      comment: `Great food and good service. The Osso Buco was tender and flavorful. Only minor complaint is that it took a bit longer than expected, but the quality made up for it.`,
      photos: [],
      helpfulCount: 15,
      orderItems: ["Osso Buco Milanese", "Bruschetta Trio"]
    },
    {
      id: 'review-003',
      userName: "Emma Rodriguez",
      userAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      date: "2025-08-18",
      comment: `Best Italian restaurant in the city! The Mushroom Risotto was creamy perfection and the staff was incredibly knowledgeable about wine pairings. Highly recommend!`,
      photos: [
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=200&h=200&fit=crop"
      ],
      helpfulCount: 31,
      orderItems: ["Mushroom Risotto"]
    }
  ];

  const tabs = [
    { id: 'menu', label: 'Menu', icon: 'UtensilsCrossed', count: menuCategories?.reduce((sum, cat) => sum + cat?.items?.length, 0) },
    { id: 'info', label: 'Info', icon: 'Info' },
    { id: 'reviews', label: 'Reviews', icon: 'Star', count: restaurant?.reviewCount }
  ];

  // Calculate cart total
  useEffect(() => {
    const total = cartItems?.reduce((sum, item) => sum + item?.totalPrice, 0);
    setCartTotal(total);
  }, [cartItems]);

  const handleAddToCart = async (item) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCartItems(prev => {
      const existingItemIndex = prev?.findIndex(cartItem => 
        cartItem?.id === item?.id && 
        JSON.stringify(cartItem?.selectedOptions) === JSON.stringify(item?.selectedOptions)
      );

      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].quantity += item?.quantity;
        updated[existingItemIndex].totalPrice += item?.totalPrice;
        return updated;
      } else {
        return [...prev, item];
      }
    });
  };

  const handleViewCart = () => {
    navigate('/shopping-cart-checkout');
  };

  const handleCheckout = () => {
    navigate('/shopping-cart-checkout');
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Smooth scroll to category section
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <div className="flex">
            {/* Desktop Category Navigation */}
            <CategoryNavigation
              categories={menuCategories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
            {/* Menu Content */}
            <div className="flex-1 lg:pl-8">
              <div className="max-w-4xl mx-auto p-4 pb-32">
                {menuCategories?.map((category) => (
                  <MenuCategory
                    key={category?.id}
                    category={category}
                    onAddToCart={handleAddToCart}
                    searchTerm={searchTerm}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'info':
        return <RestaurantInfo restaurant={restaurant} />;

      case 'reviews':
        return <ReviewsSection restaurant={restaurant} reviews={reviews} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Restaurant Hero */}
      <RestaurantHero restaurant={restaurant} />

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />

      {/* Menu Search (only show on menu tab) */}
      {activeTab === 'menu' && (
        <MenuSearch
          onSearch={setSearchTerm}
          placeholder="Search menu items..."
        />
      )}

      {/* Tab Content */}
      {renderTabContent()}

      {/* Floating Cart Summary */}
      <FloatingCartSummary
        cartItems={cartItems}
        cartTotal={cartTotal}
        onViewCart={handleViewCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default RestaurantProfileMenu;