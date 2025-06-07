"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useSocketConnection } from '../hooks/useSocketConnection';
import { Socket } from 'socket.io-client';

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketConnection = useSocketConnection();

  return (
    <SocketContext.Provider value={socketConnection}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
} 