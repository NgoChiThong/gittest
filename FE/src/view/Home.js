import React, {useEffect, useState} from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import BannerSlider from './common/Home/BannerSlider';
import NewReleases from "./common/Home/NewReleases";
import WatchTrailer from "./common/Home/WatchTrailer";
import {Link} from "react-router-dom";
export function Home(props){

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:80/movies/now');
                const data = await response.json();

                if (isMounted) {
                    if (data.status === 'OK') {
                        setMovies(data.data);
                        console.log('Movies:', data.data);
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
    return(
        <div>
            <title>Trang chủ</title>
            <Header></Header>
            <div>
                <section className="w3l-main-slider position-relative" id="home">
                    <div className="companies20-content">
                        <BannerSlider />

                    </div>
                </section>


                <section className="w3l-grids">
                    <div className="grids-main py-5">
                        <div className="container py-lg-3">
                            <div className="headerhny-title">
                                <div className="w3l-title-grids">
                                    <div className="headerhny-left">
                                        <h3 className="hny-title">Phim đang chiếu z ha</h3>
                                    </div>
                                    <div className="headerhny-right text-lg-right">
                                        <h4><a className="show-title" href="#">Xem tất cả</a></h4>
                                    </div>
                                </div>
                            </div>
                            <div className="w3l-populohny-grids">
                                {movies.map((movie) => (
                                <div className="item vhny-grid" key={movie.movieId}>
                                    <div className="box16">
                                        <Link to={`/detail/${movie.movieId}`}>
                                        <a>
                                            <figure>
                                                <img className="img-fluid" src={movie.moviePoster} alt={movie.movieName}></img>
                                            </figure>
                                            <div className="box-content">
                                                <h3 className="title">{movie.movieName}</h3>
                                                <h4> <span className="post"><span className="fa fa-clock-o"> </span> {movie.movieLength}

										</span>

                                                    <span className="post fa fa-heart text-right"></span>
                                                </h4>
                                            </div>
                                            <span className="fa fa-play video-icon" aria-hidden="true"></span>
                                        </a>
                                            </Link>
                                    </div>
                                </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </section>


                <section className="w3l-grids">
                        <NewReleases/>
                </section>

                <section className="w3l-mid-slider position-relative">
                  <WatchTrailer/>
                </section>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home