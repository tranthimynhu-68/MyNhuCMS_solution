import React from 'react';

const LoadingOrEmpty = ({ type }) => {
    if (type === 'loading') {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Đang tải sản phẩm...</p>
            </div>
        );
    }

    return (
        <div className="text-center py-5">
            <i className="fa-regular fa-face-frown fa-4x text-muted mb-3 d-block"></i>
            <h5 className="text-muted">Không tìm thấy sản phẩm nào</h5>
            <p className="text-muted small">Vui lòng thử lại với bộ lọc khác</p>
        </div>
    );
};

export default LoadingOrEmpty;