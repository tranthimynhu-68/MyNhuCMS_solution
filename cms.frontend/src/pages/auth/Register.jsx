// pages/auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ✅ Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Họ tên không được để trống';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không đúng định dạng';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Địa chỉ không được để trống';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu không được để trống';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Xóa lỗi khi người dùng bắt đầu nhập lại
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // ✅ Xử lý submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            setSuccessMessage('');
            setErrors({});

            // ✅ Tạo dữ liệu đúng format API
            const registerData = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                password: formData.password
            };

            console.log('📝 Dữ liệu đăng ký:', registerData);

            // ✅ Gọi API đăng ký
            const response = await authService.register(registerData);
            console.log('✅ Đăng ký thành công:', response);

            setSuccessMessage('✅ Đăng ký thành công! Chuyển đến trang đăng nhập...');

            // Chuyển đến trang login sau 2 giây
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error('❌ Lỗi đăng ký:', error);

            // Xử lý lỗi từ server
            if (error.response?.status === 400) {
                const errorData = error.response?.data;
                if (typeof errorData === 'string') {
                    setErrors({ general: errorData });
                } else if (errorData?.errors) {
                    // Xử lý lỗi validation từ server
                    const serverErrors = {};
                    Object.keys(errorData.errors).forEach(key => {
                        serverErrors[key] = errorData.errors[key][0];
                    });
                    setErrors(serverErrors);
                } else {
                    setErrors({ general: errorData?.message || 'Dữ liệu không hợp lệ!' });
                }
            } else if (error.response?.status === 409) {
                setErrors({ general: 'Email đã được sử dụng. Vui lòng sử dụng email khác!' });
            } else {
                setErrors({ general: error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            {/* Header */}
                            <div className="text-center mb-4">
                                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                                    <i className="fa-solid fa-user-plus text-success" style={{ fontSize: '2rem' }}></i>
                                </div>
                                <h3 className="fw-bold">📝 Đăng ký tài khoản</h3>
                                <p className="text-muted small">Tạo tài khoản để bắt đầu mua sắm</p>
                            </div>

                            {/* Thông báo thành công */}
                            {successMessage && (
                                <div className="alert alert-success d-flex align-items-center" role="alert">
                                    <i className="fa-solid fa-circle-check me-2"></i>
                                    {successMessage}
                                </div>
                            )}

                            {/* Lỗi chung */}
                            {errors.general && (
                                <div className="alert alert-danger d-flex align-items-center" role="alert">
                                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                                    {errors.general}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Họ tên */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        <i className="fa-regular fa-user me-2"></i>Họ tên *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className={`form-control form-control-lg ${errors.fullName ? 'is-invalid' : ''}`}
                                        placeholder="Nguyễn Văn A"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    {errors.fullName && (
                                        <div className="invalid-feedback">{errors.fullName}</div>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        <i className="fa-regular fa-envelope me-2"></i>Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="example@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>

                                {/* Số điện thoại */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        <i className="fa-solid fa-phone me-2"></i>Số điện thoại *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                                        placeholder="0123456789"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    {errors.phone && (
                                        <div className="invalid-feedback">{errors.phone}</div>
                                    )}
                                </div>

                                {/* Địa chỉ */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        <i className="fa-solid fa-location-dot me-2"></i>Địa chỉ *
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        className={`form-control form-control-lg ${errors.address ? 'is-invalid' : ''}`}
                                        placeholder="123 Đường ABC, Quận 1, TP.HCM"
                                        value={formData.address}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    {errors.address && (
                                        <div className="invalid-feedback">{errors.address}</div>
                                    )}
                                </div>

                                {/* Mật khẩu */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        <i className="fa-solid fa-key me-2"></i>Mật khẩu *
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
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
                                    {errors.password && (
                                        <div className="invalid-feedback d-block">{errors.password}</div>
                                    )}
                                    <small className="text-muted">Mật khẩu phải có ít nhất 6 ký tự</small>
                                </div>

                                {/* Xác nhận mật khẩu */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">
                                        <i className="fa-solid fa-check-double me-2"></i>Xác nhận mật khẩu *
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={loading}
                                        >
                                            <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
                                    )}
                                </div>

                                {/* Nút đăng ký */}
                                <button
                                    type="submit"
                                    className="btn btn-success w-100 py-2 fw-bold"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-user-plus me-2"></i>
                                            Đăng ký
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Chuyển sang đăng nhập */}
                            <div className="text-center mt-4">
                                <span className="text-muted">Đã có tài khoản? </span>
                                <Link to="/login" className="text-decoration-none fw-bold">
                                    Đăng nhập ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;