import React, { Component } from 'react'
import axios from 'axios';
import Router from 'next/router'

import Nav from '../../components/Nav';
import { BASE_URL } from '../../config/constants';

export default class CreatePost extends Component {
  state = {
    title: '',
    body: '',
    imageUrl: '',
    featured: false
  }
  handleChange = (ev) => {
    let change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change)
  }
  handleCheckboxChange = (ev) => {
    this.setState({featured: ev.target.checked});
  }
  handleSubmit = async (ev) => {
    ev.preventDefault();
    const res = await axios({
      method: 'post',
      url: '/post',
      baseURL: BASE_URL,
      data: this.state
    });
    if (res.status === 200) {
      Router.push(`/`)
    }
  }
  render() {
    return (
      <div >
      <Nav />
        <div className="main">
        <div className="row">
          <div className="create-post-form">
          <h2>Create Post</h2>
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
            <button onClick={this.handleSubmit}>Create Post</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
