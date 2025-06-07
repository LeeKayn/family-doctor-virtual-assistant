"use client";

import { ChatWindow } from './components/ChatWindow';
import { HealthTips } from './components/HealthTips';
import { ConnectionStatus } from './components/ConnectionStatus';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main chat column - now full height and wider */}
        <div className="w-full lg:w-3/4 h-full">
          <ChatWindow />
        </div>
        
        {/* Sidebar column - now narrower */}
        <div className="w-full lg:w-1/4 h-full overflow-y-auto p-4">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <h2 className="text-lg font-medium text-gray-800 mb-3">Về dịch vụ tư vấn</h2>
            <p className="text-gray-600 mb-3">
              Dịch vụ tư vấn y tế trực tuyến của chúng tôi cung cấp thông tin chung về các vấn đề sức khỏe thông thường. 
              Chúng tôi không thay thế cho việc thăm khám bác sĩ.
            </p>
            <p className="text-gray-600">
              Trong trường hợp khẩn cấp, vui lòng liên hệ ngay với cơ sở y tế gần nhất hoặc gọi số cấp cứu.
            </p>
          </div>
          
          <HealthTips />
          
          <footer className="mt-4 text-center text-gray-500 text-sm">
            <div className="mb-2">
              <ConnectionStatus />
            </div>
            <p>© 2024 Tư Vấn Y Tế | Đây chỉ là tư vấn sơ bộ, vui lòng liên hệ bác sĩ cho tư vấn chính xác.</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
