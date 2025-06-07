import { NextRequest, NextResponse } from 'next/server';
import { Client } from "@gradio/client";
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

    try {
      console.log("Connecting to Gradio API...");
      
      // Import the Gradio client
      const { Client } = await import('@gradio/client');
      
      // Format the question according to the expected prompt structure
      const formattedQuestion = message;
      
      console.log("Establishing connection to Gradio endpoint...");
      const client = await Client.connect("https://ee6d5f888b889f96e5.gradio.live/");
      
      console.log("Sending prediction request with message:", formattedQuestion);
      const result = await client.predict("/predict", { 		
        question: formattedQuestion
      });

      if (!result || !result.data) {
        console.log("Received empty result from Gradio API");
        throw new Error("Empty response from Gradio API");
      }
      
      console.log("Response received successfully:", result.data);
      
      // Return the response
      return new Response(JSON.stringify({ reply: result.data }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error: any) {
      console.error("Gradio API error:", error.message || String(error));
      console.error("Error details:", error);
      
      // Fallback to local response
      console.log("Using fallback local response");
      const fallbackResponse = getHealthcareResponse(message);
      return new Response(JSON.stringify({ reply: fallbackResponse }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error("Request parsing error:", error);
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