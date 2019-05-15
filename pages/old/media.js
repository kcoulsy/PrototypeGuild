import React, { Component } from 'react';
// import axios from 'axios';

import Head from '../components/head';
import Nav from '../components/Nav';
import Gallery from '../components/Gallery';

class Media extends Component {

  render() {

    return <div>
      <Nav />
        <div className="main">
        <Gallery />
      </div>
    </div>
  }
}

export default Media
