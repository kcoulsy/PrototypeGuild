import React, { Component } from "react";
import axios from "axios";
import Router from "next/router";

import Nav from "../../components/Nav";
import Recruitment from '../../components/Recruitment';

export default class RecruitmentSettings extends Component {
  static async getInitialProps({ req }) {
    const res = await axios({
      url: "http://localhost:3001/recruitment"
    });
    return { playerClasses: res.data };
  }
  state = {
    playerClass: "warrior",
    recruiting: true
  };
  handleClassChange = ev => {
    this.setState({playerClass: ev.target.value});
  };
  handleStatusChange = ev => {
    this.setState({recruiting: ev.target.value});
  };
  handleSubmit = async ev => {
    ev.preventDefault();

    const res = await axios({
      method: "patch",
      url: "http://localhost:3001/recruitment",
      data: this.state
    });
    if (res.status === 200) {
      Router.push(`/admin/recruitment`);
    }
  };
  render() {
    const { playerClasses } = this.props;
    return (
      <div>
        <Nav />
        <div className="main">
          <div className="row">
            <div className="apply-form">
              <h2>Update Class Recruitment</h2>
              <div className="inline">
                <select name="playerClass" onChange={this.handleClassChange}>
                  {playerClasses.map(playerClass => {
                      const name = playerClass.playerClass;
                      const label = name.charAt(0).toUpperCase() + name.slice(1);
                    return (
                      <option
                        key={name}
                        value={name}
                      >
                        {label}
                      </option>
                    );
                  })}
                </select>
                <select name="recruiting" onChange={this.handleStatusChange}>
                  <option value={true}>Open</option>
                  <option value={false}>Closed</option>
                </select>
                <button onClick={this.handleSubmit}>Update</button>
              </div>

            </div>
            <Recruitment classValues={playerClasses}/>
          </div>
        </div>
      </div>
    );
  }
}
