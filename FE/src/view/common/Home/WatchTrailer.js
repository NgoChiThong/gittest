import React,{useEffect} from "react";

const WatchTrailer = () => {
    useEffect(() => {
        const $ = window.$;

        $(document).ready(function () {
            $('.owl-mid').owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                responsiveClass: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                autoplayHoverPause: false,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    480: {
                        items: 1,
                        nav: false
                    },
                    667: {
                        items: 1,
                        nav: true
                    },
                    1000: {
                        items: 1,
                        nav: true
                    }
                }
            })
        });
    }, []);

    return <div>
        <div className="companies20-content">
            <div className="owl-mid owl-carousel owl-theme">
                <div className="item">
                    <li>
                        <div className="slider-info mid-view bg bg2" style={{
                            backgroundImage: `url(https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2FBanner_web_2_.png&w=1920&q=75)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            // minHeight: '400px',
                            position: 'relative',
                            zIndex: 0,
                            display: 'grid',
                            alignItems: 'center',
                        }}>
                        </div>
                    </li>
                </div>

                <div className="item">
                    <li>
                        <div className="slider-info mid-view bg bg2" style={{
                            backgroundImage: `url(https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2F1215x560.jpg&w=1920&q=75)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            // minHeight: '400px',
                            position: 'relative',
                            zIndex: 0,
                            display: 'grid',
                            alignItems: 'center',
                        }}>
                        </div>
                    </li>
                </div>

                <div className="item">
                    <li>
                        <div className="slider-info mid-view bg bg2" style={{
                            backgroundImage: `url(https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2FMageINIC%2Fbannerslider%2F1215x365_1_.jpg&w=1920&q=75)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            // minHeight: '400px',
                            position: 'relative',
                            zIndex: 0,
                            display: 'grid',
                            alignItems: 'center',
                        }}>
                        </div>
                    </li>
                </div>

            </div>
        </div>
    </div>
}
export default WatchTrailer;