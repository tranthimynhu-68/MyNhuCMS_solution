using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Trang chủ - Hiển thị 3 bài viết mới nhất
        public IActionResult Index()
        {
            var latestPosts = _context.Posts
                .Include(p => p.Category)
                .OrderByDescending(p => p.CreatedDate)
                .Take(3)
                .ToList();

            return View(latestPosts);
        }

        // Dashboard - Trang tổng quan Admin
        public IActionResult Dashboard()
        {
            // Thống kê số lượng
            var stats = new
            {
                TotalPosts = _context.Posts.Count(),
                TotalCategories = _context.Categories.Count(),
                TotalProducts = _context.Products.Count(),
                TotalCustomers = _context.Customers.Count(),
                TotalOrders = _context.Orders.Count()
            };

            ViewBag.TotalPosts = stats.TotalPosts;
            ViewBag.TotalCategories = stats.TotalCategories;
            ViewBag.TotalProducts = stats.TotalProducts;
            ViewBag.TotalCustomers = stats.TotalCustomers;
            ViewBag.TotalOrders = stats.TotalOrders;

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}