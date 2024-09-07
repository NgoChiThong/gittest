import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'react-router-dom'

const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:80/movies/${id}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'OK') {
          setMovie(result.data)
        } else {
          console.error('Failed to fetch movie details')
        }
      })
      .catch(error => console.error('Error fetching movie details:', error))
  }, [id])

  if (!movie) {
    return <div>Loading...</div>;
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Chi tiết phim: {movie.movieName} </strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol xs={12}>
                <CFormLabel htmlFor="inputName">Tên phim</CFormLabel>
                <CFormInput type="text" id="inputName" value={movie.movieName} disabled={true} />
              </CCol>
              <CCol xs={12}>
                <CFormTextarea
                  id="des"
                  label="Mô tả phim"
                  rows={3}
                  text="Từ 8 đến 12 dòng."
                  value={movie.movieDescription}
                  disabled={true}
                ></CFormTextarea>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="trailer">Link trailer</CFormLabel>
                <CFormInput
                  type="text"
                  id="trailer"
                  value={movie.movieTrailer}
                  disabled={true}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="cens">Phân loại phim</CFormLabel>
                <CFormInput type="text" id="cens" value={movie.movieCens} disabled={true} />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="type">Thể loại phim</CFormLabel>
                <CFormInput id="type" type="text" value={movie.movieGenres} disabled={true} />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="daterea">Ngày phát hành</CFormLabel>
                <CCol className="col-12">
                  <CFormInput id="daterea" type="text" value={movie.movieRelease} disabled={true} />
                </CCol>
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="time">Thời lượng phim</CFormLabel>
                <CFormInput id="time" value={movie.movieLength} disabled={true} />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="inputState">Định dạng phim</CFormLabel>
                <CFormInput id="inputState" value={movie.movieFormat} disabled={true} />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="poster">Link Poster</CFormLabel>
                <CFormInput
                  type="text"
                  id="poster"
                  value={movie.moviePoster}
                  disabled={true}
                />
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

export default MovieDetail;
