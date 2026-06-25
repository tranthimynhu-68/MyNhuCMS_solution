import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productService from '../../services/productService';

// ✅ Đặt BASE_URL ở đầu file
const BASE_URL = 'https://localhost:7004'; // Hoặc URL API của bạn

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    // ✅ Hàm xử lý đường dẫn ảnh
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        // Nếu đã là URL đầy đủ
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        // Nếu là đường dẫn bắt đầu bằng /uploads/
        if (imagePath.startsWith('/uploads/')) {
            return `${BASE_URL}${imagePath}`;
        }
        // Nếu là đường dẫn tương đối khác
        return `${BASE_URL}/uploads/${imagePath}`;
    };

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productService.getProductById(Number(id));
                console.log('📦 Chi tiết sản phẩm:', data);
                setProduct(data);
            } catch (error) {
                console.error("❌ Lỗi khi tải chi tiết sản phẩm:", error);
                setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductDetail();
        }
    }, [id]);

    // Hàm định dạng giá tiền
    const formatPrice = (price) => {
        if (!price) return '0 ₫';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Xử lý tăng/giảm số lượng
    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // Xử lý thêm vào giỏ hàng
    const handleAddToCart = () => {
        alert(`🛒 Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
    };

    // Xử lý mua ngay
    const handleBuyNow = () => {
        alert(`🛒 Đang chuyển đến trang thanh toán với ${quantity} sản phẩm...`);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center">
                    <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Đang tải thông tin sản phẩm...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">
                    <i className="fa-regular fa-circle-xmark fa-4x text-danger mb-3 d-block"></i>
                    <h3 className="text-danger">{error || 'Không tìm thấy sản phẩm'}</h3>
                    <p className="text-muted">Sản phẩm bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
                    <Link to="/shop" className="btn btn-outline-danger mt-3">
                        <i className="fa-solid fa-arrow-left me-2"></i> Quay lại cửa hàng
                    </Link>
                </div>
            </div>
        );
    }

    // ✅ Xử lý danh sách ảnh với getImageUrl
    const mainImage = getImageUrl(product.imageUrl);
    const images = product.images ? product.images.split(',').map(img => img.trim()) : [];
    const allImages = images
        .filter(img => img) // Lọc bỏ ảnh rỗng
        .map(img => getImageUrl(img)); // Áp dụng getImageUrl

    // Nếu có ảnh chính, thêm vào đầu danh sách
    if (mainImage) {
        allImages.unshift(mainImage);
    }

    // Nếu không có ảnh nào, dùng ảnh placeholder
    const displayImages = allImages.length > 0 ? allImages : ['https://via.placeholder.com/400x400?text=No+Image'];

    return (
        <>
            <style>
                {`
                    .product-detail-wrapper {
                        background: #f8f9fa;
                        min-height: 100vh;
                        padding: 40px 0;
                    }
                    .product-detail-card {
                        background: #fff;
                        border-radius: 16px;
                        box-shadow: 0 4px 30px rgba(0,0,0,0.08);
                        overflow: hidden;
                        padding: 40px;
                    }
                    .product-gallery {
                        position: relative;
                    }
                    .product-gallery .main-image {
                        width: 100%;
                        height: 400px;
                        object-fit: cover;
                        border-radius: 12px;
                        background: #f8f9fa;
                    }
                    .product-gallery .thumbnail-list {
                        display: flex;
                        gap: 10px;
                        margin-top: 15px;
                        flex-wrap: wrap;
                    }
                    .product-gallery .thumbnail-list .thumb {
                        width: 80px;
                        height: 80px;
                        object-fit: cover;
                        border-radius: 8px;
                        cursor: pointer;
                        border: 2px solid transparent;
                        transition: all 0.3s;
                        background: #f8f9fa;
                    }
                    .product-gallery .thumbnail-list .thumb:hover {
                        border-color: #e74c3c;
                    }
                    .product-gallery .thumbnail-list .thumb.active {
                        border-color: #e74c3c;
                    }
                    .product-info .product-name {
                        font-size: 2rem;
                        font-weight: 800;
                        color: #2c3e50;
                        margin-bottom: 15px;
                    }
                    .product-info .product-price {
                        font-size: 1.8rem;
                        font-weight: 700;
                        color: #e74c3c;
                        margin-bottom: 15px;
                    }
                    .product-info .product-price .old-price {
                        font-size: 1.2rem;
                        color: #adb5bd;
                        text-decoration: line-through;
                        margin-left: 15px;
                        font-weight: 400;
                    }
                    .product-info .product-rating {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 20px;
                    }
                    .product-info .product-rating .stars {
                        color: #f39c12;
                    }
                    .product-info .product-rating .review-count {
                        color: #6c757d;
                        font-size: 0.95rem;
                    }
                    .product-info .product-description {
                        color: #34495e;
                        font-size: 1rem;
                        line-height: 1.6;
                        margin-bottom: 25px;
                    }
                    .product-info .product-meta {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                        padding: 15px 0;
                        border-top: 1px solid #f0f0f0;
                        border-bottom: 1px solid #f0f0f0;
                        margin-bottom: 25px;
                    }
                    .product-info .product-meta .meta-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        color: #6c757d;
                        font-size: 0.95rem;
                    }
                    .product-info .product-meta .meta-item i {
                        color: #e74c3c;
                    }
                    .product-info .quantity-selector {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        margin-bottom: 25px;
                    }
                    .product-info .quantity-selector label {
                        font-weight: 600;
                        color: #2c3e50;
                        margin: 0;
                    }
                    .product-info .quantity-selector .qty-btn {
                        width: 40px;
                        height: 40px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        background: #fff;
                        font-size: 1.2rem;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .product-info .quantity-selector .qty-btn:hover {
                        background: #e74c3c;
                        color: #fff;
                        border-color: #e74c3c;
                    }
                    .product-info .quantity-selector .qty-input {
                        width: 60px;
                        height: 40px;
                        text-align: center;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        font-size: 1rem;
                        font-weight: 600;
                    }
                    .product-info .action-buttons {
                        display: flex;
                        gap: 15px;
                        flex-wrap: wrap;
                    }
                    .product-info .action-buttons .btn-add-cart {
                        background: #e74c3c;
                        color: #fff;
                        border: none;
                        padding: 12px 40px;
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 1rem;
                        transition: all 0.3s;
                        cursor: pointer;
                    }
                    .product-info .action-buttons .btn-add-cart:hover {
                        background: #c0392b;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(231, 76, 60, 0.3);
                    }
                    .product-info .action-buttons .btn-buy-now {
                        background: #2c3e50;
                        color: #fff;
                        border: none;
                        padding: 12px 40px;
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 1rem;
                        transition: all 0.3s;
                        cursor: pointer;
                    }
                    .product-info .action-buttons .btn-buy-now:hover {
                        background: #1a252f;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(44, 62, 80, 0.3);
                    }
                    .product-info .action-buttons .btn-wishlist {
                        background: transparent;
                        border: 2px solid #ddd;
                        padding: 12px 20px;
                        border-radius: 50px;
                        font-weight: 600;
                        transition: all 0.3s;
                        cursor: pointer;
                    }
                    .product-info .action-buttons .btn-wishlist:hover {
                        border-color: #e74c3c;
                        color: #e74c3c;
                    }
                    @media (max-width: 768px) {
                        .product-detail-card {
                            padding: 20px;
                        }
                        .product-gallery .main-image {
                            height: 250px;
                        }
                        .product-info .product-name {
                            font-size: 1.5rem;
                        }
                        .product-info .product-price {
                            font-size: 1.4rem;
                        }
                        .product-info .action-buttons .btn-add-cart,
                        .product-info .action-buttons .btn-buy-now {
                            padding: 10px 25px;
                            font-size: 0.9rem;
                        }
                    }
                `}
            </style>

            <div className="product-detail-wrapper">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-decoration-none">Trang chủ</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/shop" className="text-decoration-none">Cửa hàng</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                {product.name}
                            </li>
                        </ol>
                    </nav>

                    <div className="product-detail-card">
                        <div className="row">
                            {/* ✅ Cột Ảnh sản phẩm - ĐÃ SỬA */}
                            <div className="col-lg-6">
                                <div className="product-gallery">
                                    <img
                                        src={displayImages[selectedImage] || 'https://via.placeholder.com/400x400?text=No+Image'}
                                        alt={product.name}
                                        className="main-image"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                        }}
                                    />
                                    {displayImages.length > 1 && (
                                        <div className="thumbnail-list">
                                            {displayImages.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img || 'https://via.placeholder.com/80x80?text=No+Image'}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className={`thumb ${index === selectedImage ? 'active' : ''}`}
                                                    onClick={() => setSelectedImage(index)}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Cột Thông tin sản phẩm */}
                            <div className="col-lg-6">
                                <div className="product-info">
                                    <h1 className="product-name">{product.name}</h1>

                                    <div className="product-price">
                                        {formatPrice(product.price)}
                                        {product.oldPrice && (
                                            <span className="old-price">{formatPrice(product.oldPrice)}</span>
                                        )}
                                    </div>

                                    <div className="product-rating">
                                        <span className="stars">
                                            {'★'.repeat(Math.floor(product.ratingAvg || 0))}
                                            {product.ratingAvg && product.ratingAvg % 1 >= 0.5 && '★'}
                                            {product.ratingAvg ? '☆'.repeat(5 - Math.ceil(product.ratingAvg)) : '☆☆☆☆☆'}
                                        </span>
                                        <span className="review-count">
                                            {product.ratingAvg ? `${product.ratingAvg}/5` : 'Chưa có đánh giá'}
                                        </span>
                                    </div>

                                    <div className="product-description">
                                        {product.description || 'Chưa có mô tả cho sản phẩm này.'}
                                    </div>

                                    <div className="product-meta">
                                        {product.category && (
                                            <span className="meta-item">
                                                <i className="fa-regular fa-folder"></i>
                                                Danh mục: {product.category.name || product.category}
                                            </span>
                                        )}
                                        {product.sku && (
                                            <span className="meta-item">
                                                <i className="fa-regular fa-barcode"></i>
                                                SKU: {product.sku}
                                            </span>
                                        )}
                                        {product.stock !== undefined && (
                                            <span className="meta-item">
                                                <i className="fa-regular fa-box"></i>
                                                Tồn kho: {product.stock > 0 ? `${product.stock} sản phẩm` : 'Hết hàng'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Chọn số lượng */}
                                    <div className="quantity-selector">
                                        <label>Số lượng:</label>
                                        <button
                                            className="qty-btn"
                                            onClick={() => handleQuantityChange('decrease')}
                                            disabled={quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <input
                                            type="text"
                                            className="qty-input"
                                            value={quantity}
                                            readOnly
                                        />
                                        <button
                                            className="qty-btn"
                                            onClick={() => handleQuantityChange('increase')}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Nút hành động */}
                                    <div className="action-buttons">
                                        <button
                                            className="btn-add-cart"
                                            onClick={handleAddToCart}
                                            disabled={product.stock === 0}
                                        >
                                            <i className="fa-solid fa-cart-plus me-2"></i>
                                            Thêm vào giỏ
                                        </button>
                                        <button
                                            className="btn-buy-now"
                                            onClick={handleBuyNow}
                                            disabled={product.stock === 0}
                                        >
                                            Mua ngay
                                        </button>
                                        <button className="btn-wishlist">
                                            <i className="fa-regular fa-heart"></i>
                                        </button>
                                    </div>

                                    {product.stock === 0 && (
                                        <div className="mt-3 text-danger">
                                            <i className="fa-solid fa-exclamation-circle me-1"></i>
                                            Sản phẩm hiện đang hết hàng
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;