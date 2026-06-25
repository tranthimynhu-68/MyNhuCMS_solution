using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ProductController(
            ApplicationDbContext context,
            IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // ================= DANH SÁCH =================
        public IActionResult Index()
        {
            var data = _context.Products
                .Include(x => x.CategoryProduct)
                .ToList();

            return View(data);
        }

        // ================= CREATE GET =================
        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.Categories = _context.CategoriesProducts.ToList();
            return View();
        }

        // ================= CREATE POST =================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Product product, IFormFile? ImageFile)
        {
            ModelState.Remove("CategoryProduct");

            if (ModelState.IsValid)
            {
                // Upload ảnh
                if (ImageFile != null && ImageFile.Length > 0)
                {
                    string uploadsFolder = Path.Combine(
                        _environment.WebRootPath,
                        "uploads");

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string fileName =
                        Guid.NewGuid().ToString() +
                        Path.GetExtension(ImageFile.FileName);

                    string filePath =
                        Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        ImageFile.CopyTo(stream);
                    }

                    product.ImageUrl = fileName;
                }

                _context.Products.Add(product);
                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            ViewBag.Categories = _context.CategoriesProducts.ToList();
            return View(product);
        }

        // ================= EDIT GET =================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
                return NotFound();

            ViewBag.Categories = _context.CategoriesProducts.ToList();

            return View(product);
        }

        // ================= EDIT POST =================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(
            int id,
            Product model,
            IFormFile? ImageFile)
        {
            if (id != model.Id)
                return NotFound();

            ModelState.Remove("CategoryProduct");

            if (ModelState.IsValid)
            {
                var product = _context.Products.Find(id);

                if (product == null)
                    return NotFound();

                product.Name = model.Name;
                product.Description = model.Description;
                product.Price = model.Price;
                product.StockQuantity = model.StockQuantity;
                product.CategoryProductId = model.CategoryProductId;

                // Upload ảnh mới
                if (ImageFile != null && ImageFile.Length > 0)
                {
                    string uploadsFolder = Path.Combine(
                        _environment.WebRootPath,
                        "uploads");

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string fileName =
                        Guid.NewGuid().ToString() +
                        Path.GetExtension(ImageFile.FileName);

                    string filePath =
                        Path.Combine(uploadsFolder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        ImageFile.CopyTo(stream);
                    }

                    product.ImageUrl = fileName;
                }

                _context.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            ViewBag.Categories = _context.CategoriesProducts.ToList();
            return View(model);
        }

        // ================= DELETE =================
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);

            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }

            return RedirectToAction(nameof(Index));
        }
    }
}