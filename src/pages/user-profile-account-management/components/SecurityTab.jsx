import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';


const SecurityTab = ({ user, onPasswordChange, onTwoFactorToggle }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);

  const handlePasswordInputChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (passwordErrors?.[field]) {
      setPasswordErrors(prev => ({ ...prev, [field]: '' }));
    }
    setPasswordChanged(false);
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordForm?.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm?.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm?.newPassword?.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(passwordForm?.newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!passwordForm?.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handlePasswordChange = async () => {
    if (!validatePasswordForm()) return;
    
    setIsChangingPassword(true);
    
    setTimeout(() => {
      onPasswordChange(passwordForm);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);
      setPasswordChanged(true);
      
      setTimeout(() => setPasswordChanged(false), 3000);
    }, 1500);
  };

  const handleTwoFactorToggle = async () => {
    if (user?.twoFactorEnabled) {
      // Disable 2FA
      onTwoFactorToggle(false);
    } else {
      // Show setup form
      setShowTwoFactorSetup(true);
    }
  };

  const handleTwoFactorSetup = async () => {
    if (!twoFactorCode || twoFactorCode?.length !== 6) {
      return;
    }
    
    setIsEnabling2FA(true);
    
    setTimeout(() => {
      onTwoFactorToggle(true);
      setShowTwoFactorSetup(false);
      setTwoFactorCode('');
      setIsEnabling2FA(false);
    }, 1500);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[^a-zA-Z\d]/?.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-error' };
      case 2: return { text: 'Weak', color: 'text-warning' };
      case 3: return { text: 'Fair', color: 'text-accent' };
      case 4: return { text: 'Good', color: 'text-success' };
      case 5: return { text: 'Strong', color: 'text-success' };
      default: return { text: '', color: '' };
    }
  };

  const passwordStrength = getPasswordStrength(passwordForm?.newPassword);
  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <div className="space-y-6">
      {/* Success Messages */}
      {passwordChanged && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <span className="text-success font-body">Password changed successfully!</span>
        </div>
      )}
      {/* Change Password */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-6">
          Change Password
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordForm?.currentPassword}
            onChange={(e) => handlePasswordInputChange('currentPassword', e?.target?.value)}
            error={passwordErrors?.currentPassword}
            required
            placeholder="Enter your current password"
          />
          
          <Input
            label="New Password"
            type="password"
            value={passwordForm?.newPassword}
            onChange={(e) => handlePasswordInputChange('newPassword', e?.target?.value)}
            error={passwordErrors?.newPassword}
            required
            placeholder="Enter your new password"
            description="Must be at least 8 characters with uppercase, lowercase, and number"
          />
          
          {/* Password Strength Indicator */}
          {passwordForm?.newPassword && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-caption text-muted-foreground">Password Strength:</span>
                <span className={`text-sm font-caption ${strengthInfo?.color}`}>
                  {strengthInfo?.text}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    passwordStrength <= 1 ? 'bg-error' :
                    passwordStrength === 2 ? 'bg-warning' :
                    passwordStrength === 3 ? 'bg-accent': 'bg-success'
                  }`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm?.confirmPassword}
            onChange={(e) => handlePasswordInputChange('confirmPassword', e?.target?.value)}
            error={passwordErrors?.confirmPassword}
            required
            placeholder="Confirm your new password"
          />
          
          <div className="flex justify-end">
            <Button
              variant="default"
              onClick={handlePasswordChange}
              loading={isChangingPassword}
              iconName="Save"
              iconPosition="left"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              Two-Factor Authentication
            </h3>
            <p className="text-muted-foreground font-body text-sm">
              Add an extra layer of security to your account
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-caption ${user?.twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
              {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <Button
              variant={user?.twoFactorEnabled ? "outline" : "default"}
              onClick={handleTwoFactorToggle}
              iconName={user?.twoFactorEnabled ? "ShieldOff" : "Shield"}
              iconPosition="left"
            >
              {user?.twoFactorEnabled ? 'Disable' : 'Enable'}
            </Button>
          </div>
        </div>

        {user?.twoFactorEnabled && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-success" />
              <div>
                <div className="font-body font-medium text-success">Two-Factor Authentication is active</div>
                <div className="text-success/80 font-caption text-sm">
                  Your account is protected with 2FA using your authenticator app
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2FA Setup Form */}
        {showTwoFactorSetup && (
          <div className="space-y-4 border-t border-border pt-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-body text-sm mb-4">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              <div className="bg-muted rounded-lg p-3 font-mono text-sm text-center mb-4">
                ABCD EFGH IJKL MNOP QRST UVWX YZ12 3456
              </div>
            </div>
            
            <Input
              label="Verification Code"
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
              placeholder="Enter 6-digit code"
              maxLength={6}
              description="Enter the 6-digit code from your authenticator app"
            />
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowTwoFactorSetup(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleTwoFactorSetup}
                loading={isEnabling2FA}
                disabled={twoFactorCode?.length !== 6}
                iconName="Shield"
                iconPosition="left"
              >
                Enable 2FA
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Login Sessions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-6">
          Active Sessions
        </h3>
        
        <div className="space-y-4">
          {[
            {
              device: 'Chrome on Windows',
              location: 'New York, NY',
              lastActive: '2 minutes ago',
              current: true
            },
            {
              device: 'Safari on iPhone',
              location: 'New York, NY',
              lastActive: '1 hour ago',
              current: false
            },
            {
              device: 'Chrome on MacBook',
              location: 'New York, NY',
              lastActive: '2 days ago',
              current: false
            }
          ]?.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Monitor" size={20} className="text-muted-foreground" />
                <div>
                  <div className="font-body text-foreground">
                    {session?.device}
                    {session?.current && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 bg-success text-success-foreground text-xs font-caption rounded-md">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground font-caption text-sm">
                    {session?.location} • Last active {session?.lastActive}
                  </div>
                </div>
              </div>
              
              {!session?.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-error hover:text-error"
                >
                  End Session
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Security Tips */}
      <div className="bg-muted border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h5 className="font-body font-medium text-foreground mb-2">
              Security Tips
            </h5>
            <ul className="text-muted-foreground font-caption text-sm space-y-1">
              <li>• Use a strong, unique password for your account</li>
              <li>• Enable two-factor authentication for extra security</li>
              <li>• Never share your login credentials with anyone</li>
              <li>• Log out from shared or public devices</li>
              <li>• Review your active sessions regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;