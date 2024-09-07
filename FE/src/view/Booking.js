import React, {useEffect, useState} from 'react';
import Header from './common/Header';
import './utils.js';
import {Helmet} from "react-helmet";
import {useNavigate, useParams} from 'react-router-dom';
import {loadScript} from "./utils";
import PayPalButton from './PayPalButton';

export function Booking() {
    const {id} = useParams();
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/signin'); // Điều hướng đến trang đăng nhập nếu không có token
        }
    }, [token, navigate]);
    const userInfoString = sessionStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    console.log("userInfo", userInfo);

    //thanh toan
    const [checkout, setCheckOut] = useState(false);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    const [orderDetails, setOrderDetails] = useState(null);

    //chua ngay chieu
    const [schedules, setSchedules] = useState([]);
    //all
    const [allSchedules, setAllSchedules] = useState([]);

    const $ = window.$;
    // const price = 110; // Giá vé
    //fix
    const [prevId, setPrevId] = useState("");

    const [selectedDate, setSelectedDate] = useState(null); // State để lưu ngày được chọn
    const [defaultSelected, setDefaultSelected] = useState(false);
//rap
    const [cinemas, setCinemas] = useState([]);
    const [scheduleId, setScheduleId] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false); // State to track button click
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seats, setSeats] = useState([]);
    const [seatsBooked, setSeatsBooked] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [formatSelectedSeats, setFormatSelectedSeats] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    // nut
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [price, setPrice] = useState(0); // Khai báo state hook để lưu trữ giá vé
    const [isScreenNextBtnDisabled, setScreenNextBtnDisabled] = useState(true);
    //lay thong tin phim:
    const [movie, setMovie] = useState(null);
    //thanh toan


    const handlePaymentSuccess = (order) => {
        setPaymentSuccessful(true);
        setOrderDetails(order);
        // Xử lý logic khác sau khi thanh toán thành công
    };
    // console.log("Thanh toan thanh cong la:", paymentSuccessful);
    console.log("Thong tin don hang la:", orderDetails);
    const paymentAmount = (price / 24000).toFixed(0); // Giá trị thanh toán
    const paymentCurrency = "USD"; // Loại tiền tệ
    const paymentDescription = scheduleId + ' ' +"Thanh toan ve xem phim" ; // Mô tả đơn hàng


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
    console.log("Thong tin phim la:", movie);
    // xư ly dat ve
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setSchedules([]);
                const response = await fetch(`http://localhost:80/schedule/movie/${id}`);
                const data = await response.json();
                if (data.status === 'OK') {
                    setSchedules(data.data);
                    // console.log(data.data);
                } else {
                    console.error('Error fetching schedules:', data.msg);
                }
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
    }, [id]);

    //toan bo schedule của phim
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setSchedules([]);
                const response = await fetch(`http://localhost:80/schedule/movieschedule/${id}`);
                const data = await response.json();
                if (data.status === 'OK') {
                    setAllSchedules(data.data);
                    // console.log(data.data);
                } else {
                    console.error('Error fetching schedules:', data.msg);
                }
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
    }, [id]);


    useEffect(() => {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = "/assets/css/progress.css";

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = "/assets/css/ticket-booking.css";

        const link3 = document.createElement("link");
        link3.rel = "stylesheet";
        link3.type = "text/css";
        link3.href = "/assets/css/e-ticket.css";

        const link4 = document.createElement("link");
        link4.rel = "stylesheet";
        link4.type = "text/css";
        link4.href = "/assets/css/payment.css";

        const link5 = document.createElement("link");
        link5.rel = "stylesheet";
        link5.type = "text/css";
        link5.href = "https://npmcdn.com/flickity@2/dist/flickity.css";

        const link6 = document.createElement("link");
        link6.rel = "stylesheet";
        link6.type = "text/css";
        link6.href = "https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,700";

        const link7 = document.createElement("link");
        link7.rel = "stylesheet";
        link7.type = "text/css";
        link7.href = "/assets/seat_selection/css/style.css";

        const script1 = document.createElement("script");
        script1.src = "https://npmcdn.com/flickity@2/dist/flickity.pkgd.js";

        const script2 = document.createElement("script");
        script2.src = "/assets/js/ticket-booking.js";

        const script3 = document.createElement("script");
        script3.src = "/assets/js/jquery.seat-charts.js";


        const script4 = document.createElement("script");
        script4.src = "/assets/js/jquery.seat-charts.js";


        document.head.appendChild(link1);
        document.head.appendChild(link2);
        document.head.appendChild(link3);
        document.head.appendChild(link4);
        document.head.appendChild(link5);
        document.head.appendChild(link6);
        document.head.appendChild(link7);
        document.body.appendChild(script1);
        document.body.appendChild(script2);
        document.body.appendChild(script3);
        document.body.appendChild(script4);

        console.log("Id cua movie can dat la:" + id);

        return () => {
            document.head.removeChild(link3);
            document.head.removeChild(link1);
        };
    }, []);


    // Function để fetch dữ liệu ghế
    async function fetchSeats(scheduleId) {
        try {
            setLoading(true);
            setSeats([]);
            const response = await fetch(`http://localhost:80/seat/s/${scheduleId}`);
            const data = await response.json();
            if (data.status === 'OK') {
                setSeats(data.data);
                // console.log(data.data);
            } else {
                console.error('Error fetching seats:', data.msg);
            }


        } catch (error) {
            console.error('Error fetching seats:', error);
            setError('Error fetching seats');
        } finally {
            setLoading(false);
        }
    }

    async function fetchSeatsBooked(scheduleId) {
        try {
            setSeatsBooked([]);
            setLoading(true);
            const response1 = await fetch(`http://localhost:80/seat/sbooked/${scheduleId}`);
            if (!response1.ok) {
                throw new Error(`HTTP error! status: ${response1.status}`);
            }
            const data1 = await response1.json();
            if (data1.status === 'OK') {
                setSeatsBooked(data1.data);
                // console.log(data1.data);
            } else {
                console.error('Error fetching seats:', data1.msg);
                setError(`Error fetching seats: ${data1.msg}`);
            }
        } catch (error) {
            console.error('Error fetching seats:', error);
            setError(`Error fetching seats: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!buttonClicked) return;
        fetchSeats(scheduleId); // Gọi fetchSeats với scheduleId tương ứng
        fetchSeatsBooked(scheduleId); // Gọi fetchSeatsBooked với scheduleId tương ứng

        // Cleanup effect khi scheduleId thay đổi
        return () => {
            // Làm trống state và DOM liên quan
            setSeats([]);
            setSeatsBooked([]);
            const $cart = $('#selected-seats');
            const $counter = $('#counter');
            const $total = $('#total');
            $cart.empty();
            $counter.text(0);
            $total.text(0);
            setSelectedSeats([]);
        };
    }, [buttonClicked, scheduleId]);

    useEffect(() => {
        if (!buttonClicked) return;
        if (seats.length === 0) return; // Đảm bảo có dữ liệu ghế trước khi render bản đồ

        const loadAssets = () => {
            return new Promise((resolve, reject) => {
                loadScript('/assets/js/jquery.seat-charts.js')
                    .then(() => {
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        };

        loadAssets()
            .then(() => {
                const $ = window.$;
                const price = 45000; // Giá vé
                // console.log("Gia ve la:" + price);

                const dataSeats = seats.map(seat => ({
                    seat_row: seat.seatRow,
                    seat_number: seat.seatNumber
                }));

                const map = [];
                for (let i = 0; i < 9; i++) {
                    const row = [];
                    for (let j = 0; j < 9; j++) {
                        const seat = dataSeats.find(seat => seat.seat_row === String.fromCharCode(65 + i) && seat.seat_number === j + 1);
                        if (seat) {
                            row.push('a'); // Ghế có sẵn
                        } else {
                            row.push('_'); // Ghế không có sẵn
                        }
                    }
                    map.push(row.join(''));
                }


                $(document).ready(function () {
                    $('#seat-map').remove(); // Remove the old seat map
                    $('#seat-map-wrapper').append('<div id="seat-map"></div>'); // Create a new seat map
// Clear the legend to prevent duplication
                    $('#legend').empty();
                    var $cart = $('#selected-seats'); // Vùng chỗ ngồi đã chọn
                    var $counter = $('#counter'); // Số lượng vé đã chọn
                    var $total = $('#total'); // Tổng tiền

                    var sc = $('#seat-map').seatCharts({
                        map: map,
                        naming: {
                            top: false,
                            getLabel: function (character, row, column) {
                                return column;
                            }
                        },
                        legend: { // Định nghĩa chú giải
                            node: $('#legend'),
                            items: [
                                ['a', 'available', 'Có thể chọn'],
                                ['a', 'unavailable', 'Ghế đã đặt'],
                                ['a', 'selected', 'Ghế đã chọn']
                            ]
                        },
                        click: function () { // Sự kiện khi click vào chỗ ngồi
                            if (this.status() == 'available') { // Chỗ ngồi có thể chọn
                                $('<li>R-' + (this.settings.row + 1) + ' S-' + this.settings.label + '</li>')
                                    .attr('id', 'cart-item-' + this.settings.id)
                                    .data('seatId', this.settings.id)
                                    .appendTo($cart); // Thêm vào vùng chỗ ngồi đã chọn

                                $counter.text(sc.find('selected').length + 1); // Cập nhật số lượng vé
                                $total.text(recalculateTotal(sc) + price); // Cập nhật tổng tiền
                                //tien
                                setPrice(prevPrice => prevPrice + price);
                                var selectedSeats = [];
                                $cart.find('li').each(function () {
                                    selectedSeats.push($(this).data('seatId'));
                                });
                                setSelectedSeats(selectedSeats);

                                return 'selected';
                            } else if (this.status() == 'selected') { // Đã chọn
                                $counter.text(sc.find('selected').length - 1);
                                $total.text(recalculateTotal(sc) - price);
                                // Cập nhật giá vé
                                setPrice(prevPrice => prevPrice - price);

                                $('#cart-item-' + this.settings.id).remove();

                                var selectedSeats = [];
                                $cart.find('li').each(function () {
                                    selectedSeats.push($(this).data('seatId'));
                                });
                                setSelectedSeats(selectedSeats);

                                return 'available';
                            } else if (this.status() == 'unavailable') { // Đã bán
                                return 'unavailable';
                            } else {
                                return this.style();
                            }
                        }
                    });

                    $('#previous-step-btn').click(function () {
                        $cart.empty();
                        sc.find('selected').status('available');
                        setSelectedSeats([]);
                        $counter.text(0);
                        $total.text(0);
                        setPrice(0);
                        setSeats([]);
                        setSeatsBooked([]);
                        setButtonClicked(false);
                    });

                    const soldSeats = seatsBooked.map(seatsBooked => ({
                        seat_row: seatsBooked.seatRow,
                        seat_number: seatsBooked.seatNumber
                    }));
                    console.log("day la du lieu bi loi", soldSeats);
                    soldSeats.forEach(seat => {
                        const row = seat.seat_row.charCodeAt(0) - 65 + 1;
                        const column = seat.seat_number;
                        const seatId = `${row}_${column}`;
                        sc.get([seatId]).status('unavailable');
                    });
                });
            })
            .catch(error => {
                console.error('Error loading assets:', error);
            });

        // Cleanup function to reset the seats and UI
        return () => {
            const $cart = $('#selected-seats');
            const $counter = $('#counter');
            const $total = $('#total');
            $cart.empty();
            $counter.text(0);
            $total.text(0);
            setSelectedSeats([]);
            $('#seat-map').empty(); // Clear the seat map
            setPrice(0);
        };
    }, [seats, seatsBooked]);
    // console.log("Gia ve la:", price);
    // Chạy khi trang được load
    window.onload = () => {
        document.getElementById("screen-next-btn").disabled = true;
    };

    function convertSeatCodeToId(seatCode) {
        // Tách seatRow và seatNumber từ seatCode
        const [rowNumber, columnNumber] = seatCode.split('_');

        // Chuyển đổi số hàng thành ký tự row tương ứng
        const row = String.fromCharCode(64 + parseInt(rowNumber));

        // Tìm ghế trong mảng seats có seatRow và seatNumber tương ứng
        const foundSeat = seats.find(seat => seat.seatRow === row && seat.seatNumber === parseInt(columnNumber));

        // Trả về seatId của ghế được tìm thấy
        return foundSeat ? foundSeat.seatId : null;
    }

    useEffect(() => {
        // Tạo một mảng mới để lưu trữ danh sách các ID ghế đã chọn
        const selectedSeatIds = [];

        // Duyệt qua mỗi seatCode trong selectedSeats và chuyển đổi thành ID tương ứng
        selectedSeats.forEach(seatCode => {
            const seatId = convertSeatCodeToId(seatCode, seats);
            if (seatId !== null) {
                selectedSeatIds.push(seatId);
            }
        });

        // Cập nhật giá trị cho formatSelectedSeats
        setFormatSelectedSeats(selectedSeatIds);
    }, [selectedSeats, seats]);


    // Hàm thay đổi trạng thái sau một khoảng thời gian
    async function timeFunction(scheduleId) {
        try {
            document.getElementById("screen-next-btn").disabled = false;
            await fetchSeats(scheduleId);
            await fetchSeatsBooked(scheduleId);
            setScheduleId(scheduleId);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Xử lý khi bấm vào nút
    // Xử lý khi bấm vào nút
    const handleButtonClick = async (clickedId) => {
        // Thay đổi màu sắc của nút được chọn
        document.getElementById(clickedId).style.background = "#df0e62";

        // Đặt lại màu sắc của nút trước đó
        if (prevId !== "") {
            document.getElementById(prevId).style.background = "rgb(243, 235, 235)";
        }

        // Cập nhật prevId thành id mới
        setPrevId(clickedId);
        // Lưu ngày được chọn vào state
        setSelectedDate(clickedId);

        try {
            // Gọi API để lấy thông tin rạp chiếu dựa trên id và ngày đã chọn
            setCinemas([]);
            const response = await fetch(`http://localhost:80/schedule/${id}/${clickedId}`);
            const data = await response.json();
            if (data.status === 'OK') {
                setCinemas(data.data);
            } else {
                console.error('Error fetching cinemas:', data.msg);
            }
        } catch (error) {
            console.error('Error fetching cinemas:', error);
        }


    };

    const containerStyle = {
        boxShadow: "0 14px 12px 0 var(--theme-border), 0 10px 50px 0 var(--theme-border)",
        width: "800px",
        height: "550px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    };


    const handleCancelPayment = () => {
        navigate('/home'); // Navigate to the '/home' route
    };

    function recalculateTotal(sc) {
        const price = 45000; // Di chuyển biến 'price' vào đây để nó có thể truy cập được trong hàm này
        var total = 0;
        sc.find('selected').each(function () {
            total += price;
        });

        return total;
    }

    // Lấy tất cả các nút rạp chiếu
    const theaterBtns = document.querySelectorAll('.theater-btn');

//Thêm sự kiện click cho mỗi nút
    theaterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Xóa lớp CSS 'selected' khỏi tất cả các nút
            theaterBtns.forEach(btn => btn.classList.remove('selected'));

            // Thêm lớp CSS 'selected' cho nút được chọn
            this.classList.add('selected');
        });
    });

    function formatDate(dateString) {
        // Tách ngày, tháng và năm từ chuỗi ngày đầu vào
        const [year, month, day] = dateString.split('-');

        // Trả về chuỗi đã định dạng lại
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        if (scheduleId) {
            const schedule = allSchedules.find(sch => sch.scheduleId === scheduleId);
            setSelectedSchedule(schedule);
        }
    }, [scheduleId, allSchedules]); // scheduleId và schedules là các dependency

//paypal
    const handlePaymentClick = () => {
        setCheckOut(true);
    };

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

    // hien thi o trang thanh toan:
    function convertSeat(seat) {
        const [row, number] = seat.split('_');
        const seatRow = String.fromCharCode(64 + parseInt(row)); // Chuyển đổi từ số sang chữ cái (1 -> A, 2 -> B, ...)
        return ` ${seatRow}${number}`;
    }

// Chuyển đổi danh sách ghế
    const convertedSeats = selectedSeats.map(seat => convertSeat(seat));

    // Hàm để tìm tên rạp dựa vào scheduleId
// Hàm để tìm tên rạp dựa vào scheduleId
    const findCinemaName = (scheduleId, cinemas) => {
        // Duyệt qua mỗi rạp
        for (const cinema of cinemas) {
            // Duyệt qua mỗi lịch chiếu của rạp đó
            for (const schedule of cinema.cinema_data) {
                // Nếu schedule_id trùng với scheduleId được đưa vào
                if (schedule.schedule_id === scheduleId) {
                    // Trả về tên của rạp
                    return cinema.cinema_name;
                }
            }
        }
        // Nếu không tìm thấy, trả về null hoặc một giá trị mặc định phù hợp
        return null;
    };
    function getCurrentDateTime() {
        const currentDate = new Date();

        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');

        const dateTimeString = `${hours}:${minutes}:${seconds}, ${day}-${month}-${year}`;

        return dateTimeString;
    }

    // dat ve:
    const bookTicket = async () => {
        // const bookingData = {
        //     scheduleId: scheduleId,
        //     seatId: formatSelectedSeats,
        //     price: price,
        //     seatStatus: 1,
        // };

        const bookingData = {
            "scheduleId": scheduleId,
            "seatIds": formatSelectedSeats,
            "price": price,
            "seatStatus": 1,
            "movieId": id,
            "status": 0,
            "order_code": orderDetails.id
        };


        try {
            const response = await fetch('http://localhost:80/book/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Booking successful:', data);
                // Bạn có thể thêm các hành động khác ở đây, ví dụ: chuyển hướng trang, hiển thị thông báo cho người dùng, v.v.

                // Sau khi đặt vé thành công, gửi email xác nhận
                const emailData = {
                    recipient: userInfo.data.userEmail,
                    msgBody: `LuxCine xin chào bạn ${userInfo.data.userFullname},\n\nXin cảm ơn bạn ${userInfo.data.userFullname} đã sử dụng dịch vụ của chúng tôi! LuxCine xác nhận bạn đã đặt vé xem phim thành công lúc ${getCurrentDateTime()}.\n\nChi tiết vé của bạn như sau: \n\nMã đặt vé: ${orderDetails.id} \n\nPhim: ${movie.movieName}. \n\nPhòng Chiếu: ${selectedSchedule.roomId} \n\nSố Ghế: ${convertedSeats}.\n\nSố tiền: ${price} VNĐ\n\nHãy truy cập Website để xem thêm thông tin chi tiết về vé.\n\nChúc quý khách có những khoảnh khắc tuyệt vời cùng bộ phim nhé!`,
                    subject:  `Xác nhận đặt vé LuxCine thành công - Mã giao dịch ${orderDetails.id}`
                };

                const emailResponse = await fetch('http://localhost:80/sendMail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(emailData),
                });

                if (emailResponse.ok) {
                    console.log('Email sent successfully');
                } else {
                    console.error('Failed to send email:', emailResponse.statusText);
                }


            } else {
                console.error('Booking failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while booking:', error);
        }
    };

    useEffect(() => {
        if (paymentSuccessful) {
            bookTicket();
        }
    }, [paymentSuccessful]);

    const isPastDate = (dateString) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Đặt thời gian của ngày hiện tại về 00:00:00

        const date = new Date(dateString);
        date.setHours(0, 0, 0, 0); // Đặt thời gian của ngày so sánh về 00:00:00
        //
        // console.log("Today: ", today);
        // console.log("Date: ", date);

        return date < today;
    };

    const handleDateClick = (date) => {
        if (isPastDate(date)) {
            alert("Không thể chọn ngày trước ngày hiện tại");
            return false;
        } else {
            handleButtonClick(date);
            return true;
        }
    };
    const isTimeValid = (selectedDate, timeString) => {
        const today = new Date();
        const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

        // Trường hợp ngày chọn khác ngày hiện tại
        if (selectedDate !== currentDate) {
            return true; // Không cần kiểm tra giờ nếu ngày khác
        }

        // Trường hợp ngày chọn bằng ngày hiện tại
        const selectedTime = new Date(`${selectedDate} ${timeString}`);
        const currentTime = new Date();

        return selectedTime >= currentTime;
    }
    const handleTimeButtonClick = (scheduleId, time) => {
        if (!isTimeValid(selectedDate, time)) {
            alert("Không thể chọn giờ chiếu đã qua");
            return false;
        } else {
            timeFunction(scheduleId);
            return true;
        }
    };
    console.log("Ngay chon:" ,selectedDate);
    console.log("Kiem tra ngay chọn: ", isTimeValid(selectedDate, "12:40"));

    // console.log("kiem tra:",isPastDate("04-06-2024"))
    return (<div>
        <title>Đặt vé</title>
        <Helmet></Helmet>
        <Header></Header>
        <div className="container" id="progress-container-id">
            <div className="row">
                <div className="col">
                    <div className="px-0 pt-4 pb-0 mt-3 mb-3">
                        <form id="form">
                            <ul id="progressbar" className="progressbar-class">
                                <li className="active" id="step1">Chọn thời gian</li>
                                <li id="step2" className="not_active">Chọn ghế</li>
                                <li id="step3" className="not_active">Thanh toán</li>
                                <li id="step4" className="not_active">Hoàn tất</li>
                            </ul>
                            <br/>
                            <fieldset>

                                <div id="screen-select-div">
                                    <h2 style={{paddingBottom: "20px"}}>Lịch chiếu</h2>
                                    <div id="theater-select-div">
                                    </div>
                                    <div className="carousel carousel-nav">
                                        {schedules.length === 0 ? (
                                            <p>Chưa có lịch chiếu</p>
                                        ) : (
                                            <div className="carousel carousel-nav">
                                                {schedules.map(schedule => (
                                                    <div
                                                        className="carousel-cell"className={`carousel-cell ${isPastDate(schedule.scheduleDate) ? 'hidden' : ''}`}
                                                        id={schedule.scheduleDate}
                                                        key={schedule.scheduleId}
                                                        onClick={() => handleDateClick(schedule.scheduleDate)}
                                                        value={selectedDate || ''}
                                                    >
                                                        <div
                                                            className="date-numeric">{formatDate(schedule.scheduleDate)}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                    <div id="theater-select-div">
                                        <h2>Danh sách rạp</h2>
                                    </div>
                                    <ul className="time-ul">
                                        {cinemas.map(cinema => (
                                            <li key={cinema.cinema_id} className="time-li">
                                                <div className="screens">
                                                    {cinema.cinema_name}
                                                </div>
                                                <div className="time-btn">
                                                    {cinema.cinema_data.map(schedule => (
                                                        <button
                                                            key={schedule.schedule_id}
                                                            className="screen-time"
                                                            onClick={() => handleTimeButtonClick(schedule.schedule_id, schedule.schedule_start)}
                                                            // disabled={!isTimeValid(selectedDate, schedule.schedule_start)}
                                                        >
                                                            {schedule.schedule_start}
                                                            <div>Còn {schedule.seat_empty} ghế</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                                <input id="screen-next-btn" type="button" name="next-step" className="next-step"
                                       value="Tiếp tục đặt vé"
                                       onClick={() => setButtonClicked(true)} // Set buttonClicked to true on click
                                       disabled={loading || !selectedDate || !scheduleId} // Disable button while loading
                                />
                            </fieldset>
                            <fieldset>
                                <div>
                                    <h2 style={{paddingBottom: "20px"}}>Chọn ghế</h2>
                                    <div className="main">
                                        <div className="demo">
                                            {/*<div id="seat-map">*/}
                                            {/*<div className="front">MÀN HÌNH</div>*/}
                                            {/*</div>*/}

                                            <div id="seat-map-wrapper">
                                                <div className="front">MÀN HÌNH</div>
                                                <div id="seat-map">

                                                </div>
                                            </div>

                                            <div className="booking-details">
                                                <div className="book-container">
                                                    <ul className="book-left">
                                                        <li>Phim :</li>
                                                        <li>Thời gian :</li>
                                                        <li>Số vé :</li>
                                                        <li>Tổng tiền :</li>
                                                        <li>Danh sách ghế đã chọn :</li>
                                                    </ul>
                                                    <ul className="book-right">
                                                        <li>{movie ? movie.movieName : 'Loading...'}</li>
                                                        <li>{selectedSchedule ? `${formatDate(selectedSchedule.scheduleDate)}, ${selectedSchedule.scheduleStart}` : 'N/A'}</li>
                                                        <li><span id="counter"> 0</span></li>
                                                        <li><b><span id="total"> 0 </span><i> VNĐ</i></b></li>
                                                    </ul>
                                                </div>

                                                <div className="clear"></div>
                                                <ul id="selected-seats" className="scrollbar scrollbar1"></ul>

                                                <div id="legend"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <input type="button" name="next-step" className="next-step"
                                       value="Thanh toán"
                                       disabled={loading || !selectedSeats.length}
                                />
                                <input id="previous-step-btn" type="button" name="previous-step"
                                       className="previous-step" value="Trở lại"/>
                            </fieldset>
                            <fieldset>
                                <div id="payment_div">
                                    <div className="payment-row">
                                        <div className="col-75">
                                            <div className="payment-container">
                                                <div className="payment-row">
                                                    <div className="col-50">
                                                        <h3 id="payment-h3">Thanh toán</h3>
                                                        <h3>Thông tin đặt vé</h3>
                                                        <div className="payment-row">
                                                            <div className="col-50">
                                                                <label htmlFor="cname">Thông tin phim</label>
                                                                <label>: {movie ? movie.movieName : 'Loading...'}</label>
                                                            </div>
                                                            <div className="col-50">
                                                                <label htmlFor="ccnum">Ngày chiếu </label>
                                                                <label>: {selectedSchedule ? `${formatDate(selectedSchedule.scheduleDate)}, ${selectedSchedule.scheduleStart}` : 'N/A'}</label>
                                                            </div>
                                                        </div>
                                                        <div className="payment-row">
                                                            <div className="col-50">
                                                                <label htmlFor="expmonth">Thông tin rạp</label>
                                                                <label>: {findCinemaName(scheduleId, cinemas)}</label>
                                                                {selectedSchedule && (
                                                                    <label>, Phòng
                                                                        chiếu: {selectedSchedule.roomId}</label>
                                                                )}


                                                            </div>
                                                            <div className="col-50">
                                                                <div className="payment-row">
                                                                    <div className="col-50">
                                                                        <label htmlFor="expyear">Ghế </label>
                                                                        <input type="text" id="expyear"
                                                                               name="expyear"
                                                                               placeholder={convertedSeats}
                                                                               required/>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {paymentSuccessful ? (
                                                            <h3 style={{color: 'green'}}>Trạng thái thanh toán: đã thanh
                                                                toán</h3>
                                                        ) : (
                                                            <h3 style={{color: 'red'}}>Trạng thái thanh toán: chưa thanh
                                                                toán</h3>
                                                        )}
                                                        <div className="payment-row payment">
                                                            <div className="col-50 payment">
                                                                <label htmlFor="card" className="method card">
                                                                    <div className="icon-container">
                                                                        <i className="fa fa-cc-visa"
                                                                           style={{color: "navy"}}></i>
                                                                        <i className="fa fa-cc-amex"
                                                                           style={{color: "blue"}}></i>
                                                                        <i className="fa fa-cc-mastercard"
                                                                           style={{color: "red"}}></i>
                                                                        <i className="fa fa-cc-discover"
                                                                           style={{color: "orange"}}></i>
                                                                    </div>
                                                                    <div className="radio-input">
                                                                        <input type="radio" id="card"/>
                                                                        Thanh toán {formatCurrencyVND(price)} với thẻ
                                                                    </div>
                                                                </label>
                                                            </div>
                                                            <div className="col-50 payment">
                                                                {checkout ? (
                                                                    <PayPalButton
                                                                        amount={paymentAmount}
                                                                        currency={paymentCurrency}
                                                                        description={paymentDescription}
                                                                        onPaymentSuccess={handlePaymentSuccess}
                                                                    />
                                                                ) : (
                                                                    <label htmlFor="paypal" className="method paypal"
                                                                           onClick={handlePaymentClick}>
                                                                        <div className="icon-container">
                                                                            <i className="fa fa-paypal"
                                                                               style={{color: "navy"}}></i>
                                                                        </div>
                                                                        <div className="radio-input">
                                                                            <input id="paypal" type="radio" checked
                                                                                   readOnly/>
                                                                            Thanh toán {formatCurrencyVND(price)} với
                                                                            PayPal
                                                                        </div>
                                                                    </label>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="button" name="next-step" className="next-step pay-btn"
                                       value="Xác nhận thanh toán"
                                       disabled={!paymentSuccessful && orderDetails == null}
                                />

                                <input type="button" name="previous-step" className="cancel-pay-btn"
                                       value="Huỷ thanh toán"
                                       onClick={handleCancelPayment}/>
                                <input type="button" name="previous-step" className="previous-step" value="Trở lại"/>
                            </fieldset>
                            <fieldset>
                                <h2>Chúc mừng bạn vé xem phim đã đuợc đặt thành công !!!</h2>
                                <input type="button" name="previous-step" className="home-page-btn"
                                       value="Trở về trang chủ"
                                       onClick={handleCancelPayment}/>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>)

}

export default Booking