import { Routes, Route, useLocation } from 'react-router-dom'
import './assets/styles/styles.scss'
import { UserMsg } from './cmps/Usermsg'
import { Login } from './pages/Login'
import { HomePage } from './pages/HomePage'
import { SignUp } from './pages/SignUp'
import { MondayIndex } from './pages/MondayIndex'
import SideBar from './cmps/layout/SideBar'
import { BoardDetails } from './pages/BoardDetails'
import NavBar from './cmps/layout/NavBar'
import { TaskDetails } from './pages/TaskDetails'
import { BoardIndex } from './pages/BoardIndex'
// import { TaskDetails } from './pages/TaskDetails'

function RootCmp() {
  const location = useLocation()
  const showSidebarAndNavBar = location.pathname.startsWith('/workspace')
  //test
  return (
    <div className='app-container'>
      {showSidebarAndNavBar && <SideBar />}
      {showSidebarAndNavBar && <NavBar />}
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/workspace' element={<BoardIndex />} />
          <Route path='/workspace/board/:boardId' element={<BoardDetails />}>
            <Route path='task/:taskId' element={<TaskDetails />} />
          </Route>
        </Routes>
      </div>

      <UserMsg />
    </div>
  )
}
