# Health Consultation Chatbot

## Tổng quan
Ứng dụng chatbot tư vấn y tế tích hợp đa người dùng và giao diện đơn giản. Chatbot có thể:
- Tư vấn cơ bản về các vấn đề sức khỏe
- Xử lý nhiều người dùng đồng thời 
- Hỗ trợ phản hồi dạng streaming
- Giao diện trực quan, thân thiện

## Công nghệ sử dụng
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Socket.IO
- **State Management**: Zustand
- **Bất đồng bộ**: Streaming API responses, WebSockets
- **Xử lý nhiều người dùng**: WebSockets, API bất đồng bộ

## Cách sử dụng
1. Cài đặt các dependencies:
```bash
npm install
```

2. Chạy ứng dụng ở môi trường development:
```bash
npm run dev
```

3. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

### Lưu ý cho Windows
Nếu bạn gặp lỗi khi khởi động server trên Windows, hãy thử các bước sau:

1. Cài đặt `cross-env` (đã được thêm vào dependencies):
```bash
npm install cross-env
```

2. Khởi động server:
```bash
npm run dev
```

3. Để dừng server, nhấn `Ctrl+C` trong terminal.

## Tính năng
- **Chat với streaming**: Phản hồi hiển thị dần dần từng ký tự 
- **Hỗ trợ tư vấn sức khỏe**: Nhận dạng và phản hồi các vấn đề sức khỏe phổ biến
- **Đa người dùng**: Nhiều người dùng có thể tương tác với chatbot cùng lúc
- **Giao diện thân thiện**: Thiết kế đơn giản, dễ sử dụng

## Danh sách chủ đề được hỗ trợ
Chatbot có thể tư vấn về các chủ đề sức khỏe sau:
- Đau đầu/nhức đầu
- Sốt
- Ho và đau họng
- Mệt mỏi
- Đau bụng/đau dạ dày
- Huyết áp
- Stress/căng thẳng/lo âu
- Tiểu đường
- Mất ngủ/khó ngủ
- Cảm lạnh/cảm cúm
- Dị ứng
- Tập thể dục
- Chế độ ăn/dinh dưỡng

## Cấu trúc mã nguồn
- `app/components/`: UI components 
- `app/api/`: API routes
- `app/hooks/`: React hooks
- `app/providers/`: Context providers
- `app/store/`: State management
- `server.js`: Custom server với Socket.IO

## Triển khai
Để triển khai lên môi trường production:
```bash
npm run build
npm start
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
