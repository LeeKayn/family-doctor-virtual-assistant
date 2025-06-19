"use client";

import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus vào input khi component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Focus lại vào input sau khi loading thay đổi (sau khi gửi tin nhắn)
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Handle pressing Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập câu hỏi sức khỏe của bạn..."
            className="w-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-gray-300 hover:shadow-lg transition-all duration-300 ease-in-out"
            style={{
              padding: 'clamp(0.6rem, 1.5vh, 1rem) clamp(0.8rem, 2vw, 1.2rem)',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              height: 'clamp(2.5rem, 6vh, 3.5rem)',
              borderRadius: 'clamp(1rem, 2vw, 1.5rem)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06)'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06)';
              e.target.style.transform = 'translateY(0)';
            }}
            disabled={isLoading}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center text-white transition-all duration-300 ease-in-out transform"
          style={{
            width: 'clamp(2.5rem, 6vh, 3.5rem)',
            height: 'clamp(2.5rem, 6vh, 3.5rem)',
            borderRadius: '50%',
            background: !message.trim() || isLoading 
              ? 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            boxShadow: !message.trim() || isLoading
              ? '0 2px 6px rgba(0, 0, 0, 0.1)'
              : '0 4px 12px rgba(59, 130, 246, 0.3), 0 2px 6px rgba(29, 78, 216, 0.2)',
            cursor: !message.trim() || isLoading ? 'not-allowed' : 'pointer',
            transform: !message.trim() || isLoading ? 'scale(0.95)' : 'scale(1)',
            opacity: !message.trim() || isLoading ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (message.trim() && !isLoading) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4), 0 3px 8px rgba(29, 78, 216, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (message.trim() && !isLoading) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3), 0 2px 6px rgba(29, 78, 216, 0.2)';
            }
          }}
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <svg 
              className="animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              style={{
                width: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                height: 'clamp(1.1rem, 2.2vw, 1.4rem)'
              }}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              className="transition-transform duration-200 ease-in-out"
              style={{
                width: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                height: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                filter: message.trim() && !isLoading ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' : 'none'
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </form>
      <div className="text-center mt-3">
        <p 
          className="text-gray-500 font-medium"
          style={{
            fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)'
          }}
        >
          Capstone Project - Le Van An - ITF-DUT
        </p>
      </div>
    </div>
  );
}