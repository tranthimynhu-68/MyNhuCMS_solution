import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/home/index';
import Shop from './pages/shop/index';
import ProductDetail from './pages/product-detail';
import Blog from './pages/blog/index';
import BlogDetail from './pages/blog-detail/index';
import Cart from './pages/cart/index';
import Checkout from './pages/checkout/index';
import Contact from './pages/contact/index';

// ✅ Import các trang phân hệ tài khoản
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100 bg-light">
                <Header />
                <main className="flex-grow-1">
                    <Routes>
                        {/* Trang chủ */}
                        <Route path="/" element={<Home />} />

                        {/* Cửa hàng */}
                        <Route path="/shop" element={<Shop />} />

                        {/* Chi tiết sản phẩm */}
                        <Route path="/product/:id" element={<ProductDetail />} />

                        {/* Blog */}
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/post/:id" element={<BlogDetail />} />

                        {/* Liên hệ */}
                        <Route path="/contact" element={<Contact />} />

                        {/* Giỏ hàng */}
                        <Route path="/cart" element={<Cart />} />

                        {/* Thanh toán */}
                        <Route path="/checkout" element={<Checkout />} />

                        {/* ✅ PHÂN HỆ TÀI KHOẢN */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* 404 - Không tìm thấy trang */}
                        <Route path="*" element={
                            <div className="container text-center py-5 my-5">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/580/580185.png"
                                    alt="404"
                                    className="mb-4"
                                    style={{ width: '100px', opacity: 0.6 }}
                                />
                                <h2 className="fw-bold text-secondary">404 - KHÔNG TÌM THẤY TRANG</h2>
                                <p className="text-muted">Đường dẫn bạn truy cập không tồn tại trên hệ thống.</p>
                                <a href="/" className="btn btn-dark btn-sm mt-2">Quay lại Trang Chủ</a>
                            </div>
                        } />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;