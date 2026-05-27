using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Tiêm DbContext vào Controller
        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // LINQ: Lấy 3 bài viết mới nhất
            var latestPosts = _context.Posts
                .Include(p => p.Category)          // Lấy kèm tên danh mục
                .OrderByDescending(p => p.CreatedDate) // Sắp xếp mới nhất lên đầu
                .Take(3)                            // Chỉ lấy 3 bản tin đầu tiên
                .ToList();

            return View(latestPosts);
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}