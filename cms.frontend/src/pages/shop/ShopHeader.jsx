import React from 'react';

const ShopHeader = ({ searchTerm, onSearchChange, totalProducts }) => {
    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
            <h5 className="mb-0">
                <span className="text-muted">Tìm thấy </span>
                <span className="fw-bold text-danger">{totalProducts}</span>
                <span className="text-muted"> sản phẩm</span>
            </h5>
            <div className="d-flex gap-2 mt-2 mt-sm-0">
                <div className="input-group" style={{ maxWidth: '300px' }}>
                    <span className="input-group-text bg-white border-end-0">
                        <i className="fa-solid fa-search text-muted"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShopHeader;