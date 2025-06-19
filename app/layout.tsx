import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./components/HideDevTools.css";
import { SocketProvider } from "./providers/SocketProvider";
import { DisableAllDevTools } from "./providers/DisableAllDevTools";
import { DevToolsRemover } from "./components/DevToolsRemover";
import { DOMCleanupScript } from "./components/DOMCleanupScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tư Vấn Y Tế - Health Consultation Chatbot",
  description: "Chatbot tư vấn y tế trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes" />
        {/* Chèn script để clean DOM sớm nhất có thể */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function cleanupDOM() {
                try {
                  // IDs đáng ngờ
                  ['extwaiokist', 'extwaioasist', 'ext_load', 'ext_icon', 'ext_installed'].forEach(function(id) {
                    var elements = document.querySelectorAll('[id="' + id + '"]');
                    elements.forEach(function(el) {
                      // Kiểm tra xem phần tử có còn trong DOM không
                      if (el && el.parentNode && document.body.contains(el)) {
                        try {
                          el.parentNode.removeChild(el);
                        } catch (e) {}
                      }
                    });
                  });
                } catch (e) {}
              }
              
              // Chạy ngay lập tức
              cleanupDOM();
              
              // Chạy sau khi DOM đã load
              document.addEventListener('DOMContentLoaded', cleanupDOM);
              
              // Chạy định kỳ nhưng không quá thường xuyên
              setInterval(cleanupDOM, 1000);
            })();
          `
        }} />
      </head>
      <body className={inter.className}>
        <DisableAllDevTools />
        <DevToolsRemover />
        <DOMCleanupScript />
        <SocketProvider>
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
