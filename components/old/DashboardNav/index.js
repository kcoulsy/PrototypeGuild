import React from 'react'
import Link from 'next/link'

import './styles.scss';

export default () => {
  return (
    <div className="dash-nav">
    <i className="fas fa-bars"></i>
        <div className="nav-items">
            <Link href="/members"><div className="nav-item">Members</div></Link>
            <Link href="/admin/applications"><div className="nav-item">Applications(Admin)</div></Link>
            <Link href="/admin/edit-profile"><div className="nav-item">Edit User(Admin)</div></Link>
            <Link href="/upcoming-events"><div className="nav-item">Events</div></Link>
            <Link href="/profile"><div className="nav-item">My Profile</div></Link>
            <Link href="/settings"><div className="nav-item">Settings</div></Link>
        </div>
    </div>
  )
}
