import React, {useEffect, useState} from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CFormInput } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'

const ListSchedule = () => {
  const [filterText, setFilterText] = useState('')
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'ID phim',
      selector: (row) => row.idMovie,
      sortable: true,
    },
    {
      name: 'ID phòng chiếu',
      selector: (row) => row.idRoom,
      sortable: true,
    },
    {
      name: 'Ngày chiếu',
      selector: (row) => row.scheduleD,
      sortable: true,
    },
    {
      name: 'Thời gian bắt đầu',
      selector: (row) => row.scheduleS,
      sortable: true,
    },
    {
      name: 'Thời gian kết thúc',
      selector: (row) => row.scheduleE,
      sortable: true,
    },
    {
      name: 'Tác vụ',
      cell: (row) => (
        <div>
          <CButton
            color="warning"
            variant="outline"
            onClick={() => scheduleEdit(row.id)}
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
    fetch('http://localhost:80/admin/schedule')
      .then(response => response.json())
      .then(result => {
        if (result.status === 'OK') {
          // Map data to the desired structure
          const mappedData = result.data.map(schedule => ({
            id: schedule.scheduleId,
            idMovie: schedule.movieId,
            idRoom: schedule.roomId,
            scheduleD: schedule.scheduleDate,
            scheduleS: schedule.scheduleStart,
            scheduleE: schedule.scheduleEnd,
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

    fetch(`http://localhost:80/admin/schedule/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Schedule deleted successfully');
          alert('Xóa lịch chiếu thành công');
          window.location.reload();
        } else {
          console.error('Failed to delete schedule');
        }
      })
      .catch(error => {
        console.error('Error deleting schedule:', error);
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
    navigate('/schedule/add-new-schedule')
  }
  const scheduleEdit = (id) => {
    console.log('Schedule ID:', id)
    // Thực hiện các thao tác chỉnh sửa tại đây, ví dụ:
    navigate(`/schedule/edit-schedule/${id}`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lịch chiếu</strong>
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
            <strong>Quản lý lịch chiếu</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" variant="outline" onClick={() => handleAddNew()}>
              Thêm lịch chiếu
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListSchedule
