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

const AddNewSchedule = () => {
  const [movieId, setMovieId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [scheduleDate, setScheduleDate] = useState(new Date().toISOString().slice(0, 10));
  const [scheduleStart, setScheduleStart] = useState('');
  const [scheduleEnd, setScheduleEnd] = useState('');

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const [hoursE, setHoursE] = useState('');
  const [minutesE, setMinutesE] = useState('');
  const [secondsE, setSecondsE] = useState('');

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const formatTimeE = (totalSecondsE) => {
    const hoursE = Math.floor(totalSecondsE / 3600)
      .toString()
      .padStart(2, '0');
    const minutesE = Math.floor((totalSecondsE % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const secondsE = (totalSecondsE % 60).toString().padStart(2, '0');

    return `${hoursE}:${minutesE}:${secondsE}`;
  };

  const handleHoursChange = (e) => {
    setHours(e.target.value);
    const totalSeconds = parseInt(e.target.value) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    const formattedScheduleStart = formatTime(totalSeconds);
    setScheduleStart(formattedScheduleStart);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
    const totalSeconds = parseInt(hours) * 3600 + parseInt(e.target.value) * 60 + parseInt(seconds);
    const formattedScheduleStart = formatTime(totalSeconds);
    setScheduleStart(formattedScheduleStart);
  };

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value);
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(e.target.value);
    const formattedScheduleStart = formatTime(totalSeconds);
    setScheduleStart(formattedScheduleStart);
  };

  const handleHoursChangeE = (e) => {
    setHoursE(e.target.value);
    const totalSeconds = parseInt(e.target.value) * 3600 + parseInt(minutesE) * 60 + parseInt(secondsE);
    const formattedScheduleEnd = formatTimeE(totalSeconds);
    setScheduleEnd(formattedScheduleEnd);
  };

  const handleMinutesChangeE = (e) => {
    setMinutesE(e.target.value);
    const totalSeconds = parseInt(hoursE) * 3600 + parseInt(e.target.value) * 60 + parseInt(secondsE);
    const formattedScheduleEnd = formatTimeE(totalSeconds);
    setScheduleEnd(formattedScheduleEnd);
  };

  const handleSecondsChangeE = (e) => {
    setSecondsE(e.target.value);
    const totalSeconds = parseInt(hoursE) * 3600 + parseInt(minutesE) * 60 + parseInt(e.target.value);
    const formattedScheduleEnd = formatTimeE(totalSeconds);
    setScheduleEnd(formattedScheduleEnd);
  };


  const handleAddSchedule = () => {
    const data = {
      movieId,
      roomId,
      scheduleDate,
      scheduleStart,
      scheduleEnd,
    };
    console.log(data)

    fetch('http://localhost:80/admin/schedule/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Schedule added successfully');
          alert('Thêm lịch chiếu thành công');
          window.history.back()
        } else {
          console.error('Failed to add schedule');
        }
      })
      .catch(error => {
        console.error('Error adding schedule:', error);
      });
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm lịch chiếu</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputIdM">ID phim</CFormLabel>
                <CFormInput type="text" id="inputIdM" value={movieId} onChange={e => setMovieId(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputIdR">ID phòng chiếu</CFormLabel>
                <CFormInput type="text" id="inputIdR" value={roomId} onChange={e => setRoomId(e.target.value)} />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="daterea">Ngày chiếu</CFormLabel>
                <CCol className="col-12">
                  <DatePicker
                    selected={new Date(scheduleDate)}
                    onChange={(date) => setScheduleDate(date.toISOString().slice(0, 10))}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                  />
                </CCol>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="time">Thời gian bắt đầu</CFormLabel>
                <div>
                  <input
                    type="number"
                    value={hours}
                    onChange={handleHoursChange}
                    placeholder="Giờ"
                    min="0"
                    max="23"
                    style={{ width: '30%', marginRight: '5px' }}
                  />
                  <input
                    type="number"
                    value={minutes}
                    onChange={handleMinutesChange}
                    placeholder="Phút"
                    min="0"
                    max="59"
                    style={{ width: '30%', marginRight: '5px' }}
                  />
                  <input
                    type="number"
                    value={seconds}
                    onChange={handleSecondsChange}
                    placeholder="Giây"
                    min="0"
                    max="59"
                    style={{ width: '30%' }}
                  />
                </div>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="timeend">Thời gian kết thúc</CFormLabel>
                <div>
                  <input
                    type="number"
                    value={hoursE}
                    onChange={handleHoursChangeE}
                    placeholder="Giờ"
                    min="0"
                    max="23"
                    style={{ width: '30%', marginRight: '5px' }}
                  />
                  <input
                    type="number"
                    value={minutesE}
                    onChange={handleMinutesChangeE}
                    placeholder="Phút"
                    min="0"
                    max="59"
                    style={{ width: '30%', marginRight: '5px' }}
                  />
                  <input
                    type="number"
                    value={secondsE}
                    onChange={handleSecondsChangeE}
                    placeholder="Giây"
                    min="0"
                    max="59"
                    style={{ width: '30%' }}
                  />
                </div>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" onClick={handleAddSchedule}>
                  Thêm lịch chiếu
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddNewSchedule
