import React, { useEffect } from 'react';
import { loadScript } from "../../utils";

function SeatBooking (){
    useEffect(() => {
        const loadAssets = () => {
            return new Promise((resolve, reject) => {
                loadScript('../assets/js/jquery.seat-charts.js')
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
                const price = 110; // Giá vé

                // const links = [
                //     { rel: "script", type: "text/javascript", href: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" },
                //     { rel: "stylesheet", type: "text/css", href: "seat_selection/css/stylet.css" },
                // ];

                // links.forEach((link) => {
                //     const element = document.createElement(link.rel === "script" ? "script" : "link");
                //     if (link.rel === "script") {
                //         element.src = link.href;
                //     } else {
                //         element.rel = link.rel;
                //         element.type = link.type;
                //         element.href = link.href;
                //     }
                //     document.head.appendChild(element);
                // });

                $(document).ready(function () {
                    var $cart = $('#selected-seats'); // Vùng chỗ ngồi đã chọn
                    var $counter = $('#counter'); // Số lượng vé đã chọn
                    var $total = $('#total'); // Tổng tiền

                    var sc = $('#seat-map').seatCharts({
                        map: [ // Bản đồ chỗ ngồi
                            'aaaaaaaaaa',
                            'aaaaaaaaaa',
                            '__________',
                            'aaaaaaaa__',
                            'aaaaaaaaaa',
                            'aaaaaaaaaa',
                            'aaaaaaaaaa',
                            'aaaaaaaaaa',
                            'aaaaaaaaaa',
                            '__aaaaaa__'
                        ],
                        naming: {
                            top: false,
                            getLabel: function (character, row, column) {
                                return column;
                            }
                        },
                        legend: { // Định nghĩa chú giải
                            node: $('#legend'),
                            items: [
                                ['a', 'available', 'Available'],
                                ['a', 'unavailable', 'Sold'],
                                ['a', 'selected', 'Selected']
                            ]
                        },
                        click: function () { // Sự kiện khi click vào chỗ ngồi
                            if (this.status() === 'available') { // Chỗ ngồi có thể chọn
                                $('<li>R-' + (this.settings.row + 1) + ' S-' + this.settings.label + '</li>')
                                    .attr('id', 'cart-item-' + this.settings.id)
                                    .data('seatId', this.settings.id)
                                    .appendTo($cart);

                                $counter.text(sc.find('selected').length + 1);
                                $total.text(recalculateTotal(sc) + price);

                                return 'selected';
                            } else if (this.status() === 'selected') { // Đã chọn
                                // Cập nhật số lượng vé
                                $counter.text(sc.find('selected').length - 1);
                                // Cập nhật tổng tiền
                                $total.text(recalculateTotal(sc) - price);

                                // Xóa ghế đã chọn
                                $('#cart-item-' + this.settings.id).remove();

                                return 'available';
                            } else if (this.status() === 'unavailable') { // Đã bán
                                return 'unavailable';
                            } else {
                                return this.style();
                            }
                        }
                    });

                    // Các ghế đã bán
                    sc.get(['1_2', '4_4', '4_5', '6_6', '6_7', '8_5', '8_6', '8_7', '8_8', '10_1', '10_2']).status('unavailable');
                });
            })
            .catch(error => {
                console.error('Error loading assets:', error);
            });
    }, []);

    // Tính tổng tiền
    function recalculateTotal(sc) {
        const price = 110; // Di chuyển biến 'price' vào đây để nó có thể truy cập được trong hàm này
        var total = 0;
        sc.find('selected').each(function () {
            total += price;
        });

        return total;
    }

    return (
        <div className="content">
            <h2>Seat Booking</h2>
            <div className="main">
                <div className="demo">
                    <div id="seat-map">
                        <div className="front">SCREEN</div>
                    </div>
                    <div className="booking-details">
                        <ul className="book-left">
                            <li>Movie</li>
                            <li>Time</li>
                            <li>Tickets</li>
                            <li>Total</li>
                            <li>Selected Seats</li>
                        </ul>
                        <ul className="book-right">
                            <li>: Commando 3</li>
                            <li>: April 12, 22:00</li>
                            <li>: <span id="counter">0</span></li>
                            <li>: <b><i>RS.</i><span id="total">0</span></b></li>
                        </ul>
                        <div className="clear"></div>
                        <ul id="selected-seats" className="scrollbar scrollbar1"></ul>

                        <div id="legend"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatBooking;