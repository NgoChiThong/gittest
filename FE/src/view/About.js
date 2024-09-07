import React, { useEffect } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";

export function About(props){

    useEffect(() => {
        const $ = window.$;
        window.onload = function() {
            $('.counter').countUp();
        };
        $(document).ready(function () {
            $(".owl-clients").owlCarousel({
                loop: true,
                margin: 40,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    736: {
                        items: 2,
                        nav: false
                    },
                    1000: {
                        items: 3,
                        nav: true,
                        loop: false
                    }
                }
            });
        });

    }, []);
    return(
        <div>
            <title>Về chúng tôi</title>
            <Header></Header>
            <div className="w3l-breadcrumbs">
                <nav id="breadcrumbs" className="breadcrumbs">
                    <div className="container page-wrapper">
                        <a href="#">Trang chủ</a> » <span className="breadcrumb_last"
                                                              aria-current="page">Giới thiệu</span>
                    </div>
                </nav>
            </div>
            <div className="w3l-ab-grids py-5">

                <div className="container py-lg-4">
                    <div className="row ab-grids-sec align-items-center">
                        <div className="col-lg-6 ab-right">
                            {/*<img src="assets/images/banner1.jpg" alt="" className="img-fluid" />*/}
                            <img
                                src="https://issacoustics.com/wp-content/uploads/2023/05/CGV-Xuan-Dieu-3.jpg"
                                alt="" className="img-fluid"/>
                        </div>
                        <div className="col-lg-6 ab-left pl-lg-4 mt-lg-0 mt-5">
                            <h3 className="hny-title">LuxCinema.vn</h3>
                            <p className="mt-3">Cinestar là một trong những hệ thống rạp chiếu phim được yêu thích nhất tại Việt Nam, cung cấp nhiều mô hình giải trí hấp dẫn bao gồm Các Cụm Rạp Chiếu Phim hiện đại, Nhà hát, Khu vui chơi trẻ em Kidzone, Bowling, Billiards, Games, Phòng Gym, Nhà Hàng, và Phố Bia C'Beer. Với mục tiêu trở thành điểm đến giải trí cho mọi gia đình Việt Nam, Cinestar đang được biết đến là cụm rạp ủng hộ phim Việt, góp phần phát triển điện ảnh Việt. Không chỉ chiếu các bộ phim bom tấn quốc tế, Cinestar còn đồng hành cùng các nhà làm phim Việt Nam, đưa những tác phẩm điện ảnh đặc sắc của Việt Nam đến gần hơn với khán giả. .</p>
                        </div>
                    </div>

                    <div className="w3l-counter-stats-info text-center">
                        <div className="stats_left">
                            <div className="counter_grid">
                                <div className="icon_info">
                                    <p className="counter">365</p>
                                    <h4>Bộ phim</h4>

                                </div>
                            </div>
                        </div>
                        <div className="stats_left">
                            <div className="counter_grid">
                                <div className="icon_info">
                                    <p className="counter">165</p>
                                    <h4>Chương trình</h4>

                                </div>
                            </div>
                        </div>
                        <div className="stats_left">
                            <div className="counter_grid">
                                <div className="icon_info">
                                    <p className="counter">463</p>
                                    <h4>Nhân viên</h4>

                                </div>
                            </div>
                        </div>
                        <div className="stats_left">
                            <div className="counter_grid">
                                <div className="icon_info">
                                    <p className="counter">5963</p>
                                    <h4>Khách hàng</h4>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer></Footer>
            {/* Nhúng các tệp script vào đây */}
            {/*<script src="assets/js/jquery.waypoints.min.js"></script>*/}
            {/*<script src="assets/js/jquery.countup.js"></script>*/}
            {/*<script type="text/javascript" src='assets/js/swiper.min.js'></script>*/}
            {/*<script>{`*/}
            {/*    $(document).ready(function() {*/}
            {/*        $('.counter').countUp();*/}
            {/*    });*/}
            {/*`}</script>*/}
        </div>
    );
}

export default About;