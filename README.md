## Hướng dẫn chạy dự án

### 1. Chạy Backend (ASP.NET Core)

Mở Solution bằng Visual Studio.

Thực hiện:

1. Restore NuGet Packages
2. Kiểm tra chuỗi kết nối Database trong `appsettings.json`
3. Build Solution (`Ctrl + Shift + B`)
4. Chạy dự án bằng:

```bash
F5
```

hoặc

```bash
Ctrl + F5
```

Sau khi chạy thành công:

```text
https://localhost:xxxx
```

Swagger:

```text
https://localhost:xxxx/swagger
```

---

### 2. Chạy FrontEnd (ReactJS)

Mở Terminal tại thư mục FrontEnd:

```bash
cd frontend
```

Cài đặt thư viện:

```bash
npm install
```

Khởi động dự án:

```bash
npm start
```

hoặc nếu dùng Vite:

```bash
npm run dev
```

Sau khi chạy thành công:

```text
http://localhost:3000
```

hoặc

```text
http://localhost:5173
```

---

## Quy tắc làm việc với Git

Không đưa các thư mục build hoặc thư viện tạm lên GitHub.

Tạo file `.gitignore` ở thư mục gốc của dự án:

```gitignore
# Visual Studio
.vs/
bin/
obj/

# ReactJS / NodeJS
node_modules/
dist/
build/

# Logs
*.log

# Environment
.env
.env.local

# User files
*.user
*.suo

# OS files
.DS_Store
Thumbs.db
```

Nếu đã lỡ commit các thư mục này lên GitHub thì xóa cache:

```bash
git rm -r --cached node_modules
git rm -r --cached bin
git rm -r --cached obj
```

Sau đó commit lại:

```bash
git add .
git commit -m "Remove unnecessary folders"
git push
```

---

## Cấu trúc dự án

```text
Project
│
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Views/
│   └── Program.cs
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

## Yêu cầu môi trường

### Backend

- .NET 8 SDK
- SQL Server
- Visual Studio 2022

### FrontEnd

- NodeJS 18+
- npm 9+

---

## Tác giả

- Họ tên: .................................
- MSSV: ...................................
- Lớp: ....................................
