// services/categoryProductService.js
import axiosClient from '../api/axiosClient';

const categoryProductService = {
    // Lấy tất cả danh mục sản phẩm
    getAllCategoryProducts: () => {
        const url = '/CategoryProducts';
        return axiosClient.get(url);
    },

    // Lấy danh mục sản phẩm theo ID
    getCategoryProductById: (id) => {
        const url = `/CategoryProducts/${id}`;
        return axiosClient.get(url);
    }
};

export default categoryProductService;