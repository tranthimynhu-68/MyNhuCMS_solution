using CMS.Data; // Kết nối tới lớp dữ liệu bạn vừa tạo
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    public class CategoryProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public CategoryProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // Lấy dữ liệu THẬT từ bảng CategoryProduct trong SQL
            var data = _context.CategoriesProducts.ToList();
            return View(data);
        }
    }
}