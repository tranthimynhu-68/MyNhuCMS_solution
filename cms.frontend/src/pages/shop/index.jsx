// pages/shop/index.jsx (cách truyền categoryId vào ProductList)
import React, { useState, useEffect } from 'react';
import ShopSidebar from './ShopSidebar';
import ShopHeader from './ShopHeader';
import ProductList from '../../components/ProductList';
import LoadingOrEmpty from './LoadingOrEmpty';
import productService from '../../services/productService';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let data;
                // ✅ Nếu có categoryId, gọi API lọc theo category
                if (selectedCategory) {
                    data = await productService.getProductsByCategory(selectedCategory);
                    console.log(`📦 Sản phẩm theo danh mục ${selectedCategory}:`, data);
                } else {
                    data = await productService.getAllProducts();
                    console.log('📦 Tất cả sản phẩm:', data);
                }
                setProducts(data || []);
                setFilteredProducts(data || []);
            } catch (error) {
                console.error("❌ Lỗi tải sản phẩm:", error);
                setProducts([]);
                setFilteredProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory]); // ✅ Chạy lại khi selectedCategory thay đổi

    // Lọc theo search và giá (không lọc category vì đã lọc ở API)
    useEffect(() => {
        let result = [...products];

        if (searchTerm.trim()) {
            const keyword = searchTerm.toLowerCase().trim();
            result = result.filter(p =>
                p.name?.toLowerCase().includes(keyword) ||
                (p.description && p.description.toLowerCase().includes(keyword))
            );
        }

        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        if (!isNaN(min) && min >= 0) {
            result = result.filter(p => p.price >= min);
        }
        if (!isNaN(max) && max >= 0) {
            result = result.filter(p => p.price <= max);
        }

        setFilteredProducts(result);
    }, [products, searchTerm, minPrice, maxPrice]);

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-md-3">
                    <ShopSidebar
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onMinPriceChange={setMinPrice}
                        onMaxPriceChange={setMaxPrice}
                    />
                </div>

                <div className="col-md-9">
                    <ShopHeader
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        totalProducts={filteredProducts.length}
                    />
                    {/* ✅ Truyền categoryId vào ProductList */}
                    <div className="product-grid my-3">
                        <h4 className="mb-3">
                            {selectedCategory ? 'Sản phẩm theo danh mục' : 'Bộ sưu tập mới nhất'}
                        </h4>
                        <ProductList categoryProductId={selectedCategory} />
                    </div>

                   

                   
                </div>
            </div>
        </div>
    );
};

export default Shop;