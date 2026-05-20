using CMS.Data; // Kết nối tới lớp dữ liệu
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // Lấy dữ liệu THẬT từ bảng OrderDetails trong SQL
            // Kèm thông tin Order và Product
            var data = _context.OrderDetails
                .Include(od => od.Order)
                .Include(od => od.Product)
                .ToList();
            return View(data);
        }
    }
}