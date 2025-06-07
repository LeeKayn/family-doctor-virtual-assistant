"use client";

import { useEffect, useRef } from 'react';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { useChatStore, Message } from '../store/chatStore';
import { v4 as uuidv4 } from 'uuid';

export function ChatWindow() {
  const { messages, isLoading, error, addMessage, setIsLoading, setError } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
    };
    addMessage(userMessage);
    
    // Set loading state
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Call our local API endpoint instead of the backend directly
      console.log("Sending message to local API:", content);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        const errorData = { message: `API request failed with status ${response.status}: ${errorText}` };
        throw new Error(errorData.message);
      }

      const data = await response.json();
      
      // Use the 'reply' field from our proxy response
      const aiMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.reply || "Xin lỗi, tôi không thể xử lý yêu cầu này.", // Fallback content
      };
      addMessage(aiMessage);
      
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while contacting the AI.';
      setError(errorMessage);
      // Optionally, add a user-facing error message to the chat
      const errorBotMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: `Lỗi: ${errorMessage}`,
      };
      addMessage(errorBotMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="bg-blue-100 p-6 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-center text-xl font-medium text-gray-700">Chào mừng đến với dịch vụ tư vấn y tế!</p>
            <p className="text-center text-gray-600 max-w-lg mt-3 text-lg">Hãy đặt câu hỏi để nhận được lời khuyên về các vấn đề sức khỏe. Bạn có thể hỏi về đau đầu, sốt, ho, thể dục, dinh dưỡng và nhiều chủ đề khác.</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </>
        )}
        {error && (
          <div className="rounded-lg bg-red-100 text-red-600 p-3 my-2">
            Lỗi: {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
} 