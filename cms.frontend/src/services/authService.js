// services/authService.js
import axiosClient from '../api/axiosClient';

const authService = {
    // ✅ Đăng nhập khách hàng
    login: (data) => {
        return axiosClient.post('/Auth/CustomerLogin', data);
    },

    // ✅ Đăng ký khách hàng
    register: (data) => {
        return axiosClient.post('/Auth/CustomerRegister', data);
    },

    // ✅ Lấy thông tin profile
    getProfile: () => {
        return axiosClient.get('/Auth/profile');
    },

    // ✅ Đăng xuất
    logout: () => {
        return axiosClient.post('/Auth/logout');
    }
};

export default authService;