import React from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://localhost:7004';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `${BASE_URL}/uploads/${imagePath}`;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="card h-100 product-card">
            <div className="product-image-wrapper">
                <img
                    src={getImageUrl(product.imageUrl) || 'https://via.placeholder.com/300x300?text=No+Image'}
                    className="product-image"
                    alt={product.name}
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: 'pointer' }}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                />
            </div>
            <div className="card-body">
                <h6 className="product-name" onClick={() => navigate(`/product/${product.id}`)}>
                    {product.name}
                </h6>
                <div className="product-price">{formatPrice(product.price)}</div>
                {product.stock !== undefined && (
                    <small className="text-muted">
                        {product.stock > 0 ? `📦 Còn ${product.stock} sản phẩm` : '🔥 Hết hàng'}
                    </small>
                )}
            </div>
            <div className="card-footer bg-transparent border-top-0">
                <button
                    className="btn btn-dark btn-sm w-100"
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    <i className="fa-solid fa-eye me-1"></i> Xem chi tiết
                </button>
            </div>
        </div>
    );
};

export default ProductCard;