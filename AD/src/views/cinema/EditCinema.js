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

const EditCinema = () => {
  const { id } = useParams();
  const [cinema, setCinema] = useState({
    cinemaName: '',
    cinemaAddress: '',
  });

  // Fetch movie details on component mount
  useEffect(() => {
    fetch(`http://localhost:80/admin/cinema/update/${id}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'OK') {
          setCinema(result.data);
        } else {
          console.error('Failed to fetch cinema details');
        }
      })
      .catch(error => console.error('Error fetching cinema details:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCinema({
      ...cinema,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Cinema:', cinema);

    fetch(`http://localhost:80/admin/cinema/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cinemaId: id,
        ...cinema
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to update cinema');
      })
      .then(result => {
        console.log('Cinema updated successfully:', result);
        alert('Cập nhật rạp thành công');
        window.history.back();
      })
      .catch(error => {
        console.error('Cập nhật rạp thất bại:', error);
        // Hiển thị thông báo lỗi
        alert('Cập nhật rạp thất bại');
      });
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sửa rạp chiếu: {id}</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol md={6}>
                <CFormLabel htmlFor="cinemaName">Tên rạp</CFormLabel>
                <CFormInput
                  type="text"
                  id="cinemaName"
                  name="cinemaName"
                  value={cinema.cinemaName}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="cinemaAdd">Địa chỉ</CFormLabel>
                <CFormInput
                  type="text"
                  id="cinemaAdd"
                  name="cinemaAdd"
                  value={cinema.cinemaAddress}
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

export default EditCinema
