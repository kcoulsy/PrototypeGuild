import React from 'react'

import Nav from '../../components/Nav';
import DashboardNav from '../../components/DashboardNav'
import EditProfileForm from '../../components/EditProfileForm'
export default () => {
  return (
    <div >
      <Nav />
      <DashboardNav />
        <div className="main">
        <div className="profile">
        <h2>Edit Profile</h2>
        <EditProfileForm />
        </div>
      </div>
    </div>
  )
}
