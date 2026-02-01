import { useState, useEffect } from 'react';
import { chatAPI } from '../services/chatAPI';

export const useAPIConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await chatAPI.healthCheck();
      setIsConnected(connected);
      setIsChecking(false);
    };

    checkConnection();
    // Check connection mỗi 30 giây
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  return { isConnected, isChecking };
};
