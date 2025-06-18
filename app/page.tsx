"use client";

import { ConnectionStatus } from './components/ConnectionStatus';
import { HydrationGuard } from './components/HydrationGuard';
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
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main chat column - now full height and wider */}
        <div className="w-full lg:w-3/4 h-full">
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
        
        {/* Sidebar column - simplified for elderly users */}
        <div className="w-full lg:w-1/4 h-full overflow-y-auto p-6">
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
                © 2024 Tư Vấn Y Tế AI
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
