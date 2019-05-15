import React from 'react'

import Nav from '../components/Nav';
import DashboardNav from '../components/DashboardNav'
export default () => {
  return (
    <div >
      <Nav />
      <DashboardNav />
        <div className="main">
        <div className="profile">
        <h4>Click on a link above</h4>
        </div>
      </div>
    </div>
  )
}
