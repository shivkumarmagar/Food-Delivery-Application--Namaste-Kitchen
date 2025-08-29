import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const PaymentSection = ({ 
  selectedPayment, 
  onPaymentChange, 
  onPaymentSubmit 
}) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'apple_pay',
      name: 'Apple Pay',
      icon: 'Smartphone',
      description: 'Touch ID or Face ID'
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      icon: 'Smartphone',
      description: 'Pay with Google'
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: 'Banknote',
      description: 'Pay when your order arrives'
    }
  ];

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateCardDetails = () => {
    const newErrors = {};
    
    if (!cardDetails?.number || cardDetails?.number?.length < 16) {
      newErrors.number = 'Please enter a valid card number';
    }
    if (!cardDetails?.expiry || cardDetails?.expiry?.length < 5) {
      newErrors.expiry = 'Please enter expiry date (MM/YY)';
    }
    if (!cardDetails?.cvv || cardDetails?.cvv?.length < 3) {
      newErrors.cvv = 'Please enter CVV';
    }
    if (!cardDetails?.name?.trim()) {
      newErrors.name = 'Please enter cardholder name';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <h2 className="font-body font-semibold text-foreground text-lg mb-4">
        Payment Method
      </h2>
      {/* Payment Method Selection */}
      <div className="space-y-3 mb-6">
        {paymentMethods?.map((method) => (
          <button
            key={method?.id}
            onClick={() => onPaymentChange(method?.id)}
            className={`w-full text-left p-3 rounded-lg border transition-smooth ${
              selectedPayment === method?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground hover:bg-muted'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                selectedPayment === method?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={method?.icon} size={18} />
              </div>
              <div className="flex-1">
                <p className="font-body font-medium text-foreground text-sm">
                  {method?.name}
                </p>
                <p className="font-caption text-muted-foreground text-xs">
                  {method?.description}
                </p>
              </div>
              {selectedPayment === method?.id && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </div>
          </button>
        ))}
      </div>
      {/* Card Details Form */}
      {selectedPayment === 'card' && (
        <div className="space-y-4 animate-slide-in">
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails?.number}
              onChange={(e) => handleCardInputChange('number', formatCardNumber(e?.target?.value))}
              error={errors?.number}
              maxLength={19}
            />
            
            <Input
              label="Cardholder Name"
              type="text"
              placeholder="John Doe"
              value={cardDetails?.name}
              onChange={(e) => handleCardInputChange('name', e?.target?.value)}
              error={errors?.name}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
                value={cardDetails?.expiry}
                onChange={(e) => handleCardInputChange('expiry', formatExpiry(e?.target?.value))}
                error={errors?.expiry}
                maxLength={5}
              />
              
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={cardDetails?.cvv}
                onChange={(e) => handleCardInputChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
                error={errors?.cvv}
                maxLength={4}
              />
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="font-caption text-success text-xs">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-success" />
              <span className="font-caption text-success text-xs">256-bit Encryption</span>
            </div>
          </div>
        </div>
      )}
      {/* Digital Wallet Instructions */}
      {(selectedPayment === 'paypal' || selectedPayment === 'apple_pay' || selectedPayment === 'google_pay') && (
        <div className="p-4 bg-muted rounded-lg animate-slide-in">
          <div className="flex items-center space-x-3">
            <Icon name="Info" size={16} className="text-muted-foreground" />
            <p className="font-caption text-muted-foreground text-sm">
              You will be redirected to {paymentMethods?.find(m => m?.id === selectedPayment)?.name} to complete your payment securely.
            </p>
          </div>
        </div>
      )}
      {/* Cash on Delivery Notice */}
      {selectedPayment === 'cash' && (
        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg animate-slide-in">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={16} className="text-accent-foreground mt-0.5" />
            <div>
              <p className="font-body font-medium text-accent-foreground text-sm mb-1">
                Cash on Delivery
              </p>
              <p className="font-caption text-accent-foreground text-xs">
                Please have exact change ready. Our delivery partner will collect ${onPaymentSubmit?.total?.toFixed(2) || '0.00'} when your order arrives.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection;