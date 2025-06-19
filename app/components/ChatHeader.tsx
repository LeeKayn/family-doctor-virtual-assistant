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
  
  // Get appropriate GPU label and icon - Currently commented out as not used
  // const getGpuInfo = () => {
  //   if (gpuHost === 'gpu4090') {
  //     return {
  //       name: 'GPU 4090',
  //       icon: '🔥',
  //       performance: 'Hiệu suất cao'
  //     };
  //   } else {
  //     return {
  //       name: 'Kaggle',
  //       icon: '⚡',
  //       performance: 'Tiêu chuẩn'
  //     };
  //   }
  // };

  return (
    <div className="chat-header relative">
      {/* Main header - Responsive */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0" style={{ marginRight: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
            <div 
              className="bg-white bg-opacity-25 rounded-full flex items-center justify-center border-2 border-white shadow-lg overflow-hidden"
              style={{
                width: 'clamp(3rem, 6vw, 4rem)',
                height: 'clamp(3rem, 6vw, 4rem)'
              }}
            >
              <img 
                src="/images/medical_bot.jpg" 
                alt="Bác sĩ AI" 
                className="w-full h-full object-cover rounded-full"
                style={{
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
          <div>
            <h1 
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(1.1rem, 2.8vw, 1.6rem)',
                marginBottom: 'clamp(0.2rem, 0.4vh, 0.4rem)',
                lineHeight: '1.2'
              }}
            >
              Bác sĩ AI - Tư vấn Sức khỏe
            </h1>
            <p 
              className="text-white font-medium"
              style={{
                fontSize: 'clamp(0.75rem, 1.6vw, 0.9rem)',
                marginTop: 'clamp(0.2rem, 0.4vh, 0.4rem)',
                lineHeight: '1.3'
              }}
            >
              🩺 Hỗ trợ 24/7 • 🇻🇳 Tiếng Việt • ⚡ Phản hồi tức thì
            </p>
          </div>
        </div>
        
        <div 
          className="flex items-center"
          style={{ 
            gap: 'clamp(0.4rem, 1vw, 0.8rem)',
            marginRight: '1%'
          }}
        >
          {/* Online status indicator - Responsive */}
          <div 
            className="flex items-center bg-green-500 bg-opacity-25 rounded-lg border border-green-300"
            style={{
              padding: 'clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.5rem, 1.2vw, 0.8rem)'
            }}
          >
            <div 
              className="bg-green-400 rounded-full animate-pulse"
              style={{
                width: 'clamp(0.6rem, 1vw, 0.8rem)',
                height: 'clamp(0.6rem, 1vw, 0.8rem)',
                marginRight: 'clamp(0.4rem, 0.8vw, 0.6rem)'
              }}
            ></div>
            <span 
              className="text-white font-semibold whitespace-nowrap"
              style={{ fontSize: 'clamp(0.65rem, 1.3vw, 0.8rem)' }}
            >
              Trực tuyến
            </span>
          </div>
          
          {/* GPU Selection Button - Responsive */}
          <button 
            onClick={toggleSettings}
            className="rounded-lg text-white flex items-center transition-all duration-200"
            style={{
              padding: 'clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.5rem, 1.2vw, 0.8rem)',
              fontSize: 'clamp(0.65rem, 1.3vw, 0.8rem)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(107, 114, 128, 0.8)',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 1)';
              e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
              e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.8)';
            }}
          >
            <svg 
              className="fill-none stroke-current" 
              viewBox="0 0 24 24"
              style={{
                width: 'clamp(0.9rem, 1.6vw, 1.1rem)',
                height: 'clamp(0.9rem, 1.6vw, 1.1rem)',
                marginRight: 'clamp(0.2rem, 0.5vw, 0.4rem)'
              }}
            >
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
          className="absolute rounded-lg shadow-lg overflow-hidden z-20 bg-white border border-gray-300"
          style={{
            top: 'calc(100% + 0.1rem)',
            right: '1%',
            minWidth: '250px'
          }}
        >
          <div className="p-2 space-y-2">
            <button
              onClick={() => selectGPUHost('gpu4090')}
              className={`w-full px-4 py-2 text-black text-left rounded transition-colors ${
                gpuHost === 'gpu4090' ? 'bg-green-500 text-black' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 mr-3 rounded bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <span className="text-lg">🔥</span>
                </div>
                <div>
                  <div className="font-medium">NVIDIA RTX 4090</div>
                  <div className="text-xs text-gray-600">Hiệu suất cao</div>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => selectGPUHost('kaggle')}
              className={`w-full px-4 py-2 text-black text-left rounded transition-colors ${
                gpuHost === 'kaggle' ? 'bg-green-500 text-black' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 mr-3 rounded bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <div className="font-medium">Kaggle GPU</div>
                  <div className="text-xs text-gray-600">Tiêu chuẩn</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
      
      {/* Sub-header with features - Responsive */}
      <div 
        className="border-t-2 border-blue-400 border-opacity-40"
        style={{
          marginTop: 'clamp(0.75rem, 2vh, 1.5rem)',
          paddingTop: 'clamp(0.75rem, 2vh, 1.5rem)'
        }}
      >
        <div 
          className="flex flex-wrap text-white font-medium"
          style={{
            gap: 'clamp(0.5rem, 2vw, 1.5rem)',
            fontSize: 'clamp(0.8rem, 1.8vw, 1rem)'
          }}
        >
          <div className="flex items-center whitespace-nowrap">
            <span style={{ marginRight: 'clamp(0.25rem, 0.5vw, 0.5rem)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>🔒</span>
            Bảo mật thông tin
          </div>
          <div className="flex items-center whitespace-nowrap">
            <span style={{ marginRight: 'clamp(0.25rem, 0.5vw, 0.5rem)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>📋</span>
            Chẩn đoán sơ bộ
          </div>
          <div className="flex items-center whitespace-nowrap">
            <span style={{ marginRight: 'clamp(0.25rem, 0.5vw, 0.5rem)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>💊</span>
            Tư vấn điều trị
          </div>
          <div className="flex items-center whitespace-nowrap">
            <span style={{ marginRight: 'clamp(0.25rem, 0.5vw, 0.5rem)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}>📞</span>
            Hỗ trợ khẩn cấp
          </div>
        </div>
      </div>
    </div>
  );
} 