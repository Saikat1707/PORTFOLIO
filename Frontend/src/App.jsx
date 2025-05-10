import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import CreateLink from './pages/CreateLink'
import UpdateLink from './pages/UpdateLink'
import UpdateProject from './pages/UpdateProject'
import HeroSection from './pages/home/HeroSection'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HeroSection/>} />
        <Route path='/admin/customize' element={<Admin/>} />
        <Route path='/admin/customize/create/:title' element={<CreateLink/>}/>
        <Route path='/admin/customize/update/:title/:linkId' element={<UpdateLink/>}/>
        <Route path='/admin/customize/update/Project/:projectId' element={<UpdateProject/>}/>
      </Routes>
    </>
  )
}

export default App
