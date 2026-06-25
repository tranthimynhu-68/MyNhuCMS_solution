import axios from 'axios';

// Khởi tạo một thực thể axios với cấu hình base chung
const axiosClient = axios.create({
    baseURL: 'https://localhost:7004/api', // 🔄 Đổi port đúng với backend của bạn
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Thời gian tối đa chờ phản hồi từ server (10 giây)
    withCredentials: true, // Gửi cookie cùng request
});

// Request Interceptor - Xử lý trước khi gửi request
axiosClient.interceptors.request.use(
    (config) => {
        // Nếu dùng JWT - lấy token từ localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Nếu là public endpoint, xóa token
        if (config.url.includes('/public/')) {
            delete config.headers.Authorization;
        }

        console.log(`🚀 Gửi request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Lỗi request:', error);
        return Promise.reject(error);
    }
);

// Response Interceptor - Xử lý sau khi nhận response
axiosClient.interceptors.response.use(
    (response) => {
        // Bóc tách lấy thẳng data bên trong
        console.log(`✅ Response thành công: ${response.config.url}`);
        return response.data;
    },
    (error) => {
        // Xử lý lỗi tập trung
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error('⚠️ Bad Request:', data);
                    break;
                case 401:
                    console.error('🔒 Unauthorized - Vui lòng đăng nhập');
                    // Xóa token nếu hết hạn
                    localStorage.removeItem('token');
                    localStorage.removeItem('customer');
                    break;
                case 403:
                    console.error('⛔ Forbidden - Không có quyền truy cập');
                    break;
                case 404:
                    console.error('🔍 Not Found - Không tìm thấy tài nguyên');
                    break;
                case 500:
                    console.error('💥 Server Error - Lỗi hệ thống');
                    break;
                default:
                    console.error(`❌ Lỗi ${status}:`, data);
            }
        } else if (error.request) {
            console.error('🌐 Network Error - Kiểm tra kết nối API');
        } else {
            console.error('❌ Lỗi:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;