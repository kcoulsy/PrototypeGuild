import React from 'react'
import Link from 'next/link'

import Nav from '../components/Nav';
import DashboardNav from '../components/DashboardNav'
import EventsTable from '../components/EventsTable'
export default () => {
  return (
    <div >
      <Nav />
      <DashboardNav />
        <div className="main">
        <div className="events">
        <h2>Past Events</h2>
        <EventsTable />
        <h4><Link href="/upcoming-events"><a>See Upcoming Events</a></Link></h4>
        </div>
      </div>
    </div>
  )
}
