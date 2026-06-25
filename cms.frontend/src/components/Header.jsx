import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link để điều hướng

const Header = () => {
    return (
        <>
            <style>
                {`
                    .header-top {
                        background: #1a1a2e;
                        color: #fff;
                        padding: 6px 0;
                        font-size: 0.8rem;
                    }
                    .header-top a {
                        color: #e0e0e0;
                        text-decoration: none;
                        transition: color 0.3s;
                    }
                    .header-top a:hover {
                        color: #fff;
                    }
                    .header-main {
                        background: #fff;
                        box-shadow: 0 2px 15px rgba(0,0,0,0.08);
                        padding: 15px 0;
                    }
                    .header-main .brand {
                        font-size: 1.8rem;
                        font-weight: 700;
                        color: #1a1a2e;
                        text-decoration: none;
                        letter-spacing: 1px;
                    }
                    .header-main .brand span {
                        color: #e74c3c;
                    }
                    .header-main .brand i {
                        color: #e74c3c;
                        margin-right: 8px;
                    }
                    .nav-link-custom {
                        color: #333 !important;
                        font-weight: 600;
                        font-size: 0.95rem;
                        padding: 8px 18px !important;
                        transition: all 0.3s;
                        position: relative;
                        text-decoration: none;
                    }
                    .nav-link-custom:hover {
                        color: #e74c3c !important;
                    }
                    .nav-link-custom::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 0;
                        height: 2px;
                        background: #e74c3c;
                        transition: width 0.3s;
                    }
                    .nav-link-custom:hover::after {
                        width: 60%;
                    }
                    .header-search {
                        border-radius: 50px;
                        border: 2px solid #e8e8e8;
                        padding: 8px 18px;
                        font-size: 0.9rem;
                        transition: all 0.3s;
                        width: 250px;
                    }
                    .header-search:focus {
                        border-color: #e74c3c;
                        box-shadow: none;
                        outline: none;
                    }
                    .header-cart {
                        position: relative;
                        font-size: 1.3rem;
                        color: #333;
                        transition: color 0.3s;
                        text-decoration: none;
                    }
                    .header-cart:hover {
                        color: #e74c3c;
                    }
                    .header-cart .badge-cart {
                        position: absolute;
                        top: -8px;
                        right: -12px;
                        background: #e74c3c;
                        color: #fff;
                        font-size: 0.6rem;
                        border-radius: 50%;
                        padding: 2px 6px;
                        min-width: 18px;
                        text-align: center;
                    }
                    /* Active link */
                    .nav-link-custom.active {
                        color: #e74c3c !important;
                    }
                    .nav-link-custom.active::after {
                        width: 60%;
                    }
                    @media (max-width: 768px) {
                        .header-main .brand {
                            font-size: 1.3rem;
                        }
                        .header-search {
                            width: 100%;
                            margin-top: 10px;
                        }
                        .nav-link-custom {
                            padding: 6px 12px !important;
                        }
                    }
                `}
            </style>

            {/* Top Bar */}
            <div className="header-top">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-left">
                            <span>
                                <i className="fa-solid fa-truck-fast me-2"></i>
                                Miễn phí vận chuyển đơn hàng từ 500.000đ
                            </span>
                        </div>
                        <div className="col-md-6 text-center text-md-right">
                            <a href="#" className="me-3">
                                <i className="fa-regular fa-user me-1"></i> Đăng nhập
                            </a>
                            <a href="#" className="me-3">
                                <i className="fa-regular fa-heart me-1"></i> Yêu thích
                            </a>
                            <a href="#">
                                <i className="fa-regular fa-circle-question me-1"></i> Hỗ trợ
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="header-main">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Logo */}
                        <div className="col-lg-3 col-md-4 col-6">
                            <Link to="/" className="brand">
                                <i className="fa-solid fa-crown"></i>
                                FASHION<span>Boutique</span>
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="d-flex">
                                <input
                                    type="text"
                                    className="header-search form-control"
                                    placeholder="🔍 Tìm kiếm sản phẩm..."
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="col-lg-4 col-md-8 col-6">
                            <div className="d-flex align-items-center justify-content-end">
                                {/* Navigation - ✅ Sử dụng Link của React Router */}
                                <nav className="d-none d-md-flex me-3">
                                    <Link to="/" className="nav-link-custom">Trang chủ</Link>
                                    <Link to="/shop" className="nav-link-custom">Sản phẩm</Link>
                                    <Link to="/blog" className="nav-link-custom">Blog</Link>
                                    <Link to="/contact" className="nav-link-custom">Liên hệ</Link>
                                </nav>

                                {/* Cart - ✅ Link đến giỏ hàng */}
                                <Link to="/cart" className="header-cart me-3">
                                    <i className="fa-solid fa-bag-shopping"></i>
                                    <span className="badge-cart">3</span>
                                </Link>

                                {/* Mobile Menu Toggle */}
                                <button
                                    className="btn btn-link d-md-none p-0"
                                    type="button"
                                    dataToggle="collapse"
                                    dataTarget="#mobileMenu"
                                    style={{ color: '#333', fontSize: '1.5rem' }}
                                >
                                    <i className="fa-solid fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="collapse d-md-none mt-3" id="mobileMenu">
                        <div className="card card-body">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="🔍 Tìm kiếm sản phẩm..."
                            />
                            <Link to="/" className="py-2 text-dark">Trang chủ</Link>
                            <Link to="/shop" className="py-2 text-dark">Sản phẩm</Link>
                            <Link to="/blog" className="py-2 text-dark">Blog</Link>
                            <Link to="/contact" className="py-2 text-dark">Liên hệ</Link>
                            <Link to="/cart" className="py-2 text-dark">🛒 Giỏ hàng</Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;