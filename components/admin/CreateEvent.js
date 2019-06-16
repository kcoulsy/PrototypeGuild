import React, { Component } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import Panel from '../Panel';

export default class CreateEvent extends Component {
    state = {
        title: '',
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
        const { auth, cb } = this.props;
        const data = this.state;
        const { date } = data;
        data.date = date.unix();
        ev.preventDefault();

        if (this.validate()) {
            auth.api('post', '/event', {
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

    setError = msg => {
        this.setState({ error: msg });
    };

    render() {
        const { error, focused, date } = this.state;
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
                        date={date} // momentPropTypes.momentObj or null
                        onDateChange={newDate =>
                            this.setState({ date: newDate })
                        } // PropTypes.func.isRequired
                        focused={focused} // PropTypes.bool
                        onFocusChange={({ newFocused }) =>
                            this.setState({ focused: newFocused })
                        } // PropTypes.func.isRequired
                        id="date-picker" // PropTypes.string.isRequired,
                        numberOfMonths={1}
                        hideKeyboardShortcutsPanel
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
