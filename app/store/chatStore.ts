"use client";

import { create } from 'zustand';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  
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
})); 