"use client";

import React from 'react';
import Image from 'next/image';

export function ChatHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 bg-white p-2 rounded-full">
            <Image 
              src="/images/medical_bot.jpg"
              alt="Medical Bot Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Tư Vấn Y Tế Trực Tuyến</h1>
            <p className="text-sm opacity-80">Hỗ trợ y tế trực tuyến 24/7</p>
          </div>
        </div>
        <div className="hidden md:flex items-center">
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mr-3">
            <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
            Đang hoạt động
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-sm border-t border-blue-400 pt-2 text-blue-100">
        <p>Lưu ý: Đây chỉ là tư vấn sơ bộ. Vui lòng liên hệ bác sĩ cho tư vấn chi tiết.</p>
      </div>
    </div>
  );
} 