import React, {useEffect, useState} from 'react'
import {CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CFormInput, CAlert, CSpinner} from '@coreui/react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'

const ListUsers = () => {
  const [filterText, setFilterText] = useState('')
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:80/admin/user/all', {
          method: 'GET',
          headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTcxOTM0Njc2NCwiaWF0IjoxNzE5MzI4NzY0fQ.9Maf8qg95croE66gs_DV07ex0ok3I48cnZVbXrEAE_txD27RQ9109kMjWEV8XFwrZVa8RR0DHRXhacfhoJM0RA' // Giả sử bạn lưu token trong localStorage
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error)
      }
    }
    fetchUsers()
  }, [])

console.log('Users:', users)

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: 'Tên người dùng',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Họ và tên',
      selector: (row) => row.userFullname,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.userEmail,
      sortable: true,
    },
    {
      name: 'Số điện thoại',
      selector: (row) => row.userPhone,
      sortable: true,
    },
    {
      name: 'Tác vụ',
      cell: (row) => (
        <div>
          <CButton color="success" variant="outline" onClick={() => userDetail(row.userId)}>
            Xem
          </CButton>
        </div>
      ),
    },
  ]


  const handleDelete = (id) => {
    console.log('Delete ID:', id)
    // Thực hiện các thao tác xóa tại đây, ví dụ:
    // deleteItem(id).then(() => reloadData())
  }

  const subHeaderComponent = (
    <CFormInput
      type="text"
      placeholder="Tìm kiếm..."
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  )

  const filteredData = users.filter(
    (item) =>
      item.userId.toString().includes(filterText) ||
      item.username.toLowerCase().includes(filterText.toLowerCase()) ||
      item.userFullname.toLowerCase().includes(filterText.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(filterText.toLowerCase()) ||
      item.userPhone.includes(filterText),
  )
  const handleAddNew = () => {
    navigate('/users/add-new-user')
  }
  const userDetail = (id) => {
    console.log('Movie ID:', id)
    // Thực hiện các thao tác chỉnh sửa tại đây, ví dụ:
    navigate(`/users/user-detail/${id}`)
  }
  const movieEdit = (id) => {
    console.log('Movie ID:', id)
    // Thực hiện các thao tác chỉnh sửa tại đây, ví dụ:
  //  navigate(`/movies/edit-movie/${id}`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách người dùng</strong>
          </CCardHeader>
          <CCardBody>
            {users === null ? (
              <CAlert color="info">
                <CSpinner size="sm" className="me-2" />
                Đang tải dữ liệu, xin chờ...
              </CAlert>
            ) : error ? (
              <CAlert color="danger">{error}</CAlert>
            ) : (
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              subHeader
              subHeaderComponent={subHeaderComponent}
            />
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        {/*<CCard className="mb-4">*/}
        {/*  <CCardHeader>*/}
        {/*    <strong>Quản người dùng</strong>*/}
        {/*  </CCardHeader>*/}
        {/*  <CCardBody>*/}
        {/*    <CButton color="primary" variant="outline" onClick={() => handleAddNew()}>*/}
        {/*      Thêm người dùng*/}
        {/*    </CButton>*/}
        {/*  </CCardBody>*/}
        {/*</CCard>*/}
      </CCol>
    </CRow>
  )
}

export default ListUsers
