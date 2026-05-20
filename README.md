MyNhuCMS_Solution/
├── CMS.Backend/          # Lớp API/Controller
├── CMS.Data/             # Lớp Data (DbContext, Entities)
├── cms.frontend/         # Lớp Frontend (React/HTML/CSS)
└── NhuCMS_Solutions.sln  # Solution file

Buổi 1: Tạo Base Project và Entity
1. Tạo Solution và Project
bash
# Tạo Solution mới
dotnet new sln -n MyNhuCMS_Solution

# Tạo CMS.Data (Class Library)
dotnet new classlib -n CMS.Data -f net8.0

# Tạo CMS.Backend (Web API)
dotnet new webapi -n CMS.Backend -f net8.0

# Thêm vào Solution
dotnet sln add CMS.Data/CMS.Data.csproj
dotnet sln add CMS.Backend/CMS.Backend.csproj

# Thêm reference
dotnet add CMS.Backend/CMS.Backend.csproj reference CMS.Data/CMS.Data.csproj

Buổi 2: EF Core & Migration
1. Cài đặt EF Core
bash
cd CMS.Data
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

cd ../CMS.Backend
dotnet add package Microsoft.EntityFrameworkCore.Design
