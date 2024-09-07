import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton
} from '@coreui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditMovie = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [movie, setMovie] = useState({
    movieName: '',
    movieDescription: '',
    movieCens: '',
    movieGenres: '',
    movieRelease: '',
    movieLength: '',
    movieFormat: '',
    moviePoster: '',
    movieTrailer: ''
  });

  // Fetch movie details on component mount
  useEffect(() => {
    fetch(`http://localhost:80/movies/${id}`)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'OK') {
          setMovie(result.data);
          setStartDate(new Date(result.data.movieRelease));
        } else {
          console.error('Failed to fetch movie details');
        }
      })
      .catch(error => console.error('Error fetching movie details:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setMovie({
      ...movie,
      movieRelease: date.toISOString().split('T')[0] // Format date as YYYY-MM-DD
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Movie:', movie);

    fetch(`http://localhost:80/admin/movies/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movieId: id,
        ...movie
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to update movie');
      })
      .then(result => {
        console.log('Movie updated successfully:', result);
        // Hiển thị thông báo cho người dùng rằng phim đã được cập nhật thành công
        alert('Cập nhật phim thành công');
        // Optionally navigate to another page or provide feedback to the user
        window.history.back();
      })
      .catch(error => {
        console.error('Cập nhật phim thất bại:', error);
        // Hiển thị thông báo lỗi cho người dùng
        alert('Cập nhật phim thất bại');
      });
  };


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sửa phim: {id}</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol xs={12}>
                <CFormLabel htmlFor="movieName">Tên phim</CFormLabel>
                <CFormInput
                  type="text"
                  id="movieName"
                  name="movieName"
                  value={movie.movieName}
                  onChange={handleChange}
                />
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="movieDescription">Mô tả phim</CFormLabel>
                <CFormTextarea
                  id="movieDescription"
                  name="movieDescription"
                  rows={3}
                  value={movie.movieDescription}
                  onChange={handleChange}
                ></CFormTextarea>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="movieTrailer">Link trailer</CFormLabel>
                <CFormInput
                  type="text"
                  id="movieTrailer"
                  name="movieTrailer"
                  value={movie.movieTrailer}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="movieCens">Phân loại phim</CFormLabel>
                <CFormSelect
                  id="movieCens"
                  name="movieCens"
                  value={movie.movieCens}
                  onChange={handleChange}
                >
                  <option value="">Chọn phân loại phim...</option>
                  <option value="P">P</option>
                  <option value="C13">C13</option>
                  <option value="C16">C16</option>
                  <option value="C18">C18</option>
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="movieGenres">Thể loại phim</CFormLabel>
                <CFormInput
                  id="movieGenres"
                  name="movieGenres"
                  type="text"
                  value={movie.movieGenres}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="movieRelease">Ngày phát hành</CFormLabel>
                <CCol className="col-12">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                  />
                </CCol>
              </CCol>
              <CCol md={2}>
                <CFormLabel htmlFor="movieLength">Thời lượng phim</CFormLabel>
                <CFormInput
                  id="movieLength"
                  name="movieLength"
                  type="text"
                  value={movie.movieLength}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="movieFormat">Định dạng phim</CFormLabel>
                <CFormSelect
                  id="movieFormat"
                  name="movieFormat"
                  value={movie.movieFormat}
                  onChange={handleChange}
                >
                  <option value="">Chọn định dạng...</option>
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                  <option value="IMAX">IMAX</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="moviePoster">Link Poster</CFormLabel>
                <CFormInput
                  id="moviePoster"
                  name="moviePoster"
                  type="text"
                  value={movie.moviePoster}
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
  );
}

export default EditMovie;
