"use client";

import { Message } from '../store/chatStore';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex items-end max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        {/* Avatar */}
        <div className="flex-shrink-0 mb-1">
          {isUser ? (
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white hover:scale-110 transition-all duration-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white hover:scale-110 transition-all duration-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          )}
        </div>
        
        {/* Message bubble container */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Sender name */}
          <div className={`text-xs font-medium mb-1 px-1 ${
            isUser ? 'text-blue-600' : 'text-green-600'
          }`}>
            {isUser ? 'Bạn' : 'Bác sĩ AI'}
          </div>
          
          {/* Message bubble */}
          <div className={`relative ${isUser ? 'message-user-new' : 'message-assistant-new'}`}>
            {/* Message content */}
            <div className="message-content">
              {message.content}
            </div>
            
            {/* Timestamp */}
            <div className={`text-xs mt-2 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <span className={`px-2 py-1 rounded-full ${
                isUser 
                  ? 'bg-blue-100 bg-opacity-30 text-blue-200' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
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
              </span>
            </div>
            
            {/* Message tail */}
            <div className={`absolute ${
              isUser 
                ? 'bottom-6 -right-1' 
                : 'bottom-6 -left-1'
            }`}>
              <div className={`message-tail ${isUser ? 'message-tail-user' : 'message-tail-assistant'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 