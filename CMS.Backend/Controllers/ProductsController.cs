using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ========== 1. GET: api/Products - LẤY TOÀN BỘ SẢN PHẨM ==========
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl
                })
                .ToListAsync();

            return Ok(products);
        }

        // ========== 2. GET: api/Products/category/{categoryProductId} - LẤY SẢN PHẨM THEO DANH MỤC ==========
        [HttpGet("category/{categoryProductId}")]
        public async Task<IActionResult> GetByCategory(int categoryProductId)
        {
            // Kiểm tra danh mục có tồn tại không
            var category = await _context.CategoriesProducts.FindAsync(categoryProductId);
            if (category == null)
            {
                return NotFound(new { message = $"Không tìm thấy danh mục với Id = {categoryProductId}" });
            }

            var products = await _context.Products
                .Where(p => p.CategoryProductId == categoryProductId)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl
                })
                .ToListAsync();

            return Ok(products);
        }

        // ========== 3. GET: api/Products/{id} - LẤY CHI TIẾT SẢN PHẨM ==========
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.Products
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.Description,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound(new { message = $"Không tìm thấy sản phẩm với Id = {id}" });
            }

            return Ok(product);
        }
    }
}