import React from 'react'

import Nav from '../components/Nav';
import DashboardNav from '../components/DashboardNav'
import ChangePasswordForm from '../components/ChangePasswordForm'
import UpdateProfileForm from '../components/UpdateProfileForm'
export default () => {
  return (
    <div >
      <Nav />
      <DashboardNav />
        <div className="main">
        <div className="profile">
        <h2>Settings</h2>
        <h4>Change Password</h4>
        <ChangePasswordForm />
        <h4>Update Profile</h4>
        <UpdateProfileForm />
        </div>
      </div>
    </div>
  )
}
