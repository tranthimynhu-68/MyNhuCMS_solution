// pages/checkout/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import orderService from '../../services/orderService';

const Checkout = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        notes: ''
    });

    useEffect(() => {
        const customerData = JSON.parse(localStorage.getItem('customer') || 'null');
        if (!customerData) {
            alert('Vui lòng đăng nhập để đặt hàng!');
            navigate('/login');
            return;
        }
        setCustomer(customerData);

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            alert('Giỏ hàng trống!');
            navigate('/shop');
            return;
        }
        setCartItems(cart);
    }, [navigate]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // ✅ Tạo dữ liệu đúng format API
            const orderData = {
                customerId: customer.id,
                notes: formData.notes || '',
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };

            console.log('📝 Dữ liệu đặt hàng:', JSON.stringify(orderData, null, 2));

            // ✅ Gọi API đặt hàng
            const response = await orderService.createOrder(orderData);
            console.log('✅ Đặt hàng thành công:', response);

            // ✅ Xóa giỏ hàng
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdated'));

            setSuccess(true);

            setTimeout(() => {
                navigate('/orders');
            }, 2000);

        } catch (error) {
            console.error('❌ Lỗi đặt hàng:', error);

            // Xử lý lỗi từ server
            if (error.response?.status === 400) {
                const errorData = error.response?.data;
                if (errorData?.message) {
                    setError(errorData.message);
                } else if (typeof errorData === 'string') {
                    setError(errorData);
                } else {
                    setError('Dữ liệu không hợp lệ! Vui lòng kiểm tra lại.');
                }
            } else {
                setError(error.response?.data?.message || 'Đặt hàng thất bại. Vui lòng thử lại!');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!customer || cartItems.length === 0) {
        return null;
    }

    return (
        <div className="container py-4">
            <nav className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                    <li className="breadcrumb-item"><Link to="/cart">Giỏ hàng</Link></li>
                    <li className="breadcrumb-item active">Thanh toán</li>
                </ol>
            </nav>

            <h3 className="fw-bold mb-4">📋 Thanh toán đơn hàng</h3>

            {success && (
                <div className="alert alert-success">
                    <i className="fa-solid fa-circle-check me-2"></i>
                    Đặt hàng thành công! Đang chuyển đến trang lịch sử đơn hàng...
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                    {error}
                </div>
            )}

            <div className="row">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3">Thông tin giao hàng</h5>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Họ tên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={customer.fullName || ''}
                                    disabled
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={customer.email || ''}
                                    disabled
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Số điện thoại</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    value={customer.phone || ''}
                                    disabled
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Địa chỉ giao hàng</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={customer.address || ''}
                                    disabled
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Ghi chú đơn hàng</label>
                                <textarea
                                    name="notes"
                                    className="form-control"
                                    rows="3"
                                    placeholder="Ghi chú cho đơn hàng (nếu có)..."
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    disabled={loading || success}
                                />
                            </div>

                            <button
                                type="button"
                                className="btn btn-dark w-100 py-2 fw-bold"
                                onClick={handleSubmit}
                                disabled={loading || success}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-check-circle me-2"></i>
                                        Xác nhận đặt hàng
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3">🛒 Đơn hàng của bạn</h5>

                            <div className="mb-3">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="d-flex justify-content-between py-2 border-bottom">
                                        <div>
                                            <span className="fw-bold">{item.name}</span>
                                            <br />
                                            <small className="text-muted">x{item.quantity}</small>
                                        </div>
                                        <span className="fw-bold">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-top pt-2">
                                <div className="d-flex justify-content-between">
                                    <span>Tạm tính ({getTotalItems()} sản phẩm):</span>
                                    <span className="fw-bold">{formatPrice(getTotal())}</span>
                                </div>
                                <div className="d-flex justify-content-between mt-3 pt-2 border-top">
                                    <span className="fw-bold fs-5">Tổng cộng:</span>
                                    <span className="fw-bold fs-5 text-danger">
                                        {formatPrice(getTotal())}
                                    </span>
                                </div>
                            </div>

                            <Link to="/cart" className="btn btn-outline-secondary w-100 mt-3">
                                <i className="fa-solid fa-arrow-left me-2"></i>
                                Quay lại giỏ hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;