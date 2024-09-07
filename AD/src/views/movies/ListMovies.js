import React, { useState, useEffect } from 'react';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CFormInput } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'

const ListMovies = () => {
  const [filterText, setFilterText] = useState('')
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const columns = [
    {
      name: 'ID phim',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Tên',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Ngày phát hành',
      selector: (row) => row.releaseDate,
      sortable: true,
    },
    {
      name: 'Danh mục phim',
      selector: (row) => row.cen,
      sortable: true,
    },
    {
      name: 'Tác vụ',
      cell: (row) => (
        <div>
          <CButton color="success" variant="outline" onClick={() => movieDetail(row.id)}>
            Xem
          </CButton>
          <CButton
            color="warning"
            variant="outline"
            onClick={() => movieEdit(row.id)}
            style={{ marginLeft: '10px' }}
          >
            Sửa
          </CButton>
          <CButton
            color="danger"
            variant="outline"
            onClick={() => handleDelete(row.id)}
            style={{ marginLeft: '10px' }}
          >
            Xóa
          </CButton>
        </div>
      ),
    },
  ]
  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:80/movies')
      .then(response => response.json())
      .then(result => {
        if (result.status === 'OK') {
          // Map data to the desired structure
          const mappedData = result.data.map(movie => ({
            id: movie.movieId,
            name: movie.movieName,
            releaseDate: movie.movieRelease,
            cen: movie.movieCens,
          }));
          setData(mappedData);
        } else {
          console.error('Failed to fetch data');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const handleDelete = (id) => {
    console.log('Delete ID:', id);

    fetch(`http://localhost:80/admin/movies/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Movie deleted successfully');
          // Thực hiện các thao tác sau khi xóa thành công, ví dụ:
          // reloadData();
          alert('Xóa phim thành công');
          window.location.reload();
        } else {
          console.error('Failed to delete movie');
        }
      })
      .catch(error => {
        console.error('Error deleting movie:', error);
      });
  }

  const subHeaderComponent = (
    <CFormInput
      type="text"
      placeholder="Tìm kiếm..."
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  )

  const filteredData = data.filter(
    (item) =>
      item.id.toString().includes(filterText) ||
      item.class.toLowerCase().includes(filterText.toLowerCase()) ||
      item.heading1.toLowerCase().includes(filterText.toLowerCase()) ||
      item.heading2.toLowerCase().includes(filterText.toLowerCase()),
  )
  const handleAddNew = () => {
    navigate('/movies/add-new-movie')
  }
  const movieDetail = (id) => {
    console.log('Movie ID:', id)
    // Thực hiện các thao tác chỉnh sửa tại đây, ví dụ:
    navigate(`/movies/movie-detail/${id}`)
  }
  const movieEdit = (id) => {
    console.log('Movie ID:', id)
    // Thực hiện các thao tác chỉnh sửa tại đây, ví dụ:
    navigate(`/movies/edit-movie/${id}`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách tất cả phim</strong>
          </CCardHeader>
          <CCardBody>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              subHeader
              subHeaderComponent={subHeaderComponent}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Quản lý phim</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" variant="outline" onClick={() => handleAddNew()}>
              Thêm phim
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListMovies
