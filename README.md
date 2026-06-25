# BUỔI 4: XÂY DỰNG HỆ THỐNG QUẢN LÝ BÀI VIẾT (POST CRUD)

## 🎯 Mục tiêu bài học

Sau khi hoàn thành buổi học này, sinh viên có thể:

- Xây dựng CRUD hoàn chỉnh cho Post.
- Hiểu cách sử dụng Include() để Join bảng.
- Thực hiện Create, Edit, Delete dữ liệu thật bằng EF Core.
- Làm việc với DropdownList để chọn Category.
- Áp dụng LINQ vào thực tế.

---

## 1. Hiển thị danh sách bài viết

### PostController.cs

```csharp
public IActionResult Index()
{
    var posts = _context.Posts
                .Include(p => p.Category)
                .OrderByDescending(p => p.CreatedDate)
                .ToList();

    return View(posts);
}
```

### Giải thích

- Include(): Join bảng Category.
- OrderByDescending(): Sắp xếp mới nhất lên đầu.
- ToList(): Thực thi truy vấn.

---

## 2. Hiển thị danh sách bài viết

### Views/Post/Index.cshtml

```cshtml
@model IEnumerable<CMS.Data.Entities.Post>

<div class="container mt-4">

    <div class="d-flex justify-content-between mb-3">
        <h2>QUẢN LÝ BÀI VIẾT</h2>

        <a asp-action="Create"
           class="btn btn-success">
            Thêm bài viết mới
        </a>
    </div>

    <table class="table table-bordered">

        <thead>
            <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Danh mục</th>
                <th>Ngày đăng</th>
                <th>Thao tác</th>
            </tr>
        </thead>

        <tbody>

            @foreach(var item in Model)
            {
                <tr>
                    <td>@item.Id</td>
                    <td>@item.Title</td>
                    <td>@item.Category.Name</td>
                    <td>@item.CreatedDate.ToString("dd/MM/yyyy")</td>

                    <td>
                        <a asp-action="Details"
                           asp-route-id="@item.Id"
                           class="btn btn-info btn-sm">
                            Xem
                        </a>

                        <a asp-action="Edit"
                           asp-route-id="@item.Id"
                           class="btn btn-warning btn-sm">
                            Sửa
                        </a>

                        <a asp-action="Delete"
                           asp-route-id="@item.Id"
                           class="btn btn-danger btn-sm"
                           onclick="return confirm('Bạn chắc chắn muốn xóa?')">
                            Xóa
                        </a>
                    </td>
                </tr>
            }

        </tbody>

    </table>

</div>
```

---

## 3. Chi tiết bài viết

### Controller

```csharp
public IActionResult Details(int id)
{
    var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

    if(post == null)
    {
        return NotFound();
    }

    return View(post);
}
```

### View

```cshtml
@model CMS.Data.Entities.Post

<div class="container mt-5">

    <h2>@Model.Title</h2>

    <span class="badge bg-primary">
        @Model.Category.Name
    </span>

    <p>@Model.Content</p>

</div>
```

---

## 4. Thêm bài viết mới

### GET Create

```csharp
[HttpGet]
public IActionResult Create()
{
    ViewBag.Categories = _context.Categories.ToList();
    return View();
}
```

### POST Create

```csharp
[HttpPost]
public IActionResult Create(Post model)
{
    _context.Posts.Add(model);

    _context.SaveChanges();

    return RedirectToAction("Index");
}
```

### Giải thích

```csharp
_context.Posts.Add(model);
```

Thêm vào bộ nhớ tạm.

```csharp
_context.SaveChanges();
```

Ghi xuống SQL Server.

---

## 5. Giao diện Create.cshtml

```cshtml
@model CMS.Data.Entities.Post

<form asp-action="Create" method="post">

    <input asp-for="Title" class="form-control" />

    <textarea asp-for="Content"
              class="form-control">
    </textarea>

    <input asp-for="ImageUrl"
           class="form-control" />

    <select asp-for="CategoryId"
            class="form-control">

        @foreach(var item in ViewBag.Categories)
        {
            <option value="@item.Id">
                @item.Name
            </option>
        }

    </select>

    <button type="submit"
            class="btn btn-success">
        Lưu
    </button>

</form>
```

---

## 6. Chỉnh sửa bài viết

### GET Edit

```csharp
[HttpGet]
public IActionResult Edit(int id)
{
    var post = _context.Posts.Find(id);

    ViewBag.Categories = _context.Categories.ToList();

    return View(post);
}
```

### POST Edit

```csharp
[HttpPost]
public IActionResult Edit(Post model)
{
    _context.Posts.Update(model);

    _context.SaveChanges();

    return RedirectToAction("Index");
}
```

---

## 7. Xóa bài viết

```csharp
public IActionResult Delete(int id)
{
    var post = _context.Posts.Find(id);

    if(post != null)
    {
        _context.Posts.Remove(post);

        _context.SaveChanges();
    }

    return RedirectToAction("Index");
}
```

---

## 8. LINQ sử dụng trong bài

### Lọc dữ liệu

```csharp
.Where(p => p.CategoryId == id)
```

### Tìm một bản ghi

```csharp
.FirstOrDefault(p => p.Id == id)
```

### Sắp xếp

```csharp
.OrderByDescending(p => p.CreatedDate)
```

### Lấy 5 bài viết mới nhất

```csharp
.Take(5)
```

### Join bảng

```csharp
.Include(p => p.Category)
```

---

## ✅ Kết quả cần đạt

- Hiển thị danh sách bài viết.
- Hiển thị tên danh mục.
- Thêm bài viết mới.
- Chỉnh sửa bài viết.
- Xóa bài viết.
- Hiểu Include().
- Hiểu CRUD với EF Core.
- Thành thạo LINQ cơ bản.

---

### Công nghệ sử dụng

- ASP.NET Core MVC
- Entity Framework Core
- SQL Server
- LINQ
- Bootstrap 5
- Visual Studio 2022

### Project

- CMS.Data
- CMS.Backend
- ThaiCMS_DB
