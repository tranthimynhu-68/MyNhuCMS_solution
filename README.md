# BUỔI 3: TRUY VẤN LINQ & THAO TÁC DỮ LIỆU CHUYÊN SÂU VỚI ASP.NET CORE MVC

## Giới thiệu

Buổi học này tập trung vào việc sử dụng **LINQ (Language Integrated Query)** để truy vấn dữ liệu từ SQL Server thông qua Entity Framework Core và xây dựng đầy đủ chức năng **CRUD (Create - Read - Update - Delete)** cho thực thể Category.

Sau khi hoàn thành, sinh viên có thể:

* Sử dụng LINQ để lọc, sắp xếp và truy xuất dữ liệu.
* Thực hiện Join bảng bằng kỹ thuật Eager Loading với `.Include()`.
* Xây dựng chức năng xem chi tiết dữ liệu.
* Thêm mới dữ liệu vào Database.
* Chỉnh sửa dữ liệu đã tồn tại.
* Xóa dữ liệu khỏi hệ thống.
* Hiểu quy trình làm việc giữa Controller, View và Database.

---

# Nội dung thực hành

## 1. Truy vấn dữ liệu với LINQ

### Lọc dữ liệu bằng Where()

Ví dụ lấy danh sách bài viết theo CategoryId:

```csharp
public IActionResult Index(int? id)
{
    if (id == null)
    {
        return BadRequest("Vui lòng cung cấp mã danh mục.");
    }

    var posts = _context.Posts
        .Where(p => p.CategoryId == id)
        .OrderByDescending(p => p.CreatedDate)
        .Include(p => p.Category)
        .ToList();

    return View(posts);
}
```

### Ý nghĩa

* `Where()` : Lọc dữ liệu.
* `OrderByDescending()` : Sắp xếp giảm dần.
* `Include()` : Join dữ liệu liên quan.
* `ToList()` : Thực thi truy vấn.

---

## 2. Join bảng với Include()

Hiển thị bài viết kèm tên danh mục:

```csharp
var posts = _context.Posts
    .Include(p => p.Category)
    .ToList();
```

Hiển thị trong View:

```html
<span class="badge bg-info text-dark">
    @item.Category.Name
</span>
```

---

## 3. Xem chi tiết bài viết

### PostController.cs

```csharp
public IActionResult Details(int id)
{
    var post = _context.Posts
        .Include(p => p.Category)
        .FirstOrDefault(p => p.Id == id);

    if (post == null)
    {
        return NotFound();
    }

    return View(post);
}
```

### LINQ sử dụng

```csharp
.FirstOrDefault()
```

Tìm phần tử đầu tiên thỏa điều kiện.

---

# 4. CRUD với Category

## CREATE - Thêm mới danh mục

### GET

```csharp
[HttpGet]
public IActionResult Create()
{
    return View();
}
```

### POST

```csharp
[HttpPost]
public IActionResult Create(Category model)
{
    _context.Categories.Add(model);
    _context.SaveChanges();

    return RedirectToAction("Index");
}
```

### Giao diện Create.cshtml

```html
<form asp-action="Create" method="post">
    <input asp-for="Name" class="form-control" />
    <textarea asp-for="Description"
              class="form-control"></textarea>

    <button type="submit"
            class="btn btn-success">
        Lưu
    </button>
</form>
```

---

## DELETE - Xóa danh mục

### Controller

```csharp
public IActionResult Delete(int id)
{
    var category = _context.Categories.Find(id);

    if (category != null)
    {
        _context.Categories.Remove(category);
        _context.SaveChanges();
    }

    return RedirectToAction("Index");
}
```

### View

```html
<a asp-action="Delete"
   asp-route-id="@item.Id"
   class="btn btn-danger"
   onclick="return confirm('Bạn có chắc muốn xóa?')">
    Xóa
</a>
```

---

## UPDATE - Chỉnh sửa danh mục

### GET

```csharp
[HttpGet]
public IActionResult Edit(int id)
{
    var category = _context.Categories.Find(id);

    if (category == null)
        return NotFound();

    return View(category);
}
```

### POST

```csharp
[HttpPost]
public IActionResult Edit(Category model)
{
    _context.Categories.Update(model);
    _context.SaveChanges();

    return RedirectToAction("Index");
}
```

### Edit.cshtml

```html
<form asp-action="Edit" method="post">

    <input type="hidden" asp-for="Id" />

    <input asp-for="Name"
           class="form-control" />

    <textarea asp-for="Description"
              class="form-control"></textarea>

    <button type="submit"
            class="btn btn-warning">
        Cập nhật
    </button>

</form>
```

---

# 5. Hiển thị 3 bài viết mới nhất trên Trang chủ

## HomeController.cs

```csharp
public IActionResult Index()
{
    var latestPosts = _context.Posts
        .Include(p => p.Category)
        .OrderByDescending(p => p.CreatedDate)
        .Take(3)
        .ToList();

    return View(latestPosts);
}
```

### LINQ sử dụng

```csharp
.OrderByDescending()
.Take(3)
```

Ý nghĩa:

* Sắp xếp bài viết mới nhất lên đầu.
* Chỉ lấy đúng 3 bài viết đầu tiên.

---

## Home/Index.cshtml

```html
@model IEnumerable<CMS.Data.Entities.Post>

@foreach(var item in Model)
{
    <div class="card">
        <div class="card-body">

            <span class="badge bg-primary">
                @item.Category.Name
            </span>

            <h5>@item.Title</h5>

            <p>@item.Content</p>

            <a href="/Post/Details/@item.Id">
                Đọc tiếp
            </a>

        </div>
    </div>
}
```

---

# Kiến thức đạt được

Sau buổi học này sinh viên có thể:

✅ Truy vấn dữ liệu bằng LINQ

✅ Lọc dữ liệu với Where()

✅ Sắp xếp dữ liệu với OrderBy()

✅ Lấy phần tử bằng FirstOrDefault()

✅ Join bảng bằng Include()

✅ Thêm dữ liệu với Add()

✅ Cập nhật dữ liệu với Update()

✅ Xóa dữ liệu với Remove()

✅ Ghi dữ liệu xuống SQL Server bằng SaveChanges()

✅ Hiển thị dữ liệu từ Database lên giao diện ASP.NET Core MVC

---

# Công nghệ sử dụng

* ASP.NET Core MVC
* C#
* Entity Framework Core
* LINQ
* SQL Server
* Razor View Engine
* Bootstrap 5

---

# Kết quả đạt được

* Kết nối thành công SQL Server với ASP.NET Core MVC.
* Thực hiện đầy đủ CRUD cho Category.
* Hiển thị dữ liệu Post và Category từ Database.
* Truy vấn dữ liệu bằng LINQ.
* Xây dựng trang chủ hiển thị 3 bài viết mới nhất.
* Hiểu quy trình làm việc giữa Database → Entity Framework Core → Controller → View.
