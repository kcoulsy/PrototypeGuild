import React, { Component } from 'react';
import axios from 'axios';

import ApplicationForm from '../components/ApplicationForm';
import Nav from '../components/Nav';

class Apply extends Component {
  render() {
    return <div>
      <Nav />
        <div className="main">
        <div className="apply">
          <h2>Apply</h2>
          <ApplicationForm />
        </div>
      </div>
    </div>
  }
}

export default Apply;
