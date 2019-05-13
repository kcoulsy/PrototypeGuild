import React from 'react'

import Nav from '../../components/Nav';
import DashboardNav from '../../components/DashboardNav'
import ApplicantInfo from '../../components/ApplicantInfo'

export default () => {
  return (
    <div >
      <Nav />
      <DashboardNav />
        <div className="main">
        <div className="applicant">
        <h2>Applicant</h2>
        <ApplicantInfo/>
        </div>
      </div>
    </div>
  )
}
