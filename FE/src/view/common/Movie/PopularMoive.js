import React, {useEffect} from 'react';

const PopularMoive = () => {
    useEffect(() => {
        const $ = window.$;
        $(document).ready(function () {
            $('.owl-four').owlCarousel({
                loop: true,
                margin: 20,
                nav: false,
                responsiveClass: true,
                autoplay: false,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                autoplayHoverPause: false,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    480: {
                        items: 2,
                        nav: true
                    },
                    667: {
                        items: 2,
                        nav: true
                    },
                    1000: {
                        items: 2,
                        nav: true
                    }
                }
            })
        });


    }, []);
    return <div>
        <section className="w3l-grids">
            <div className="grids-main py-4">
                <div className="container py-lg-4">
                    <div className="headerhny-title">
                        <h3 className="hny-title">Popular Movies</h3>
                    </div>
                    <div className="owl-four owl-carousel owl-theme">
                        <div className="item vhny-grid">
                            <div className="box16">
                                <a href="https://www.google.com/">
                                    <figure>
                                        <img className="img-fluid" src="assets/images/banner1.jpg" alt=""/>
                                    </figure>
                                    <div className="box-content">
                                        <h3 className="title">End Game</h3>
                                        <h4> <span className="post"><span className="fa fa-clock-o"> </span> 1 Hr 4min

										</span>

                                            <span className="post fa fa-heart text-right"></span>
                                        </h4>
                                    </div>
                                    <span className="fa fa-play video-icon" aria-hidden="true"></span>
                                </a>
                            </div>
                            <div className="box16 mt-4">
                                <a href="https://www.google.com/">
                                    <figure>
                                        <img className="img-fluid" src="assets/images/banner2.jpg" alt=""/>
                                    </figure>
                                    <div className="box-content">
                                        <h3 className="title">Frozen 2</h3>
                                        <h4> <span className="post"><span className="fa fa-clock-o"> </span> 1 Hr 4min

										</span>

                                            <span className="post fa fa-heart text-right"></span>
                                        </h4>
                                    </div>
                                    <span className="fa fa-play video-icon" aria-hidden="true"></span>
                                </a>
                            </div>
                        </div>
                        <div className="item vhny-grid">
                            <div className="box16">
                                <a href="https://www.google.com/">
                                    <figure>
                                        <img className="img-fluid" src="assets/images/banner3.jpg" alt=""/>
                                    </figure>
                                    <div className="box-content">
                                        <h3 className="title">Doctor Sleep</h3>
                                        <h4> <span className="post"><span className="fa fa-clock-o"> </span> 1 Hr 4min

										</span>

                                            <span className="post fa fa-heart text-right"></span>
                                        </h4>
                                    </div>
                                    <span className="fa fa-play video-icon" aria-hidden="true"></span>
                                </a>
                            </div>
                            <div className="box16 mt-4">
                                <a href="https://www.google.com/">
                                    <figure>
                                        <img className="img-fluid" src="assets/images/banner4.jpg" alt=""/>
                                    </figure>
                                    <div className="box-content">
                                        <h3 className="title">Toy story 4</h3>
                                        <h4> <span className="post"><span className="fa fa-clock-o"> </span> 1 Hr 4min

										</span>

                                            <span className="post fa fa-heart text-right"></span>
                                        </h4>
                                    </div>
                                    <span className="fa fa-play video-icon" aria-hidden="true"></span>
                                </a>
                            </div>
                        </div>
                        <div className="item vhny-grid">
                            <div className="box16">
                                <a href="https://www.google.com/">
                                    <figure>
                                        <img className="img-fluid" src="assets/images/banner1.jpg" alt=""/>

                                    </figure>
                                    <div className="box-content">
                                        <h3 className="title">Rocketman</h3>
                                        <h4> <span className="post"><span className="fa fa-clock-o"> </span> 1 Hr 4min

										</span>

                                            <span className="post fa fa-heart text-right"></span>
                                        </h4>
                                    </div>
                                    <span className="fa fa-play video-icon" aria-hidden="true"></span>
                                </a>
                            </div>
                            <div className="box16 mt-4">
                                <a href="https://www.google.com/">
                                    <figure>
                                        <img className="img-fluid" src="assets/images/banner2.jpg" alt=""/>
                                    </figure>
                                    <div className="box-content">
                                        <h3 className="title">Frozen 2</h3>
                                        <h4> <span className="post"><span className="fa fa-clock-o"> </span> 1 Hr 4min

										</span>

                                            <span className="post fa fa-heart text-right"></span>
                                        </h4>
                                    </div>
                                    <span className="fa fa-play video-icon" aria-hidden="true"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
};
export default PopularMoive;