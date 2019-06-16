import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import Panel from '../Panel';
import Loader from '../Loader';

export default class EditEvent extends Component {
    state = {
        title: '',
        description: '',
        type: '',
        error: '',
        date: null,
        focused: false,
        isLoading: true
    };

    comp() {
        this.fetchEvent();
    }

    fetchEvent = () => {
        const { auth, id } = this.props;

        auth.api('get', `/events/find/${id}`).then(res => {
            const { title, description, date, type } = res[0];
            this.setState({
                title,
                description,
                date: moment(date),
                type,
                isLoading: false
            });
        });
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
        const { auth, id, cb } = this.props;
        const data = this.state;
        const { date } = data;
        data.date = date.unix();
        data._id = id;
        ev.preventDefault();

        if (this.validate()) {
            auth.api('patch', '/event', {
                data
            }).then(event => {
                cb(event);
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

    handleRemove = ev => {
        const { auth, id, cb } = this.props;
        ev.preventDefault();
        if (!this.validate()) {
            return;
        }
        if (confirm('Are you sure you want to remove this event?')) {
            auth.api('patch', '/event/remove', {
                data: {
                    _id: id
                }
            }).then(() => {
                cb(event);
            });
        }
    };

    setError = msg => {
        this.setState({ error: msg });
    };

    render() {
        const { error, isLoading } = this.state;

        return (
            <Panel title="Create Event">
                {isLoading ? (
                    <Loader />
                ) : (
                    <form className="proto-form form-apply">
                        <input
                            name="title"
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.title}
                            placeholder="Title"
                        />
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            onChange={this.handleChange}
                            value={this.state.description}
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
                        <select
                            name="type"
                            onChange={this.handleChange}
                            value={this.state.type}
                        >
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
                            Edit
                        </button>
                        <button
                            className="proto-btn"
                            onClick={this.handleRemove}
                            type="submit"
                        >
                            Delete
                        </button>
                    </form>
                )}
                {error}
            </Panel>
        );
    }
}
