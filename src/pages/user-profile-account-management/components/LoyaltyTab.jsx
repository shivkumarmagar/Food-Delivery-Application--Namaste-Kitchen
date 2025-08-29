import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LoyaltyTab = ({ loyaltyData, onRedeemReward }) => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleRedeemReward = async (reward) => {
    if (loyaltyData?.currentPoints < reward?.pointsCost) return;
    
    setIsRedeeming(true);
    setSelectedReward(reward?.id);
    
    setTimeout(() => {
      onRedeemReward(reward);
      setIsRedeeming(false);
      setSelectedReward(null);
    }, 1500);
  };

  const getNextTierProgress = () => {
    const currentTier = loyaltyData?.currentTier;
    const nextTier = loyaltyData?.tiers?.find(tier => tier?.level > currentTier?.level);
    
    if (!nextTier) return null;
    
    const progress = (loyaltyData?.currentPoints - currentTier?.minPoints) / (nextTier?.minPoints - currentTier?.minPoints);
    const pointsNeeded = nextTier?.minPoints - loyaltyData?.currentPoints;
    
    return { nextTier, progress: Math.min(progress, 1), pointsNeeded };
  };

  const tierProgress = getNextTierProgress();

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-2">
              {loyaltyData?.currentPoints?.toLocaleString()} Points
            </h3>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} />
              <span className="font-body">{loyaltyData?.currentTier?.name} Member</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90 mb-1">Total Earned</div>
            <div className="text-lg font-heading font-semibold">
              {loyaltyData?.totalEarned?.toLocaleString()}
            </div>
          </div>
        </div>
        
        {/* Next Tier Progress */}
        {tierProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to {tierProgress?.nextTier?.name}</span>
              <span>{tierProgress?.pointsNeeded} points needed</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${tierProgress?.progress * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      {/* Tier Benefits */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
          Your {loyaltyData?.currentTier?.name} Benefits
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loyaltyData?.currentTier?.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="font-body text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Available Rewards */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-heading font-semibold text-foreground mb-6">
          Available Rewards
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loyaltyData?.availableRewards?.map((reward) => {
            const canRedeem = loyaltyData?.currentPoints >= reward?.pointsCost;
            const isCurrentlyRedeeming = selectedReward === reward?.id && isRedeeming;
            
            return (
              <div key={reward?.id} className={`border rounded-lg p-4 ${canRedeem ? 'border-border' : 'border-muted bg-muted/50'}`}>
                <div className="w-full h-32 rounded-lg overflow-hidden mb-4 bg-muted">
                  <Image
                    src={reward?.image}
                    alt={reward?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="font-body font-semibold text-foreground mb-2">
                  {reward?.title}
                </h5>
                <p className="text-muted-foreground font-caption text-sm mb-3">
                  {reward?.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-accent" />
                    <span className="font-mono text-sm text-foreground">
                      {reward?.pointsCost?.toLocaleString()}
                    </span>
                  </div>
                  
                  <Button
                    variant={canRedeem ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleRedeemReward(reward)}
                    disabled={!canRedeem || isCurrentlyRedeeming}
                    loading={isCurrentlyRedeeming}
                    iconName="Gift"
                    iconPosition="left"
                  >
                    {canRedeem ? 'Redeem' : 'Not Enough Points'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Points History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-heading font-semibold text-foreground mb-6">
          Recent Points Activity
        </h4>
        
        <div className="space-y-4">
          {loyaltyData?.pointsHistory?.map((activity) => (
            <div key={activity?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity?.type === 'earned' ? 'bg-success/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={activity?.type === 'earned' ? 'Plus' : 'Gift'} 
                    size={16} 
                    className={activity?.type === 'earned' ? 'text-success' : 'text-primary'} 
                  />
                </div>
                
                <div>
                  <div className="font-body text-foreground">{activity?.description}</div>
                  <div className="text-muted-foreground font-caption text-sm">
                    {new Date(activity.date)?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              
              <div className={`font-mono font-semibold ${
                activity?.type === 'earned' ? 'text-success' : 'text-primary'
              }`}>
                {activity?.type === 'earned' ? '+' : '-'}{activity?.points}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Tier Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-heading font-semibold text-foreground mb-6">
          Membership Tiers
        </h4>
        
        <div className="space-y-4">
          {loyaltyData?.tiers?.map((tier) => {
            const isCurrent = tier?.level === loyaltyData?.currentTier?.level;
            const isUnlocked = loyaltyData?.currentPoints >= tier?.minPoints;
            
            return (
              <div key={tier?.level} className={`border rounded-lg p-4 ${
                isCurrent ? 'border-primary bg-primary/5' : isUnlocked ?'border-success bg-success/5': 'border-border'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name="Award" 
                      size={20} 
                      className={
                        isCurrent ? 'text-primary' : isUnlocked ?'text-success': 'text-muted-foreground'
                      } 
                    />
                    <div>
                      <h5 className="font-body font-semibold text-foreground">
                        {tier?.name}
                        {isCurrent && (
                          <span className="ml-2 inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs font-caption rounded-md">
                            Current
                          </span>
                        )}
                      </h5>
                      <div className="text-muted-foreground font-caption text-sm">
                        {tier?.minPoints?.toLocaleString()}+ points required
                      </div>
                    </div>
                  </div>
                  
                  {isUnlocked && !isCurrent && (
                    <Icon name="CheckCircle" size={20} className="text-success" />
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tier?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-muted-foreground" />
                      <span className="font-caption text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* How to Earn Points */}
      <div className="bg-muted border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h5 className="font-body font-medium text-foreground mb-2">
              How to Earn Points
            </h5>
            <ul className="text-muted-foreground font-caption text-sm space-y-1">
              <li>• Earn 1 point for every $1 spent on orders</li>
              <li>• Get bonus points for trying new restaurants</li>
              <li>• Earn extra points for writing reviews</li>
              <li>• Special promotions and challenges offer bonus points</li>
              <li>• Refer friends and earn 500 points per successful referral</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyTab;