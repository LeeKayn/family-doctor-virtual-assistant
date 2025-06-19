"use client";

import { useState, useEffect, useRef } from 'react';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { useChatStore, Message } from '../store/chatStore';
import { v4 as uuidv4 } from 'uuid';

export function ChatWindow() {
  const { messages, isLoading, error, gpuHost, addMessage, setIsLoading, setError } = useChatStore();
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
    
    await sendToAI(content);
  };

  const sendToAI = async (content: string) => {
    // Set loading state
    console.log("Setting loading state to true");
    setIsLoading(true);
    setError(null); // Clear previous errors

    // Safety timeout to ensure loading state is never stuck forever
    const safetyTimeout = setTimeout(() => {
      console.log("Safety timeout triggered - forcing loading state to false");
      setIsLoading(false);
    }, 120000); // 2 minutes maximum

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

      // Try streaming endpoint first
      console.log("Sending message to streaming API:", content);
      
      let response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content, gpuHost }),
      });

      console.log("Streaming response status:", response.status);
      
      // If streaming fails, fallback to regular endpoint
      if (!response.ok) {
        console.log("Streaming failed, falling back to regular endpoint...");
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));
        
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: content }),
        });
        
        console.log("Regular response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          const errorData = { message: `API request failed with status ${response.status}: ${errorText}` };
          throw new Error(errorData.message);
        }
      }

      // Check if response is actually streamable
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        // This is a JSON error response, not a stream
        const errorData = await response.json();
        throw new Error(errorData.error || 'Streaming not available');
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
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              console.log(`Stream complete. Processed ${chunkCount} chunks.`);
              console.log("Stream reading completed successfully");
              // Explicitly set loading to false when stream completes
              setTimeout(() => {
                console.log("Forcing loading state to false after stream completion");
                setIsLoading(false);
              }, 100);
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
              } catch (streamError) {
          console.error('Stream reading error:', streamError);
          // Force loading state to false on stream error
          setTimeout(() => {
            console.log("Forcing loading state to false after stream error");
            setIsLoading(false);
          }, 100);
          throw new Error('Failed to read stream response');
      } finally {
        // Ensure reader is closed
        try {
          reader.cancel();
        } catch (e) {
          // Ignore cleanup errors
        }
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
      // Clear the safety timeout
      clearTimeout(safetyTimeout);
      console.log("Setting loading state to false");
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    // Find the last user message
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
    
    if (lastUserMessage) {
      // Remove the last assistant message
      const lastAssistantIndex = messages.map(msg => msg.role).lastIndexOf('assistant');
      if (lastAssistantIndex !== -1) {
        useChatStore.setState((state) => ({
          messages: state.messages.slice(0, lastAssistantIndex)
        }));
      }
      
      // Regenerate response with same user message
      setTimeout(() => {
        sendToAI(lastUserMessage.content);
      }, 100);
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
          <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
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
            <div className="bg-blue-100 p-6 rounded-full mb-4 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-center text-2xl font-medium text-gray-700 mb-2">Chào mừng đến với dịch vụ tư vấn y tế!</p>
            <p className="text-center text-gray-600 max-w-lg mt-2 text-lg">Hãy đặt câu hỏi để nhận được lời khuyên về các vấn đề sức khỏe.</p>
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 max-w-lg">
              <p className="text-blue-800 font-medium mb-2">Bạn có thể hỏi về:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">Đau đầu</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">Sốt</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">Ho</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">Thể dục</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">Dinh dưỡng</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">Vắc-xin</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">Giấc ngủ</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 shadow-sm">Stress</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const isLatestAssistant = 
                message.role === 'assistant' && 
                index === messages.length - 1 && 
                !isLoading;
              
              return (
                <MessageItem
                  key={message.id}
                  message={message}
                  onRetry={isLatestAssistant ? handleRetry : undefined}
                  isLatestAssistant={isLatestAssistant}
                />
              );
            })}
          </>
        )}
        {error && (
          <div className="rounded-xl bg-red-100 text-red-600 p-4 my-3 border border-red-200 shadow-sm">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Lỗi: {error}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
} 