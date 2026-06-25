import axiosClient from '../api/axiosClient';

const productService = {
    /**
     * Lấy tất cả sản phẩm
     * GET /api/Products
     */
    getAllProducts: () => {
        const url = '/Products';
        return axiosClient.get(url);
    },

    /**
     * Lấy sản phẩm theo ID
     * GET /api/Products/{id}
     */
    getProductById: (id) => {
        const url = `/Products/${id}`;
        return axiosClient.get(url);
    },

    /**
     * Lấy sản phẩm theo danh mục
     * GET /api/Products/category/{categoryProductId}
     */
    getProductsByCategory: (categoryId) => {
        const url = `/Products/category/${categoryId}`;
        return axiosClient.get(url);
    },
};

export default productService;