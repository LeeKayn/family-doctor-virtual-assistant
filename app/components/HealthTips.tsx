"use client";

import { useState } from 'react';

export function HealthTips() {
  const [activeTab, setActiveTab] = useState('general');

  const healthTips = {
    general: [
      {
        icon: "💧",
        title: "Uống đủ nước",
        content: "Uống ít nhất 8 ly nước mỗi ngày để duy trì sức khỏe tối ưu",
        tags: ["Dinh dưỡng", "Hàng ngày"]
      },
      {
        icon: "🏃‍♂️",
        title: "Tập thể dục đều đặn",
        content: "Ít nhất 30 phút hoạt động thể chất mỗi ngày để tăng cường sức khỏe tim mạch",
        tags: ["Thể dục", "Tim mạch"]
      },
      {
        icon: "😴",
        title: "Ngủ đủ giấc",
        content: "7-9 tiếng ngủ mỗi đêm giúp cơ thể phục hồi và tăng cường miễn dịch",
        tags: ["Giấc ngủ", "Phục hồi"]
      },
      {
        icon: "🥗",
        title: "Ăn uống cân bằng",
        content: "Chế độ ăn đa dạng với nhiều rau củ, trái cây và protein nạc",
        tags: ["Dinh dưỡng", "Cân bằng"]
      }
    ],
    nutrition: [
      {
        icon: "🍎",
        title: "5 phần rau củ mỗi ngày",
        content: "Đảm bảo có ít nhất 5 phần rau củ quả trong khẩu phần ăn hàng ngày",
        tags: ["Vitamin", "Chất xơ"]
      },
      {
        icon: "🐟",
        title: "Omega-3 từ cá",
        content: "Ăn cá béo như cá hồi, cá thu 2-3 lần/tuần để bổ sung omega-3",
        tags: ["Omega-3", "Tim mạch"]
      },
      {
        icon: "🥛",
        title: "Canxi cho xương",
        content: "Sữa, sản phẩm từ sữa và rau xanh đậm cung cấp canxi cho xương chắc khỏe",
        tags: ["Canxi", "Xương khớp"]
      },
      {
        icon: "🌾",
        title: "Ngũ cốc nguyên hạt",
        content: "Chọn gạo lứt, yến mạch thay vì tinh bột trắng để có nhiều chất xơ hơn",
        tags: ["Chất xơ", "Tiêu hóa"]
      }
    ],
    exercise: [
      {
        icon: "🚶‍♀️",
        title: "Đi bộ mỗi ngày",
        content: "10.000 bước mỗi ngày giúp cải thiện sức khỏe tổng thể và giảm cân",
        tags: ["Cardio", "Giảm cân"]
      },
      {
        icon: "💪",
        title: "Tập sức mạnh",
        content: "2-3 buổi tập tạ mỗi tuần để duy trì khối lượng cơ và mật độ xương",
        tags: ["Sức mạnh", "Cơ bắp"]
      },
      {
        icon: "🧘‍♀️",
        title: "Yoga và thiền",
        content: "Giúp giảm stress, tăng tính linh hoạt và cải thiện sức khỏe tinh thần",
        tags: ["Thư giãn", "Linh hoạt"]
      },
      {
        icon: "🏊‍♂️",
        title: "Bơi lội",
        content: "Môn thể thao toàn thân ít tác động, phù hợp với mọi lứa tuổi",
        tags: ["Toàn thân", "Khớp"]
      }
    ],
    mental: [
      {
        icon: "🧠",
        title: "Quản lý stress",
        content: "Học các kỹ thuật thở sâu và thư giãn để kiểm soát căng thẳng hàng ngày",
        tags: ["Stress", "Thư giãn"]
      },
      {
        icon: "👥",
        title: "Kết nối xã hội",
        content: "Duy trì mối quan hệ tích cực với gia đình và bạn bè để cải thiện tinh thần",
        tags: ["Xã hội", "Hạnh phúc"]
      },
      {
        icon: "📚",
        title: "Học hỏi liên tục",
        content: "Đọc sách, học kỹ năng mới để giữ cho não bộ hoạt động tích cực",
        tags: ["Học tập", "Trí não"]
      },
      {
        icon: "🎯",
        title: "Đặt mục tiêu",
        content: "Có mục tiêu rõ ràng và kế hoạch thực hiện giúp tăng động lực sống",
        tags: ["Mục tiêu", "Động lực"]
      }
    ]
  };

  const tabs = [
    { id: 'general', label: 'Tổng quan', icon: '🌟' },
    { id: 'nutrition', label: 'Dinh dưỡng', icon: '🥗' },
    { id: 'exercise', label: 'Thể dục', icon: '💪' },
    { id: 'mental', label: 'Tinh thần', icon: '🧠' }
  ];

  return (
    <div className="health-tips-card">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
          <span className="mr-2">🏥</span>
          Mẹo Sức Khỏe Hữu Ích
        </h3>
        <p className="text-gray-600 text-sm">
          Khám phá những lời khuyên chăm sóc sức khỏe được các chuyên gia khuyến nghị
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3 mb-6 border-b-2 border-gray-300 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg text-base font-bold transition-all duration-200 border-2 ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 border-blue-600 shadow-lg'
                : 'bg-white text-black border-gray-400 hover:bg-blue-50 hover:border-blue-600'
            }`}
          >
            <span className="mr-2 text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tips Content */}
      <div className="grid grid-cols-1 gap-4">
        {healthTips[activeTab as keyof typeof healthTips].map((tip, index) => (
          <div 
            key={index}
            className="health-tip-item group"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="health-tip-icon flex-shrink-0 group-hover:animate-pulse">
              {tip.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">
                {tip.title}
              </h4>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {tip.content}
              </p>
              <div className="flex flex-wrap gap-1">
                {tip.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="topic-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">
              💡 Cần tư vấn cá nhân hóa?
            </h4>
            <p className="text-blue-600 text-sm">
              Hãy mô tả tình trạng sức khỏe của bạn để nhận lời khuyên phù hợp
            </p>
          </div>
          <div className="text-2xl">👨‍⚕️</div>
        </div>
      </div>
    </div>
  );
} 