"use client";

import { useState, useEffect } from 'react';
import { Message } from '../store/chatStore';

interface MessageItemProps {
  message: Message;
  onRetry?: () => void;
  isLatestAssistant?: boolean;
}

export function MessageItem({ message, onRetry, isLatestAssistant }: MessageItemProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  
  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex items-end max-w-xs lg:max-w-lg xl:max-w-2xl ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        {/* Avatar */}
        <div className="flex-shrink-0 mb-2">
          {isUser ? (
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md border border-white">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-md border border-white">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Message bubble container */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[calc(100%-60px)]`}>
          {/* Sender name with timestamp */}
          <div className={`flex items-center gap-2 mb-1 ${isUser ? 'flex-row-reverse' : ''}`}>
            <div className={`text-sm font-medium ${isUser ? 'text-blue-700' : 'text-green-700'}`}>
              {isUser ? 'Bạn' : 'Bác sĩ AI'}
            </div>
            <div className="text-xs text-gray-500">
              {message.timestamp ? 
                new Date(message.timestamp).toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit'
                }) :
                new Date().toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              }
            </div>
          </div>
          
          {/* Message bubble */}
          <div className={`relative ${
            isUser 
              ? 'bg-blue-100 text-blue-900 rounded-2xl rounded-br-none border border-blue-200' 
              : 'bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm'
          } px-4 py-3`}>
            {/* Message content */}
            <div className="whitespace-pre-wrap">
              {message.content}
            </div>
            
            {/* Action buttons for assistant messages */}
            {!isUser && isLatestAssistant && onRetry && (
              <div className="flex gap-3 mt-4 pt-3 border-t border-gray-200">
                <button
                  onClick={onRetry}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-700 transition-colors duration-200"
                  title="Sinh lại câu trả lời"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Sinh lại</span>
                </button>
                
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-700 transition-colors duration-200"
                  title="Sao chép"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 