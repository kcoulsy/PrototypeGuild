import React, { Component } from 'react'
import Router from 'next/router'
import AuthService from '../utils/AuthService'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

const auth = new AuthService()

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        error: ''
    }
    handleInput = ({target}) => {
        const {name, value} = target;
        const newState = {
            error: ''
        };
        newState[name] = value;
        this.setState(newState);
    }
    componentDidMount () {
        if (auth.loggedIn()) {
            Router.push('http://localhost:3001/members')
        }
      }
    handleSubmit = e => {
        e.preventDefault()
        auth.login(this.state.username, this.state.password).then(res => {
            Router.push('http://localhost:3001/members')
            console.log(res)
        }).catch(e => {
            this.setState({error: 'Unable to login'})
        })
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <Navbar loggedIn={false}/>
                <div className="content">
                    <Panel styleName="panel-sm">
                        <div className="proto-form">
                            {this.state.error}
                            <input type="text" name="username" onChange={this.handleInput} placeholder="Username" />
                            <input type="password" name="password" onChange={this.handleInput} placeholder="Password" />
                            <button
                                className="proto-btn"
                                onClick={this.handleSubmit}
                            >
                                Login
                            </button>
                            <a href="">Click here to Apply</a>
                        </div>
                    </Panel>
                </div>
            </div>
        )
    }
}
