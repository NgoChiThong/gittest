import React, { useState, useEffect } from 'react'
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

const AddNewMovie = () => {
  // const [startDate, setStartDate] = useState(new Date())
  const [movieName, setMovieName] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieTrailer, setMovieTrailer] = useState('');
  const [movieCens, setMovieCens] = useState('');
  const [movieGenres, setMovieGenres] = useState('');
  const [movieRelease, setMovieRelease] = useState(new Date().toISOString().slice(0, 10));
  const [movieLength, setMovieLength] = useState('');
  const [movieFormat, setMovieFormat] = useState('');
  const [moviePoster, setMoviePoster] = useState('');

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

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

  const handleHoursChange = (e) => {
    setHours(e.target.value);
    const totalSeconds = parseInt(e.target.value) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    const formattedMovieLength = formatTime(totalSeconds);
    setMovieLength(formattedMovieLength);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
    const totalSeconds = parseInt(hours) * 3600 + parseInt(e.target.value) * 60 + parseInt(seconds);
    const formattedMovieLength = formatTime(totalSeconds);
    setMovieLength(formattedMovieLength);
  };

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value);
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(e.target.value);
    const formattedMovieLength = formatTime(totalSeconds);
    setMovieLength(formattedMovieLength);
  };


  const handleAddMovie = () => {
    const data = {
      movieName,
      movieDescription,
      movieTrailer,
      movieCens,
      movieGenres,
      movieRelease,
      movieLength,
      movieFormat,
      moviePoster,
    };
    console.log(data)

    fetch('http://localhost:80/admin/movies/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Movie added successfully');
          alert('Thêm phim thành công');
          window.history.back()
        } else {
          console.error('Failed to add movie');
        }
      })
      .catch(error => {
        console.error('Error adding movie:', error);
      });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thêm phim</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol xs={12}>
                <CFormLabel htmlFor="inputName">Tên phim</CFormLabel>
                <CFormInput type="text" id="inputName" value={movieName} onChange={e => setMovieName(e.target.value)} />
              </CCol>
              <CCol xs={12}>
                <CFormTextarea
                  id="des"
                  label="Mô tả phim"
                  rows={3}
                  text="Từ 8 đến 12 dòng."
                  value={movieDescription}
                  onChange={e => setMovieDescription(e.target.value)}
                ></CFormTextarea>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="trailer">Link trailer</CFormLabel>
                <CFormInput type="text" id="trailer" value={movieTrailer} onChange={e => setMovieTrailer(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="cens">Phân loại phim</CFormLabel>
                <CFormSelect id="cens" value={movieCens} onChange={e => setMovieCens(e.target.value)}>
                  <option>Chọn phân loại phim...</option>
                  <option>P</option>
                  <option>K</option>
                  <option>T13</option>
                  <option>T16</option>
                  <option>T18</option>
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="type">Thể loại phim</CFormLabel>
                <CFormInput id="type" type="text" value={movieGenres} onChange={e => setMovieGenres(e.target.value)}/>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="daterea">Ngày phát hành</CFormLabel>
                <CCol className="col-12">
                  <DatePicker
                    selected={new Date(movieRelease)}
                    onChange={(date) => setMovieRelease(date.toISOString().slice(0, 10))}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                  />
                </CCol>
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="time">Thời lượng phim</CFormLabel>
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
              <CCol md={3}>
                <CFormLabel htmlFor="inputState">Định dạng phim</CFormLabel>
                <CFormSelect id="format" value={movieFormat} onChange={e => setMovieFormat(e.target.value)}>
                  <option>Chọn định dạng...</option>
                  <option>2D</option>
                  <option>3D</option>
                  <option>IMAX</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="poster">Link Poster</CFormLabel>
                <CFormInput id="poster" value={moviePoster} onChange={e => setMoviePoster(e.target.value)} />
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" onClick={handleAddMovie}>
                  Thêm phim
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddNewMovie
