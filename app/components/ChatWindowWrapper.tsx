"use client";

import { useEffect } from 'react';
import { ChatWindow } from './ChatWindow';

// Wrapper component để sử dụng với dynamic import
// Giúp tránh hydration errors
export default function ChatWindowWrapper() {
  // Cleanup DOM khi component được mount
  useEffect(() => {
    const cleanupDOM = () => {
      try {
        // Xóa các phần tử có ID đáng ngờ
        const suspiciousIds = ['extwaiokist', 'extwaioasist', 'ext_load', 'ext_icon', 'ext_installed'];
        suspiciousIds.forEach(id => {
          document.querySelectorAll(`[id="${id}"]`).forEach(el => {
            if (el && el.parentNode && document.body.contains(el)) {
              try {
                el.parentNode.removeChild(el);
              } catch (e) {
                // Bỏ qua lỗi nếu có
              }
            }
          });
        });
      } catch (e) {
        console.error('Error cleaning DOM in ChatWindowWrapper:', e);
      }
    };

    // Chạy ngay khi component mount
    cleanupDOM();

    // Chạy thêm một lần sau khi component đã render
    const timeoutId = setTimeout(cleanupDOM, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <ChatWindow />;
} 