"use client";

import { ConnectionStatus } from './components/ConnectionStatus';
// HydrationGuard import removed as it's not used
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Import ChatWindow với ssr: false để hoàn toàn tránh hydration
const ChatWindow = dynamic(() => import('./components/ChatWindowWrapper'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-pulse mb-4 text-xl font-medium">Đang tải giao diện chat...</div>
        <div className="text-base text-gray-600">Vui lòng đợi trong giây lát</div>
      </div>
    </div>
  )
});

// Import HealthTips với ssr: false
const HealthTips = dynamic(() => import('./components/HealthTipsWrapper'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 min-h-[300px] flex items-center justify-center">
      <div className="animate-pulse text-lg">Đang tải lời khuyên sức khỏe...</div>
    </div>
  )
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex flex-col lg:flex-row h-screen w-screen">
        {/* Main chat column - responsive width */}
        <div className="w-full lg:w-[65%] xl:w-[70%] h-full chat-column">
          <Suspense fallback={
            <div className="h-full w-full flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="animate-pulse mb-4 text-xl">Đang tải...</div>
              </div>
            </div>
          }>
            <ChatWindow />
          </Suspense>
        </div>
        
        {/* Sidebar column - wider for better usability */}
        <div className="w-full lg:w-[35%] xl:w-[30%] h-full overflow-y-auto sidebar-column"
             style={{
               padding: 'clamp(1rem, 2vw, 2rem)',
               fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)'
             }}>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-blue-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-3">ℹ️</span>
              Lưu ý quan trọng
            </h2>
            <div className="space-y-4">
              <p className="text-base text-gray-700 font-medium leading-relaxed">
                ⚠️ Đây chỉ là tư vấn sơ bộ, không thay thế khám bác sĩ.
              </p>
              <p className="text-base text-gray-700 font-medium leading-relaxed">
                🚨 Trường hợp khẩn cấp: Gọi 115 hoặc đến bệnh viện ngay.
              </p>
              <p className="text-base text-gray-700 font-medium leading-relaxed">
                📞 Cần hỗ trợ: Liên hệ trực tiếp với bác sĩ.
              </p>
            </div>
          </div>
          
          <Suspense fallback={
            <div className="bg-white rounded-lg shadow-md p-6 mt-6 min-h-[300px] flex items-center justify-center">
              <div className="animate-pulse text-lg">Đang tải...</div>
            </div>
          }>
            <HealthTips />
          </Suspense>
          
          <footer className="mt-6 text-center">
            <div className="mb-4">
              <ConnectionStatus />
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="text-base text-gray-700 font-medium leading-relaxed">
                © 2025 LeeKayn - Tư vấn y tế AI
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Hỗ trợ sức khỏe 24/7
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
