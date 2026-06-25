import React, { useState, useEffect } from 'react';
import categoryProductService from '../../services/categoryProductService';

const ShopSidebar = ({
    selectedCategory,
    onCategoryChange,
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange
}) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryProductService.getAllCategoryProducts();
                console.log('📂 Danh mục sản phẩm:', data);
                setCategories(data || []);
            } catch (error) {
                console.error("❌ Lỗi tải danh mục:", error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        if (value === '' || parseFloat(value) >= 0) {
            onMinPriceChange(value);
        }
    };

    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
        if (value === '' || parseFloat(value) >= 0) {
            onMaxPriceChange(value);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title fw-bold mb-3">📂 Danh mục</h5>
                <div className="list-group list-group-flush mb-4">
                    <button
                        className={`list-group-item list-group-item-action ${!selectedCategory ? 'active' : ''}`}
                        onClick={() => onCategoryChange(null)}
                        style={{ cursor: 'pointer' }}
                    >
                        Tất cả sản phẩm
                    </button>
                    {loading ? (
                        <div className="text-center py-2">
                            <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`list-group-item list-group-item-action ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => onCategoryChange(cat.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {cat.name}
                            </button>
                        ))
                    )}
                </div>

                <h5 className="card-title fw-bold mb-3">💰 Khoảng giá</h5>
                <div className="mb-2">
                    <label className="form-label small text-muted">Giá tối thiểu</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="0"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        min="0"
                    />
                </div>
                <div>
                    <label className="form-label small text-muted">Giá tối đa</label>
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Không giới hạn"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        min="0"
                    />
                </div>

                {(minPrice || maxPrice) && (
                    <button
                        className="btn btn-outline-danger btn-sm w-100 mt-3"
                        onClick={() => {
                            onMinPriceChange('');
                            onMaxPriceChange('');
                        }}
                    >
                        <i className="fa-solid fa-rotate-left me-1"></i> Xóa bộ lọc giá
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShopSidebar;