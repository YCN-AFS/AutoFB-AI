# AutoFB-AI

## Giới thiệu
AutoFB-AI là một ứng dụng web được xây dựng với React, Express, và TypeScript, sử dụng các công nghệ hiện đại như Tailwind CSS, Drizzle ORM, và các thư viện UI components từ Radix UI.

## Yêu cầu hệ thống
- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn
- PostgreSQL (cho cơ sở dữ liệu)

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/YCN-AFS/AutoFB-AI.git
cd AutoFB-AI
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Cấu hình môi trường:
Tạo file `.env` trong thư mục gốc với các biến môi trường cần thiết:
```env
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
```

## Chạy ứng dụng

### Môi trường phát triển
```bash
npm run dev
```
Ứng dụng sẽ chạy ở địa chỉ: http://localhost:3000

### Build và chạy production
```bash
# Build ứng dụng
npm run build

# Chạy phiên bản production
npm start
```

## Cấu trúc thư mục
- `/client` - Mã nguồn frontend React
- `/server` - Mã nguồn backend Express
- `/shared` - Các types và utilities dùng chung
- `/public` - Các tài nguyên tĩnh

## Các lệnh hữu ích
- `npm run dev` - Chạy ứng dụng trong môi trường development
- `npm run build` - Build ứng dụng cho production
- `npm start` - Chạy phiên bản production
- `npm run check` - Kiểm tra TypeScript
- `npm run db:push` - Cập nhật schema database

## Triển khai

### Triển khai lên Vercel
1. Tạo tài khoản trên Vercel
2. Kết nối repository với Vercel
3. Cấu hình các biến môi trường trong Vercel dashboard
4. Deploy

### Triển khai lên các nền tảng khác
1. Build ứng dụng: `npm run build`
2. Copy thư mục `dist` và file `package.json` lên server
3. Cài đặt dependencies: `npm install --production`
4. Chạy ứng dụng: `npm start`

## Hỗ trợ
Nếu bạn gặp vấn đề hoặc cần hỗ trợ, vui lòng tạo issue trong repository.

## Giấy phép
MIT License
