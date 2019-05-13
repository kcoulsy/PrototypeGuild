import React from 'react'

import Nav from '../../components/Nav';
import DashboardNav from '../../components/DashboardNav'
import ApplicationsTable from '../../components/ApplicationsTable'
export default () => {
  return (
    <div >
      <Nav />
      <DashboardNav />
        <div className="main">
        <div className="members">
        <h2>Members</h2>
        <ApplicationsTable />
        </div>
      </div>
    </div>
  )
}
