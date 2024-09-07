import React, {useEffect, useState} from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow, CSpinner,
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import {useNavigate, useParams} from 'react-router-dom'

const UserDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:80/admin/user/${id}`, {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImV4cCI6MTcxOTM0Njc2NCwiaWF0IjoxNzE5MzI4NzY0fQ.9Maf8qg95croE66gs_DV07ex0ok3I48cnZVbXrEAE_txD27RQ9109kMjWEV8XFwrZVa8RR0DHRXhacfhoJM0RA'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch order details')
        }

        const data = await response.json()
        setUser(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [id])
  console.log('User:', user)

  if (loading) {
    return (
      <CRow className="justify-content-center">
        <CCol xs="auto">
          <CSpinner color="primary" />
        </CCol>
      </CRow>
    )
  }

  if (error) {
    return (
      <CAlert color="danger">
        Đã xảy ra lỗi: {error}
      </CAlert>
    )
  }

  if (!user) {
    return (
      <CAlert color="warning">
        Không tìm thấy thông tin người dùng.
      </CAlert>
    )
  }
  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Chi tiết người dùng: {id} </strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol xs={2}>
                <CFormLabel htmlFor="inputId">Id người dùng</CFormLabel>
                <CFormInput type="text" id="inputId" value={user.userId} disabled={true} />
              </CCol>
              <CCol xs={4}>
                <CFormLabel htmlFor="inputUsername">Tên người dùng</CFormLabel>
                <CFormInput type="text" id="inputUsername" value={user.username} disabled={true} />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputFullname">Họ và tên người dùng</CFormLabel>
                <CFormInput type="text" id="inputFullname" value={user.userFullname} disabled={true} />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="inputBirthday">Ngày sinh</CFormLabel>
                <CFormInput type="text" id="inputBirthday" value={user.userBirthday || 'Không có'} disabled={true} />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="inputGender">Giới tính</CFormLabel>
                <CFormInput type="text" id="inputGender" value={user.userGender === 1 ? 'Nam' : 'Nữ'} disabled={true} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputEmail">Địa chỉ email</CFormLabel>
                <CFormInput type="text" id="inputEmail" value={user.userEmail} disabled={true} />
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="inputPhone">Số điện thoại</CFormLabel>
                <CFormInput type="text" id="inputPhone" value={user.userPhone || 'Không có'} disabled={true} />
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" onClick={handleGoBack}>
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

export default UserDetail
