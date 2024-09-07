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

const AddNewRoom = () => {
  const [cinemaId, setCinemaId] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleAddRoom = () => {
    const data = {
      cinemaId,
      roomName,
    };
    console.log(data)

    fetch('http://localhost:80/admin/room/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Room added successfully');
          alert('Thêm phòng thành công');
          window.history.back()
        } else {
          console.error('Failed to add room');
        }
      })
      .catch(error => {
        console.error('Error adding room:', error);
      });
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm phòng chiếu</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputId">ID rạp chiếu</CFormLabel>
                <CFormInput type="text" id="inputId" value={cinemaId} onChange={e => setCinemaId(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputName">Tên phòng chiếu</CFormLabel>
                <CFormInput type="text" id="inputName" value={roomName} onChange={e => setRoomName(e.target.value)} />
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" onClick={handleAddRoom}>
                  Thêm phòng chiếu
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddNewRoom
