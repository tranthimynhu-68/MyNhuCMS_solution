import React from 'react';

const HeroBanner = () => {
    return (
        <>
            <style>
                {`
                    .hero-banner {
                        position: relative;
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                        border-radius: 16px;
                        overflow: hidden;
                        padding: 60px 40px;
                        margin: 20px 0 30px 0;
                        min-height: 300px;
                        display: flex;
                        align-items: center;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    }

                    .hero-banner::before {
                        content: '';
                        position: absolute;
                        top: -50%;
                        right: -20%;
                        width: 400px;
                        height: 400px;
                        background: rgba(231, 76, 60, 0.15);
                        border-radius: 50%;
                        pointer-events: none;
                    }

                    .hero-banner::after {
                        content: '';
                        position: absolute;
                        bottom: -30%;
                        left: 10%;
                        width: 300px;
                        height: 300px;
                        background: rgba(255, 215, 0, 0.08);
                        border-radius: 50%;
                        pointer-events: none;
                    }

                    .hero-content {
                        position: relative;
                        z-index: 2;
                        color: #fff;
                        max-width: 600px;
                    }

                    .hero-badge {
                        display: inline-block;
                        background: rgba(231, 76, 60, 0.9);
                        color: #fff;
                        font-size: 0.75rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        padding: 6px 16px;
                        border-radius: 50px;
                        margin-bottom: 16px;
                    }

                    .hero-title {
                        font-size: 2.8rem;
                        font-weight: 800;
                        line-height: 1.2;
                        margin-bottom: 16px;
                    }

                    .hero-title span {
                        color: #e74c3c;
                    }

                    .hero-description {
                        font-size: 1.1rem;
                        color: rgba(255,255,255,0.8);
                        margin-bottom: 24px;
                        line-height: 1.6;
                    }

                    .hero-buttons .btn-hero-primary {
                        background: #e74c3c;
                        color: #fff;
                        border: none;
                        padding: 12px 32px;
                        border-radius: 50px;
                        font-weight: 700;
                        font-size: 0.95rem;
                        transition: all 0.3s;
                        text-decoration: none;
                        display: inline-block;
                    }

                    .hero-buttons .btn-hero-primary:hover {
                        background: #c0392b;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
                    }

                    .hero-buttons .btn-hero-secondary {
                        background: transparent;
                        color: #fff;
                        border: 2px solid rgba(255,255,255,0.3);
                        padding: 12px 32px;
                        border-radius: 50px;
                        font-weight: 700;
                        font-size: 0.95rem;
                        transition: all 0.3s;
                        text-decoration: none;
                        display: inline-block;
                        margin-left: 12px;
                    }

                    .hero-buttons .btn-hero-secondary:hover {
                        border-color: #fff;
                        background: rgba(255,255,255,0.1);
                    }

                    .hero-image {
                        position: absolute;
                        right: 40px;
                        bottom: 0;
                        z-index: 1;
                        opacity: 0.15;
                        font-size: 12rem;
                        color: #fff;
                    }

                    /* Responsive */
                    @media (max-width: 768px) {
                        .hero-banner {
                            padding: 40px 24px;
                            min-height: 220px;
                            text-align: center;
                        }

                        .hero-title {
                            font-size: 1.8rem;
                        }

                        .hero-description {
                            font-size: 0.95rem;
                        }

                        .hero-buttons .btn-hero-primary,
                        .hero-buttons .btn-hero-secondary {
                            padding: 10px 20px;
                            font-size: 0.85rem;
                            display: block;
                            width: 100%;
                            margin-left: 0;
                            margin-top: 10px;
                        }

                        .hero-image {
                            display: none;
                        }
                    }

                    @media (max-width: 576px) {
                        .hero-banner {
                            padding: 30px 16px;
                            min-height: 180px;
                            border-radius: 12px;
                        }

                        .hero-title {
                            font-size: 1.4rem;
                        }

                        .hero-badge {
                            font-size: 0.65rem;
                            padding: 4px 12px;
                        }
                    }
                `}
            </style>

            <section className="hero-banner">
                {/* Decoration Icon */}
                <div className="hero-image">
                    <i className="fa-solid fa-crown"></i>
                </div>

                <div className="hero-content">
                    <span className="hero-badge">
                        <i className="fa-solid fa-fire me-1"></i> Sale 50% Off
                    </span>

                    <h1 className="hero-title">
                        Thời Trang <span>Cao Cấp</span>
                    </h1>

                    <p className="hero-description">
                        Bộ sưu tập mới nhất với thiết kế tinh tế, chất liệu cao cấp
                        dành cho phái đẹp công sở và dạ hội.
                    </p>

                    <div className="hero-buttons">
                        <a href="/shop" className="btn-hero-primary">
                            <i className="fa-solid fa-bag-shopping me-2"></i> Mua ngay
                        </a>
                        <a href="/collection" className="btn-hero-secondary">
                            <i className="fa-regular fa-eye me-2"></i> Xem bộ sưu tập
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroBanner;