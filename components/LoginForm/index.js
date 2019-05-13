import React from 'react'
import Link from 'next/link'
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
                <td></td><td><Link href="/dashboard"><button className="btn btn-success">Login</button></Link></td>
            </tr>
        </tbody>
    </table>
  )
}
