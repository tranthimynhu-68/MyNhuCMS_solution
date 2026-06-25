import React from 'react';
import ProductList from '../../components/ProductList';

const ProductGrid = ({ categoryId }) => {
    return (
        <div className="product-grid my-3">
            <h4 className="mb-3">
                {categoryId ? 'Sản phẩm theo danh mục' : 'Bộ sưu tập mới nhất'}
            </h4>
            <ProductList categoryProductId={categoryId} />
        </div>
    );
};

export default ProductGrid;