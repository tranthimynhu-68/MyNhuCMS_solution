using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ========== GET: api/CategoryProducts - LẤY TOÀN BỘ DANH MỤC SẢN PHẨM ==========
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _context.CategoriesProducts
                .Select(cp => new
                {
                    cp.Id,
                    cp.Name,
                    cp.Description
                })
                .ToListAsync();

            return Ok(categories);
        }

        // ========== GET: api/CategoryProducts/{id} - LẤY DANH MỤC THEO ID ==========
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _context.CategoriesProducts
                .Where(cp => cp.Id == id)
                .Select(cp => new
                {
                    cp.Id,
                    cp.Name,
                    cp.Description
                })
                .FirstOrDefaultAsync();

            if (category == null)
            {
                return NotFound(new { message = $"Không tìm thấy danh mục sản phẩm với Id = {id}" });
            }

            return Ok(category);
        }
    }
}