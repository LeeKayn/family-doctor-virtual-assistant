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
        <div className="animate-pulse mb-3">Đang tải giao diện chat...</div>
        <div className="text-sm text-gray-500">Vui lòng đợi trong giây lát</div>
      </div>
    </div>
  )
});

// Import HealthTips với ssr: false
const HealthTips = dynamic(() => import('./components/HealthTipsWrapper'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4 min-h-[300px] flex items-center justify-center">
      <div className="animate-pulse">Đang tải lời khuyên sức khỏe...</div>
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
                <div className="animate-pulse mb-3">Đang tải...</div>
              </div>
            </div>
          }>
            <ChatWindow />
          </Suspense>
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
          
          <Suspense fallback={
            <div className="bg-white rounded-lg shadow-md p-4 mt-4 min-h-[300px] flex items-center justify-center">
              <div className="animate-pulse">Đang tải...</div>
            </div>
          }>
            <HealthTips />
          </Suspense>
          
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
