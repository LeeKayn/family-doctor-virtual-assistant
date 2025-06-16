"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { useChatStore, Message } from '../store/chatStore';
import { v4 as uuidv4 } from 'uuid';

export function ChatWindow() {
  const { messages, isLoading, error, addMessage, setIsLoading, setError } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Anti-hydration-error effect
  useEffect(() => {
    setIsClient(true);
    
    // Anti-injection: Loại bỏ div gây ra lỗi hydration
    const removeUnwantedElements = () => {
      try {
        document.querySelectorAll('[id="extwaiokist"]').forEach(el => {
          if (el && el.parentNode && document.body.contains(el)) {
            try {
              el.parentNode.removeChild(el);
            } catch (e) {
              // Bỏ qua lỗi nếu có
            }
          }
        });
      } catch (e) {
        console.error('Error removing unwanted elements:', e);
      }
    };
    
    // Chạy ngay sau khi component mount
    removeUnwantedElements();
    
    // Chạy một lần nữa sau khi component đã render
    const timeoutId = setTimeout(removeUnwantedElements, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current && isClient) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isClient]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    addMessage(userMessage);
    
    // Set loading state
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      // Create a placeholder message for the AI's response
      const aiMessageId = uuidv4();
      const aiMessage: Message = {
        id: aiMessageId,
        role: 'assistant',
        content: '', // Start with empty content that will be filled as the stream comes in
        timestamp: Date.now(),
      };
      addMessage(aiMessage);

      // Call our local API endpoint with streaming
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

      // Set up streaming response handling
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      let accumulatedContent = '';
      console.log("Starting to process stream from server...");
      let chunkCount = 0;
      
      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          console.log(`Stream complete. Processed ${chunkCount} chunks.`);
          break;
        }
        
        // Decode the chunk
        const chunk = decoder.decode(value, { stream: true });
        chunkCount++;
        console.log(`Received chunk #${chunkCount} (${chunk.length} chars)`);
        
        // Add to accumulated content
        accumulatedContent += chunk;
        
        // Update message with new content
        useChatStore.setState((state) => ({
          messages: state.messages.map((msg) => 
            msg.id === aiMessageId 
              ? { ...msg, content: accumulatedContent } 
              : msg
          ),
        }));
      }
      
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while contacting the AI.';
      setError(errorMessage);
      // Add user-facing error message to the chat
      const errorBotMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: `Lỗi: ${errorMessage}`,
        timestamp: Date.now(),
      };
      addMessage(errorBotMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Nếu chưa ở client, hiển thị placeholder để tránh lỗi hydration
  if (!isClient) {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <div className="text-lg font-medium">Tư Vấn Y Tế Trực Tuyến</div>
        </div>
        <div className="chat-messages flex items-center justify-center">
          <div className="animate-pulse">Đang tải...</div>
        </div>
        <div className="chat-input-container">
          <div className="h-10 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatHeader />
      
      <div className="chat-messages">
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