import React from 'react'
import Link from 'next/link'

import './styles.scss';

export default () => {
  return (
    <div className="dash-nav">
    <i className="fas fa-bars"></i>
        <div className="nav-items">
            <div className="nav-item"><Link href="/about"><a>Members</a></Link></div>
            <div className="nav-item"><Link href="/media"><a>Events</a></Link></div>
            <div className="nav-item"><Link href="/"><a>My Profile</a></Link></div>
            <div className="nav-item"><Link href="/apply"><a>Settings</a></Link></div>
        </div>
    </div>
  )
}
