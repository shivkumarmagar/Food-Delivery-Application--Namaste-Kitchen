import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLogin = ({ onSocialLogin, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          onClick={() => onSocialLogin(provider?.id)}
          disabled={loading}
          className={`w-full ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} hover:opacity-90`}
          iconName={provider?.icon}
          iconPosition="left"
          iconSize={20}
        >
          Continue with {provider?.name}
        </Button>
      ))}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground font-body">
            or continue with email
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;