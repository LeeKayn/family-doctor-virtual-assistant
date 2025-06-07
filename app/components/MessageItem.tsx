"use client";

import { Message } from '../store/chatStore';
import Image from 'next/image';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 items-end`}>
      {!isUser && (
        <div className="mr-3 flex-shrink-0">
          <div className="bg-blue-100 rounded-full p-1">
            <Image 
              src="/images/medical_bot.jpg"
              alt="Medical Bot Logo"
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
        </div>
      )}
      
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-md ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
        }`}
      >
        <div className="whitespace-pre-wrap text-base">{message.content}</div>
      </div>
      
      {isUser && (
        <div className="ml-3 flex-shrink-0">
          <div className="bg-gray-200 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
} 