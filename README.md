# CMS Fashion Store

Website thương mại điện tử bán thời trang công sở và dạ hội được xây dựng bằng ASP.NET Core MVC, Entity Framework Core, SQL Server và ReactJS.

## Công nghệ sử dụng

### Backend

* ASP.NET Core
* Entity Framework Core
* SQL Server
* Repository Pattern

### Frontend

* ReactJS
* Axios
* Bootstrap 5

## Cấu trúc dự án

```text
CMS.Data          -> Entity, DbContext
CMS.Backend       -> ASP.NET Core MVC/API
cms.frontend      -> ReactJS Client
```

## Yêu cầu hệ thống

* Visual Studio 2022
* .NET 8 SDK
* NodeJS 18+
* SQL Server

## Chạy Backend

1. Mở Solution bằng Visual Studio 2022.
2. Mở file `appsettings.json`.
3. Cấu hình Connection String phù hợp với SQL Server.

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=CMSFashionStore;Trusted_Connection=True;TrustServerCertificate=True"
}
```

4. Chạy Migration (nếu có):

```powershell
Update-Database
```

5. Nhấn F5 để chạy Backend.

Backend mặc định:

```text
https://localhost:7001
```

## Chạy Frontend

Di chuyển vào thư mục frontend:

```bash
cd cms.frontend
```

Cài đặt package:

```bash
npm install
```

Khởi động ReactJS:

```bash
npm start
```

hoặc

```bash
npm run dev
```

Frontend mặc định:

```text
http://localhost:3000
```

## Cấu hình API

File:

```text
src/api/axiosClient.js
```

```javascript
baseURL: "https://localhost:7001/api"
```

Đảm bảo trùng với địa chỉ Backend.

## Chức năng

* Quản lý sản phẩm
* Quản lý danh mục sản phẩm
* Quản lý bài viết
* Quản lý chuyên mục bài viết
* Upload hình ảnh
* Hiển thị sản phẩm trên ReactJS
* Hiển thị tin tức trên ReactJS
* Kết nối API bằng Axios

## Git Ignore

Đã loại bỏ các thư mục phát sinh:

```text
node_modules/
bin/
obj/
```

thông qua file `.gitignore`.

## Tác giả

Trần Thị Mỹ Như
