"use client";

import { useState, FormEvent, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Focus when loading state changes
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="border-t border-gray-200 p-5 bg-white">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi về sức khỏe của bạn..."
            className="w-full rounded-full border border-gray-300 pl-6 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 text-base"
            disabled={isLoading}
            autoFocus
          />
          {input.trim() && (
            <button
              type="button"
              onClick={() => setInput('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`rounded-full p-4 ${
            isLoading || !input.trim() 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white transition-colors'
          }`}
        >
          {isLoading ? (
            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </form>
      <div className="mt-2 text-sm text-gray-500 text-center">
        <p>Để được tư vấn chính xác, hãy mô tả chi tiết triệu chứng của bạn.</p>
      </div>
    </div>
  );
} 