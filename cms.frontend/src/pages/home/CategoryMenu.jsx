import React, { useState, useEffect } from 'react';
import categoryProductService from '../../services/categoryProductService';

const CategoryMenu = ({ onSelectCategory, selectedCategoryId }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryProductService.getAllCategoryProducts();
                console.log('📦 Danh mục:', data);
                setCategories(data);
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenuCategories();
    }, []);

    const handleCategoryClick = (id) => {
        console.log('🖱️ Đã click danh mục ID:', id);
        if (onSelectCategory) {
            onSelectCategory(id);
        }
    };

    if (loading) {
        return (
            <div className="container my-3 text-center">
                <div className="spinner-border spinner-border-sm text-info" role="status"></div>
                <span className="ml-2 text-muted">Đang nạp menu...</span>
            </div>
        );
    }

    return (
        <section className="my-4">
            <div className="container">
                <div className="card shadow-sm">
                    <div className="card-body p-3">
                        <div className="d-flex flex-wrap gap-2">
                            {/* Nút Tất cả */}
                            <button
                                className={`btn ${selectedCategoryId === null ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => handleCategoryClick(null)}
                                style={{ borderRadius: '50px', padding: '8px 20px' }}
                            >
                                <i className="fas fa-th-large me-1"></i> Tất cả
                            </button>

                            {/* Danh sách danh mục */}
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`btn ${selectedCategoryId === cat.id ? 'btn-success' : 'btn-outline-secondary'}`}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    style={{ borderRadius: '50px', padding: '8px 20px' }}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryMenu;