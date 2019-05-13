import React from 'react'

import Nav from '../components/Nav';
import LoginForm from '../components/LoginForm'

export default () => {
  return (
    <div >
      <Nav />
        <div className="main">
        <div className="login">
        <h2>Login</h2>
        <LoginForm />
        </div>
      </div>
    </div>
  )
}
