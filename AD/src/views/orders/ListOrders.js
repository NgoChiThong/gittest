import React, {useEffect, useState} from 'react'
import {CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CFormInput} from '@coreui/react'
import DataTable from 'react-data-table-component'
import {useNavigate} from 'react-router-dom'

const ListOrders = () => {
  const [filterText, setFilterText] = useState('')
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:80/admin/orders', {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTcxOTM0Njc2NCwiaWF0IjoxNzE5MzI4NzY0fQ.9Maf8qg95croE66gs_DV07ex0ok3I48cnZVbXrEAE_txD27RQ9109kMjWEV8XFwrZVa8RR0DHRXhacfhoJM0RA' // Assume token is stored in localStorage
          }
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    fetchOrders()
  }, [])

  const columns = [
    {
      name: 'Mã đặt vé',
      selector: (row) => row.order_code,
      sortable: true,
    },
    {
      name: 'Mã khách hàng',
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: 'Ngày đặt vé',
      selector: (row) => {
        const date = new Date(row.order_date);
        const day = date.getDate().toString().padStart(2, '0'); // Lấy ngày và đảm bảo có 2 chữ số
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (index từ 0) và đảm bảo có 2 chữ số
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0'); // Lấy giờ và đảm bảo có 2 chữ số
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Lấy phút và đảm bảo có 2 chữ số
        const seconds = date.getSeconds().toString().padStart(2, '0'); // Lấy giây và đảm bảo có 2 chữ số

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      },
      sortable: true,
    }
    ,
    {
      name: 'Id phim',
      selector: (row) => row.movie_id,
      sortable: true,
    },
    {
      name: 'Id lịch chiếu',
      selector: (row) => row.schedule_id,
      sortable: true,
    },
    {
      name: 'Tổng tiền',
      selector: (row) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(row.total_price);
        return formattedPrice;
      },
      sortable: true,
    }
    ,
    {
      name: 'Tác vụ',
      cell: (row) => (
        <div>
          <CButton color="success" variant="outline" onClick={() => orderDetail(row.order_id)}>
            Xem
          </CButton>
        </div>
      ),
    },
  ]
  const subHeaderComponent = (
    <CFormInput
      type="text"
      placeholder="Tìm kiếm..."
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  )

  const filteredData = orders.filter(
    (item) =>
      item.order_code.toString().includes(filterText) ||
      item.user_id.toString().includes(filterText) ||
      item.order_date.includes(filterText) ||
      item.movie_id.toString().includes(filterText) ||
      item.schedule_id.toString().includes(filterText)
  )

  const orderDetail = (id) => {
    // Thực hiện các thao tác chỉnh sửa tại đây, ví dụ:
    navigate(`/orders/order-detail/${id}`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách vé đã đặt</strong>
          </CCardHeader>
          <CCardBody>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              subHeader
              subHeaderComponent={subHeaderComponent}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListOrders
