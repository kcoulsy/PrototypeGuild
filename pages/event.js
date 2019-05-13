import React from 'react'

import Nav from '../components/Nav';
import DashboardNav from '../components/DashboardNav'
export default () => {
  return (
    <div >
      <Nav />
      <DashboardNav />
        <div className="main">
        <div className="events">
        <h2>Event</h2>
        <table class="info">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>Molten Core</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>Wednesday 15th May</td>
                </tr>
            </tbody>
        </table>
        <h4>Accepted</h4>
        <table class="accepted">
            <thead>
                <tr>
                    <td>Tanks</td>
                    <td>Healers</td> 
                    <td>Melee DPS</td> 
                    <td>Ranged DPS</td> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Syth</td>
                    <td></td>
                    <td>Kiccpe</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-success">Accept</button>
        <button class="btn btn-primary">Maybe</button>
        <button class="btn btn-danger">Decline</button>
        </div>
      </div>
    </div>
  )
}
