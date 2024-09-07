import React, {useEffect, useState} from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CFormInput } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'

const ListRoom = () => {
  const [filterText, setFilterText] = useState('')
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const columns = [
    {
      name: 'ID phòng chiếu',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'ID rạp',
      selector: (row) => row.idCinema,
      sortable: true,
    },
    {
      name: 'Tên phòng chiếu',
      selector: (row) => row.nameRoom,
      sortable: true,
    },
    {
      name: 'Tác vụ',
      cell: (row) => (
        <div>
          <CButton color="success" variant="outline" onClick={() => cinemaDetail(row.id)}>
            Xem
          </CButton>
          <CButton
            color="warning"
            variant="outline"
            onClick={() => cinemaEdit(row.id)}
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
    fetch('http://localhost:80/admin/room')
      .then(response => response.json())
      .then(result => {
        if (result.status === 'OK') {
          // Map data to the desired structure
          const mappedData = result.data.map(room => ({
            id: room.roomId,
            idCinema: room.cinemaId,
            nameRoom: room.roomName,
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

    fetch(`http://localhost:80/admin/room/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Room deleted successfully');
          alert('Xóa phòng thành công');
          window.location.reload();
        } else {
          console.error('Failed to delete room');
        }
      })
      .catch(error => {
        console.error('Error deleting room:', error);
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
    navigate('/cinema/add-new-room')
  }
  const cinemaDetail = (id) => {
    // Thực hiện các thao tác chỉnh sửa tại đây, ví dụ:
 //   navigate(`/cinema/cinema-detail/${id}`)
  }
  const cinemaEdit = (id) => {
    // Thực hiện các thao tác chỉnh sửa tại đây, ví dụ:
 //   navigate(`/cinema/edit-cinema/${id}`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách phòng chiếu</strong>
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
            <strong>Quản lý phòng chiếu</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" variant="outline" onClick={() => handleAddNew()}>
              Thêm phòng
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListRoom
