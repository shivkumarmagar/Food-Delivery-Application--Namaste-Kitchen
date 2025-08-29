import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, Star, ChefHat, Truck } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for featured restaurants
  const featuredRestaurants = [
    {
      id: 'rest-001',
      name: "Bella Vista Italian Kitchen",
      cuisine: "Italian",
      rating: 4.6,
      reviewCount: 1247,
      deliveryTime: "25-40 min",
      distance: "1.2 miles",
      deliveryFee: 2.99,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      isPromoted: true,
      discount: "20% off orders over $25"
    },
    {
      id: 'rest-002',
      name: "Tokyo Ramen House",
      cuisine: "Japanese",
      rating: 4.8,
      reviewCount: 892,
      deliveryTime: "20-35 min",
      distance: "0.8 miles",
      deliveryFee: 1.99,
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
      isPromoted: false
    },
    {
      id: 'rest-003',
      name: "Mumbai Spice Garden",
      cuisine: "Indian",
      rating: 4.5,
      reviewCount: 654,
      deliveryTime: "30-45 min",
      distance: "2.1 miles",
      deliveryFee: 3.49,
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      isPromoted: false
    },
    {
      id: 'rest-004',
      name: "Green Garden Café",
      cuisine: "Healthy",
      rating: 4.7,
      reviewCount: 423,
      deliveryTime: "15-30 min",
      distance: "0.5 miles",
      deliveryFee: 0,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      isPromoted: true,
      discount: "Free delivery"
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: ChefHat },
    { id: 'italian', name: 'Italian', icon: ChefHat },
    { id: 'japanese', name: 'Japanese', icon: ChefHat },
    { id: 'indian', name: 'Indian', icon: ChefHat },
    { id: 'healthy', name: 'Healthy', icon: ChefHat },
    { id: 'fast-food', name: 'Fast Food', icon: ChefHat }
  ];

  const handleRestaurantClick = (restaurantId) => {
    navigate('/restaurant-profile-menu');
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchTerm);
  };

  const filteredRestaurants = featuredRestaurants?.filter(restaurant => {
    const matchesSearch = restaurant?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         restaurant?.cuisine?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           restaurant?.cuisine?.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Delicious food, delivered to your door
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Order from your favorite restaurants and get fresh food delivered fast
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="Search restaurants, cuisines, or dishes..."
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Search
                  </div>
                </button>
              </div>
            </form>

            {/* Location */}
            <div className="flex items-center justify-center mt-4 text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Delivering to India</span>
            </div>
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category?.id
                  ? 'bg-blue-600 text-white' :'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <category.icon className="h-4 w-4" />
              {category?.name}
            </button>
          ))}
        </div>
      </div>
      {/* Featured Restaurants */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Restaurants
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants?.map((restaurant) => (
            <div
              key={restaurant?.id}
              onClick={() => handleRestaurantClick(restaurant?.id)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src={restaurant?.image}
                  alt={restaurant?.name}
                  className="w-full h-48 object-cover"
                />
                {restaurant?.isPromoted && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                      PROMOTED
                    </span>
                  </div>
                )}
                {restaurant?.discount && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">
                      {restaurant?.discount}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {restaurant?.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{restaurant?.cuisine}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{restaurant?.rating}</span>
                    <span>({restaurant?.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant?.deliveryTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>
                      {restaurant?.deliveryFee === 0 ? 'Free delivery' : `$${restaurant?.deliveryFee} delivery`}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{restaurant?.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants?.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse & Order</h3>
              <p className="text-gray-600">
                Discover restaurants and order your favorite meals with just a few taps
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your food delivered hot and fresh in 30 minutes or less
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All restaurants are verified and rated by our community of food lovers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;