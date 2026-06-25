using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ====================================================
        // ĐẶT HÀNG
        // POST: api/Orders
        // ====================================================
        [HttpPost]
        public IActionResult CreateOrder([FromBody] CreateOrderRequest request)
        {
            try
            {
                // Kiểm tra khách hàng
                var customer = _context.Customers
                    .FirstOrDefault(x => x.Id == request.CustomerId);

                if (customer == null)
                {
                    return BadRequest(new { message = "Khách hàng không tồn tại" });
                }

                // Tạo đơn hàng
                var order = new Order
                {
                    CustomerId = request.CustomerId,
                    OrderDate = DateTime.Now,
                    Status = 0,
                    Notes = request.Notes
                };

                _context.Orders.Add(order);
                _context.SaveChanges();

                // Thêm chi tiết đơn hàng
                foreach (var item in request.Items)
                {
                    var product = _context.Products
                        .FirstOrDefault(x => x.Id == item.ProductId);

                    if (product == null)
                    {
                        return BadRequest(new { message = $"Sản phẩm ID {item.ProductId} không tồn tại" });
                    }

                    if (product.StockQuantity < item.Quantity)
                    {
                        return BadRequest(new { message = $"Sản phẩm {product.Name} không đủ số lượng. Còn {product.StockQuantity}" });
                    }

                    var detail = new OrderDetail
                    {
                        OrderId = order.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = product.Price
                    };

                    _context.OrderDetails.Add(detail);

                    // Trừ kho
                    product.StockQuantity -= item.Quantity;
                }

                _context.SaveChanges();

                return Ok(new
                {
                    message = "Đặt hàng thành công",
                    orderId = order.Id
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // ====================================================
        // LẤY ĐƠN HÀNG THEO CUSTOMER
        // GET: api/Orders/customer/1
        // ====================================================
        [HttpGet("customer/{customerId}")]
        public IActionResult GetOrdersByCustomer(int customerId)
        {
            var orders = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(d => d.Product)
                .Where(o => o.CustomerId == customerId)
                .OrderByDescending(o => o.OrderDate)
                .ToList();

            return Ok(orders);
        }

        // ====================================================
        // LẤY CHI TIẾT ĐƠN HÀNG
        // GET: api/Orders/{id}
        // ====================================================
        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(d => d.Product)
                .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng" });
            }

            return Ok(order);
        }

        // ====================================================
        // LẤY TẤT CẢ ĐƠN HÀNG (ADMIN)
        // GET: api/Orders
        // ====================================================
        [HttpGet]
        public IActionResult GetAllOrders()
        {
            var orders = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                    .ThenInclude(d => d.Product)
                .OrderByDescending(o => o.OrderDate)
                .ToList();

            return Ok(orders);
        }

        // ====================================================
        // CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
        // PUT: api/Orders/{id}/status
        // ====================================================
        [HttpPut("{id}/status")]
        public IActionResult UpdateOrderStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng" });
            }

            order.Status = request.Status;
            _context.SaveChanges();

            return Ok(new
            {
                message = "Cập nhật trạng thái thành công",
                orderId = order.Id,
                status = order.Status
            });
        }

        // ====================================================
        // HỦY ĐƠN HÀNG
        // DELETE: api/Orders/{id}
        // ====================================================
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _context.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng" });
            }

            // Xóa chi tiết đơn hàng trước
            _context.OrderDetails.RemoveRange(order.OrderDetails);

            // Xóa đơn hàng
            _context.Orders.Remove(order);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Xóa đơn hàng thành công",
                orderId = id
            });
        }
    }

    // ====================================================
    // REQUEST CLASSES
    // ====================================================
    public class CreateOrderRequest
    {
        public int CustomerId { get; set; }
        public string? Notes { get; set; }
        public List<OrderItemRequest> Items { get; set; } = new List<OrderItemRequest>();
    }

    public class OrderItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class UpdateStatusRequest
    {
        public int Status { get; set; }
    }
}