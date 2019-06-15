import React, { Component } from 'react';
import Router from 'next/router';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import AuthService from '../../utils/AuthService';
import Panel from '../Panel';

const auth = new AuthService();

export default class CreateEvent extends Component {
    state = {
        title: '',
        description: '',
        type: '',
        error: '',
        date: null,
        focused: false
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
        const { date } = data;
        data.date = date.unix();
        ev.preventDefault();

        if (this.validate()) {
            auth.api('post', '/event', {
                data
            });
        }
    };

    validate = () => {
        const { title, type, date } = this.state;
        if (!title.length) {
            this.setError('You must enter a title!');
            return false;
        }
        if (title.length < 3) {
            this.setError('Title Must be greater than 3 characters!');
            return false;
        }
        if (!type.length) {
            this.setError('You must pick a type!');
            return false;
        }
        if (!date) {
            this.setError('You Must pick a date!');
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
            <Panel title="Create Event">
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
                    <SingleDatePicker
                        date={this.state.date} // momentPropTypes.momentObj or null
                        onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                        focused={this.state.focused} // PropTypes.bool
                        onFocusChange={({ focused }) =>
                            this.setState({ focused })
                        } // PropTypes.func.isRequired
                        id="date-picker" // PropTypes.string.isRequired,
                        numberOfMonths={1}
                        hideKeyboardShortcutsPanel={true}
                    />
                    <select name="type" onChange={this.handleChange}>
                        <option value="">Select Type</option>
                        <option value="Raid">Raid</option>
                        <option value="Dungeon">Dungeon</option>
                        <option value="PVP">PVP</option>
                        <option value="Other">Other</option>
                    </select>
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
        );
    }
}
