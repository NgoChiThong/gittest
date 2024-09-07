import React, {useEffect, useState} from 'react';

const LatestMovie = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
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
    useEffect(() => {
        let isMounted = true;

        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:80/movies');
                const data = await response.json();

                if (isMounted) {
                    if (data.status === 'OK') {
                        setMovies(data.data);
                        // console.log('Movies:', data.data);
                    } else {
                        console.error('Error fetching movies:', data.msg);
                    }
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching movies:', error);
                    setLoading(false);
                }
            }
        };

        fetchMovies();

        return () => {
            isMounted = false;
        };
    }, []);
    return <div>
        <section className="w3l-grids">
            <div className="grids-main py-5">
                <div className="container py-lg-4">
                    <div className="headerhny-title">
                        <div className="w3l-title-grids">
                            <div className="headerhny-left">
                                <h3 className="hny-title">Tất cả phim</h3>
                            </div>
                            <div className="headerhny-right text-lg-right">
                            </div>
                        </div>
                    </div>
                    <div className="w3l-populohny-grids">
                        {movies.map((movie) => (
                        <div className="item vhny-grid" key={movie.movieId}>
                            <div className="box16 mb-0">
                                <figure>
                                    <img className="img-fluid" src={movie.moviePoster} alt={movie.movieName}></img>
                                </figure>
                                <a href={`.Commando3-${movie.movieId}`} data-toggle="modal">
                                <div className="box-content">
                                        <h3 className="title">{movie.movieName}</h3>
                                        <h4> <span className="post"><span className="fa fa-clock-o"> </span> {movie.movieLength}

										</span>

                                            <span className="post fa fa-heart text-right"></span>
                                        </h4>
                                    </div>
                                </a>
                                 {/* Modal */}
                                <div  className={`modal fade Commando3-${movie.movieId}`} id={`modal-${movie.movieId}`} tabIndex="-1" role="dialog"
                                     aria-hidden="true" style={{paddingTop: "100px"}}>
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content" id={movie.movieId}>
                                            <div className="modal-header">
                                                <h4 className="modal-title" id="exampleModalLongTitle">{movie.movieName}</h4>
                                                <button type="button" className="closebtn" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body" id="dynamic-content">
                                                <img src={movie.moviePoster} className="img-fluid modalimg"
                                                     alt=""/>
                                                <p>
                                                    <h3 style={{fontSize: "medium"}}>Ngày phát
                                                        hành&nbsp;:{movie.movieRelease.split('-').reverse().join('-')}</h3>

                                                </p>
                                                <h4 style={{fontSize: "medium"}}>Nội dung phim</h4>
                                                <p>
                                                    {movie.movieDescription}
                                                </p>
                                                <h4 style={{fontSize: "medium"}}>Thể loại: </h4>
                                                <p>{movie.movieGenres}</p>
                                                <h4 style={{fontSize: "medium"}}>Thời lượng: </h4>
                                                <p>{movie.movieLength} phút</p>
                                                <h4 style={{fontSize: "medium"}}>Phân loại phim: </h4>
                                                <p>{movie.movieCens}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* modal end */}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
}
export default LatestMovie;