import React, { Component } from 'react';
import axios from 'axios';

import { BASE_URL } from '../config/constants';

import Head from '../components/head';
import Nav from '../components/Nav';
import SidebarBlogPosts from '../components/SidebarBlogPosts';

class Post extends Component {
  static async getInitialProps({ query }) {
    const res = await axios({
      url: `/posts/${query.id}`,
      baseURL: BASE_URL
    });
    const all = await axios({
      url: `/posts`,
      baseURL: BASE_URL
    });
    return {post : res.data[0], posts: all.data}
  }

  render() {
    const {post} = this.props;
    return <div>
      <Nav />
        <div className="main">
        <div className="row">
          <div className="main-post">
              <img src={post.imageUrl} alt={post.title}/>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
          </div>
          <SidebarBlogPosts posts={this.props.posts} />
        </div>
      </div>
    </div>
  }
}

export default Post
