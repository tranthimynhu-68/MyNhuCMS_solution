Sinh viên: Trần Thị Mỹ Như
MSSV: 2123110054
Trường: Cao đẳng Công Thương
Môn học: ASP.NET Core
Dự án: CMS (Content Management System)


MyNhuCMS_Solution/
├── CMS.Backend/          # Lớp API/Controller
├── CMS.Data/             # Lớp Data (DbContext, Entities)
├── cms.frontend/         # Lớp Frontend (React/HTML/CSS)
└── NhuCMS_Solutions.sln  # Solution file

#Cấu trúc thư mục chi tiết
text
MyNhuCMS_Solution/
│
├── CMS.Backend/               # Lớp API (Web API)
│   ├── Controllers/           # Xử lý request/response
│   │   ├── CategoryController.cs
│   │   ├── PostController.cs
│   │   └── ProductController.cs
│   ├── Program.cs             # Entry point, cấu hình DI
│   ├── appsettings.json       # Cấu hình (Connection String)
│   └── appsettings.Development.json
│
├── CMS.Data/                  # Lớp Data Access
│   ├── Entities/              # Model/Entity classes
│   │   ├── Category.cs
│   │   ├── Post.cs
│   │   ├── Product.cs
│   │   └── Customer.cs
│   ├── ApplicationDbContext.cs # DbContext (kết nối DB)
│   └── Migrations/            # Tự động sinh (EF Core)
│
├── cms.frontend/              # Lớp Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── NhuCMS_Solutions.sln       # Solution file
