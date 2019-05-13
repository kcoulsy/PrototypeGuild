import React from 'react'
import Link from 'next/link'

import './styles.scss';

export default () => {
  return (
    <div className="dash-nav">
    <i className="fas fa-bars"></i>
        <div className="nav-items">
            <div className="nav-item"><Link href="/login"><a>Login</a></Link></div>
            <div className="nav-item"><Link href="/members"><a>Members</a></Link></div>
            <div className="nav-item"><Link href="/applications"><a>applications</a></Link></div>
            <div className="nav-item"><Link href="/applicant"><a>applicant</a></Link></div>
            <div className="nav-item"><Link href="/admin/edit-profile"><a>Members</a></Link></div>
            <div className="nav-item"><Link href="/upcoming-events"><a>Events</a></Link></div>
            <div className="nav-item"><Link href="/profile"><a>My Profile</a></Link></div>
            <div className="nav-item"><Link href="/settings"><a>Settings</a></Link></div>
        </div>
    </div>
  )
}
