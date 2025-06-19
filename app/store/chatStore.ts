"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export type GPUHost = 'gpu4090' | 'kaggle';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  gpuHost: GPUHost;
  addMessage: (message: Message) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetMessages: () => void;
  setGPUHost: (host: GPUHost) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      error: null,
      gpuHost: 'gpu4090', // Default to 4090 GPU
      
      addMessage: (message) => 
        set((state) => ({
          messages: [...state.messages, message],
        })),
      
      setIsLoading: (isLoading) => 
        set(() => ({
          isLoading,
        })),
      
      setError: (error) => 
        set(() => ({
          error,
        })),
      
      resetMessages: () => 
        set(() => ({
          messages: [],
        })),
        
      setGPUHost: (gpuHost) => 
        set(() => ({
          gpuHost,
        })),
    }),
    {
      name: 'health-chatbot-storage',
    }
  )
); 