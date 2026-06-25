import React, { useState } from 'react';

import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';

function Home() {
    // ✅ THÊM: State quản lý categoryId được chọn
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // ✅ THÊM: Hàm xử lý khi chọn danh mục
    const handleSelectCategory = (categoryId) => {
        console.log('📌 Home nhận categoryId:', categoryId);
        setSelectedCategoryId(categoryId);
    };

    return (
        <div className="homepage-container">

            <HeroBanner />

            {/* ✅ THÊM: Truyền callback và selectedCategoryId xuống CategoryMenu */}
            <CategoryMenu
                onSelectCategory={handleSelectCategory}
                selectedCategoryId={selectedCategoryId}
            />

            {/* ✅ THÊM: Truyền categoryId xuống ProductGrid để lọc */}
            <ProductGrid categoryId={selectedCategoryId} />

            <LatestBlog />

        </div>
    );
}

export default Home;