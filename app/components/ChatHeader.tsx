"use client";

export function ChatHeader() {
  return (
    <div className="chat-header">
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
        
        <div className="flex items-center gap-4">
          {/* Status indicator - Larger */}
          <div className="flex items-center bg-green-500 bg-opacity-25 rounded-full px-4 py-2 border-2 border-green-300 border-opacity-50">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-white text-base font-semibold">Trực tuyến</span>
          </div>
          
          {/* Menu button - Larger */}
          <button className="p-3 hover:bg-blue-500 hover:bg-opacity-30 rounded-lg transition-all duration-200 border-2 border-blue-300 border-opacity-40">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Sub-header with features - Larger text */}
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