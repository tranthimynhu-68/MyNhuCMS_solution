// pages/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        if (!formData.email || !formData.password) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // ✅ Gọi API login
            const response = await authService.login(formData);
            console.log('📝 Response login:', response);

            // ✅ Lưu thông tin customer vào localStorage
            // Response từ backend: { customerId, fullName, email, phone, address }
            if (response) {
                localStorage.setItem('customer', JSON.stringify({
                    id: response.customerId,
                    fullName: response.fullName,
                    email: response.email,
                    phone: response.phone,
                    address: response.address
                }));
            }

            // ✅ Dispatch event để cập nhật Header
            window.dispatchEvent(new Event('loginSuccess'));

            // ✅ Chuyển về trang chủ
            navigate('/');

        } catch (error) {
            console.error('❌ Lỗi đăng nhập:', error);

            // Xử lý lỗi từ server
            if (error.response?.status === 401) {
                setError(error.response?.data?.message || 'Email hoặc mật khẩu không chính xác!');
            } else if (error.response?.status === 400) {
                setError('Dữ liệu không hợp lệ!');
            } else {
                setError(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5 col-lg-4">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                    <i className="fa-solid fa-lock text-danger" style={{ fontSize: '2rem' }}></i>
                                </div>
                                <h3 className="fw-bold">🔐 Đăng nhập</h3>
                                <p className="text-muted small">Chào mừng bạn quay trở lại</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        <i className="fa-regular fa-envelope me-2"></i>Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
                                        placeholder="example@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        <i className="fa-solid fa-key me-2"></i>Mật khẩu
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={loading}
                                        >
                                            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="text-end mb-3">
                                    <Link to="/forgot-password" className="text-decoration-none small">
                                        Quên mật khẩu?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-dark w-100 py-2 fw-bold"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Đang đăng nhập...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-right-to-bracket me-2"></i>
                                            Đăng nhập
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <span className="text-muted">Chưa có tài khoản? </span>
                                <Link to="/register" className="text-decoration-none fw-bold">
                                    Đăng ký ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;