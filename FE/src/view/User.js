import React, { useEffect, useState } from "react";
import {Link, useHistory, useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./common/Header";
import Footer from "./common/Footer";

export function User(){

    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();  // Using useNavigate hook for navigation
    const [tickets, setTickets] = useState([]);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    console.log("userInfo", userInfo);

    const token = sessionStorage.getItem('token');
    console.log(token);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "/assets/css/style.css";
        document.head.appendChild(link);

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = "/assets/css/plugins.css";
        document.head.appendChild(link2);

        const link3 = document.createElement("link");
        link3.rel = "stylesheet";
        link3.type = "text/css";
        link3.href = "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,600&display=swap";
        document.head.appendChild(link3);

        return () => {
            document.head.removeChild(link);
            document.head.removeChild(link2);
        };
    }, []);
    //nút đăng xuất
    const handleLogout = () => {
        // Clear session storage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userInfo');

        // Redirect to login page
        // Redirect to login page
        navigate('/signin');
    };
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:80/book/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setTickets(data);
                    console.log(data);
                } else {
                    console.error('Error fetching tickets:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    function formatDate(dateString) {
        // Tách ngày, tháng và năm từ chuỗi ngày đầu vào
        const [year, month, day] = dateString.split('-');

        // Trả về chuỗi đã định dạng lại
        return `${day}-${month}-${year}`;
    }
    function formatCurrencyVND(amount) {
        let priceCopy = amount; // Tạo một bản sao của amount
        if (typeof amount !== 'number') {
            priceCopy = parseFloat(amount);
            if (isNaN(priceCopy)) {
                return null; // Trả về null nếu giá trị không thể chuyển đổi thành số
            }
        }
        return priceCopy.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    }
    function convertToTimeZone(dateString) {
        // Bước 1: Tạo đối tượng Date từ chuỗi ISO
        const date = new Date(dateString);

        // Bước 2: Chuyển đổi múi giờ +7
        // Lấy thời gian Unix timestamp và cộng thêm 7 giờ (25200 giây)
        const timeZoneOffset = 7 * 60 * 60 * 1000;
        const localDate = new Date(date.getTime() + timeZoneOffset);

        // Bước 3: Định dạng lại ngày giờ
        const hours = String(localDate.getUTCHours()).padStart(2, '0');
        const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
        const seconds = String(localDate.getUTCSeconds()).padStart(2, '0');
        const day = String(localDate.getUTCDate()).padStart(2, '0');
        const month = String(localDate.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = localDate.getUTCFullYear();

        // Kết quả cuối cùng
        const formattedDate = `${hours}:${minutes}:${seconds}  ${day}-${month}-${year}`;
        return formattedDate;
    }




    return(
        <div>
            <title>Thông tin tài khoản</title>
            <Helmet></Helmet>
            <Header></Header>

            <div>
                <nav id="breadcrumbs" className="breadcrumbs">
                    <div className="container page-wrapper">
                        <div className="w3l-breadcrumbs">
                            <div className="buster-light">
                                <div className="hero user-hero">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="hero-ct">
                                                    <h1>Thông tin cá nhân</h1>
                                                    <ul className="breadcumb">
                                                        <li className="active"><a href="#">Trang chủ</a></li>
                                                        <li><span className="ion-ios-arrow-right"></span>Thông tin cá
                                                            nhân
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="page-single">
                                    <div className="container">
                                        <div className="row ipad-width">
                                            <div className="col-md-3 col-sm-12 col-xs-12">
                                                <div className="user-information">
                                                    <div className="user-img">
                                                        <a href="#"><img src="/assets/images/user-img.png" alt=""/><br/></a>
                                                        <a href="#" className="redbtn" style={{color: "white"}}>Thay đổi
                                                            ảnh đại diện</a>
                                                    </div>
                                                    <div className="user-fav">
                                                        <p>Thông tin chung</p>
                                                        <ul>
                                                            <ul>
                                                                <li className={activeTab === 'profile' ? 'active' : ''}>
                                                                    <a href="#profile"
                                                                       onClick={() => handleTabClick('profile')}> Thông
                                                                        tin khách hàng</a>
                                                                </li>
                                                                <li className={activeTab === 'favorite' ? 'active' : ''}>
                                                                    <a href="#favorite"
                                                                       onClick={() => handleTabClick('favorite')}>Vé đã
                                                                        mua</a></li>
                                                                <li className={activeTab === 'rated' ? 'active' : ''}><a
                                                                    href="#rated"
                                                                    onClick={() => handleTabClick('rated')}>Phim yêu thích</a></li>
                                                            </ul>
                                                        </ul>
                                                    </div>
                                                    <div className="user-fav">
                                                        <ul>
                                                            <li><a href="#" onClick={handleLogout}><i className="fa fa-sign-out"></i> Đăng xuất</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {activeTab === 'profile' && (
                                                <div className="col-md-9 col-sm-12 col-xs-12">
                                                    <div className="form-style-1 user-pro" action="#">
                                                        <form action="#" className="user">
                                                            <h4>Thông tin tài khoản</h4>
                                                            <div className="row">
                                                                <div className="col-md-6 form-it">
                                                                    <label>Tên người dùng</label>
                                                                    <input type="text" placeholder="" value={userInfo.data.username}/>
                                                                </div>
                                                                <div className="col-md-6 form-it">
                                                                    <label>Địa chỉ email</label>
                                                                    <input type="text"
                                                                           placeholder="" value={userInfo.data.userEmail}/>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 form-it">
                                                                    <label>Tên</label>
                                                                    <input type="text" placeholder=" " value={userInfo.data.userFullname}/>
                                                                </div>
                                                                <div className="col-md-6 form-it">
                                                                    <label>Họ</label>
                                                                    <input type="text" placeholder=""/>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 form-it">
                                                                    <label>Số điện thoại</label>
                                                                    <input type="text" placeholder="" value={userInfo.data.userPhone}/>
                                                                </div>

                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <input className="submit" type="submit"
                                                                           value="Lưu"/>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <form action="#" className="password">
                                                            <h4>Đổi mật khẩu</h4>
                                                            <div className="row">
                                                                <div className="col-md-6 form-it">
                                                                    <label>Mật khẩu cũ</label>
                                                                    <input type="password"/>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 form-it">
                                                                    <label>Mật khẩu mới </label>
                                                                    <input type="password" />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 form-it">
                                                                    <label>Xác nhận mật khẩu</label>
                                                                    <input type="password" />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-2">
                                                                    <input className="submit" type="submit"
                                                                           value="Lưu"/>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'favorite' && (
                                                <div className="col-md-9 col-sm-12 col-xs-12">
                                                    <div className="flex-wrap-movielist user-fav-list">
                                                        {tickets.length === 0 ? (
                                                            <p>No tickets found.</p>
                                                        ) : (
                                                            tickets.map(ticket => (
                                                                <div className="movie-item-style-2"
                                                                     key={ticket.orderId}>
                                                                    <img src={ticket.moviePoster} style={{width: "200px", height: "300px"}}
                                                                         alt={ticket.movieName}/>
                                                                    <div className="mv-item-infor">
                                                                        <h6><a href="#">{ticket.movieName}</a>
                                                                        </h6>
                                                                        <p>Mã đặt vé: {ticket.order_code}</p>
                                                                        <p>Thời gian đặt vé: {convertToTimeZone(ticket.order_date)}</p>
                                                                        <p className="run-time">
                                                                            Thời gian chiếu: {ticket.scheduleStart} {formatDate(ticket.scheduleDate)}
                                                                        </p>
                                                                        <p>Số ghế: {ticket.seats}</p>
                                                                        <p>Phòng chiếu: {ticket.roomName}</p>
                                                                        <p>Rạp: {ticket.cinemaName}</p>
                                                                        <p>Tổng tiền: {formatCurrencyVND(ticket.total_price)}</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>
                                            )}

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

export default User;