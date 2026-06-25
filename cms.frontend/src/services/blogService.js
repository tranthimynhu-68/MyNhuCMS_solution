import axiosClient from '../api/axiosClient';

const blogService = {
    /**
     * Hàm gọi API lấy danh mục các chủ đề bài viết
     * Endpoint: /api/Categories
     */
    getBlogCategories: () => {
        const url = '/Categories'; // Khớp với Route quản lý chuyên mục tin tức
        return axiosClient.get(url);
    },

    /**
     * Hàm gọi API lấy toàn bộ các bài viết
     * Endpoint: /api/Posts
     */
    getAllPosts: () => {
        const url = '/Posts';
        return axiosClient.get(url);
    },

    /**
     * Hàm lấy bài viết theo ID
     */
    getPostById: (id) => {
        const url = `/Posts/${id}`;
        return axiosClient.get(url);
    },

    /**
     * Hàm lấy bài viết theo chuyên mục
     */
    getPostsByCategory: (categoryId) => {
        const url = `/Posts/category/${categoryId}`;
        return axiosClient.get(url);
    }
};

export default blogService;