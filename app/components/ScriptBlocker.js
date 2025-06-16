// Script này chạy trước khi React mount để loại bỏ các phần tử không mong muốn
(function() {
  // Loại bỏ các phần tử có id đáng ngờ hoặc thuộc tính đáng ngờ
  function cleanupSuspiciousElements() {
    try {
      // Danh sách các ID cần tìm và xóa
      const suspiciousIds = ['extwaiokist'];
      suspiciousIds.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) {
          console.log('Anti-Injection: Removing element with suspicious ID: ' + id);
          el.parentNode.removeChild(el);
        }
      });

      // Danh sách các thuộc tính đáng ngờ
      const suspiciousAttrs = ['v', 'q', 'sg', 'c', 'i', 'u', 's', 'd', 'w', 'e', 'a', 'm', 'vn'];
      suspiciousAttrs.forEach(function(attr) {
        var elements = document.querySelectorAll('[' + attr + ']');
        elements.forEach(function(el) {
          console.log('Anti-Injection: Removing element with suspicious attribute: ' + attr);
          el.parentNode.removeChild(el);
        });
      });

      // Lặp qua tất cả các phần tử div và kiểm tra style display:none
      var allDivs = document.querySelectorAll('div[style*="display:none"], div[style*="display: none"]');
      allDivs.forEach(function(div) {
        // Kiểm tra xem div có chứa các thuộc tính đáng ngờ không
        for (var i = 0; i < div.attributes.length; i++) {
          var attrName = div.attributes[i].name;
          if (!['id', 'class', 'style'].includes(attrName)) {
            console.log('Anti-Injection: Removing hidden div with suspicious attributes');
            div.parentNode.removeChild(div);
            break;
          }
        }
      });
    } catch (e) {
      console.error('Anti-Injection script error:', e);
    }
  }

  // Chạy hàm dọn dẹp ngay lập tức
  cleanupSuspiciousElements();

  // Thiết lập MutationObserver để theo dõi các thay đổi DOM
  if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function(mutations) {
      cleanupSuspiciousElements();
    });

    // Bắt đầu theo dõi thay đổi DOM
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  // Chạy định kỳ để đảm bảo
  setInterval(cleanupSuspiciousElements, 1000);
})(); 