import React from 'react'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'
export default () => {
    return (
        <div>
            <Navbar />
            <div className="content">
            <Panel title="hello" className="">Test</Panel>
            </div>
        </div>
    )
}
