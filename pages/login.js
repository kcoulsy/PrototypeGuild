import React from 'react'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'
export default () => {
    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel styleName="panel-sm">
                    <div class="proto-form">
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button className="proto-btn">Login</button>
                        <a href="">Click here to Apply</a>
                    </div>
                </Panel>
            </div>
        </div>
    )
}
