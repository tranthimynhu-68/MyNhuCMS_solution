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

        // ====================================================
        // TRANG CHỦ - HIỂN THỊ 3 BÀI VIẾT MỚI NHẤT
        // GET: /Home/Index
        // ====================================================
        public IActionResult Index()
        {
            // ✅ Lấy 3 bài viết mới nhất
            var latestPosts = _context.Posts
                .Include(p => p.Category)
                .OrderByDescending(p => p.CreatedDate)
                .Take(3)
                .ToList();

            return View(latestPosts);
        }

        // ====================================================
        // DASHBOARD - TRANG TỔNG QUAN ADMIN
        // GET: /Home/Dashboard
        // ====================================================
        public IActionResult Dashboard()
        {
            // Thống kê số lượng
            var totalPosts = _context.Posts.Count();
            var totalCategories = _context.Categories.Count();
            var totalProducts = _context.Products.Count();
            var totalCustomers = _context.Customers.Count();
            var totalOrders = _context.Orders.Count();

            // Gửi dữ liệu qua ViewBag
            ViewBag.TotalPosts = totalPosts;
            ViewBag.TotalCategories = totalCategories;
            ViewBag.TotalProducts = totalProducts;
            ViewBag.TotalCustomers = totalCustomers;
            ViewBag.TotalOrders = totalOrders;

            // Lấy 5 đơn hàng gần đây
            var recentOrders = _context.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.OrderDate)
                .Take(5)
                .ToList();

            ViewBag.RecentOrders = recentOrders;

            return View();
        }

        // ====================================================
        // TRANG PRIVACY
        // GET: /Home/Privacy
        // ====================================================
        public IActionResult Privacy()
        {
            return View();
        }

        // ====================================================
        // TRANG LỖI 404
        // GET: /Home/Error
        // ====================================================
        public IActionResult Error()
        {
            return View();
        }
    }
}