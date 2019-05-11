import React, { Component } from 'react';
import axios from 'axios';

import { BASE_URL } from '../config/constants';

import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/Nav';
import Recruitment from '../components/Recruitment';
import Carousel from '../components/Carousel';
import BlogPostList from '../components/BlogPostList';
import DiscordEmbed from '../components/DiscordEmbed';

class Home extends Component {
  static async getInitialProps({ req }) {
    const res = await axios({
      url: `/home`,
      baseURL: BASE_URL
    });
    return res.data;
  }

  render() {
    const {posts, playerClasses, featured} = this.props;
    console.log(this.props);
    return <div >
      <Nav />
        <div className="main">
        <div className="row">
        <Carousel featured={featured}/>
        <Recruitment classValues={playerClasses} />
        </div>
        <div className="row">
          <BlogPostList posts={posts} limit="3"/>
          <DiscordEmbed />
        </div>
      </div>
    </div>
  }
}

export default Home
