import React, { Component } from 'react';
import Router from 'next/router';
import AuthService from '../utils/AuthService';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';

const auth = new AuthService();

export default class CreateEvent extends Component {
    state = {
        title: '',
        description: '',
        error: ''
    };

    handleChange = ev => {
        const { error } = this.state;
        if (error.length) this.setError('');

        const val = ev.target.value;
        const field = ev.target.name;
        const newState = {};
        newState[field] = val;

        this.setState(() => {
            return newState;
        });
    };

    handleSubmit = ev => {
        const data = this.state;
        const { applicationJSON } = data;
        data.applicationJSON = JSON.stringify(applicationJSON);

        ev.preventDefault();

        if (this.validate()) {
            auth.api('post', '/event', {
                data
            }).then(() => {
                Router.push('http://localhost:3001/events');
            });
        }
    };

    validate = () => {
        const { title } = this.state;
        if (!title.length) {
            this.setError('You must enter a title!');
            return false;
        }
        return true;
    };

    setError = msg => {
        this.setState({ error: msg });
    };

    render() {
        const { error } = this.state;
        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel title="Create Event" styleName="panel-md">
                        <form className="proto-form form-apply">
                            <input
                                name="title"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="Title"
                            />
                            <textarea
                                name="description"
                                cols="30"
                                rows="5"
                                onChange={this.handleChange}
                                placeholder="Event Description"
                            />
                            <button
                                className="proto-btn"
                                onClick={this.handleSubmit}
                                type="submit"
                            >
                                Create Event
                            </button>
                        </form>
                        {error}
                    </Panel>
                </div>
            </div>
        );
    }
}
