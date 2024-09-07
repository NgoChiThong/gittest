import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Helmet } from "react-helmet";
import {loadScript} from "./utils";

// import "../Template/css/stylet.css";

export function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:80/movies/${id}`);
                const data = await response.json();
                if (response.ok && data.status === "OK") {
                    setMovie(data.data);
                } else {
                    console.error("Failed to fetch movie data");
                }
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        if (id) {
            fetchMovie();
        }
    }, [id]);

    console.log(movie)
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "/assets/css/style.css";
        document.head.appendChild(link);


        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = "/assets/css/plugins.css";
        document.head.appendChild(link1);

        return () => {
            document.head.removeChild(link);
            document.head.removeChild(link1);

        };
    }, []);
    if (!movie) {
        return <div>


            <div className="loader"></div>


        </div>;
    }
    const formattedDate = movie.movieRelease.split('-').reverse().join('-');
    return(
        <div>
            <title>{movie.movieName}</title>
            <Helmet></Helmet>
            <Header></Header>

            <div>
                <nav id="breadcrumbs" className="breadcrumbs">
                    <div className="container page-wrapper">
                        <div className="w3l-breadcrumbs">
                            <div className="buster-light">
                                <div className="hero mv-single-hero" style={{ backgroundImage: `url(../assets/images/bga1.jpg)`,}}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="page-single movie-single movie_single" style={{paddingBottom: "0px"}}>
                                    <div className="container">
                                        <div className="row ipad-width2">
                                            <div className="col-md-4 col-sm-12 col-xs-12">
                                                <div className="movie-img sticky-sb">
                                                    <img src={movie.moviePoster} alt={movie.movieName}/>
                                                    <div className="movie-btn">
                                                        <div className="btn-transform transform-vertical red">
                                                            <div><a href="#" style={{color: "white"}} className="item item-1 redbtn"> <i
                                                                className="ion-play"></i>Xem Trailer</a></div>
                                                            <div><a href={movie.movieTrailer}
                                                                    className="item item-2 redbtn fancybox-media hvr-grow"><i
                                                                className="ion-play"></i></a></div>
                                                        </div>
                                                        <div className="btn-transform transform-vertical">
                                                            <Link to={`/booking/${movie.movieId}`}>
                                                            <div><a href="#" className="item item-1 yellowbtn"> <i
                                                                className="ion-card"></i>Đặt vé</a></div>
                                                            <div><a href="#" className="item item-2 yellowbtn"><i
                                                                className="ion-card"></i></a></div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-sm-12 col-xs-12">
                                                <div className="movie-single-ct main-content">
                                                    <h1 className="bd-hd" style={{  paddingTop:"50px"}}>{movie.movieName}
                                                    </h1>
                                                    <div className="social-btn">
                                                        <a href="#" className="parent-btn"><i
                                                            className="ion-heart"></i> Thêm vào yêu thích</a>
                                                        <div className="hover-bnt" style={{marginLeft: "20px"}}>
                                                            <a href="#" className="parent-btn"><i
                                                                className="ion-android-share-alt"></i>Chia sẻ</a>
                                                            <div className="hvr-item">
                                                                <a href="#" className="hvr-grow"><i
                                                                    className="ion-social-facebook"></i></a>
                                                                <a href="#" className="hvr-grow"><i
                                                                    className="ion-social-twitter"></i></a>
                                                                <a href="#" className="hvr-grow"><i
                                                                    className="ion-social-googleplus"></i></a>
                                                                <a href="#" className="hvr-grow"><i
                                                                    className="ion-social-youtube"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="movie-rate" style={{border: "none"}}>
                                                        <div className="rate">
                                                        {/*    <i className="ion-android-star"></i>*/}
                                                        {/*    <p><span>8.1</span> /10<br/>*/}
                                                        {/*        <span className="rv">56 Reviews</span>*/}
                                                        {/*    </p>*/}
                                                        </div>
                                                        <div className="rate-star" style={{border: "none"}}>
                                                        {/*    <p>Rate This Movie: </p>*/}
                                                        {/*    <i className="ion-ios-star"></i>*/}
                                                        {/*    <i className="ion-ios-star"></i>*/}
                                                        {/*    <i className="ion-ios-star"></i>*/}
                                                        {/*    <i className="ion-ios-star"></i>*/}
                                                        {/*    <i className="ion-ios-star"></i>*/}
                                                        {/*    <i className="ion-ios-star"></i>*/}
                                                        {/*    <i className="ion-ios-star"></i>*/}
                                                        {/*    <i className="ion-ios-star"></i>*/}
                                                        {/*    <i className="ion-ios-star-outline"></i>*/}
                                                        </div>
                                                    </div>
                                                    <div className="movie-tabs">
                                                        <div className="tabs" style={{paddingTop: "20px"}}>
                                                            <ul className="tab-links tabs-mv">
                                                                <li className={activeTab === 'overview' ? 'active' : ''}>
                                                                    <a  style={{
                                                                        textDecoration: 'none',
                                                                        color: "#df0e62",
                                                                    }}
                                                                        href="#overview"
                                                                        onClick={() => handleTabClick('overview')}>Giới thiệu</a>
                                                                </li>
                                                                <li className={activeTab === 'reviews' ? 'active' : ''}>
                                                                    <a  style={{
                                                                        textDecoration: 'none',
                                                                        color: "#df0e62",
                                                                    }}
                                                                        href="#reviews"
                                                                        onClick={() => handleTabClick('reviews')}>Đánh giá</a>
                                                                </li>
                                                                {/*<li className={activeTab === 'cast' ? 'active' : ''}><a*/}
                                                                {/*    style={{*/}
                                                                {/*        textDecoration: 'none',*/}
                                                                {/*        color: "#df0e62",*/}
                                                                {/*    }}*/}
                                                                {/*    href="#cast"*/}
                                                                {/*    onClick={() => handleTabClick('cast')}>Cast*/}
                                                                {/*    & Crew</a></li>*/}
                                                                {/*<li className={activeTab === 'media' ? 'active' : ''}><a*/}
                                                                {/*    style={{*/}
                                                                {/*        textDecoration: 'none' ,*/}
                                                                {/*        color: "#df0e62",*/}
                                                                {/*    }}*/}
                                                                {/*    href="#media"*/}
                                                                {/*    onClick={() => handleTabClick('media')}>Media</a>*/}
                                                                {/*</li>*/}
                                                                {/*<li className={activeTab === 'moviesrelated' ? 'active' : ''}>*/}
                                                                {/*    <a*/}
                                                                {/*        style={{*/}
                                                                {/*            textDecoration:  'none',*/}
                                                                {/*            color: "#df0e62",*/}
                                                                {/*        }}*/}
                                                                {/*        href="#moviesrelated"*/}
                                                                {/*        onClick={() => handleTabClick('moviesrelated')}>Related*/}
                                                                {/*        Movies</a>*/}
                                                                {/*</li>*/}
                                                            </ul>
                                                            <div className="tab-content">
                                                                <div className="tab review"
                                                                     style={{display: activeTab === 'overview' ? 'block' : 'none'}}
                                                                     id="overview">
                                                                    <div className="row">
                                                                        <div className="col-md-8 col-sm-12 col-xs-12">
                                                                            <p>{movie.movieDescription}</p>
                                                                            <div className="mvsingle-item ov-item">

                                                                            </div>
                                                                            <div className="title-hd-sm">
                                                                                <h4></h4>
                                                                                {/*<a href="#" className="time"><i*/}
                                                                                {/*        className="ion-ios-arrow-right"></i></a>*/}
                                                                            </div>

                                                                            <div className="mvcast-item">

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4 col-xs-12 col-sm-12">
                                                                            <div className="sb-it">
                                                                                <h6>Thể loại: </h6>
                                                                                <p>{movie.movieGenres}</p>
                                                                            </div>
                                                                            <div className="sb-it">
                                                                                <h6>Định dạng: </h6>
                                                                                <p> {movie.movieFormat}
                                                                                </p>
                                                                            </div>
                                                                            <div className="sb-it">
                                                                                <h6>Phân loại phim: </h6>
                                                                                <p>{movie.movieCens}</p>
                                                                            </div>
                                                                            <div className="sb-it">
                                                                                <h6>Thời lượng:</h6>
                                                                                <p>{movie.movieLength} phút</p>
                                                                            </div>
                                                                            <div className="sb-it">
                                                                                <h6>Ngày phát hành:</h6>
                                                                                <p>{formattedDate}</p>
                                                                            </div>
                                                                            <div className="ads">

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/*<div className="tab review"*/}
                                                                {/*     style={{display: activeTab === 'moviesrelated' ? 'block' : 'none'}}*/}
                                                                {/*     id="moviesrelated">*/}

                                                                {/*</div>*/}
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
                    </div>
                </nav>
            </div>
            <Footer></Footer>
        </div>

    );
}

export default MovieDetail;