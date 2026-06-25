# BUỔI 6: WEB API & RESTFUL SERVICE

## Mục tiêu bài học

Sau khi hoàn thành buổi học này, sinh viên có thể:

- Hiểu kiến trúc Client - Server và vai trò của Web API.
- Làm quen với định dạng dữ liệu JSON.
- Triển khai các chuẩn RESTful: GET, POST, PUT, DELETE.
- Tạo "cửa ngõ" dữ liệu để kết nối ReactJS ở các buổi tiếp theo.

---

# 1. API LÀ GÌ?

Trong các buổi trước, chúng ta sử dụng mô hình MVC để trả về giao diện HTML.

Với các ứng dụng hiện đại như:

- ReactJS
- Flutter
- React Native
- Mobile App

Backend không trả về giao diện mà chỉ trả về dữ liệu dạng JSON.

## API (Application Programming Interface)

API là cầu nối giúp các hệ thống giao tiếp với nhau.

Ví dụ:

- ReactJS gọi API
- Backend xử lý dữ liệu
- Backend trả JSON
- ReactJS hiển thị dữ liệu lên giao diện

---

# 2. MVC VS WEB API

## ASP.NET Core MVC

Luồng xử lý:

```text
Request
   ↓
Controller
   ↓
Database
   ↓
View (.cshtml)
   ↓
HTML
```

Server vừa xử lý dữ liệu vừa tạo giao diện.

### Nhược điểm

- Khó tái sử dụng cho Mobile App
- Frontend và Backend phụ thuộc nhau

---

## Web API

Luồng xử lý:

```text
ReactJS
    ↓
Web API
    ↓
Database
    ↓
JSON
```

Backend chỉ cung cấp dữ liệu.

### Ưu điểm

- Dùng chung cho Web, Mobile, IoT
- Dễ mở rộng
- Tách biệt Frontend và Backend

---

# 3. JSON LÀ GÌ?

JSON (JavaScript Object Notation) là định dạng dữ liệu phổ biến nhất hiện nay.

Ví dụ:

```json
{
  "id": 1,
  "title": "Học Web API",
  "author": "Thai GV",
  "isPublished": true
}
```

## Đặc điểm

- Dữ liệu dạng Key - Value
- Dễ đọc
- Nhẹ
- Hỗ trợ hầu hết ngôn ngữ lập trình

---

# 4. CÀI ĐẶT SWAGGER

Swagger giúp kiểm thử API trực tiếp trên trình duyệt.

## Cài Package

Mở:

```text
Tools
→ NuGet Package Manager
→ Package Manager Console
```

Chạy lệnh:

```powershell
Install-Package Swashbuckle.AspNetCore
```

---

# 5. CẤU HÌNH PROGRAM.CS

## Đăng ký Services

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
```

---

## Cấu hình Swagger

```csharp
var app = builder.Build();

app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json",
        "ThaiCMS Web API v1");

    c.RoutePrefix = "swagger";
});
```

---

# 6. CẤU HÌNH CORS

## Đăng ký Policy

Trước:

```csharp
var app = builder.Build();
```

Thêm:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

---

## Kích hoạt Middleware

```csharp
app.UseRouting();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();
```

---

# 7. TẠO API CONTROLLER

## Tạo PostsController

Visual Studio:

```text
Controllers
→ Add
→ Controller
→ API
→ API Controller - Empty
```

Tên:

```text
PostsController.cs
```

---

## Code khởi tạo

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
```

---

# 8. API LẤY DANH SÁCH BÀI VIẾT

## GET ALL POSTS

```csharp
[HttpGet]
public async Task<IActionResult> GetAll()
{
    var posts = await _context.Posts
        .OrderByDescending(p => p.Id)
        .Select(p => new
        {
            p.Id,
            p.Title,
            p.ImageUrl,
            p.CreatedDate,
            CategoryName = p.Category.Name
        })
        .ToListAsync();

    return Ok(posts);
}
```

## Endpoint

```http
GET /api/posts
```

---

# 9. API LẤY BÀI VIẾT THEO DANH MỤC

```csharp
[HttpGet("category/{categoryId}")]
public async Task<IActionResult> GetByCategory(int categoryId)
{
    var posts = await _context.Posts
        .Where(p => p.CategoryId == categoryId)
        .Select(p => new
        {
            p.Id,
            p.Title,
            p.ImageUrl,
            p.CreatedDate
        })
        .ToListAsync();

    return Ok(posts);
}
```

## Endpoint

```http
GET /api/posts/category/1
```

---

# 10. API CHI TIẾT BÀI VIẾT

```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetDetail(int id)
{
    var post = await _context.Posts
        .FirstOrDefaultAsync(p => p.Id == id);

    if (post == null)
    {
        return NotFound(new
        {
            message = "Không tìm thấy bài viết"
        });
    }

    return Ok(post);
}
```

## Endpoint

```http
GET /api/posts/1
```

---

# 11. ROUTING API

Sau dòng:

```csharp
app.UseAuthorization();
```

Thêm:

```csharp
app.MapControllers();
```

Giữ nguyên MVC:

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

---

# 12. STATUS CODE THƯỜNG GẶP

## Thành công

| Mã | Ý nghĩa |
|------|----------|
| 200 | OK |
| 201 | Created |

---

## Lỗi Client

| Mã | Ý nghĩa |
|------|----------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |

---

## Lỗi Server

| Mã | Ý nghĩa |
|------|----------|
| 500 | Internal Server Error |

---

# 13. KIỂM THỬ BẰNG SWAGGER

Chạy dự án:

```text
F5
```

Mở:

```text
https://localhost:xxxx/swagger
```

Thử:

```http
GET /api/posts
```

Nhấn:

```text
Try it out
→ Execute
```

---

# 14. KIỂM THỬ BẰNG POSTMAN

## Lấy danh sách bài viết

Method:

```http
GET
```

URL:

```http
https://localhost:xxxx/api/posts
```

Nhấn:

```text
Send
```

Kết quả:

```json
[
  {
    "id": 1,
    "title": "Demo"
  }
]
```

---

# 15. BÀI TẬP MỞ RỘNG

## API CategoriesProducts

### Controller

```csharp
[Route("api/[controller]")]
[ApiController]
public class CategoriesProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriesProductsController(ApplicationDbContext context)
    {
        _context = context;
    }
}
```

---

### GET ALL

```csharp
[HttpGet]
public async Task<IActionResult> GetAll()
{
    var categories = await _context.CategoriesProducts
        .OrderBy(c => c.DisplayOrder)
        .Select(c => new
        {
            c.Id,
            c.Name,
            c.Description,
            c.DisplayOrder,
            c.IsActive
        })
        .ToListAsync();

    return Ok(categories);
}
```

---

# 16. CHECKPOINT CUỐI BUỔI

## Kiểm tra MVC

```text
https://localhost:xxxx/
```

Yêu cầu:

- Website MVC chạy bình thường.
- Không lỗi CSS.
- Không lỗi Routing.

---

## Kiểm tra API

```http
GET /api/posts
```

Trả về:

```json
[
  {
    "id": 1,
    "title": "..."
  }
]
```

---

## Kiểm tra API Chi Tiết

```http
GET /api/posts/1
```

Trả về:

```json
{
  "id": 1,
  "title": "...",
  "content": "..."
}
```

---

# TÓM TẮT BUỔI 6

- Hiểu kiến trúc Client - Server.
- Hiểu JSON.
- Cấu hình Swagger.
- Cấu hình CORS.
- Tạo API Controller.
- Xây dựng RESTful API với GET.
- Trả dữ liệu JSON cho ReactJS.
- Kiểm thử bằng Swagger và Postman.

➡️ Kết quả sau Buổi 6:

Backend ASP.NET Core đã trở thành Web API hoàn chỉnh, sẵn sàng kết nối ReactJS ở các buổi tiếp theo.
