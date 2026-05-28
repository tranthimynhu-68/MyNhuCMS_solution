using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ========== 1. GET: api/posts - LẤY TOÀN BỘ BÀI VIẾT ==========
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // Lấy toàn bộ dữ liệu từ bảng Posts trong SQL Server
            var posts = await _context.Posts
                .OrderByDescending(p => p.Id) // Sắp xếp bài viết mới nhất lên đầu
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.ImageUrl,
                    p.CreatedDate,
                    CategoryName = p.Category != null ? p.Category.Name : "Chưa phân loại"
                })
                .ToListAsync();

            // Trả về kết quả với mã HTTP 200 OK
            return Ok(posts);
        }

        // ========== 2. GET: api/posts/category/{categoryId} - LẤY BÀI VIẾT THEO DANH MỤC ==========
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetByCategory(int categoryId)
        {
            // Kiểm tra danh mục có tồn tại không
            var category = await _context.Categories.FindAsync(categoryId);
            if (category == null)
            {
                return NotFound(new { message = $"Không tìm thấy danh mục với Id = {categoryId}" });
            }

            // Lọc bài viết theo CategoryId
            var posts = await _context.Posts
                .Where(p => p.CategoryId == categoryId)
                .OrderByDescending(p => p.CreatedDate)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.ImageUrl,
                    p.CreatedDate,
                    CategoryName = category.Name
                })
                .ToListAsync();

            return Ok(posts);
        }

        // ========== 3. GET: api/posts/{id} - LẤY CHI TIẾT BÀI VIẾT ==========
        // ========== 3. GET: api/posts/{id} - LẤY CHI TIẾT BÀI VIẾT ==========
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            // Tìm bài viết theo Id
            var post = await _context.Posts
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            // Xử lý khi không tìm thấy bài viết
            if (post == null)
            {
                return NotFound(new { message = $"Không tìm thấy bài viết với Id = {id}" });
            }

            // Tạo DTO để tránh vòng lặp
            var result = new
            {
                post.Id,
                post.Title,
                post.Content,
                post.ImageUrl,
                post.CreatedDate,
                post.CategoryId,
                Category = post.Category == null ? null : new
                {
                    post.Category.Id,
                    post.Category.Name,
                    post.Category.Description
                }
            };

            // Trả về toàn bộ thông tin bài viết (bao gồm Content)
            return Ok(result);
        }

        // ========== 4. POST: api/posts - THÊM BÀI VIẾT MỚI ==========
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] Post post)
        {
            // Kiểm tra dữ liệu đầu vào
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kiểm tra CategoryId có tồn tại không
            var category = await _context.Categories.FindAsync(post.CategoryId);
            if (category == null)
            {
                return BadRequest(new { message = $"Danh mục với Id = {post.CategoryId} không tồn tại" });
            }

            post.CreatedDate = DateTime.Now;
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            // Trả về mã 201 Created kèm đường dẫn đến bài viết mới
            return CreatedAtAction(nameof(GetDetail), new { id = post.Id }, post);
        }

        // ========== 5. PUT: api/posts/{id} - CẬP NHẬT BÀI VIẾT ==========
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] Post post)
        {
            if (id != post.Id)
            {
                return BadRequest(new { message = "ID trên URL không khớp với ID trong dữ liệu" });
            }

            // Kiểm tra bài viết có tồn tại không
            var existingPost = await _context.Posts.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
            if (existingPost == null)
            {
                return NotFound(new { message = $"Không tìm thấy bài viết với Id = {id}" });
            }

            // Giữ nguyên ngày tạo cũ
            post.CreatedDate = existingPost.CreatedDate;

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Posts.AnyAsync(e => e.Id == id))
                {
                    return NotFound();
                }
                throw;
            }

            return Ok(new { message = "Cập nhật bài viết thành công", data = post });
        }

        // ========== 6. DELETE: api/posts/{id} - XÓA BÀI VIẾT ==========
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound(new { message = $"Không tìm thấy bài viết với Id = {id}" });
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa bài viết thành công" });
        }

        // ========== 7. GET: api/posts/top/{count} - LẤY TOP N BÀI VIẾT MỚI NHẤT ==========
        [HttpGet("top/{count}")]
        public async Task<IActionResult> GetTopPosts(int count)
        {
            var posts = await _context.Posts
                .OrderByDescending(p => p.CreatedDate)
                .Take(count)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.ImageUrl,
                    p.CreatedDate,
                    CategoryName = p.Category != null ? p.Category.Name : "Chưa phân loại"
                })
                .ToListAsync();

            return Ok(posts);
        }
    }
}