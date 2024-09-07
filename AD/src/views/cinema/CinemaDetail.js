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

const CinemaDetail = () => {
  const { id } = useParams()
  const [cinema, setCinema] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:80/admin/cinema/${id}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'OK') {
          setCinema(result.data)
        } else {
          console.error('Failed to fetch cinema details')
        }
      })
      .catch(error => console.error('Error fetching cinema details:', error))
  }, [id])

  if (!cinema) {
    return <div>Loading...</div>;
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Chi tiết rạp chiếu: {cinema.cinemaName}</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputName">Tên rạp</CFormLabel>
                <CFormInput type="text" id="inputName" value={cinema.cinemaName} disabled={true} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputAdd">Địa chỉ</CFormLabel>
                <CFormInput type="text" id="inputAdd" value={cinema.cinemaAddress} disabled={true} />
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

export default CinemaDetail
