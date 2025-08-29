import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AddressTab = ({ addresses, onAddAddress, onEditAddress, onDeleteAddress, onSetPrimary }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Home',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    instructions: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const addressTypes = ['Home', 'Work', 'Other'];

  const resetForm = () => {
    setFormData({
      type: 'Home',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      instructions: ''
    });
    setErrors({});
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.street?.trim()) newErrors.street = 'Street address is required';
    if (!formData?.city?.trim()) newErrors.city = 'City is required';
    if (!formData?.state?.trim()) newErrors.state = 'State is required';
    if (!formData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (editingAddress) {
        onEditAddress({ ...editingAddress, ...formData });
      } else {
        onAddAddress({ ...formData, id: Date.now(), isPrimary: addresses?.length === 0 });
      }
      resetForm();
      setIsLoading(false);
    }, 1000);
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDelete = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      onDeleteAddress(addressId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Address Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Saved Addresses
        </h3>
        {!showAddForm && (
          <Button
            variant="default"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Address
          </Button>
        )}
      </div>
      {/* Address Form */}
      {showAddForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-md font-heading font-semibold text-foreground">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
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
            {/* Address Type */}
            <div className="space-y-2">
              <label className="block text-sm font-body font-medium text-foreground">
                Address Type
              </label>
              <div className="flex space-x-4">
                {addressTypes?.map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="addressType"
                      value={type}
                      checked={formData?.type === type}
                      onChange={(e) => handleInputChange('type', e?.target?.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm font-body text-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Street Address"
                  type="text"
                  value={formData?.street}
                  onChange={(e) => handleInputChange('street', e?.target?.value)}
                  error={errors?.street}
                  required
                  placeholder="123 Main Street"
                />
              </div>
              
              <Input
                label="Apartment/Suite (Optional)"
                type="text"
                value={formData?.apartment}
                onChange={(e) => handleInputChange('apartment', e?.target?.value)}
                placeholder="Apt 4B"
              />
              
              <Input
                label="City"
                type="text"
                value={formData?.city}
                onChange={(e) => handleInputChange('city', e?.target?.value)}
                error={errors?.city}
                required
                placeholder="New York"
              />
              
              <Input
                label="State"
                type="text"
                value={formData?.state}
                onChange={(e) => handleInputChange('state', e?.target?.value)}
                error={errors?.state}
                required
                placeholder="NY"
              />
              
              <Input
                label="ZIP Code"
                type="text"
                value={formData?.zipCode}
                onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                error={errors?.zipCode}
                required
                placeholder="10001"
              />
              
              <div className="md:col-span-2">
                <Input
                  label="Delivery Instructions (Optional)"
                  type="text"
                  value={formData?.instructions}
                  onChange={(e) => handleInputChange('instructions', e?.target?.value)}
                  placeholder="Ring doorbell, leave at door, etc."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
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
                {editingAddress ? 'Update Address' : 'Save Address'}
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Address List */}
      <div className="space-y-4">
        {addresses?.map((address) => (
          <div key={address?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="inline-flex items-center px-2 py-1 bg-accent text-accent-foreground text-xs font-caption rounded-md">
                    {address?.type}
                  </span>
                  {address?.isPrimary && (
                    <span className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs font-caption rounded-md">
                      Primary
                    </span>
                  )}
                </div>
                
                <div className="text-foreground font-body mb-1">
                  {address?.street}
                  {address?.apartment && `, ${address?.apartment}`}
                </div>
                <div className="text-muted-foreground font-body text-sm">
                  {address?.city}, {address?.state} {address?.zipCode}
                </div>
                {address?.instructions && (
                  <div className="text-muted-foreground font-caption text-sm mt-2">
                    <Icon name="Info" size={14} className="inline mr-1" />
                    {address?.instructions}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {!address?.isPrimary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSetPrimary(address?.id)}
                  >
                    Set Primary
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(address)}
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(address?.id)}
                  className="text-error hover:text-error"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {addresses?.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
              No addresses saved
            </h4>
            <p className="text-muted-foreground font-body mb-4">
              Add your first delivery address to get started
            </p>
            <Button
              variant="default"
              onClick={() => setShowAddForm(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Add Address
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressTab;