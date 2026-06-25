import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;

        const updated = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        localStorage.setItem('cart', JSON.stringify(updated));
        setCartItems(updated);
    };

    const removeItem = (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

        const updated = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updated));
        setCartItems(updated);
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container py-5 text-center">
                <i className="fa-regular fa-cart-plus fa-4x text-muted mb-3 d-block"></i>
                <h4>Giỏ hàng trống</h4>
                <p className="text-muted">Hãy thêm sản phẩm vào giỏ hàng</p>
                <Link to="/shop" className="btn btn-dark">
                    <i className="fa-solid fa-arrow-left me-2"></i> Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h3 className="fw-bold mb-4">🛒 Giỏ hàng</h3>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Sản phẩm</th>
                            <th className="text-center">Đơn giá</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-center">Thành tiền</th>
                            <th className="text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={item.imageUrl || 'https://via.placeholder.com/50x50'}
                                            alt={item.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                        <span className="fw-bold">{item.name}</span>
                                    </div>
                                </td>
                                <td className="text-center">{formatPrice(item.price)}</td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                        <span className="fw-bold" style={{ width: '30px' }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </td>
                                <td className="text-center fw-bold text-danger">
                                    {formatPrice(item.price * item.quantity)}
                                </td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="row justify-content-end">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="fw-bold">Tổng cộng</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tạm tính:</span>
                                <span className="fw-bold">{formatPrice(getTotal())}</span>
                            </div>
                            <button
                                className="btn btn-dark w-100"
                                onClick={() => navigate('/checkout')}
                            >
                                <i className="fa-solid fa-credit-card me-2"></i> Tiến hành thanh toán
                            </button>
                            <Link to="/shop" className="btn btn-outline-secondary w-100 mt-2">
                                <i className="fa-solid fa-arrow-left me-2"></i> Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;