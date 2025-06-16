'use client';

import { useEffect, useState, ReactNode } from 'react';

type HydrationGuardProps = {
  children: ReactNode;
};

/**
 * Component này giúp xử lý vấn đề hydration bằng cách render nội dung chỉ ở phía client
 * Điều này giúp tránh các lỗi hydration khi extension trình duyệt chèn mã vào trang
 */
export function HydrationGuard({ children }: HydrationGuardProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated
    setIsHydrated(true);
    
    // Loại bỏ các DOM injection từ extension
    const cleanupDom = () => {
      try {
        // Các ID thường được extension thêm vào
        const badIds = ['extwaiokist', 'extwaioasist', 'ext_load', 'ext_icon', 'ext_installed'];
        
        badIds.forEach(id => {
          const elements = document.querySelectorAll(`[id="${id}"]`);
          elements.forEach(el => {
            if (el && el.parentNode && document.body.contains(el)) {
              try {
                el.parentNode.removeChild(el);
              } catch (e) {
                console.error('Error removing element:', e);
              }
            }
          });
        });
      } catch (e) {
        console.error('Error cleaning DOM:', e);
      }
    };
    
    // Chạy ngay khi component mount
    cleanupDom();
    
    // Chạy một lần nữa sau một khoảng thời gian ngắn
    const timeoutId = setTimeout(cleanupDom, 500);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Trả về placeholder cho đến khi hydration hoàn tất
  if (!isHydrated) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-pulse">Đang tải giao diện...</div>
      </div>
    );
  }
  
  return <>{children}</>;
} 