import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import LatestMovie from "./common/Movie/LatestMovie";

export function Movie(props){
    return(
        <div>
            <title>Danh sách phim</title>
            <Header></Header>
            {/*Popular Movies*/}
            <div className="w3l-breadcrumbs">
                <nav id="breadcrumbs" className="breadcrumbs">
                    <div className="container page-wrapper">
                        <a href="#">Trang chủ</a> » <span className="breadcrumb_last"
                                                              aria-current="page">Phim</span>
                    </div>
                </nav>
            </div>
            {/*<PopularMoive></PopularMoive>*/}
            <LatestMovie></LatestMovie>
            {/*<HorizontalTab></HorizontalTab>*/}
            <Footer></Footer>
        </div>
    );
}

export default Movie;