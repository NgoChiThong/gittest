import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  const { id } = useParams()
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:80/admin/orders/${id}`, {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTcxOTM0Njc2NCwiaWF0IjoxNzE5MzI4NzY0fQ.9Maf8qg95croE66gs_DV07ex0ok3I48cnZVbXrEAE_txD27RQ9109kMjWEV8XFwrZVa8RR0DHRXhacfhoJM0RA'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch order details')
        }

        const data = await response.json()
        setOrderDetails(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [id])
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!orderDetails) return <div>No order details found</div>
  function formatCurrency(amount) {
    // Sử dụng Intl.NumberFormat để định dạng tiền tệ theo tiêu chuẩn quốc tế
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    // Sử dụng hàm format để định dạng số tiền và trả về chuỗi đã định dạng
    return formatter.format(amount);
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Chi tiết đơn hàng {id}</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="orderCode">Mã đặt vé</CFormLabel>
                <CFormInput type="text" id="orderCode" value={orderDetails.order_code} disabled={true}/>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="orderDate">Ngày đặt vé</CFormLabel>
                <CFormInput type="text" id="orderDate" value={new Date(orderDetails.order_date).toLocaleDateString()} disabled={true}/>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="movieName">Tên phim</CFormLabel>
                <CFormInput type="text" id="movieName" value={orderDetails.movieName} disabled={true}/>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="scheduleDate">Ngày chiếu</CFormLabel>
                <CFormInput type="text" id="scheduleDate" value={orderDetails.scheduleDate} disabled={true}/>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="scheduleStart">Thời gian bắt đầu chiếu</CFormLabel>
                <CFormInput type="text" id="scheduleStart" value={orderDetails.scheduleStart} disabled={true}/>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="cinemaName">Rạp chiếu</CFormLabel>
                <CFormInput type="text" id="cinemaName" value={orderDetails.cinemaName} disabled={true}/>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="roomName">Phòng chiếu</CFormLabel>
                <CFormInput type="text" id="roomName" value={orderDetails.roomName} disabled={true}/>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="seats">Danh sách vé đã đặt</CFormLabel>
                <CFormInput type="text" id="seats" value={orderDetails.seats} disabled={true}/>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="totalPrice">Tổng tiền</CFormLabel>
                <CFormInput type="text" id="totalPrice" value={`${formatCurrency(orderDetails.total_price)}`} disabled={true}/>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="button" onClick={() => window.history.back()}>
                  Trở lại
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OrderDetail
