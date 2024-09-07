import React, {useEffect} from 'react';

const HorizontalTab = () => {
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
        <section className="w3l-albums py-5" id="projects">
            <div className="container py-lg-4">
                <div className="row">
                    <div className="col-lg-12 mx-auto">

                        <div id="parentHorizontalTab">
                            <ul className="resp-tabs-list hor_1">
                                <li>Recent Movies</li>
                                <li>Popular Movies</li>
                                <li>Trend Movies</li>
                                <div className="clear"></div>
                            </ul>
                            <div className="resp-tabs-container hor_1">
                                <div className="albums-content">
                                    <div className="row">

                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html">

                                                        <img src="assets/images/m6.jpg" className="img-fluid"
                                                             alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Long Shot</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m5.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Jumanji</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m4.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Little Women</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m1.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Rocketman</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m2.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Doctor Sleep</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m3.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Knives Out</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/n1.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <span className="fa fa-play video-icon"
                                                              aria-hidden="true"></span>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">No Time to
                                                        Die</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/n2.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Mulan</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/n3.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Free Guy</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="albums-content">
                                    <div className="row">

                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m1.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Rocketman</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m2.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Doctor Sleep</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m3.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Knives Out</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m7.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Frozen 2</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m8.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Toy Story 4</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m9.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Joker</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="albums-content">
                                    <div className="row">

                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m7.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Frozen 2</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m8.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Toy Story 4</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m9.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Joker</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m10.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">Alita</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min
													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m11.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">The Lego</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min
													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4 new-relise-gd mt-lg-0 mt-0">
                                            <div className="slider-info">
                                                <div className="img-circle">
                                                    <a href="movies.html"><img src="assets/images/m12.jpg"
                                                                               className="img-fluid"
                                                                               alt="author image"/>
                                                        <div className="overlay-icon">

                                                            <span className="fa fa-play video-icon"
                                                                  aria-hidden="true"></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="message">
                                                    <p>English</p>
                                                    <a className="author-book-title" href="movies.html">The Hustle</a>
                                                    <h4> <span className="post"><span className="fa fa-clock-o"> </span> 2 Hr 4min

													</span>

                                                        <span className="post fa fa-heart text-right"></span>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}
export default HorizontalTab;