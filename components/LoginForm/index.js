import React from 'react'
import './styles.scss';

export default () => {
  return (
    <table className="form">
        <tbody>
            <tr>
                <td>Username</td>
                <td><input type="text" /></td>
            </tr>
            <tr>
                <td>Password</td>
                <td><input type="password" /></td>
            </tr>
            <tr>
                <td></td><td><button className="btn btn-success">Login</button></td>
            </tr>
        </tbody>
    </table>
  )
}
