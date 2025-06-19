// NextRequest and NextResponse are not used in this file

// This simulates the AI response for medical advice
// In production, you would replace this with your actual API call to a model
function createHealthcareResponseStream(message: string): ReadableStream {
  const encoder = new TextEncoder();
  
  // Common healthcare responses
  const healthcareResponses = [
    "Hãy cho tôi biết thêm về các triệu chứng của bạn để tôi có thể tư vấn tốt hơn.",
    "Điều quan trọng là bạn nên đi khám bác sĩ nếu các triệu chứng kéo dài.",
    "Hãy nhớ uống đủ nước và nghỉ ngơi hợp lý.",
    "Tôi hiểu rằng bạn đang lo lắng, nhưng tôi cần thêm thông tin để tư vấn chính xác.",
    "Bạn có đang dùng thuốc gì không?",
    "Các triệu chứng này đã xuất hiện được bao lâu rồi?",
    "Những điều cơ bản như ăn uống lành mạnh, tập thể dục và ngủ đủ giấc rất quan trọng cho sức khỏe.",
    "Bạn nên thăm khám tại cơ sở y tế gần nhất để được chẩn đoán chính xác.",
    "Tôi có thể giúp cung cấp thông tin chung, nhưng không thể thay thế cho lời khuyên của bác sĩ.",
    "Chăm sóc sức khỏe tinh thần cũng quan trọng như sức khỏe thể chất.",
  ];
  
  // Analyze the message to determine a relevant response
  let responseText = "";
  const lowerCaseMessage = message.toLowerCase();
  
  if (lowerCaseMessage.includes("đau đầu") || lowerCaseMessage.includes("nhức đầu")) {
    responseText = "Đau đầu có thể do nhiều nguyên nhân như căng thẳng, mất ngủ, hoặc mất nước. Bạn nên nghỉ ngơi, uống đủ nước và tránh ánh sáng mạnh. Nếu đau đầu dữ dội hoặc kéo dài, hãy đi khám bác sĩ ngay.";
  } else if (lowerCaseMessage.includes("sốt") || lowerCaseMessage.includes("nóng")) {
    responseText = "Sốt là dấu hiệu cơ thể đang chống lại nhiễm trùng. Hãy uống nhiều nước, nghỉ ngơi và có thể dùng thuốc hạ sốt như paracetamol. Nếu sốt cao trên 39°C hoặc kéo dài quá 3 ngày, bạn nên đi khám.";
  } else if (lowerCaseMessage.includes("ho") || lowerCaseMessage.includes("đau họng")) {
    responseText = "Ho và đau họng thường do viêm đường hô hấp. Bạn nên uống nước ấm với mật ong, súc miệng với nước muối ấm và nghỉ ngơi. Nếu có đờm màu xanh hoặc vàng, hoặc khó thở, hãy đi khám.";
  } else if (lowerCaseMessage.includes("mệt mỏi") || lowerCaseMessage.includes("mệt")) {
    responseText = "Mệt mỏi có thể do nhiều nguyên nhân như thiếu ngủ, căng thẳng, hoặc có thể là dấu hiệu của bệnh lý. Hãy đảm bảo bạn ngủ đủ 7-8 tiếng mỗi đêm, ăn uống đầy đủ dinh dưỡng và tập thể dục nhẹ nhàng. Nếu mệt mỏi kéo dài trên 2 tuần, hãy đi khám.";
  } else if (lowerCaseMessage.includes("đau bụng") || lowerCaseMessage.includes("đau dạ dày")) {
    responseText = "Đau bụng có thể do nhiều nguyên nhân như rối loạn tiêu hóa, viêm dạ dày hoặc căng thẳng. Hãy tránh thực phẩm cay nóng, nhiều dầu mỡ, và ăn chậm, nhai kỹ. Nếu đau bụng dữ dội, kéo dài hoặc kèm theo nôn mửa, hãy đi khám ngay.";
  } else if (lowerCaseMessage.includes("huyết áp") || lowerCaseMessage.includes("cao huyết áp")) {
    responseText = "Huyết áp cao là tình trạng nguy hiểm có thể dẫn đến nhiều biến chứng. Hãy giảm muối trong khẩu phần ăn, tập thể dục đều đặn, giảm cân nếu thừa cân, và hạn chế rượu bia. Kiểm tra huyết áp thường xuyên và tuân thủ đơn thuốc của bác sĩ nếu có.";
  } else if (lowerCaseMessage.includes("stress") || lowerCaseMessage.includes("căng thẳng") || lowerCaseMessage.includes("lo âu")) {
    responseText = "Căng thẳng và lo âu ảnh hưởng đến sức khỏe thể chất và tinh thần. Hãy thử các kỹ thuật thư giãn như hít thở sâu, thiền, yoga, hoặc đi bộ trong thiên nhiên. Hạn chế caffeine và đường, ngủ đủ giấc, và chia sẻ cảm xúc với người thân. Nếu tình trạng nghiêm trọng, hãy tìm sự giúp đỡ chuyên nghiệp.";
  } else if (lowerCaseMessage.includes("tiểu đường") || lowerCaseMessage.includes("đái tháo đường")) {
    responseText = "Bệnh tiểu đường cần được kiểm soát chặt chẽ. Hãy theo dõi đường huyết thường xuyên, duy trì chế độ ăn cân bằng, hạn chế đường và carbohydrate tinh chế. Tập thể dục đều đặn và tuân thủ đơn thuốc của bác sĩ. Khám định kỳ để theo dõi và tránh biến chứng.";
  } else if (lowerCaseMessage.includes("mất ngủ") || lowerCaseMessage.includes("khó ngủ")) {
    responseText = "Mất ngủ ảnh hưởng nghiêm trọng đến sức khỏe. Hãy thiết lập thời gian ngủ cố định, tạo môi trường ngủ thoải mái và yên tĩnh. Tránh caffeine và màn hình điện tử trước khi ngủ. Thử các kỹ thuật thư giãn như hít thở sâu hoặc đọc sách. Nếu mất ngủ kéo dài, hãy tham khảo ý kiến bác sĩ.";
  } else if (lowerCaseMessage.includes("cảm lạnh") || lowerCaseMessage.includes("cảm cúm")) {
    responseText = "Cảm lạnh hoặc cúm thường tự khỏi sau 7-10 ngày. Hãy nghỉ ngơi nhiều, uống đủ nước, có thể dùng thuốc hạ sốt giảm đau như paracetamol nếu cần. Súc miệng với nước muối ấm và sử dụng máy tạo độ ẩm. Nếu các triệu chứng nặng hơn hoặc kéo dài, hãy đi khám.";
  } else if (lowerCaseMessage.includes("dị ứng")) {
    responseText = "Dị ứng có thể gây khó chịu đáng kể. Hãy xác định và tránh các tác nhân gây dị ứng. Giữ nhà cửa sạch sẽ, sử dụng máy lọc không khí, và có thể dùng thuốc kháng histamine không kê đơn khi cần. Nếu dị ứng nghiêm trọng hoặc gây khó thở, hãy tìm kiếm trợ giúp y tế ngay lập tức.";
  } else if (lowerCaseMessage.includes("tập thể dục") || lowerCaseMessage.includes("thể dục")) {
    responseText = "Tập thể dục đều đặn mang lại nhiều lợi ích cho sức khỏe. Nên tập ít nhất 150 phút hoạt động cường độ vừa phải mỗi tuần, kết hợp với các bài tập sức mạnh. Bắt đầu từ từ và tăng dần cường độ. Luôn khởi động trước và giãn cơ sau khi tập. Chọn hoạt động bạn thích để duy trì động lực.";
  } else if (lowerCaseMessage.includes("chế độ ăn") || lowerCaseMessage.includes("dinh dưỡng")) {
    responseText = "Chế độ ăn cân bằng rất quan trọng cho sức khỏe. Hãy đa dạng thực phẩm với nhiều rau, trái cây, ngũ cốc nguyên hạt, protein nạc và chất béo lành mạnh. Hạn chế đường, muối, và chất béo bão hòa. Uống đủ nước và kiểm soát khẩu phần ăn. Thay đổi chế độ ăn dần dần để dễ duy trì.";
  } else {
    // Default response if no specific condition is mentioned
    responseText = healthcareResponses[Math.floor(Math.random() * healthcareResponses.length)];
  }
  
  // Create a stream of the response, character by character
  return new ReadableStream({
    async start(controller) {
      // Add a typing delay effect
      for (let i = 0; i < responseText.length; i++) {
        const chunk = responseText.slice(i, i + 1);
        controller.enqueue(encoder.encode(chunk));
        // Simulate typing delay
        await new Promise(resolve => setTimeout(resolve, 15));
      }
      controller.close();
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    // Thử kết nối với local server trước
    try {
      console.log("Attempting to connect to local server at http://localhost:8000...");
      
      const localResponse = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message }),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (localResponse.ok) {
        const data = await localResponse.json();
        console.log("Local server response received successfully");
        
        // Return as streaming response
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              // Simulate typing effect for local response
              const responseText = data.response || "Không thể nhận phản hồi từ server.";
              for (let i = 0; i < responseText.length; i++) {
                const chunk = responseText.slice(i, i + 1);
                controller.enqueue(encoder.encode(chunk));
                await new Promise(resolve => setTimeout(resolve, 15));
              }
              controller.close();
            } catch (error) {
              console.error("Error in local response streaming:", error);
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
    } catch (localError) {
      console.log("Local server not available:", localError instanceof Error ? localError.message : String(localError));
    }

    // Thử kết nối với ngrok endpoint với streaming
    try {
      console.log("Attempting to connect to ngrok streaming endpoint...");
      
      const ngrokResponse = await fetch('https://weasel-ideal-mammoth.ngrok-free.app/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'User-Agent': 'Next.js-Health-Chatbot/1.0',
          'Accept': 'text/plain',
        },
        body: JSON.stringify({ question: message }),
        signal: AbortSignal.timeout(60000), // 60s timeout cho streaming
      });

      if (ngrokResponse.ok && ngrokResponse.body) {
        console.log("Ngrok streaming response received, setting up stream...");
        
        // Return the actual stream from Python API
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        
        const stream = new ReadableStream({
          async start(controller) {
            try {
              const reader = ngrokResponse.body!.getReader();
              let accumulatedText = "";
              let buffer = ""; // Buffer for incomplete chunks
              
              while (true) {
                const { done, value } = await reader.read();
                
                if (done) {
                  console.log("Stream completed from Python API");
                  break;
                }
                
                // Decode the chunk from Python API
                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;
                
                // Process complete lines
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep incomplete line in buffer
                
                for (const line of lines) {
                  if (!line.trim()) continue;
                  
                  console.log("Processing line:", line.substring(0, 100) + "...");
                  
                  // Handle Server-Sent Events format
                  if (line.startsWith('data: ')) {
                    const dataContent = line.replace('data: ', '').trim();
                    
                    if (dataContent === '[DONE]') {
                      console.log("Received [DONE] signal");
                      break;
                    }
                    
                    try {
                      const parsed = JSON.parse(dataContent);
                      if (parsed.text) {
                        // Decode Unicode escape sequences properly
                        let decodedText = parsed.text;
                        try {
                          // Handle Unicode escape sequences like \u0110
                          decodedText = JSON.parse('"' + parsed.text.replace(/"/g, '\\"') + '"');
                        } catch {
                          // If JSON parsing fails, use original text
                          decodedText = parsed.text;
                        }
                        
                        // Send only the new part of the text (incremental)
                        if (decodedText.length > accumulatedText.length) {
                          const newText = decodedText.slice(accumulatedText.length);
                          if (newText.trim()) {
                            console.log("Sending incremental text:", newText.substring(0, 50) + "...");
                            controller.enqueue(encoder.encode(newText));
                            accumulatedText = decodedText;
                          }
                        }
                      }
                    } catch (parseError) {
                      console.log("Failed to parse SSE JSON, treating as plain text:", parseError);
                      // If not JSON, treat as plain text but avoid duplicates
                      const cleanContent = dataContent.replace(/^data:\s*/, '');
                      if (cleanContent.trim() && !accumulatedText.includes(cleanContent)) {
                        // Try to decode Unicode if it's a plain Unicode string
                        try {
                          const decoded = JSON.parse('"' + cleanContent.replace(/"/g, '\\"') + '"');
                          controller.enqueue(encoder.encode(decoded));
                        } catch {
                          controller.enqueue(encoder.encode(cleanContent));
                        }
                      }
                    }
                  } else {
                    // Direct JSON line (not SSE format)
                    try {
                      const parsed = JSON.parse(line);
                      if (parsed.text) {
                        // Decode Unicode escape sequences
                        let decodedText = parsed.text;
                        try {
                          decodedText = JSON.parse('"' + parsed.text.replace(/"/g, '\\"') + '"');
                        } catch {
                          decodedText = parsed.text;
                        }
                        
                        // Send only new text
                        if (decodedText.length > accumulatedText.length) {
                          const newText = decodedText.slice(accumulatedText.length);
                          if (newText.trim()) {
                            console.log("Sending new text:", newText.substring(0, 50) + "...");
                            controller.enqueue(encoder.encode(newText));
                            accumulatedText = decodedText;
                          }
                        }
                      }
                    } catch {
                      console.log("Line is not JSON, treating as plain text");
                      // Direct text chunk - avoid duplicates
                      if (line.trim() && !accumulatedText.includes(line)) {
                        try {
                          const decoded = JSON.parse('"' + line.replace(/"/g, '\\"') + '"');
                          controller.enqueue(encoder.encode(decoded));
                        } catch {
                          controller.enqueue(encoder.encode(line));
                        }
                      }
                    }
                  }
                }
              }
              
              // Process any remaining buffer content
              if (buffer.trim()) {
                try {
                  const parsed = JSON.parse(buffer);
                  if (parsed.text) {
                    let decodedText = parsed.text;
                    try {
                      decodedText = JSON.parse('"' + parsed.text.replace(/"/g, '\\"') + '"');
                    } catch {
                      decodedText = parsed.text;
                    }
                    
                    if (decodedText.length > accumulatedText.length) {
                      const newText = decodedText.slice(accumulatedText.length);
                      if (newText.trim()) {
                        controller.enqueue(encoder.encode(newText));
                      }
                    }
                  }
                } catch {
                  // Ignore buffer parsing errors
                }
              }
              
              controller.close();
            } catch (error) {
              console.error("Error in ngrok streaming:", error);
              controller.enqueue(encoder.encode("\n\nLỗi trong quá trình streaming từ AI server."));
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
      } else {
        console.log("Ngrok streaming response not OK:", ngrokResponse.status, ngrokResponse.statusText);
        
        // Fallback to non-streaming endpoint
        console.log("Falling back to non-streaming endpoint...");
        const fallbackResponse = await fetch('https://weasel-ideal-mammoth.ngrok-free.app/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'Next.js-Health-Chatbot/1.0',
          },
          body: JSON.stringify({ question: message }),
          signal: AbortSignal.timeout(30000),
        });

        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          console.log("Fallback response received successfully");
          
          // Create fake streaming from complete response
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            async start(controller) {
              try {
                const responseText = data.response || data.text || "Không thể nhận phản hồi từ server.";
                console.log("Creating fake stream for text length:", responseText.length);
                
                // Faster fake streaming since we already waited
                for (let i = 0; i < responseText.length; i++) {
                  const chunk = responseText.slice(i, i + 1);
                  controller.enqueue(encoder.encode(chunk));
                  await new Promise(resolve => setTimeout(resolve, 10)); // Faster typing
                }
                controller.close();
              } catch (error) {
                console.error("Error in fallback streaming:", error);
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
      }
    } catch (ngrokError) {
      console.log("Ngrok server not available:", ngrokError instanceof Error ? ngrokError.message : String(ngrokError));
    }

    // Fallback to Gradio and then to built-in responses
    try {
      console.log("Connecting to Gradio API for streaming response...");
      
      // Import the Gradio client
      try {
        const { Client } = await import('@gradio/client');
        
        console.log("Establishing connection to Gradio endpoint...");
        const client = await Client.connect("https://6f0c9d3bc7203e8e99.gradio.live");
        
        // Create a streaming response
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              console.log("Setting up Gradio streaming...");
              
              try {
                console.log("Attempting to call streaming endpoint...");
                const job = await client.submit("/generate_streaming_response", { 
                  question: message 
                }, {
                  stream: true
                });
                
                console.log("Request submitted successfully, waiting for streaming responses...");
                
                let accumulatedText = "";
                let chunkCount = 0;
                
                for await (const update of job) {
                  if ('data' in update && update.data !== undefined) {
                    const dataEvent = update as { data: unknown };
                    let newText = "";
                    
                    if (Array.isArray(dataEvent.data) && dataEvent.data.length > 0) {
                      newText = String(dataEvent.data[0]);
                    } else {
                      newText = String(dataEvent.data);
                    }
                    
                    if (newText.length > accumulatedText.length) {
                      const textDiff = newText.slice(accumulatedText.length);
                      chunkCount++;
                      console.log(`Sending chunk #${chunkCount} (${textDiff.length} chars)`);
                      controller.enqueue(encoder.encode(textDiff));
                      accumulatedText = newText;
                    }
                  }
                }
                
                console.log(`Streaming completed. Sent ${chunkCount} chunks with total ${accumulatedText.length} chars.`);
                controller.close();
                return;
                
              } catch (gradioError) {
                console.log("Gradio API failed, using fallback:", gradioError);
              }
              
              // Final fallback to built-in responses
              console.log("Using built-in fallback response");
              controller.enqueue(encoder.encode("Hiện tại không thể kết nối với AI server. Đang sử dụng phương thức dự phòng...\n\n"));
              const fallbackText = getHealthcareResponse(message);
              controller.enqueue(encoder.encode(fallbackText));
              controller.close();
              
            } catch (error) {
              console.error("Error in streaming:", error);
              controller.enqueue(encoder.encode("\n\nXảy ra lỗi kết nối. Đang chuyển sang phương thức dự phòng..."));
              
              const fallbackText = getHealthcareResponse(message);
              controller.enqueue(encoder.encode(fallbackText));
              
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
      } catch (importError) {
        console.error("Error importing Gradio client:", importError);
        throw importError;
      }
    } catch (error) {
      console.error("All API attempts failed:", error);
      
      // Final fallback to built-in responses
      console.log("Using final fallback response stream");
      const fallbackStream = createHealthcareResponseStream(message);
      
      return new Response(fallbackStream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }
  } catch (parseError) {
    console.error("Request parsing error:", parseError);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Function to get a static healthcare response instead of a stream
function getHealthcareResponse(message: string): string {
  // Reuse the same logic as in createHealthcareResponseStream but return the text directly
  const lowerCaseMessage = message.toLowerCase();
  
  if (lowerCaseMessage.includes("đau đầu") || lowerCaseMessage.includes("nhức đầu")) {
    return "Đau đầu có thể do nhiều nguyên nhân như căng thẳng, mất ngủ, hoặc mất nước. Bạn nên nghỉ ngơi, uống đủ nước và tránh ánh sáng mạnh. Nếu đau đầu dữ dội hoặc kéo dài, hãy đi khám bác sĩ ngay.";
  } else if (lowerCaseMessage.includes("sốt") || lowerCaseMessage.includes("nóng")) {
    return "Sốt là dấu hiệu cơ thể đang chống lại nhiễm trùng. Hãy uống nhiều nước, nghỉ ngơi và có thể dùng thuốc hạ sốt như paracetamol. Nếu sốt cao trên 39°C hoặc kéo dài quá 3 ngày, bạn nên đi khám.";
  } else if (lowerCaseMessage.includes("ho") || lowerCaseMessage.includes("đau họng")) {
    return "Ho và đau họng thường do viêm đường hô hấp. Bạn nên uống nước ấm với mật ong, súc miệng với nước muối ấm và nghỉ ngơi. Nếu có đờm màu xanh hoặc vàng, hoặc khó thở, hãy đi khám.";
  } else if (lowerCaseMessage.includes("mệt mỏi") || lowerCaseMessage.includes("mệt")) {
    return "Mệt mỏi có thể do nhiều nguyên nhân như thiếu ngủ, căng thẳng, hoặc có thể là dấu hiệu của bệnh lý. Hãy đảm bảo bạn ngủ đủ 7-8 tiếng mỗi đêm, ăn uống đầy đủ dinh dưỡng và tập thể dục nhẹ nhàng. Nếu mệt mỏi kéo dài trên 2 tuần, hãy đi khám.";
  } else if (lowerCaseMessage.includes("đau bụng") || lowerCaseMessage.includes("đau dạ dày")) {
    return "Đau bụng có thể do nhiều nguyên nhân như rối loạn tiêu hóa, viêm dạ dày hoặc căng thẳng. Hãy tránh thực phẩm cay nóng, nhiều dầu mỡ, và ăn chậm, nhai kỹ. Nếu đau bụng dữ dội, kéo dài hoặc kèm theo nôn mửa, hãy đi khám ngay.";
  } else if (lowerCaseMessage.includes("huyết áp") || lowerCaseMessage.includes("cao huyết áp")) {
    return "Huyết áp cao là tình trạng nguy hiểm có thể dẫn đến nhiều biến chứng. Hãy giảm muối trong khẩu phần ăn, tập thể dục đều đặn, giảm cân nếu thừa cân, và hạn chế rượu bia. Kiểm tra huyết áp thường xuyên và tuân thủ đơn thuốc của bác sĩ nếu có.";
  } else if (lowerCaseMessage.includes("stress") || lowerCaseMessage.includes("căng thẳng") || lowerCaseMessage.includes("lo âu")) {
    return "Căng thẳng và lo âu ảnh hưởng đến sức khỏe thể chất và tinh thần. Hãy thử các kỹ thuật thư giãn như hít thở sâu, thiền, yoga, hoặc đi bộ trong thiên nhiên. Hạn chế caffeine và đường, ngủ đủ giấc, và chia sẻ cảm xúc với người thân. Nếu tình trạng nghiêm trọng, hãy tìm sự giúp đỡ chuyên nghiệp.";
  } else if (lowerCaseMessage.includes("tiểu đường") || lowerCaseMessage.includes("đái tháo đường")) {
    return "Bệnh tiểu đường cần được kiểm soát chặt chẽ. Hãy theo dõi đường huyết thường xuyên, duy trì chế độ ăn cân bằng, hạn chế đường và carbohydrate tinh chế. Tập thể dục đều đặn và tuân thủ đơn thuốc của bác sĩ. Khám định kỳ để theo dõi và tránh biến chứng.";
  } else if (lowerCaseMessage.includes("mất ngủ") || lowerCaseMessage.includes("khó ngủ")) {
    return "Mất ngủ ảnh hưởng nghiêm trọng đến sức khỏe. Hãy thiết lập thời gian ngủ cố định, tạo môi trường ngủ thoải mái và yên tĩnh. Tránh caffeine và màn hình điện tử trước khi ngủ. Thử các kỹ thuật thư giãn như hít thở sâu hoặc đọc sách. Nếu mất ngủ kéo dài, hãy tham khảo ý kiến bác sĩ.";
  } else if (lowerCaseMessage.includes("cảm lạnh") || lowerCaseMessage.includes("cảm cúm")) {
    return "Cảm lạnh hoặc cúm thường tự khỏi sau 7-10 ngày. Hãy nghỉ ngơi nhiều, uống đủ nước, có thể dùng thuốc hạ sốt giảm đau như paracetamol nếu cần. Súc miệng với nước muối ấm và sử dụng máy tạo độ ẩm. Nếu các triệu chứng nặng hơn hoặc kéo dài, hãy đi khám.";
  } else if (lowerCaseMessage.includes("dị ứng")) {
    return "Dị ứng có thể gây khó chịu đáng kể. Hãy xác định và tránh các tác nhân gây dị ứng. Giữ nhà cửa sạch sẽ, sử dụng máy lọc không khí, và có thể dùng thuốc kháng histamine không kê đơn khi cần. Nếu dị ứng nghiêm trọng hoặc gây khó thở, hãy tìm kiếm trợ giúp y tế ngay lập tức.";
  } else if (lowerCaseMessage.includes("tập thể dục") || lowerCaseMessage.includes("thể dục")) {
    return "Tập thể dục đều đặn mang lại nhiều lợi ích cho sức khỏe. Nên tập ít nhất 150 phút hoạt động cường độ vừa phải mỗi tuần, kết hợp với các bài tập sức mạnh. Bắt đầu từ từ và tăng dần cường độ. Luôn khởi động trước và giãn cơ sau khi tập. Chọn hoạt động bạn thích để duy trì động lực.";
  } else if (lowerCaseMessage.includes("chế độ ăn") || lowerCaseMessage.includes("dinh dưỡng")) {
    return "Chế độ ăn cân bằng rất quan trọng cho sức khỏe. Hãy đa dạng thực phẩm với nhiều rau, trái cây, ngũ cốc nguyên hạt, protein nạc và chất béo lành mạnh. Hạn chế đường, muối, và chất béo bão hòa. Uống đủ nước và kiểm soát khẩu phần ăn. Thay đổi chế độ ăn dần dần để dễ duy trì.";
  } else {
    // Default response if no specific condition is mentioned
    const healthcareResponses = [
      "Hãy cho tôi biết thêm về các triệu chứng của bạn để tôi có thể tư vấn tốt hơn.",
      "Điều quan trọng là bạn nên đi khám bác sĩ nếu các triệu chứng kéo dài.",
      "Hãy nhớ uống đủ nước và nghỉ ngơi hợp lý.",
      "Tôi hiểu rằng bạn đang lo lắng, nhưng tôi cần thêm thông tin để tư vấn chính xác.",
      "Bạn có đang dùng thuốc gì không?",
      "Các triệu chứng này đã xuất hiện được bao lâu rồi?",
      "Những điều cơ bản như ăn uống lành mạnh, tập thể dục và ngủ đủ giấc rất quan trọng cho sức khỏe.",
      "Bạn nên thăm khám tại cơ sở y tế gần nhất để được chẩn đoán chính xác.",
      "Tôi có thể giúp cung cấp thông tin chung, nhưng không thể thay thế cho lời khuyên của bác sĩ.",
      "Chăm sóc sức khỏe tinh thần cũng quan trọng như sức khỏe thể chất.",
    ];
    return healthcareResponses[Math.floor(Math.random() * healthcareResponses.length)];
  }
} 