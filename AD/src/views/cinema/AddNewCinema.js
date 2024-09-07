import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'

const AddNewCinema = () => {
  const [cinemaName, setCinemaName] = useState('');
  const [cinemaAddress, setCinemaAddress] = useState('');

  const handleAddCinema = () => {
    const data = {
      cinemaName,
      cinemaAddress,
    };
    console.log(data)

    fetch('http://localhost:80/admin/cinema/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Cinema added successfully');
          alert('Thêm rạp thành công');
          window.history.back()
        } else {
          console.error('Failed to add cinema');
        }
      })
      .catch(error => {
        console.error('Error adding cinema:', error);
      });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm rạp chiếu</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputName">Tên rạp</CFormLabel>
                <CFormInput type="text" id="inputName" value={cinemaName} onChange={e => setCinemaName(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="address">Địa chỉ</CFormLabel>
                <CFormInput type="text" id="address" value={cinemaAddress} onChange={e => setCinemaAddress(e.target.value)} />
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" onClick={handleAddCinema}>
                  Thêm rạp chiếu
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddNewCinema
