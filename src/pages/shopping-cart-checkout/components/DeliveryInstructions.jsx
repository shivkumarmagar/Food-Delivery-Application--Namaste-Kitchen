import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DeliveryInstructions = ({ 
  instructions, 
  onInstructionsChange 
}) => {
  const [charCount, setCharCount] = useState(instructions?.length || 0);
  const maxChars = 200;

  const handleInstructionsChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxChars) {
      setCharCount(value?.length);
      onInstructionsChange(value);
    }
  };

  const commonInstructions = [
    "Ring the doorbell",
    "Leave at the door",
    "Call when you arrive",
    "Meet at the lobby",
    "Use the side entrance",
    "Apartment buzzer not working"
  ];

  const handleQuickSelect = (instruction) => {
    const currentInstructions = instructions || '';
    const newInstructions = currentInstructions 
      ? `${currentInstructions}. ${instruction}`
      : instruction;
    
    if (newInstructions?.length <= maxChars) {
      setCharCount(newInstructions?.length);
      onInstructionsChange(newInstructions);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <h2 className="font-body font-semibold text-foreground text-lg mb-4">
        Delivery Instructions
      </h2>
      {/* Instructions Textarea */}
      <div className="space-y-3">
        <div className="relative">
          <textarea
            value={instructions || ''}
            onChange={handleInstructionsChange}
            placeholder="Add any special instructions for the delivery person..."
            className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
            rows={4}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-caption">
            {charCount}/{maxChars}
          </div>
        </div>

        {/* Quick Select Options */}
        <div>
          <p className="font-body font-medium text-foreground text-sm mb-2">
            Quick Select:
          </p>
          <div className="flex flex-wrap gap-2">
            {commonInstructions?.map((instruction, index) => (
              <button
                key={index}
                onClick={() => handleQuickSelect(instruction)}
                className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-md text-xs font-caption transition-smooth"
              >
                {instruction}
              </button>
            ))}
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={14} className="text-accent-foreground mt-0.5" />
            <div>
              <p className="font-body font-medium text-foreground text-sm mb-1">
                Helpful Tips:
              </p>
              <ul className="space-y-1 font-caption text-muted-foreground text-xs">
                <li>• Include apartment/unit numbers</li>
                <li>• Mention if buzzer or doorbell isn't working</li>
                <li>• Specify preferred drop-off location</li>
                <li>• Add your phone number for easy contact</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={14} className="text-accent-foreground mt-0.5" />
            <p className="font-caption text-accent-foreground text-xs">
              For your safety, our delivery partners are trained to follow contactless delivery protocols. 
              They will maintain appropriate distance and follow all safety guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInstructions;