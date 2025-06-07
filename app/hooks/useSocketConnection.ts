"use client";

import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

export function useSocketConnection() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create socket connection
    const socketInstance = io({
      path: '/socket.io',
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Socket event listeners
    const onConnect = () => {
      setIsConnected(true);
      setError(null);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onError = (err: Error) => {
      setError(err.message);
    };

    // Register event listeners
    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);
    socketInstance.on('connect_error', onError);

    // Save socket instance
    setSocket(socketInstance);

    // Cleanup function
    return () => {
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
      socketInstance.off('connect_error', onError);
      socketInstance.disconnect();
    };
  }, []);

  return { socket, isConnected, error };
} 