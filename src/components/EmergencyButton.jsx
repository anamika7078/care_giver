// src/components/EmergencyButton.jsx
import React, { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const EmergencyButton = () => {
  const [isEmergency, setIsEmergency] = useState(false);

  const handleEmergencyClick = () => {
    setIsEmergency(true);
    // TODO: Implement emergency API call
    alert('Emergency alert sent to caregivers and family members!');
    setTimeout(() => setIsEmergency(false), 5000);
  };

  return (
    <button
      onClick={handleEmergencyClick}
      disabled={isEmergency}
      className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg flex items-center justify-center ${
        isEmergency 
          ? 'bg-green-500 text-white' 
          : 'bg-red-600 text-white hover:bg-red-700'
      } transition-all duration-300 transform hover:scale-105`}
    >
      <FiAlertTriangle className="mr-2" size={24} />
      {isEmergency ? 'Help is on the way!' : 'EMERGENCY'}
    </button>
  );
};

export default EmergencyButton;