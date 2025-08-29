import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentTab = ({ paymentMethods, onAddPayment, onDeletePayment, onSetPrimary }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    });
    setErrors({});
    setShowAddForm(false);
  };

  const handleInputChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev?.[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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

  const getCardType = (number) => {
    const num = number?.replace(/\s/g, '');
    if (/^4/?.test(num)) return 'Visa';
    if (/^5[1-5]/?.test(num)) return 'Mastercard';
    if (/^3[47]/?.test(num)) return 'American Express';
    if (/^6/?.test(num)) return 'Discover';
    return 'Unknown';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.cardNumber?.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData?.cardNumber?.replace(/\s/g, '')?.length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!formData?.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
    if (!formData?.expiryYear) newErrors.expiryYear = 'Expiry year is required';
    if (!formData?.cvv) newErrors.cvv = 'CVV is required';
    if (!formData?.cardholderName?.trim()) newErrors.cardholderName = 'Cardholder name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newPayment = {
        id: Date.now(),
        type: getCardType(formData?.cardNumber),
        lastFour: formData?.cardNumber?.slice(-4),
        expiryMonth: formData?.expiryMonth,
        expiryYear: formData?.expiryYear,
        cardholderName: formData?.cardholderName,
        isPrimary: paymentMethods?.length === 0
      };
      
      onAddPayment(newPayment);
      resetForm();
      setIsLoading(false);
    }, 1000);
  };

  const handleDelete = (paymentId) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      onDeletePayment(paymentId);
    }
  };

  const currentYear = new Date()?.getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' }
  ];

  return (
    <div className="space-y-6">
      {/* Add Payment Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Payment Methods
        </h3>
        {!showAddForm && (
          <Button
            variant="default"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Payment Method
          </Button>
        )}
      </div>
      {/* Payment Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-md font-heading font-semibold text-foreground">
              Add New Payment Method
            </h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetForm}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              label="Card Number"
              type="text"
              value={formData?.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e?.target?.value))}
              error={errors?.cardNumber}
              required
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-body font-medium text-foreground">
                  Expiry Month *
                </label>
                <select
                  value={formData?.expiryMonth}
                  onChange={(e) => handleInputChange('expiryMonth', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Month</option>
                  {months?.map(month => (
                    <option key={month?.value} value={month?.value}>
                      {month?.label}
                    </option>
                  ))}
                </select>
                {errors?.expiryMonth && (
                  <p className="text-error text-sm font-caption">{errors?.expiryMonth}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-body font-medium text-foreground">
                  Expiry Year *
                </label>
                <select
                  value={formData?.expiryYear}
                  onChange={(e) => handleInputChange('expiryYear', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Year</option>
                  {years?.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors?.expiryYear && (
                  <p className="text-error text-sm font-caption">{errors?.expiryYear}</p>
                )}
              </div>

              <Input
                label="CVV"
                type="text"
                value={formData?.cvv}
                onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, '')?.slice(0, 4))}
                error={errors?.cvv}
                required
                placeholder="123"
                maxLength={4}
              />
            </div>

            <Input
              label="Cardholder Name"
              type="text"
              value={formData?.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
              error={errors?.cardholderName}
              required
              placeholder="John Doe"
            />

            <div className="border-t border-border pt-4">
              <h5 className="text-md font-heading font-medium text-foreground mb-4">
                Billing Address
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    type="text"
                    value={formData?.billingAddress?.street}
                    onChange={(e) => handleInputChange('billingAddress.street', e?.target?.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                
                <Input
                  label="City"
                  type="text"
                  value={formData?.billingAddress?.city}
                  onChange={(e) => handleInputChange('billingAddress.city', e?.target?.value)}
                  placeholder="New York"
                />
                
                <Input
                  label="State"
                  type="text"
                  value={formData?.billingAddress?.state}
                  onChange={(e) => handleInputChange('billingAddress.state', e?.target?.value)}
                  placeholder="NY"
                />
                
                <Input
                  label="ZIP Code"
                  type="text"
                  value={formData?.billingAddress?.zipCode}
                  onChange={(e) => handleInputChange('billingAddress.zipCode', e?.target?.value)}
                  placeholder="10001"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSave}
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
              >
                Save Payment Method
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods?.map((payment) => (
          <div key={payment?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                  <Icon 
                    name={payment?.type === 'Visa' ? 'CreditCard' : 'CreditCard'} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-body font-medium text-foreground">
                      {payment?.type} •••• {payment?.lastFour}
                    </span>
                    {payment?.isPrimary && (
                      <span className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs font-caption rounded-md">
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground font-body text-sm">
                    Expires {payment?.expiryMonth}/{payment?.expiryYear}
                  </div>
                  <div className="text-muted-foreground font-caption text-sm">
                    {payment?.cardholderName}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!payment?.isPrimary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSetPrimary(payment?.id)}
                  >
                    Set Primary
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(payment?.id)}
                  className="text-error hover:text-error"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {paymentMethods?.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
              No payment methods saved
            </h4>
            <p className="text-muted-foreground font-body mb-4">
              Add a payment method for faster checkout
            </p>
            <Button
              variant="default"
              onClick={() => setShowAddForm(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Add Payment Method
            </Button>
          </div>
        )}
      </div>
      {/* Security Notice */}
      <div className="bg-muted border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <h5 className="font-body font-medium text-foreground mb-1">
              Your payment information is secure
            </h5>
            <p className="text-muted-foreground font-caption text-sm">
              We use industry-standard encryption to protect your payment details. Your card information is never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTab;