"use client";

import { useEffect } from 'react';

export function DOMCleanupScript() {
  useEffect(() => {
    // Thêm script tag vào head để thực thi sớm nhất có thể
    const scriptEl = document.createElement('script');
    
    scriptEl.innerHTML = `
      // Tự thực thi ngay lập tức
      (function() {
        // Hàm để loại bỏ các phần tử injection từ extension
        function cleanupDOM() {
          try {
            // IDs đáng ngờ thường được thêm vào bởi extension
            ['extwaiokist', 'extwaioasist', 'ext_load', 'ext_icon', 'ext_installed'].forEach(function(id) {
              var elements = document.querySelectorAll('[id="' + id + '"]');
              elements.forEach(function(el) {
                // Kiểm tra xem phần tử có còn trong DOM không
                if (el && el.parentNode && document.contains(el)) {
                  el.parentNode.removeChild(el);
                }
              });
            });
            
            // Thuộc tính đáng ngờ
            ['v', 'q', 'sg', 'c', 'i', 'u', 's', 'd', 'w', 'e', 'a', 'm', 'vn'].forEach(function(attr) {
              var elements = document.querySelectorAll('[' + attr + ']');
              elements.forEach(function(el) {
                // Chỉ xóa nếu là div rỗng hoặc ẩn VÀ vẫn còn trong DOM
                if (
                  el && 
                  el.parentNode && 
                  document.contains(el) &&
                  el.tagName === 'DIV' && 
                  (el.children.length === 0 || 
                  (el.getAttribute('style') && (
                    el.getAttribute('style').indexOf('display:none') !== -1 || 
                    el.getAttribute('style').indexOf('display: none') !== -1
                  )))
                ) {
                  try {
                    el.parentNode.removeChild(el);
                  } catch (e) {
                    // Bỏ qua lỗi nếu có
                  }
                }
              });
            });
          } catch (e) {
            console.error('Error in DOM cleanup script:', e);
          }
        }
        
        // Chạy ngay lập tức
        cleanupDOM();
        
        // Chạy định kỳ nhưng với tần suất thấp hơn
        setInterval(cleanupDOM, 1000);
        
        // Chạy sau khi trang đã tải xong
        if (document.readyState === 'complete') {
          cleanupDOM();
        } else {
          window.addEventListener('load', cleanupDOM);
        }
      })();
    `;
    
    // Thêm script tag vào head
    document.head.appendChild(scriptEl);
    
    // Cleanup khi component unmount
    return () => {
      if (document.head.contains(scriptEl)) {
        document.head.removeChild(scriptEl);
      }
    };
  }, []);
  
  // Component này không render gì cả
  return null;
} 