using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ======================================
        // ĐĂNG KÝ KHÁCH HÀNG
        // POST: api/Auth/CustomerRegister
        // ======================================
        [HttpPost("CustomerRegister")]
        public IActionResult CustomerRegister([FromBody] Customer model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var checkEmail = _context.Customers
                .Any(x => x.Email == model.Email);

            if (checkEmail)
            {
                return BadRequest(new
                {
                    message = "Email đã tồn tại!"
                });
            }

            _context.Customers.Add(model);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Đăng ký thành công",
                customerId = model.Id
            });
        }

        // ======================================
        // ĐĂNG NHẬP KHÁCH HÀNG
        // POST: api/Auth/CustomerLogin
        // ======================================
        [HttpPost("CustomerLogin")]
        public IActionResult CustomerLogin([FromBody] LoginRequest request)
        {
            var customer = _context.Customers.FirstOrDefault(x =>
                x.Email == request.Email &&
                x.Password == request.Password);

            if (customer == null)
            {
                return Unauthorized(new
                {
                    message = "Email hoặc mật khẩu không đúng"
                });
            }

            return Ok(new
            {
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                phone = customer.Phone,
                address = customer.Address
            });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}