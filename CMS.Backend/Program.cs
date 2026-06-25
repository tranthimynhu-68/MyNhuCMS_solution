using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.OpenApi.Models;
using CMS.Data;

var builder = WebApplication.CreateBuilder(args);

// ==============================================================
// 1. ĐĂNG KÝ DỊCH VỤ
// ==============================================================

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Authentication - Cookie cho MVC
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        options.SlidingExpiration = true;
        options.Cookie.SameSite = SameSiteMode.Lax;  // Quan trọng
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CMS Web API",
        Version = "v1",
        Description = "API cho hệ thống CMS"
    });
});

// ==============================================================
// CORS - QUAN TRỌNG
// ==============================================================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Cho phép gửi cookie
    });
});

var app = builder.Build();

// ==============================================================
// 2. MIDDLEWARE - THỨ TỰ RẤT QUAN TRỌNG
// ==============================================================

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// ==============================================================
// CORS PHẢI ĐẶT Ở ĐÂY (SAU UseRouting, TRƯỚC Auth)
// ==============================================================
app.UseCors("AllowReactApp");

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "CMS Web API v1");
    c.RoutePrefix = "swagger";
});

app.UseAuthentication();  // ← SAU CORS
app.UseAuthorization();   // ← SAU Authentication

// ==============================================================
// 3. ĐỊNH TUYẾN
// ==============================================================

app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();