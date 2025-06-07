import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./components/HideDevTools.css";
import { SocketProvider } from "./providers/SocketProvider";
import { DisableAllDevTools } from "./providers/DisableAllDevTools";
import { DevToolsRemover } from "./components/DevToolsRemover";

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
      <body className={inter.className}>
        <DisableAllDevTools />
        <DevToolsRemover />
        <SocketProvider>
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
