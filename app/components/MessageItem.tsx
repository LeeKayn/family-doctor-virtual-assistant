"use client";

import { Message } from '../store/chatStore';

interface MessageItemProps {
  message: Message;
  onRetry?: () => void;
  isLatestAssistant?: boolean;
}

export function MessageItem({ message, onRetry, isLatestAssistant }: MessageItemProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-8`}>
      <div className={`flex items-end max-w-xs lg:max-w-lg xl:max-w-2xl ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
        {/* Avatar - Larger for better visibility */}
        <div className="flex-shrink-0 mb-2">
          {isUser ? (
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl border-3 border-white hover:scale-110 transition-all duration-200">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl border-3 border-white hover:scale-110 transition-all duration-200">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          )}
        </div>
        
        {/* Message bubble container */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Sender name - Larger text */}
          <div className={`text-base font-semibold mb-2 px-2 ${
            isUser ? 'text-blue-700' : 'text-green-700'
          }`}>
            {isUser ? 'Bạn' : 'Bác sĩ AI'}
          </div>
          
          {/* Message bubble */}
          <div className={`relative ${isUser ? 'message-user-new' : 'message-assistant-new'}`}>
            {/* Message content */}
            <div className="message-content whitespace-pre-wrap">
              {message.content}
            </div>
            
            {/* Action buttons for assistant messages */}
            {!isUser && isLatestAssistant && onRetry && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={onRetry}
                  className="retry-button"
                  title="Sinh lại câu trả lời"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Sinh lại</span>
                </button>
                
                <button
                  onClick={() => navigator.clipboard.writeText(message.content)}
                  className="copy-button"
                  title="Sao chép"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Sao chép</span>
                </button>
              </div>
            )}
            
            {/* Timestamp - Larger and more visible */}
            <div className={`text-sm mt-3 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <span className={`px-3 py-1 rounded-full font-medium ${
                isUser 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700'
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
                ? 'bottom-8 -right-1' 
                : 'bottom-8 -left-1'
            }`}>
              <div className={`message-tail ${isUser ? 'message-tail-user' : 'message-tail-assistant'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 