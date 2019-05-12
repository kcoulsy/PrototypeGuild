import React from 'react'
import Link from 'next/link'

import './styles.scss';

const Nav = () => (
    <div className="nav">
        <i className="fas fa-bars"></i>
        <div className="nav-items">
            <div className="nav-item"><Link href="/about"><a>About</a></Link></div>
            <div className="nav-item"><Link href="/media"><a>Media</a></Link></div>
            <div className="nav-item guild-name"><Link href="/"><a><img src="https://i.imgur.com/cCsagAI.png"/></a></Link></div>
            <div className="nav-item"><Link href="/dashboard"><a>Members Area</a></Link></div>
            <div className="nav-item"><Link href="/apply"><a>Apply</a></Link></div>
        </div>
    </div>
)

export default Nav
