using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Tiêm DbContext vào Controller
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ========== 1. DANH SÁCH NGƯỜI DÙNG (LẤY DỮ LIỆU THẬT) ==========
        public IActionResult Index()
        {
            // Lấy dữ liệu THẬT từ bảng Users
            var users = _context.Users.ToList();
            return View(users);
        }

        // ========== 2. THÊM MỚI - GET ==========
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // ========== 3. THÊM MỚI - POST ==========
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(User model)
        {
            // Kiểm tra tên đăng nhập đã tồn tại chưa
            var checkExist = _context.Users.Any(u => u.Username == model.Username);
            if (checkExist)
            {
                ModelState.AddModelError("Username", "Tên đăng nhập này đã có người dùng!");
                return View(model);
            }

            if (ModelState.IsValid)
            {
                _context.Users.Add(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(model);
        }

        // ========== 4. SỬA - GET ==========
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            return View(user);
        }

        // ========== 5. SỬA - POST ==========
        // ========== 5. SỬA - POST ==========
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, User model, string? NewPassword)
        {
            if (id != model.Id)
            {
                return NotFound();
            }

            // Lấy user hiện tại trong database
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            // Kiểm tra username trùng
            var checkExist = _context.Users
                .Any(u => u.Username == model.Username && u.Id != id);

            if (checkExist)
            {
                ModelState.AddModelError("Username", "Tên đăng nhập này đã có người dùng!");
            }

            // Bỏ validate PasswordHash
            ModelState.Remove("PasswordHash");

            if (ModelState.IsValid)
            {
                // Cập nhật dữ liệu
                user.FullName = model.FullName;

                user.Role = model.Role;

                // Username readonly nhưng vẫn giữ lại
                user.Username = model.Username;

                // Nếu nhập mật khẩu mới thì đổi
                if (!string.IsNullOrWhiteSpace(NewPassword))
                {
                    user.PasswordHash = NewPassword;
                }

                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            return View(model);
        }

        // ========== 6. XÓA - GET ==========
        [HttpPost, ActionName("Delete")]
[ValidateAntiForgeryToken]
public IActionResult DeleteConfirmed(int id)
{
    var user = _context.Users.Find(id);
    if (user != null)
    {
        _context.Users.Remove(user);
        _context.SaveChanges();
    }
    return RedirectToAction("Index");
}

// Nếu muốn xóa bằng GET (khuyến nghị dùng POST cho an toàn)
[HttpGet]
public IActionResult Delete(int id)
{
    var user = _context.Users.Find(id);
    if (user != null)
    {
        _context.Users.Remove(user);
        _context.SaveChanges();
    }
    return RedirectToAction("Index");
}
    }
}