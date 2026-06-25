import React from 'react';

const Footer = () => {
    return (
        <>
        <style>
        {`
                    .footer {
                        background: #1a1a2e;
                        color: #e0e0e0;
                        padding: 50px 0 0 0;
                        margin-top: 40px;
                    }
                    .footer h5 {
                        color: #fff;
                        font-weight: 700;
                        margin-bottom: 20px;
                        font-size: 1.1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    .footer h5::after {
                        content: '';
                        display: block;
                        width: 40px;
                        height: 2px;
                        background: #e74c3c;
                        margin-top: 8px;
                    }
                    .footer a {
                        color: #b0b0b0;
                        text-decoration: none;
                        transition: color 0.3s;
                        display: block;
                        padding: 4px 0;
                        font-size: 0.95rem;
                    }
                    .footer a:hover {
                        color: #fff;
                    }
                    .footer .social-icon {
                        display: inline-block;
                        width: 38px;
                        height: 38px;
                        line-height: 38px;
                        text-align: center;
                        background: rgba(255,255,255,0.1);
                        border-radius: 50%;
                        color: #fff;
                        margin-right: 8px;
                        transition: all 0.3s;
                        font-size: 0.9rem;
                    }
                    .footer .social-icon:hover {
                        background: #e74c3c;
                        transform: translateY(-3px);
                    }
                    .footer .footer-bottom {
                        background: #14142a;
                        padding: 15px 0;
                        margin-top: 30px;
                        font-size: 0.85rem;
                        color: #888;
                    }
                    .footer .footer-bottom a {
                        display: inline-block;
                        padding: 0 10px;
                        color: #888;
                    }
                    .footer .footer-bottom a:hover {
                        color: #fff;
                    }
                    .footer .payment-icon {
                        font-size: 1.8rem;
                        color: #888;
                        margin-right: 12px;
                        transition: color 0.3s;
                    }
                    .footer .payment-icon:hover {
                        color: #fff;
                    }
                    .footer .contact-info i {
                        width: 25px;
                        color: #e74c3c;
                    }
                    @media (max-width: 768px) {
                        .footer {
                            padding: 30px 0 0 0;
                        }
                        .footer h5 {
                            margin-top: 20px;
                        }
                    }
                `}
</style>

    < footer className = "footer" >
        <div className="container" >
            <div className="row" >
                {/* Column 1: About */ }
                < div className = "col-lg-4 col-md-6 mb-4" >
                    <h5>Về chúng tôi < /h5>
                        < p className = "text-muted" style = {{ fontSize: '0.95rem' }}>
                            FashionBoutique là thương hiệu thời trang cao cấp,
                                chuyên cung cấp các sản phẩm thời trang công sở
                                và dạ hội chất lượng cao.
                            < /p>
    < div className = "mt-3" >
        <a href="#" className = "social-icon" >
            <i className="fa-brands fa-facebook-f" > </i>
                < /a>
                < a href = "#" className = "social-icon" >
                    <i className="fa-brands fa-instagram" > </i>
                        < /a>
                        < a href = "#" className = "social-icon" >
                            <i className="fa-brands fa-youtube" > </i>
                                < /a>
                                < a href = "#" className = "social-icon" >
                                    <i className="fa-brands fa-tiktok" > </i>
                                        < /a>
                                        < /div>
                                        < /div>

{/* Column 2: Quick Links */ }
<div className="col-lg-2 col-md-6 mb-4" >
    <h5>Liên kết < /h5>
        < a href = "#" > Trang chủ < /a>
            < a href = "#" > Sản phẩm < /a>
                < a href = "#" > Giới thiệu < /a>
                    < a href = "#" > Liên hệ < /a>
                        < a href = "#" > Blog < /a>
                            < /div>

{/* Column 3: Customer Service */ }
<div className="col-lg-2 col-md-6 mb-4" >
    <h5>Hỗ trợ < /h5>
        < a href = "#" > Hướng dẫn mua hàng < /a>
            < a href = "#" > Chính sách đổi trả < /a>
                < a href = "#" > Chính sách bảo mật < /a>
                    < a href = "#" > Vận chuyển & giao hàng < /a>
                        < a href = "#" > Câu hỏi thường gặp < /a>
                            < /div>

{/* Column 4: Contact */ }
<div className="col-lg-4 col-md-6 mb-4" >
    <h5>Liên hệ < /h5>
        < div className = "contact-info" >
            <p>
            <i className="fa-solid fa-location-dot" > </i>
123 Đường Thời Trang, Quận 1, TP.HCM
    < /p>
    < p >
    <i className="fa-solid fa-phone" > </i>
        (028) 1234 5678
            < /p>
            < p >
            <i className="fa-solid fa-envelope" > </i>
                                    info @fashionboutique.com
</p>
    < p >
    <i className="fa-solid fa-clock" > </i>
                                    Thứ 2 - Chủ nhật: 8:00 - 21:00
    < /p>
    < /div>
    < div className = "mt-3" >
        <span className="payment-icon" >
            <i className="fa-brands fa-cc-visa" > </i>
                < /span>
                < span className = "payment-icon" >
                    <i className="fa-brands fa-cc-mastercard" > </i>
                        < /span>
                        < span className = "payment-icon" >
                            <i className="fa-brands fa-cc-paypal" > </i>
                                < /span>
                                < span className = "payment-icon" >
                                    <i className="fa-brands fa-cc-apple-pay" > </i>
                                        < /span>
                                        < /div>
                                        < /div>
                                        < /div>

{/* Bottom Bar */ }
<div className="footer-bottom" >
    <div className="container" >
        <div className="row align-items-center" >
            <div className="col-md-6 text-center text-md-left" >
                <span>
                                        © 2026 FashionBoutique.All Rights Reserved.
                                        Designed by < strong > Nguyễn Cao Thái < /strong>
    < /span>
    < /div>
    < div className = "col-md-6 text-center text-md-right" >
        <a href="#" > Privacy Policy < /a>
            < a href = "#" > Terms of Service < /a>
                < a href = "#" > Sitemap < /a>
                    < /div>
                    < /div>
                    < /div>
                    < /div>
                    < /div>
                    < /footer>
                    < />
    );
};

export default Footer;