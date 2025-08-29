import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onProfilePhotoChange, onEditProfile }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = async (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          onProfilePhotoChange(e?.target?.result);
          setIsUploading(false);
        };
        reader?.readAsDataURL(file);
      }, 1500);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
            <Image
              src={user?.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
              alt={`${user?.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Upload Button */}
          <label className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-smooth shadow-elevated">
            <Icon name="Camera" size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
          
          {/* Upload Loading */}
          {isUploading && (
            <div className="absolute inset-0 bg-background/80 rounded-full flex items-center justify-center">
              <Icon name="Loader2" size={20} className="animate-spin text-primary" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            {user?.name}
          </h1>
          <p className="text-muted-foreground font-body mb-1">{user?.email}</p>
          <p className="text-muted-foreground font-body mb-4">{user?.phone}</p>
          
          {/* Member Since */}
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-muted-foreground mb-4">
            <Icon name="Calendar" size={16} />
            <span className="font-caption">Member since {user?.memberSince}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center sm:justify-start space-x-6">
            <div className="text-center">
              <div className="text-lg font-heading font-bold text-foreground">{user?.totalOrders}</div>
              <div className="text-xs font-caption text-muted-foreground">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-heading font-bold text-primary">{user?.loyaltyPoints}</div>
              <div className="text-xs font-caption text-muted-foreground">Points</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-heading font-bold text-accent">{user?.favoriteRestaurants}</div>
              <div className="text-xs font-caption text-muted-foreground">Favorites</div>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            onClick={onEditProfile}
            iconName="Edit"
            iconPosition="left"
            className="whitespace-nowrap"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;