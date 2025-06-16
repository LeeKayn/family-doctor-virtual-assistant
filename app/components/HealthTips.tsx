"use client";

import React, { useState, useEffect } from 'react';

const tips = [
  {
    icon: "❤️",
    title: "Huyết áp",
    description: "Kiểm tra huyết áp định kỳ. Huyết áp lý tưởng là dưới 120/80 mmHg."
  },
  {
    icon: "🥗",
    title: "Dinh dưỡng",
    description: "Ăn nhiều rau xanh, trái cây và hạn chế thực phẩm chế biến sẵn."
  },
  {
    icon: "💧",
    title: "Nước",
    description: "Uống 1.5-2 lít nước mỗi ngày để duy trì sức khỏe tối ưu."
  },
  {
    icon: "🏃",
    title: "Vận động",
    description: "Vận động ít nhất 30 phút mỗi ngày, 5 ngày mỗi tuần."
  },
  {
    icon: "😴",
    title: "Giấc ngủ",
    description: "Ngủ 7-8 tiếng mỗi đêm để cơ thể được phục hồi đầy đủ."
  },
  {
    icon: "🧘",
    title: "Stress",
    description: "Thực hành thiền, yoga hoặc các hoạt động thư giãn hàng ngày."
  }
];

export function HealthTips() {
  // State to store the currently displayed tips
  const [selectedTips, setSelectedTips] = useState<typeof tips>([]);
  
  // Function to get new random tips
  const getRandomTips = () => {
    const shuffled = [...tips].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Initialize with random tips and set up interval to rotate tips
  useEffect(() => {
    // Initial set of tips
    setSelectedTips(getRandomTips());
    
    // Set up interval to rotate tips every 30 seconds
    const interval = setInterval(() => {
      setSelectedTips(getRandomTips());
    }, 30000); // 30 seconds
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="health-tips-card">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Lời khuyên sức khỏe</h3>
      <div className="grid grid-cols-1 gap-3">
        {selectedTips.map((tip, index) => (
          <div key={index} className="health-tip-item">
            <div className="health-tip-icon">{tip.icon}</div>
            <div>
              <h4 className="font-medium text-blue-800">{tip.title}</h4>
              <p className="text-sm text-gray-700">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <h4 className="font-medium text-gray-700 mb-2">Bạn có thể hỏi về:</h4>
        <div className="flex flex-wrap gap-2">
          {["Đau đầu", "Sốt", "Ho", "Mệt mỏi", "Căng thẳng", "Dinh dưỡng"].map((topic, index) => (
            <span key={index} className="topic-tag">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 