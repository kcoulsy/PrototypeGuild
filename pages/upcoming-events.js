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
        <h2>Upcoming Events</h2>
        <EventsTable />
        <h4><Link href="/past-events"><a>See Past Events</a></Link></h4>
        </div>
      </div>
    </div>
  )
}
