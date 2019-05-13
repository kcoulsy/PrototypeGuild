import React from 'react'

import Nav from '../components/Nav';
import DashboardNav from '../components/DashboardNav'
import UserProfileInfo from '../components/UserProfileInfo'
import EventsTable from '../components/EventsTable'
export default () => {
  return (
    <div >
      <Nav />
      <DashboardNav />
        <div className="main">
        <div className="profile">
        <h2>Profile</h2>
        <UserProfileInfo />
        <h4>Signed Up</h4>
        <EventsTable />
        <h4>Attended Events</h4>
        <EventsTable />
        </div>
      </div>
    </div>
  )
}
