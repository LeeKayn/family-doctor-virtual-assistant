import { NextResponse } from 'next/server';
import type { GPUHost } from '../../../store/chatStore';

// Define the available GPU endpoints
const GPU_ENDPOINTS: Record<GPUHost, string> = {
  gpu4090: 'https://albacore-magical-wrongly.ngrok-free.app/api/chat/stream',
  kaggle: 'https://weasel-ideal-mammoth.ngrok-free.app/api/chat/stream'
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, gpuHost = 'gpu4090' } = body as { message: string, gpuHost?: GPUHost };  // Default to gpu4090 if not specified

    console.log("Streaming endpoint called with message:", message.substring(0, 50) + "...");
    console.log("Using GPU host:", gpuHost);

    // Select the appropriate endpoint based on gpuHost
    const endpoint = GPU_ENDPOINTS[gpuHost];
    
    // Try connecting to selected streaming endpoint
    try {
      console.log(`Attempting to connect to ${gpuHost} streaming endpoint: ${endpoint}...`);
      
      const ngrokResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'User-Agent': 'Next.js-Health-Chatbot/1.0',
          'Accept': 'text/plain',
        },
        body: JSON.stringify({ question: message }),
        signal: AbortSignal.timeout(60000), // 60s timeout
      });

      if (ngrokResponse.ok && ngrokResponse.body) {
        console.log(`${gpuHost} streaming response received, setting up clean stream...`);
        
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        
        const stream = new ReadableStream({
          async start(controller) {
            try {
              const reader = ngrokResponse.body!.getReader();
              let accumulatedText = "";
              let buffer = "";
              
              while (true) {
                const { done, value } = await reader.read();
                
                if (done) {
                  console.log("Python API stream completed");
                  break;
                }
                
                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;
                
                // Process complete lines
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                
                for (const line of lines) {
                  if (!line.trim()) continue;
                  
                  // Handle different formats
                  let textToSend = "";
                  
                  if (line.startsWith('data: ')) {
                    const dataContent = line.replace('data: ', '').trim();
                    
                    if (dataContent === '[DONE]') {
                      console.log("Stream completed with [DONE]");
                      controller.close();
                      return;
                    }
                    
                    try {
                      const parsed = JSON.parse(dataContent);
                      if (parsed.text) {
                        textToSend = parsed.text;
                      }
                    } catch {
                      textToSend = dataContent;
                    }
                  } else {
                    // Direct JSON or text
                    try {
                      const parsed = JSON.parse(line);
                      if (parsed.text) {
                        textToSend = parsed.text;
                      }
                    } catch {
                      textToSend = line;
                    }
                  }
                  
                  if (textToSend) {
                    // Decode Unicode escape sequences
                    let decodedText = textToSend;
                    try {
                      decodedText = JSON.parse('"' + textToSend.replace(/"/g, '\\"') + '"');
                    } catch {
                      // Keep original if decoding fails
                    }
                    
                    // Send only incremental text
                    if (decodedText.length > accumulatedText.length) {
                      const newText = decodedText.slice(accumulatedText.length);
                      if (newText.trim()) {
                        controller.enqueue(encoder.encode(newText));
                        accumulatedText = decodedText;
                      }
                    }
                  }
                }
              }
              
              controller.close();
            } catch (error) {
              console.error("Error in streaming:", error);
              controller.enqueue(encoder.encode("Lỗi trong quá trình streaming."));
              controller.close();
            }
          }
        });
        
        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }
    } catch (error) {
      console.error("Streaming endpoint failed:", error);
    }

    // Fallback to regular endpoint
    console.log("Falling back to regular endpoint...");
    return NextResponse.json({ 
      error: "Streaming not available, please use regular endpoint" 
    }, { status: 503 });

  } catch (error) {
    console.error("Request parsing error:", error);
    return NextResponse.json({ 
      error: 'Failed to process request' 
    }, { status: 400 });
  }
} 