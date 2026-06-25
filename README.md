# BUỔI 5: BẢO MẬT & PHÂN QUYỀN (SECURITY & IDENTITY)

## 🎯 MỤC TIÊU BÀI HỌC

Sau khi hoàn thành Buổi 5, sinh viên có thể:

* Hiểu Authentication (Xác thực người dùng).
* Hiểu Authorization (Phân quyền người dùng).
* Triển khai đăng nhập bằng Cookie Authentication.
* Xây dựng chức năng Login và Logout.
* Sử dụng Claims để lưu thông tin người dùng.
* Phân quyền theo Role (Admin, Editor).
* Bảo vệ các trang quản trị bằng `[Authorize]`.
* Hiển thị thông tin người dùng đang đăng nhập.
* Xử lý trang Access Denied.

---

# 1. KHÁI NIỆM LOGIN FLOW

Luồng hoạt động:

1. Người dùng nhập Username và Password.
2. Hệ thống kiểm tra dữ liệu trong bảng Users.
3. Nếu hợp lệ:

   * Tạo Claims.
   * Tạo Identity.
   * Lưu Cookie.
4. Cho phép truy cập khu vực quản trị.
5. Nếu không hợp lệ:

   * Hiển thị thông báo lỗi.

---

# 2. CẤU HÌNH COOKIE AUTHENTICATION

## Program.cs

Thêm namespace:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;
```

Cấu hình Authentication:

```csharp
builder.Services.AddAuthentication(
    CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
    });
```

Thêm Middleware:

```csharp
app.UseAuthentication();

app.UseAuthorization();
```

## Giải thích

### Authentication

```csharp
app.UseAuthentication();
```

Kiểm tra người dùng là ai.

### Authorization

```csharp
app.UseAuthorization();
```

Kiểm tra người dùng được phép làm gì.

---

# 3. TẠO ACCOUNTCONTROLLER

## AccountController.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using CMS.Data;

public class AccountController : Controller
{
    private readonly ApplicationDbContext _context;

    public AccountController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }
}
```

---

# 4. GIAO DIỆN ĐĂNG NHẬP

## Views/Account/Login.cshtml

```cshtml
@{
    Layout = null;
}

<!DOCTYPE html>
<html>
<head>
    <title>Đăng nhập hệ thống</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>

<body class="bg-light">

<div class="container mt-5">

    <div class="row justify-content-center">

        <div class="col-md-4">

            <div class="card shadow">

                <div class="card-header bg-primary text-white text-center">
                    <h5>HỆ THỐNG QUẢN TRỊ CMS</h5>
                </div>

                <div class="card-body">

                    <form asp-action="Login" method="post">

                        <div class="mb-3">
                            <label>Tên đăng nhập</label>
                            <input type="text"
                                   name="username"
                                   class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label>Mật khẩu</label>
                            <input type="password"
                                   name="password"
                                   class="form-control" />
                        </div>

                        @if(ViewBag.Error != null)
                        {
                            <div class="alert alert-danger">
                                @ViewBag.Error
                            </div>
                        }

                        <button class="btn btn-primary w-100">
                            ĐĂNG NHẬP
                        </button>

                    </form>

                </div>

            </div>

        </div>

    </div>

</div>

</body>
</html>
```

---

# 5. XỬ LÝ ĐĂNG NHẬP

## POST Login

```csharp
[HttpPost]
public async Task<IActionResult> Login(
    string username,
    string password)
{
    var user = _context.Users
        .FirstOrDefault(u =>
            u.Username == username &&
            u.PasswordHash == password);

    if (user != null)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("FullName", user.FullName)
        };

        var claimsIdentity =
            new ClaimsIdentity(
                claims,
                CookieAuthenticationDefaults.AuthenticationScheme);

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity));

        return RedirectToAction("Index", "Home");
    }

    ViewBag.Error = "Tên đăng nhập hoặc mật khẩu không đúng";

    return View();
}
```

---

# 6. CHỨC NĂNG ĐĂNG XUẤT

```csharp
public async Task<IActionResult> Logout()
{
    await HttpContext.SignOutAsync(
        CookieAuthenticationDefaults.AuthenticationScheme);

    return RedirectToAction("Login");
}
```

---

# 7. CLAIMS - IDENTITY - PRINCIPAL

## Claim

Thông tin người dùng:

```csharp
new Claim(ClaimTypes.Name, user.Username)
```

Ví dụ:

* Username
* FullName
* Role

---

## Identity

Chứa toàn bộ Claim.

```csharp
var claimsIdentity =
    new ClaimsIdentity(claims);
```

---

## Principal

Người sở hữu Identity.

```csharp
new ClaimsPrincipal(claimsIdentity)
```

---

# 8. BẢO VỆ TRANG QUẢN TRỊ

## Khóa toàn bộ Controller

```csharp
using Microsoft.AspNetCore.Authorization;

[Authorize]
public class PostController : Controller
{
}
```

## Kết quả

Nếu chưa đăng nhập:

```
/Post
```

↓

Tự động chuyển tới:

```
/Account/Login
```

---

# 9. PHÂN QUYỀN THEO ROLE

## Chỉ Admin được phép truy cập

```csharp
[Authorize(Roles = "Admin")]
public class UserController : Controller
{
}
```

## Ý nghĩa

| Role   | Quyền            |
| ------ | ---------------- |
| Admin  | Toàn quyền       |
| Editor | Quản lý bài viết |
| User   | Xem dữ liệu      |

---

# 10. HIỂN THỊ THÔNG TIN NGƯỜI DÙNG

## _LayoutAdmin.cshtml

```cshtml
<ul class="navbar-nav ms-auto">

@if(User.Identity.IsAuthenticated)
{
    <li class="nav-item">

        <span class="nav-link">

            Chào,

            <strong>
                @User.FindFirst("FullName")?.Value
            </strong>

            (
            @User.FindFirst(
                System.Security.Claims.ClaimTypes.Role)?.Value
            )

        </span>

    </li>

    <li class="nav-item">

        <a asp-controller="Account"
           asp-action="Logout"
           class="btn btn-outline-danger btn-sm">

            Đăng xuất

        </a>

    </li>
}

</ul>
```

---

# 11. ACCESS DENIED

## AccountController

```csharp
[HttpGet]
public IActionResult AccessDenied()
{
    return View();
}
```

---

## Views/Account/AccessDenied.cshtml

```cshtml
<div class="container mt-5 text-center">

    <h1 class="text-danger">
        403 - KHÔNG CÓ QUYỀN TRUY CẬP
    </h1>

    <p>
        Bạn không có đủ quyền hạn để xem trang này.
    </p>

    <a href="/" class="btn btn-primary">
        Quay lại trang chủ
    </a>

</div>
```

---

# 12. DỮ LIỆU MẪU

## Users

| Username | PasswordHash | FullName               | Role   |
| -------- | ------------ | ---------------------- | ------ |
| admin    | 123456       | Quản trị viên hệ thống | Admin  |
| thai_gv  | thai1969     | Nguyễn Cao Thái        | Editor |
| sv_01    | student1     | Nguyễn Văn A           | User   |

---

# 13. KIỂM CHỨNG HỆ THỐNG

## Trường hợp 1

Chưa đăng nhập:

```
/Category
```

Kết quả:

```
Chuyển về Login
```

---

## Trường hợp 2

Đăng nhập Editor

Có thể:

* Xem bài viết
* Quản lý bài viết

Không thể:

* Quản lý User

---

## Trường hợp 3

Đăng nhập Admin

Có thể:

* Quản lý Category
* Quản lý Post
* Quản lý User

---

# 14. LƯU Ý QUAN TRỌNG

Trong bài học này mật khẩu được lưu dưới dạng Plain Text:

```csharp
123456
```

Mục đích:

* Dễ học
* Dễ kiểm tra lỗi

Trong thực tế phải sử dụng Password Hashing như:

* BCrypt
* ASP.NET Identity PasswordHasher

để bảo vệ dữ liệu người dùng.

---

# ✅ KẾT QUẢ CẦN ĐẠT CUỐI BUỔI 5

* Đăng nhập thành công bằng Cookie Authentication.
* Đăng xuất thành công.
* Hiểu Claim, Identity, Principal.
* Sử dụng được `[Authorize]`.
* Phân quyền theo Role.
* Hiển thị thông tin người dùng.
* Xử lý Access Denied.
* Hoàn thiện nền tảng bảo mật cơ bản cho hệ thống ThaiCMS.

---

## Công nghệ sử dụng

* ASP.NET Core MVC
* Entity Framework Core
* Cookie Authentication
* Authorization
* Claims Identity
* SQL Server
* Bootstrap 5

## Project

* CMS.Data
* CMS.Backend
* ThaiCMS_DB
