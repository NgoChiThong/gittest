import React, { useState, useEffect } from 'react';

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            if (window.pageYOffset > 20) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button onClick={scrollToTop} id="movetop" title="Go to top" style={{ display: isVisible ? 'block' : 'none' }}>
            <span className="fa fa-arrow-up" aria-hidden="true"></span>
        </button>
    );
}
export function Footer(){
    return (
            <footer className="w3l-footer">
                <section className="footer-inner-main">
                    <div className="footer-hny-grids py-5">
                        <div className="container py-lg-4">
                            <div className="text-txt">
                                <div className="right-side">

                                    <div className="row footer-links">
                                        <div className="col-md-3 col-sm-6 sub-two-right mt-5">
                                            <h6>Phim</h6>
                                            <ul>
                                                <li><a style={{color: "white"}} href="#">Phim đang chiếu</a></li>
                                                <li><a style={{color: "white"}} href="#">Phim sắp chiếu</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-3 col-sm-6 sub-two-right mt-5">
                                            <h6>Thông tin</h6>
                                            <ul>
                                                <li><a style={{color: "white"}} href="#">Trang chủ</a></li>
                                                <li><a style={{color: "white"}} href="#"a>Giới thiệu</a></li>
                                                <li><a style={{color: "white"}} href="#">Liên hệ</a></li>
                                                <li><a style={{color: "white"}} href="#">Chính sách</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-3 col-sm-6 sub-two-right mt-5">
                                            <h6>Chăm sóc khách hàng</h6>
                                            <ul>
                                                <li>
                                                    <h7 style={{color: "white"}}>Hotline: 1900 6017.</h7>
                                                </li>
                                                <li>
                                                    <h7 style={{color: "white"}}>Giờ làm việc: 8:00 - 22:00 (Tất cả các
                                                        ngày bao gồm cả Lễ Tết).
                                                    </h7>
                                                </li>
                                                <li>
                                                    <h7 style={{color: "white"}}>Email hỗ trợ: hoidap@myshowz.vn</h7>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-3 col-sm-6 sub-two-right mt-5">
                                            <h6>Đăng ký nhận thông tin</h6>
                                            <form action="#" className="subscribe mb-3" method="post">
                                                <input type="email" name="email" placeholder="Email của bạn"
                                                       required=""/>
                                                <button><span className="fa fa-envelope-o"></span></button>
                                            </form>
                                            <p style={{color: "white"}}>Đăng ký để nhận thông tin mới nhất từ chúng tôi!!!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="below-section">
                        <div className="container">
                            <div className="copyright-footer">
                                <div className="columns text-lg-left">
                                    <p>&copy; 2024 LuxCinema.vn  All rights reserved.</p>
                                </div>

                                <ul className="social text-lg-right">
                                    <li>
                                        <a href="https://www.facebook.com">
                                            <span className="fa fa-facebook" aria-hidden="true"></span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://www.linkedin.com/">
                                            <span className="fa fa-linkedin" aria-hidden="true"></span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://x.com/">
                                            <span className="fa fa-twitter" aria-hidden="true"></span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://www.instagram.com/">
                                            <span className="fa fa-instagram" aria-hidden="true"></span>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <ScrollToTopButton />
                </section>
            </footer>
    )
}

export default Footer;