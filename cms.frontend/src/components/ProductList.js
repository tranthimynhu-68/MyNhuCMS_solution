import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';

const BASE_URL = 'https://localhost:7004';

const ProductList = ({ categoryProductId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    console.log('🛒 ProductList nhận categoryProductId:', categoryProductId);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        if (imagePath.startsWith('/uploads/')) {
            return `${BASE_URL}${imagePath}`;
        }
        return `${BASE_URL}/uploads/${imagePath}`;
    };

    // ✅ Hàm xử lý chuyển đến trang chi tiết
    const handleViewDetail = (productId) => {
        navigate(`/product/${productId}`);
    };

    // ✅ Hàm thêm vào giỏ hàng
    const handleAddToCart = (e, product) => {
        e.stopPropagation(); // Ngăn sự kiện lan truyền

        // Kiểm tra số lượng tồn kho
        if (product.stock <= 0) {
            alert('❌ Sản phẩm này đã hết hàng!');
            return;
        }

        // Lấy giỏ hàng từ localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex >= 0) {
            // Nếu đã có, kiểm tra số lượng tồn kho
            if (cart[existingIndex].quantity >= product.stock) {
                alert(`❌ Số lượng trong kho không đủ! Chỉ còn ${product.stock} sản phẩm.`);
                return;
            }
            cart[existingIndex].quantity += 1;
        } else {
            // Nếu chưa có, thêm mới
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1,
                stock: product.stock
            });
        }

        // Lưu lại localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Hiển thị thông báo
        alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);

        // Dispatch event để cập nhật số lượng giỏ hàng ở Header
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // ✅ Hàm mua ngay
    const handleBuyNow = (product) => {
        // Thêm vào giỏ hàng
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex >= 0) {
            if (cart[existingIndex].quantity >= product.stock) {
                alert(`❌ Số lượng trong kho không đủ! Chỉ còn ${product.stock} sản phẩm.`);
                return;
            }
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1,
                stock: product.stock
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));

        // Chuyển đến trang giỏ hàng
        navigate('/cart');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                console.log('🔄 Đang gọi API với categoryId:', categoryProductId);

                let data;
                if (categoryProductId) {
                    data = await productService.getProductsByCategory(categoryProductId);
                    console.log('📦 Dữ liệu lọc theo danh mục:', data);
                } else {
                    data = await productService.getAllProducts();
                    console.log('📦 Dữ liệu tất cả sản phẩm:', data);
                }

                setProducts(data || []);
            } catch (error) {
                console.error("❌ Lỗi khi tải sản phẩm:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryProductId]);

    if (loading) {
        return <div className="text-center my-4">⏳ Đang tải...</div>;
    }

    return (
        <div className="row">
            {products.length === 0 ? (
                <div className="col-12">
                    <p className="text-muted text-center">
                        {categoryProductId ? 'Không có sản phẩm nào trong danh mục này.' : 'Chưa có sản phẩm nào trong hệ thống.'}
                    </p>
                </div>
            ) : (
                products.map((item) => {
                    const imageUrl = getImageUrl(item.imageUrl);
                    const isOutOfStock = item.stock <= 0;

                    return (
                        <div className="col-md-6 col-lg-4 mb-4" key={item.id}>
                            <div className="card product-card">
                                <div className="product-image-wrapper">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            className="product-image"
                                            alt={item.name}
                                            onClick={() => handleViewDetail(item.id)}
                                            style={{ cursor: 'pointer' }}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `
                                                    <div style="padding:60px 0;text-align:center;color:#999;">
                                                        <i class="fa-solid fa-image fa-3x d-block mb-2"></i>
                                                        Không có ảnh
                                                    </div>
                                                `;
                                            }}
                                        />
                                    ) : (
                                        <div style={{ padding: '60px 0', textAlign: 'center', color: '#999' }}>
                                            <i className="fa-solid fa-image fa-3x d-block mb-2"></i>
                                            Không có ảnh
                                        </div>
                                    )}
                                    {isOutOfStock && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            background: '#dc3545',
                                            color: '#fff',
                                            padding: '4px 12px',
                                            borderRadius: '50px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}>
                                            HẾT HÀNG
                                        </div>
                                    )}
                                </div>

                                <div className="card-body">
                                    <div className="product-brand">
                                        {item.categoryProduct?.name || 'THƯƠNG HIỆU'}
                                    </div>
                                    <div
                                        className="product-name"
                                        onClick={() => handleViewDetail(item.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item.name}
                                    </div>
                                    <div className="product-price">
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(item.price || 0)}
                                    </div>
                                    {!isOutOfStock && (
                                        <small className="text-muted">
                                            📦 Còn {item.stock} sản phẩm
                                        </small>
                                    )}
                                </div>

                                <div className="product-footer">
                                    <div className="d-flex">
                                        {/* ✅ Nút Chi tiết */}
                                        <button
                                            className="btn-product-detail"
                                            onClick={() => handleViewDetail(item.id)}
                                        >
                                            <i className="fa-solid fa-eye me-1"></i> Chi tiết
                                        </button>

                                        {/* ✅ Nút Thêm giỏ hàng */}
                                        <button
                                            className="btn-product-buy"
                                            onClick={(e) => handleAddToCart(e, item)}
                                            disabled={isOutOfStock}
                                            style={{
                                                opacity: isOutOfStock ? 0.5 : 1,
                                                cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            <i className="fa-solid fa-cart-plus me-1"></i>
                                            {isOutOfStock ? 'Hết hàng' : 'Thêm giỏ'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}

            {/* CSS */}
            <style>{`
                .product-card {
                    transition: transform 0.2s, box-shadow 0.2s;
                    background: #fff;
                    border-radius: 12px !important;
                    overflow: hidden;
                    height: 100%;
                    position: relative;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
                }
                .product-image-wrapper {
                    overflow: hidden;
                    background: #f8f9fa;
                    height: 250px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .product-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s;
                }
                .product-card:hover .product-image {
                    transform: scale(1.03);
                }
                .product-brand {
                    font-size: 0.75rem;
                    letter-spacing: 0.5px;
                    font-weight: 600;
                    color: #6c757d;
                    text-transform: uppercase;
                    margin-bottom: 4px;
                }
                .product-name {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #212529;
                    margin-bottom: 8px;
                    min-height: 48px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.2s;
                }
                .product-name:hover {
                    color: #dc3545;
                }
                .product-price {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #dc3545;
                }
                .btn-product-detail, .btn-product-buy {
                    flex: 1;
                    font-size: 0.8rem;
                    font-weight: 600;
                    padding: 8px 0;
                    border-radius: 50px;
                    transition: all 0.2s;
                    border: 1px solid #212529;
                    background: transparent;
                    color: #212529;
                    cursor: pointer;
                }
                .btn-product-detail:hover {
                    background: #212529;
                    color: #fff;
                }
                .btn-product-buy {
                    background: #212529;
                    color: #fff;
                }
                .btn-product-buy:hover:not(:disabled) {
                    background: #343a40;
                    border-color: #343a40;
                }
                .btn-product-buy:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .product-footer {
                    background: transparent !important;
                    border-top: none !important;
                    padding: 0 16px 16px 16px !important;
                }
                .product-footer .d-flex { gap: 8px; }
                @media (max-width: 576px) {
                    .product-image-wrapper { height: 180px; }
                    .product-name { font-size: 0.85rem; min-height: 40px; }
                    .product-price { font-size: 0.95rem; }
                    .btn-product-detail, .btn-product-buy { font-size: 0.7rem; }
                }
            `}</style>
        </div>
    );
};

export default ProductList;