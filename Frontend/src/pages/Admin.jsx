import React from 'react'
import '../css/Admin.css'
import Profile from '../components/Profile'
import LinkCard from '../components/LinkCard'
const Admin = () => {
  return (
    <div className="AdminContainer">
        <Profile/>
        <LinkCard title = "Programming"/>
        <LinkCard title = "Social"/>
        <LinkCard title = "Project"/>
    </div>
  )
}

export default Admin
