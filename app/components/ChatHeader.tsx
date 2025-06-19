"use client";

import { useState, useEffect, useRef } from 'react';
import { useChatStore, GPUHost } from '../store/chatStore';

export function ChatHeader() {
  const { gpuHost, setGPUHost } = useChatStore();
  const [showSettings, setShowSettings] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isClient]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const selectGPUHost = (host: GPUHost) => {
    setGPUHost(host);
    setShowSettings(false);
  };
  
  // Get appropriate GPU label and icon
  const getGpuInfo = () => {
    if (gpuHost === 'gpu4090') {
      return {
        name: 'GPU 4090',
        icon: '🔥',
        performance: 'Hiệu suất cao'
      };
    } else {
      return {
        name: 'Kaggle',
        icon: '⚡',
        performance: 'Tiêu chuẩn'
      };
    }
  };
  
  const gpuInfo = getGpuInfo();

  return (
    <div className="chat-header relative">
      {/* Main header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-5">
            <div className="w-16 h-16 bg-white bg-opacity-25 rounded-full flex items-center justify-center text-3xl border-2 border-white shadow-lg">
              👨‍⚕️
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Bác sĩ AI - Tư vấn Sức khỏe
            </h1>
            <p className="text-white text-base font-medium mt-2">
              🩺 Hỗ trợ 24/7 • 🇻🇳 Tiếng Việt • ⚡ Phản hồi tức thì
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Online status indicator */}
          <div className="flex items-center bg-green-500 bg-opacity-25 rounded-lg px-3 py-2 border border-green-300">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-white text-sm font-semibold">Trực tuyến</span>
          </div>
          
          {/* GPU Selection Button - Simplified */}
          <button 
            onClick={toggleSettings}
            className="bg-blue-600 bg-opacity-20 border border-blue-300 hover:bg-blue-600 hover:bg-opacity-30 rounded-lg px-3 py-2 text-white flex items-center"
          >
            <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            GPU
          </button>
        </div>
      </div>
      
      {/* GPU Selection dropdown - Simplified */}
      {showSettings && isClient && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 top-20 rounded-lg shadow-lg overflow-hidden z-20 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
        >
          <div className="p-2 space-y-2">
            <button
              onClick={() => selectGPUHost('gpu4090')}
              className={`w-full px-4 py-2 text-white text-left rounded ${
                gpuHost === 'gpu4090' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 mr-3 rounded bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <span className="text-lg">🔥</span>
                </div>
                <div>
                  <div className="font-medium">NVIDIA RTX 4090</div>
                  <div className="text-xs text-gray-300">Hiệu suất cao</div>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => selectGPUHost('kaggle')}
              className={`w-full px-4 py-2 text-white text-left rounded ${
                gpuHost === 'kaggle' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 mr-3 rounded bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <div className="font-medium">Kaggle GPU</div>
                  <div className="text-xs text-gray-300">Tiêu chuẩn</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
      
      {/* Sub-header with features */}
      <div className="mt-5 pt-5 border-t-2 border-blue-400 border-opacity-40">
        <div className="flex flex-wrap gap-6 text-white text-base font-medium">
          <div className="flex items-center">
            <span className="mr-2 text-lg">🔒</span>
            Bảo mật thông tin
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-lg">📋</span>
            Chẩn đoán sơ bộ
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-lg">💊</span>
            Tư vấn điều trị
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-lg">📞</span>
            Hỗ trợ khẩn cấp
          </div>
        </div>
      </div>
    </div>
  );
} 