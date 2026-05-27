using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ========== 1. HIỂN THỊ DANH SÁCH (INDEX) ==========
        public IActionResult Index(int? id)
        {
            if (id == null)
            {
                var allPosts = _context.Posts
                    .OrderByDescending(p => p.CreatedDate)
                    .Include(p => p.Category)
                    .ToList();

                ViewBag.CategoryName = "TẤT CẢ BÀI VIẾT";
                return View(allPosts);
            }

            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                return NotFound("Không tìm thấy danh mục với Id = " + id);
            }

            var posts = _context.Posts
                .Where(p => p.CategoryId == id)
                .OrderByDescending(p => p.CreatedDate)
                .Include(p => p.Category)
                .ToList();

            ViewBag.CategoryName = category.Name;
            return View(posts);
        }

        // ========== 2. HIỂN THỊ CHI TIẾT (DETAILS) ==========
        public IActionResult Details(int id)
        {
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound("Không tìm thấy bài viết với Id = " + id);
            }

            return View(post);
        }

        // ========== 3. HIỂN THỊ FORM THÊM MỚI (CREATE - GET) ==========
        [HttpGet]
        public IActionResult Create()
        {
            // Lấy danh sách danh mục để hiển thị trong dropdown
            ViewBag.Categories = _context.Categories.ToList();
            return View();
        }

        // ========== 4. XỬ LÝ THÊM MỚI (CREATE - POST) ==========
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Post post)
        {
            if (ModelState.IsValid)
            {
                post.CreatedDate = DateTime.Now;
                _context.Posts.Add(post);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }

            ViewBag.Categories = _context.Categories.ToList();
            return View(post);
        }

        // ========== 5. HIỂN THỊ FORM SỬA (EDIT - GET) ==========
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            ViewBag.Categories = _context.Categories.ToList();
            return View(post);
        }

        // ========== 6. XỬ LÝ SỬA (EDIT - POST) ==========
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Post post)
        {
            if (id != post.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // Giữ nguyên ngày tạo cũ
                    var existingPost = _context.Posts.AsNoTracking().FirstOrDefault(p => p.Id == id);
                    post.CreatedDate = existingPost.CreatedDate;

                    _context.Update(post);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_context.Posts.Any(e => e.Id == id))
                    {
                        return NotFound();
                    }
                    throw;
                }
                return RedirectToAction(nameof(Index));
            }

            ViewBag.Categories = _context.Categories.ToList();
            return View(post);
        }

        // ========== 7. HIỂN THỊ FORM XÓA (DELETE - GET) ==========
        [HttpGet]
        public IActionResult Delete(int id)
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

        // ========== 8. XỬ LÝ XÓA (DELETE - POST) ==========
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            var post = _context.Posts.Find(id);
            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}