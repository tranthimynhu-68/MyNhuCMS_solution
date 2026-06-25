# Fashion Boutique - ASP.NET Core Web API & ReactJS

## Giới thiệu

Fashion Boutique là dự án Website Thương mại điện tử chuyên bán thời trang công sở và dạ hội, được xây dựng theo mô hình Fullstack:

* Backend: ASP.NET Core Web API
* Frontend: ReactJS
* Database: SQL Server
* ORM: Entity Framework Core

Dự án phục vụ mục tiêu học tập môn Chuyên đề ASP.NET Core + ReactJS.

---

## Công nghệ sử dụng

### Backend

* ASP.NET Core 8
* Entity Framework Core
* SQL Server
* RESTful API
* CORS

### Frontend

* ReactJS
* Axios
* Bootstrap 4
* Font Awesome

---

## Cấu trúc Database

### CategoriesProduct

Danh mục sản phẩm

| Trường      | Kiểu   |
| ----------- | ------ |
| Id          | int    |
| Name        | string |
| Description | string |

### Products

Thông tin sản phẩm

| Trường            | Kiểu    |
| ----------------- | ------- |
| Id                | int     |
| Name              | string  |
| Description       | string  |
| Price             | decimal |
| StockQuantity     | int     |
| ImageUrl          | string  |
| CategoryProductId | int     |

### Customers

Thông tin khách hàng

| Trường   | Kiểu   |
| -------- | ------ |
| Id       | int    |
| FullName | string |
| Email    | string |
| Phone    | string |
| Address  | string |
| Password | string |

### Orders

Thông tin đơn hàng

| Trường     | Kiểu     |
| ---------- | -------- |
| Id         | int      |
| OrderDate  | datetime |
| CustomerId | int      |
| Status     | int      |
| Notes      | string   |

### OrderDetails

Chi tiết đơn hàng

| Trường    | Kiểu    |
| --------- | ------- |
| Id        | int     |
| OrderId   | int     |
| ProductId | int     |
| Quantity  | int     |
| UnitPrice | decimal |

---

## Chức năng đã thực hiện

### Backend API

* CRUD Category Product
* CRUD Product
* CRUD Category Blog
* CRUD Post
* API trả dữ liệu JSON
* Cấu hình CORS cho ReactJS

### Frontend ReactJS

* Hiển thị danh mục sản phẩm
* Hiển thị danh sách sản phẩm
* Hiển thị chuyên mục blog
* Hiển thị danh sách bài viết
* Gọi API bằng Axios
* Sử dụng React Hooks:

  * useState
  * useEffect
  * async/await

---

## Cài đặt Backend

### Bước 1: Clone source

```bash
git clone https://github.com/your-account/fashion-boutique.git
```

### Bước 2: Mở Solution

Mở file:

```bash
FashionBoutique.sln
```

bằng Visual Studio 2022.

### Bước 3: Cấu hình SQL Server

Mở file:

```json
appsettings.json
```

Cập nhật Connection String:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=FashionBoutiqueDB;Trusted_Connection=True;TrustServerCertificate=True"
}
```

### Bước 4: Chạy Migration

```powershell
Update-Database
```

### Bước 5: Chạy Backend

Nhấn:

```text
F5
```

hoặc:

```bash
dotnet run
```

Ví dụ API:

```text
https://localhost:7001/api/products
```

---

## Cài đặt Frontend

### Bước 1: Di chuyển vào thư mục Frontend

```bash
cd cms.frontend
```

### Bước 2: Cài thư viện

```bash
npm install
```

### Bước 3: Cấu hình API

File:

```javascript
src/api/axiosClient.js
```

```javascript
baseURL: "https://localhost:7001/api"
```

Thay bằng port Backend của bạn.

### Bước 4: Chạy ReactJS

```bash
npm start
```

hoặc

```bash
npm run dev
```

---

## Cấu hình CORS

Program.cs

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
```

```csharp
app.UseCors("AllowReactApp");
```

---

## Thư mục cần loại bỏ khỏi Git

File `.gitignore`

```gitignore
# Node
node_modules/

# React
build/
dist/

# ASP.NET Core
bin/
obj/

# Visual Studio
.vs/
*.user
*.suo

# Logs
*.log

# Environment
.env
.env.local
```

---

## Thành viên thực hiện

* Họ và tên: Trần Thị Mỹ Như 
* MSSV: 2123110054
* Lớp: CCQ2311B

---

## Kết quả đạt được

✔ Kết nối ReactJS với ASP.NET Core Web API

✔ Hiển thị dữ liệu Real-time từ SQL Server

✔ Sử dụng Axios và useEffect để gọi API

✔ Áp dụng mô hình phân tầng (3-Tier Architecture)

✔ Quản lý mã nguồn bằng GitHub
