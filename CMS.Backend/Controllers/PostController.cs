using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
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

        // ========== 1. DANH SÁCH BÀI VIẾT ==========
        public IActionResult Index(int? id)
        {
            if (id == null)
            {
                var allPosts = _context.Posts
                    .Include(p => p.Category)
                    .OrderByDescending(p => p.CreatedDate)
                    .ToList();

                ViewBag.CategoryName = "TẤT CẢ BÀI VIẾT";

                return View(allPosts);
            }

            var category = _context.Categories
                .FirstOrDefault(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            var posts = _context.Posts
                .Where(p => p.CategoryId == id)
                .Include(p => p.Category)
                .OrderByDescending(p => p.CreatedDate)
                .ToList();

            ViewBag.CategoryName = category.Name;

            return View(posts);
        }

        // ========== 2. CHI TIẾT ==========
        public IActionResult Details(int id)
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

        // ========== 3. CREATE - GET ==========
        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.Categories = _context.Categories.ToList();

            return View();
        }

        // ========== 4. CREATE - POST ==========
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Post post)
        {
            // Bỏ validation navigation property
            ModelState.Remove("Category");

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

        // ========== 5. EDIT - GET ==========
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

        // ========== 6. EDIT - POST ==========
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Post post)
        {
            if (id != post.Id)
            {
                return NotFound();
            }

            // Bỏ validation navigation property
            ModelState.Remove("Category");

            if (ModelState.IsValid)
            {
                try
                {
                    var existingPost = _context.Posts
                        .AsNoTracking()
                        .FirstOrDefault(p => p.Id == id);

                    if (existingPost == null)
                    {
                        return NotFound();
                    }

                    // Giữ ngày tạo cũ
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

        // ========== 7. DELETE - GET ==========
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

        // ========== 8. DELETE - POST ==========
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