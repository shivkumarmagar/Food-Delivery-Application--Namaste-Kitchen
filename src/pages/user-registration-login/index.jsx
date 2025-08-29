import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import SocialLogin from './components/SocialLogin';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TrustSignals from './components/TrustSignals';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const UserRegistrationLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user data for demonstration
  const mockUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "admin@foodexpress.com",
      phone: "+1-555-0123",
      role: "customer",
      canSwitchRoles: true,
      address: "123 Main St, New York, NY 10001"
    },
    {
      id: 2,
      name: "Restaurant Manager",
      email: "restaurant@foodexpress.com",
      phone: "+1-555-0124",
      role: "restaurant",
      canSwitchRoles: true,
      restaurantName: "Bella Italia"
    }
  ];

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('foodexpress_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      // Redirect if already authenticated
      const from = location?.state?.from?.pathname || '/restaurant-profile-menu';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleLogin = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication
      const mockUser = mockUsers?.find(u => 
        u?.email === formData?.emailOrPhone || 
        u?.phone === formData?.emailOrPhone
      );
      
      if (!mockUser || formData?.password !== 'password123') {
        throw new Error('Invalid credentials. Use admin@foodexpress.com / password123');
      }
      
      // Store user data
      localStorage.setItem('foodexpress_user', JSON.stringify(mockUser));
      if (formData?.rememberMe) {
        localStorage.setItem('foodexpress_remember', 'true');
      }
      
      setUser(mockUser);
      
      // Redirect to intended page or dashboard
      const from = location?.state?.from?.pathname || '/restaurant-profile-menu';
      navigate(from, { replace: true });
      
    } catch (error) {
      alert(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new user
      const newUser = {
        id: Date.now(),
        name: formData?.fullName,
        email: formData?.email,
        phone: formData?.phone,
        role: "customer",
        canSwitchRoles: false,
        address: `${formData?.address}, ${formData?.city}, ${formData?.zipCode}`
      };
      
      // Store user data
      localStorage.setItem('foodexpress_user', JSON.stringify(newUser));
      setUser(newUser);
      
      // Redirect to dashboard
      navigate('/restaurant-profile-menu', { replace: true });
      
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const socialUser = {
        id: Date.now(),
        name: provider === 'google' ? 'Google User' : 'Facebook User',
        email: `${provider}user@example.com`,
        phone: '+1-555-0199',
        role: "customer",
        canSwitchRoles: false,
        loginMethod: provider
      };
      
      localStorage.setItem('foodexpress_user', JSON.stringify(socialUser));
      setUser(socialUser);
      
      const from = location?.state?.from?.pathname || '/restaurant-profile-menu';
      navigate(from, { replace: true });
      
    } catch (error) {
      alert(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setLoading(true);
    
    try {
      // Simulate password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Modal will show success state
    } catch (error) {
      alert('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthClick = (action) => {
    if (action === 'logout') {
      localStorage.removeItem('foodexpress_user');
      localStorage.removeItem('foodexpress_remember');
      setUser(null);
      navigate('/user-registration-login');
    } else if (action === 'login') {
      setActiveTab('login');
    }
  };

  const handleRoleSwitch = (newRole) => {
    if (user && user?.canSwitchRoles) {
      const updatedUser = { ...user, role: newRole };
      localStorage.setItem('foodexpress_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user}
        onAuthClick={handleAuthClick}
        onRoleSwitch={handleRoleSwitch}
      />
      
      <main className="pt-16">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Logo and Welcome */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                  <Icon name="Utensils" size={28} color="white" />
                </div>
                <span className="font-heading font-bold text-2xl text-foreground">
                  FoodExpress
                </span>
              </Link>
              
              <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome Back!' : 'Join FoodExpress'}
              </h1>
              <p className="text-muted-foreground font-body">
                {activeTab === 'login' ?'Sign in to your account to continue ordering' :'Create your account and start ordering delicious food'
                }
              </p>
            </div>

            {/* Auth Card */}
            <div className="bg-card rounded-xl shadow-card border border-border p-6">
              <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
              
              <SocialLogin onSocialLogin={handleSocialLogin} loading={loading} />
              
              {activeTab === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  loading={loading}
                  onForgotPassword={() => setShowForgotPassword(true)}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  loading={loading}
                />
              )}
              
              <TrustSignals />
            </div>

            {/* Additional Links */}
            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-muted-foreground font-body">
                {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                  className="text-primary hover:text-primary/80 font-semibold transition-smooth"
                  disabled={loading}
                >
                  {activeTab === 'login' ? 'Create one here' : 'Sign in here'}
                </button>
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground font-caption">
                <Link to="/terms" className="hover:text-foreground transition-smooth">
                  Terms of Service
                </Link>
                <span>•</span>
                <Link to="/privacy" className="hover:text-foreground transition-smooth">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link to="/help" className="hover:text-foreground transition-smooth">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPassword}
        loading={loading}
      />
    </div>
  );
};

export default UserRegistrationLogin;