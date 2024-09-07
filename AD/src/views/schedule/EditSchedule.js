import React, {useEffect, useState} from 'react'
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
import { useParams } from 'react-router-dom'

const EditSchedule = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [schedule, setSchedule] = useState({
    movieId: '',
    roomId: '',
    scheduleDate: '',
    scheduleStart: '',
    scheduleEnd: '',
  });

  // Fetch movie details on component mount
  useEffect(() => {
    fetch(`http://localhost:80/admin/schedule/${id}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'OK') {
          setSchedule(result.data);
          setStartDate(new Date(result.data.scheduleDate));
        } else {
          console.error('Failed to fetch schedule details');
        }
      })
      .catch(error => console.error('Error fetching schedule details:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setSchedule({
      ...schedule,
      scheduleDate: date.toISOString().split('T')[0] // Format date as YYYY-MM-DD
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Schedule:', schedule);

    fetch(`http://localhost:80/admin/schedule/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scheduleId: id,
        ...schedule
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to update schedule');
      })
      .then(result => {
        console.log('Schedule updated successfully:', result);
        alert('Cập nhật lịch chiếu thành công');
        window.history.back();
      })
      .catch(error => {
        console.error('Cập nhật lịch chiếu thất bại:', error);
        // Hiển thị thông báo lỗi
        alert('Cập nhật lịch chiếu thất bại');
      });
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sửa lịch chiếu: {id}</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol md={6}>
                <CFormLabel htmlFor="idMovie">ID phim</CFormLabel>
                <CFormInput
                  type="text"
                  id="idMovie"
                  name="idMovie"
                  value={schedule.movieId}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="idRoom">ID phòng chiếu</CFormLabel>
                <CFormInput
                  type="text"
                  id="idRoom"
                  name="idRoom"
                  value={schedule.roomId}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="daterea">Ngày chiếu</CFormLabel>
                <CCol className="col-12">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                  />
                </CCol>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="time">Thời gian bắt đầu</CFormLabel>
                <CFormInput
                  id="scheduleStart"
                  name="scheduleStart"
                  type="text"
                  value={schedule.scheduleStart}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="timeend">Thời gian kết thúc</CFormLabel>
                <CFormInput
                  id="scheduleEnd"
                  name="scheduleEnd"
                  type="text"
                  value={schedule.scheduleEnd}
                  onChange={handleChange}
                />
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Cập nhật
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditSchedule
