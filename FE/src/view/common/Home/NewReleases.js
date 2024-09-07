import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const NewReleases = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:80/movies/future');
                const data = await response.json();

                if (data.status === 'OK') {
                    setMovies(data.data);
                } else {
                    console.error('Error fetching movies:', data.msg);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (!loading) {
            const $ = window.$;
            $(document).ready(function () {
                $('.owl-three').owlCarousel({
                    loop: true,
                    margin: 20,
                    nav: false,
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplaySpeed: 1000,
                    autoplayHoverPause: false,
                    responsive: {
                        0: {
                            items: 2,
                            nav: false
                        },
                        480: {
                            items: 2,
                            nav: true
                        },
                        667: {
                            items: 3,
                            nav: true
                        },
                        1000: {
                            items: 5,
                            nav: true
                        }
                    }
                });

                $('.popup-with-zoom-anim').magnificPopup({
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    preloader: false,
                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-zoom-in'
                });

                $('.popup-with-move-anim').magnificPopup({
                    type: 'inline',
                    fixedContentPos: false,
                    fixedBgPos: true,
                    overflowY: 'auto',
                    closeBtnInside: true,
                    preloader: false,
                    midClick: true,
                    removalDelay: 300,
                    mainClass: 'my-mfp-slide-bottom'
                });
            });
        }
    }, [loading, movies]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="grids-main py-5">
                <div className="container py-lg-3">
                    <div className="headerhny-title">
                        <div className="w3l-title-grids">
                            <div className="headerhny-left">
                                <h3 className="hny-title">Phim sắp chiếu</h3>
                            </div>
                            <div className="headerhny-right text-lg-right">
                                <h4><a className="show-title" href="movies.html">Xem tất cả</a></h4>
                            </div>
                        </div>
                    </div>
                    <div className="owl-three owl-carousel owl-theme">
                        {movies.map((movie, index) => (
                            <div className="item vhny-grid" key={index}>
                                <div className="box16 mb-0">
                                    <a href={movie.movieTrailer}>
                                        <figure>
                                            <img className="img-fluid" src={movie.moviePoster} alt={movie.title}></img>
                                        </figure>
                                        <div className="box-content">
                                            <h4>
                                                <span className="post">
                                                    <span className="fa fa-clock-o"> </span> {movie.movieLength}
                                                </span>
                                                <span className="post fa fa-heart text-right"></span>
                                            </h4>
                                        </div>
                                        <span className="fa fa-play video-icon" aria-hidden="true"></span>
                                    </a>
                                </div>
                                <Link to={`/detail/${movie.movieId}`}>
                                <h3><a className="title-gd" href="movies.html">{movie.movieName}</a></h3>
                                </Link>
                                <p style={{margin: '0'}}>{movie.movieDescription ? movie.movieDescription.substring(0, 100) : ''}</p>
                                <div className="button-center text-center mt-4">
                                    <a href={movie.movieTrailer} className="btn watch-button">Xem trailer</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewReleases;