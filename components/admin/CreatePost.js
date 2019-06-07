import React, { Component } from 'react';
import Router from 'next/router';

import Panel from '../Panel';

export default class CreatePost extends Component {
    state = {
        title: '',
        body: '',
        imageUrl: '',
        featured: false
    };

    handleChange = ev => {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    };

    handleCheckboxChange = ev => {
        this.setState({ featured: ev.target.checked });
    };

    handleSubmit = async ev => {
        const { auth } = this.props;
        ev.preventDefault();
        auth.api('post', '/post', {
            data: this.state
        }).then(() => {
            Router.push(`/`);
        });
    };

    render() {
        return (
            <Panel title="Create Post" styleName="">
                <form className="proto-form form-apply">
                    <input
                        name="title"
                        type="text"
                        placeholder="Title of post"
                        onChange={this.handleChange}
                    />
                    <textarea
                        name="body"
                        placeholder="Post body here"
                        onChange={this.handleChange}
                    />
                    <input
                        name="imageUrl"
                        type="text"
                        placeholder="Image url"
                        onChange={this.handleChange}
                    />
                    <label>
                        <span className="feature">Feature?</span>
                        <input
                            name="featured"
                            type="checkbox"
                            onChange={this.handleCheckboxChange}
                        />
                    </label>
                    <button className="proto-btn" onClick={this.handleSubmit}>
                        Create Post
                    </button>
                </form>
            </Panel>
        );
    }
}
