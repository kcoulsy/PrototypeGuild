import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

class Home extends Component {
  render() {
    return (
        <div>
            <Navbar loggedIn={false} />
            <div className="content">
            <Panel title="hello" className="">Test</Panel>
            </div>
        </div>
    )
  }
}

export default Home;