import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//phim
const ListMovies = React.lazy(() => import('./views/movies/ListMovies'))
const NowShowing = React.lazy(() => import('./views/movies/NowShowing'))
const AddNewMovie = React.lazy(() => import('./views/movies/AddNewMovie'))
const MovieDetail = React.lazy(() => import('./views/movies/MovieDetail'))
const EditMovie = React.lazy(() => import('./views/movies/EditMovie'))
const WillShowing = React.lazy(() => import('./views/movies/WillShowing'))

//Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

//lịch chiếu
const ListSchedule = React.lazy(() => import('./views/schedule/ListSchedule'))
const AddNewSchedule = React.lazy(() => import('./views/schedule/AddNewSchedule'))
const EditSchedule = React.lazy(() => import('./views/schedule/EditSchedule'))
//rap chieu
const ListCinema = React.lazy(() => import('./views/cinema/ListCinema'))
const AddNewCinema = React.lazy(() => import('./views/cinema/AddNewCinema'))
const CinemaDetail = React.lazy(() => import('./views/cinema/CinemaDetail'))
const CinemaEdit = React.lazy(() => import('./views/cinema/EditCinema'))
const ListRoom = React.lazy(() => import('./views/cinema/ListRoom'))
const AddNewRoom = React.lazy(() => import('./views/cinema/AddNewRoom'))
//orders
const ListOrders = React.lazy(() => import('./views/orders/ListOrders'))
const OrderDetail = React.lazy(() => import('./views/orders/OrderDetail'))
//user
const ListUsers = React.lazy(() => import('./views/users/ListUsers'))
const UserDetail = React.lazy(() => import('./views/users/UserDetail'))
const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/dashboard', name: 'Thống kê', element: Dashboard },
  { path: '/movies/list-moives', name: 'Danh sách phim', element: ListMovies },
  { path: '/movies/now-showing', name: 'Phim đang chiếu', element: NowShowing },
  { path: '/movies/add-new-movie', name: 'Thêm phim', element: AddNewMovie },
  { path: '/movies/movie-detail/:id', name: 'Chi tiết phim', element: MovieDetail },
  { path: '/movies/edit-movie/:id', name: 'Sửa phim', element: EditMovie },
  { path: '/movies/will-showing', name: 'Phim sắp chiếu', element: WillShowing },

  { path: '/schedule/list-schedule', name: 'Lịch chiếu', element: ListSchedule },
  { path: '/schedule/add-new-schedule', name: 'Thêm lịch chiếu', element: AddNewSchedule },
  { path: '/schedule/edit-schedule/:id', name: 'Sửa lịch chiếu', element: EditSchedule },

  { path: '/cinema/list-cinema', name: 'Rạp chiếu', element: ListCinema },
  { path: '/cinema/add-new-cinema', name: 'Thêm rạp chiếu', element: AddNewCinema },
  { path: '/cinema/cinema-detail/:id', name: 'Chi tiết rạp chiếu', element: CinemaDetail },
  { path: '/cinema/edit-cinema/:id', name: 'Sửa rạp chiếu', element: CinemaEdit },
  { path: '/cinema/list-room', name: 'Danh sách phòng chiếu', element: ListRoom },
  { path: '/cinema/add-new-room', name: 'Thêm phòng chiếu', element: AddNewRoom },

  { path: '/orders/list-orders', name: 'Danh sách đặt vé', element: ListOrders },
  { path: '/orders/order-detail/:id', name: 'Chi tiết vé đã đặt', element: OrderDetail },

  { path: '/users/list-users', name: 'Người dùng', element: ListUsers },
  { path: '/users/user-detail/:id', name: 'Chi tiết người dùng', element: UserDetail },

]

export default routes
