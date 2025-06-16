"use client";

export function ChatHeader() {
  return (
    <div className="chat-header">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
              👨‍⚕️
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              Bác sĩ AI - Tư vấn Sức khỏe
            </h1>
            <p className="text-blue-100 text-sm opacity-90 mt-1">
              🩺 Hỗ trợ 24/7 • 🇻🇳 Tiếng Việt • ⚡ Phản hồi tức thì
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Status indicator */}
          <div className="flex items-center bg-green-500 bg-opacity-20 rounded-full px-3 py-1 border border-green-300 border-opacity-30">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-100 text-xs font-medium">Trực tuyến</span>
          </div>
          
          {/* Menu button */}
          <button className="p-2 hover:bg-blue-500 hover:bg-opacity-30 rounded-lg transition-all duration-200 border border-blue-300 border-opacity-30">
            <svg className="w-5 h-5 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Sub-header with features */}
      <div className="mt-4 pt-4 border-t border-blue-500 border-opacity-30">
        <div className="flex flex-wrap gap-4 text-blue-100 text-xs">
          <div className="flex items-center">
            <span className="mr-1">🔒</span>
            Bảo mật thông tin
          </div>
          <div className="flex items-center">
            <span className="mr-1">📋</span>
            Chẩn đoán sơ bộ
          </div>
          <div className="flex items-center">
            <span className="mr-1">💊</span>
            Tư vấn điều trị
          </div>
          <div className="flex items-center">
            <span className="mr-1">📞</span>
            Hỗ trợ khẩn cấp
          </div>
        </div>
      </div>
    </div>
  );
} 