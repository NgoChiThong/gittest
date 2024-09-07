import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAlarm,
  cilAvTimer, cilBarcode,
  cilBell,
  cilCalculator,
  cilCalendar,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilFeaturedPlaylist, cilHome,
  cilLibraryAdd, cilMap,
  cilMediaPlay,
  cilMovie,
  cilNotes,
  cilPencil, cilPeople,
  cilPuzzle, cilRoom, cilSmile,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Trang chủ',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Quản lý phim',
  },
  {
    component: CNavGroup,
    name: 'Quản lý phim',
    to: '/base',
    icon: <CIcon icon={cilMovie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách phim',
        to: '/movies/list-moives',
        icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Phim đang chiếu',
        to: '/movies/now-showing',
        icon: <CIcon icon={cilMediaPlay} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Phim sắp chiếu',
        to: '/movies/will-showing',
        icon: <CIcon icon={cilAlarm} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Thêm phim mới',
        to: '/movies/add-new-movie',
        icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Quản lý lịch chiếu',
  },
  {
    component: CNavGroup,
    name: 'Quản lý lịch chiếu',
    to: '/base',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách lịch chiếu',
        to: '/schedule/list-schedule',
        icon: <CIcon icon={cilAvTimer} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Quản lý rạp và phòng',
  },
  {
    component: CNavGroup,
    name: 'Quản lý rạp và phòng',
    to: '/base',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách rạp chiếu',
        to: '/cinema/list-cinema',
        icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Danh sách phòng chiếu',
        to: '/cinema/list-room',
        icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Quản lý vé đã đặt',
  },
  {
    component: CNavGroup,
    name: 'Quản lý vé',
    to: '/base',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách đơn hàng',
        to: '/orders/list-orders',
        icon: <CIcon icon={cilBarcode} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Quản lý người dùng',
  },
  {
    component: CNavGroup,
    name: 'Quản lý người dùng',
    to: '/base',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách người dùng',
        to: '/users/list-users',
        icon: <CIcon icon={cilSmile} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
