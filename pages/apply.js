import React, { Component } from 'react';
import axios from 'axios';

import Nav from '../components/Nav';

class Apply extends Component {
  render() {
    return <div>
      <Nav />
        <div className="main">
        <div className="row">
            <div className="apply-form">
            <h2>Apply</h2>
            <h3>Character Name<span className="required"/></h3>
            <input name="" type="text" placeholder="" />
            <h3>Discord Tag<span className="required"/></h3>
            <input name="" type="text" placeholder="" />
            <h3>Class and Spec<span className="required"/></h3>
            <div className="inline">
                <select>
                    <option>Warrior</option>
                </select>
                <select>
                    <option>Prot</option>
                </select>
            </div>
            <h3>Professions<span className="required"/></h3>
            <div className="inline">
                <select>
                    <option>Warrior</option>
                </select>
                <select>
                    <option>Prot</option>
                </select>
            </div>
            <h3>Tell us about yourself.</h3>
            <textarea name="aboutYourself" />
            <h3>What do you value in a guild?</h3>
            <textarea name="guildValue" />
            <h3>What experience do you have raiding in wow? (Can be classic, bfa or anything in between, just be honest)</h3>
            <textarea name="raidExp" />
            <h3>A recent UI screenshot.</h3>
            <input name="" type="text" placeholder="" />
            <h3>Anything else you would like to add?</h3>
            <textarea name="anythingElse" />
            <span className="divider"></span>
            <h3>Username<span className="required"/></h3>
            <input name="" type="text" placeholder="" />
            <h3>Password<span className="required"/></h3>
            <input name="" type="password" placeholder="" />
            <h3>Confirm Password<span className="required"/></h3>
            <input name="" type="password" placeholder="" />
            <button onClick={this.handleSubmit}>Apply</button>
            </div>
        </div>
      </div>
    </div>
  }
}

export default Apply;
