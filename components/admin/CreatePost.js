import React, { Component } from 'react';
import Router from 'next/router';

import Panel from '../Panel';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }
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
        const { auth, cb } = this.props;
        const formData = new FormData(ev.target);

        ev.preventDefault();

        auth.api('post', '/post', {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(post => {
            cb(post);
        });
    };

    render() {
        return (
            <Panel title="Create Post" styleName="">
                <form
                    className="proto-form form-apply"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        name="title"
                        type="text"
                        placeholder="Title of post"
                        onChange={this.handleChange}
                    />
                    <input type="file" name="image" ref={this.fileInput} />
                    <input
                        className="proto-btn"
                        type="submit"
                        value="Create Post"
                    />
                </form>
            </Panel>
        );
    }
}
