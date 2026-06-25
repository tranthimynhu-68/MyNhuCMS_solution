# CMS Full-Stack - Buổi 2: Kết nối Cơ sở dữ liệu với Entity Framework Core (EF Core)

## Giới thiệu

Đây là bài thực hành Buổi 2 trong môn học xây dựng hệ thống CMS Full-Stack bằng ASP.NET Core MVC, Entity Framework Core và SQL Server.

Mục tiêu của buổi học là kết nối cơ sở dữ liệu thật với ứng dụng, sử dụng kỹ thuật Code First Migration để tự động tạo Database từ các lớp Entity đã xây dựng ở Buổi 1.

---

## Công nghệ sử dụng

* ASP.NET Core MVC
* Entity Framework Core
* SQL Server
* Visual Studio 2022
* C#
* HTML/CSS/Bootstrap

---

## Nội dung thực hiện

### 1. Cài đặt Entity Framework Core

Cài đặt các NuGet Package:

```bash
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools
Microsoft.EntityFrameworkCore.Design
```

Cài cho cả hai Project:

* CMS.Data
* CMS.Backend

---

### 2. Tạo ApplicationDbContext

File:

```csharp
CMS.Data/ApplicationDbContext.cs
```

```csharp
using Microsoft.EntityFrameworkCore;
using CMS.Data.Entities;

namespace CMS.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<CategoryProduct> CategoriesProducts { get; set; }
        public DbSet<Product> Products { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}
```

---

### 3. Cấu hình Connection String

File:

```json
appsettings.json
```

#### SQL Server Authentication

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=ThaiCMS_DB;User Id=sa;Password=123456;TrustServerCertificate=True;MultipleActiveResultSets=true"
  }
}
```

#### LocalDB

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ThaiCMS_DB;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
  }
}
```

---

### 4. Đăng ký DbContext

File:

```csharp
Program.cs
```

```csharp
using CMS.Data;
using Microsoft.EntityFrameworkCore;

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));
```

---

### 5. Tạo Database bằng Migration

Mở Package Manager Console:

```powershell
Add-Migration InitialCreate
```

Tiếp tục:

```powershell
Update-Database
```

Sau khi thành công sẽ xuất hiện Database:

```text
ThaiCMS_DB
```

Các bảng được tạo:

* Categories
* Posts
* Users
* CategoriesProducts
* Products
* Customers
* Orders
* OrderDetails

---

## Chức năng đã thực hiện

### Category

Lấy dữ liệu thật từ Database:

```csharp
public IActionResult Index()
{
    var data = _context.Categories.ToList();
    return View(data);
}
```

---

### Post

```csharp
public IActionResult Index()
{
    var posts = _context.Posts.ToList();
    return View(posts);
}
```

---

### User

```csharp
public IActionResult Index()
{
    var users = _context.Users.ToList();
    return View(users);
}
```

---

## Dữ liệu mẫu

### Categories

| Name               | Description                   |
| ------------------ | ----------------------------- |
| Tin tức Công nghệ  | Cập nhật AI, IoT và lập trình |
| Đời sống du lịch   | Kinh nghiệm du lịch           |
| Sức khỏe thể thao  | Chế độ tập luyện              |
| Giáo dục kỹ năng   | Kỹ năng mềm                   |
| Góc lập trình viên | ASP.NET Core & SQL Server     |

---

### Posts

* Lộ trình học ASP.NET
* Top 5 bãi biển đẹp
* Chạy bộ đúng cách
* AI và tương lai
* Kỹ năng Teamwork

---

### Users

| Username  | Role      |
| --------- | --------- |
| admin     | Admin     |
| thai_gv   | Editor    |
| sv_01     | User      |
| sv_02     | User      |
| moderator | Moderator |

---

## Kết quả đạt được

* Kết nối thành công ASP.NET Core với SQL Server.
* Sử dụng Entity Framework Core Code First.
* Tạo Database tự động bằng Migration.
* Hiển thị dữ liệu thật từ Database.
* Hiểu cách hoạt động của Dependency Injection và DbContext.
* Hoàn thành mô hình CMS 3 lớp:

```text
CMS.Data
CMS.Backend
CMS.Frontend
```

---

## Tác giả

Trần Thị Mỹ Như thực hiện đồ án CMS Full-Stack.

Buổi học 2: Kết nối Database với Entity Framework Core (EF Core) và quản trị dữ liệu thật.
