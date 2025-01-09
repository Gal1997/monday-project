import { Routes, Route, useLocation } from 'react-router-dom'
import './styles/mainStyles.scss'
import { UserMsg } from './cmps/Usermsg'
import { Login } from './pages/Login'
import { HomePage } from './pages/HomePage'
import { SignUp } from './pages/SignUp'
import { MondayIndex } from './pages/MondayIndex'
import SideBar from './cmps/SideBar'
import { BoardDetails } from './pages/BoardDetails'
import Navbar from './cmps/NavBar'

function RootCmp() {
  const location = useLocation()
  const showSidebarAndNavBar = location.pathname.startsWith('/workspace')
  return (
    <div>
      {showSidebarAndNavBar && <SideBar />}
      {showSidebarAndNavBar && <Navbar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='workspace/board/:boardId' element={<BoardDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/index' element={<MondayIndex />} />
      </Routes>

      <UserMsg />
    </div>
  )
}

export default RootCmp
