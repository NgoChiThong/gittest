import React, {useEffect, useState} from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcMastercard,
} from '@coreui/icons'

import {CChart} from "@coreui/react-chartjs";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState([]);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    // Fetch revenue data for the selected year
    const fetchRevenueData = async () => {
      try {
        const response = await fetch(`http://localhost:80/admin/orders/monthly-revenue/${year}`, {
          headers: {
            Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTcxOTM5MzE5NSwiaWF0IjoxNzE5Mzc1MTk1fQ.EQi4Q8yA4lC62Eb32O1mOYzYrB2HfluvKbBKRWpU5APDwDy56u_Zrw20p-r3OTiGvQRQd_Kct4agnZT-60T22Q', // Replace with your actual Bearer token
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.datasets && data.datasets.length > 0) {
          setRevenueData(data.datasets[0].data);
        } else {
          setRevenueData([]);
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchRevenueData();
  }, [year]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:80/admin/orders/today', {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTcxOTM5MzE5NSwiaWF0IjoxNzE5Mzc1MTk1fQ.EQi4Q8yA4lC62Eb32O1mOYzYrB2HfluvKbBKRWpU5APDwDy56u_Zrw20p-r3OTiGvQRQd_Kct4agnZT-60T22Q'
          }
        });
        const data = await response.json();
        const transformedData = data.map(order => ({
          user: { name: `User ${order.user_id}` },
          movie: { name: `Movie ${order.movie_id}` },
          book: {
            value: order.orderDetails.map(detail => `Seat ${detail.seat_id}`).join(', '),
            period: new Date(order.order_date).toLocaleString(),
          },
          payment: { name: 'Mastercard', icon: cibCcMastercard },
          activity: new Date(order.order_date).toLocaleString(),
          orderId: order.order_code,
          movieId: order.movie_id,
          scheduleId: order.schedule_id,
        }));
        setOrders(transformedData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleYearChange = (date) => {
    setYear(date.getFullYear());
  };


  return (
    <>
      {/*Này là thống kê sơ bộ*/}
      {/*<WidgetsDropdown className="mb-4" />*/}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Thống kê tình hình doanh thu trang web</CCardHeader>
            <CCardBody>
              <br/>
              <div>
                <h2>Thống kê doanh thu năm {year}</h2>
                <DatePicker
                  selected={new Date(year, 0, 1)}
                  onChange={handleYearChange}
                  showYearPicker
                  dateFormat="yyyy"
                  className="year-picker"
                />
                <CChart
                  type="bar"
                  data={{
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                      {
                        label: 'Số tiền (VNĐ)',
                        backgroundColor: '#f87979',
                        data: revenueData,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: '#000', // Update color as needed
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: '#ccc', // Update color as needed
                        },
                        ticks: {
                          color: '#000', // Update color as needed
                        },
                      },
                      y: {
                        grid: {
                          color: '#ccc', // Update color as needed
                        },
                        ticks: {
                          color: '#000', // Update color as needed
                        },
                      },
                    },
                  }}
                />
              </div>

              <CCardHeader>Vé được đặt hôm nay</CCardHeader>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Mã đặt vé</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      ID phim
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">ID suất chiếu</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Phương thức thanh toán
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Thời gian đặt</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {orders.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{item.orderId}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <small className="text-body-secondary">{item.movieId}</small>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold">{item.scheduleId}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
