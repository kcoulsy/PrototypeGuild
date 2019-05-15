import React, { Component } from 'react';
import "./styles.scss";

export default class componentName extends Component {
  state = {
    characterName: '',
    playerClass: '',
    playerRole: '',
    professionOne: '',
    professionTwo: '',
    discordTag: '',
    applicationJSON: {
      aboutSelf: '',
      value: '',
      experience: '',
      ui: '',
      anythingElse: '',
    },
    username: '',
    password: '',
    confirm: '',
    error: ''
  }

  handleChange = (ev) => {
    if (this.state.error.length) this.setError('');
    const val = ev.target.value;
    const field = ev.target.name;
    const newState = {}
    newState[field] = val;
    this.setState(newState);
  }

  handleExtraInfoChange = (ev) => {
    if (this.state.error.length) this.setError('');
    const val = ev.target.value;
    const field = ev.target.name;
    const newState = this.state.applicationJSON;
    newState[field] = val;
    this.setState({applicationJSON: newState});
  }
  handleSubmit = (ev) => {
    if (this.validate()) {
      console.log('valid');
    }
  }

  validate = () => {
    if (!this.state.characterName.length) {
      this.setError('You must enter your character name!');
      return false;
    }
    if (!this.state.playerClass.length) {
      this.setError('You must select a class!');
      return false;
    }
    if (!this.state.playerRole.length) {
      this.setError('You must select a role!');
      return false;
    }
    if (!this.state.discordTag) {
      this.setError('You must add your discord!');
      return false;
    }
    if (!this.state.username) {
      this.setError('You must enter your username!');
      return false;
    }
    if (!this.state.password) {
      this.setError('You must enter your password');
      return false;
    }
    if (this.state.password.length < 6) {
      this.setError('Your password must be greater than 6 characters!');
      return false;
    }
    if (!this.state.confirm) {
      this.setError('You must enter your password confirmation!');
      return false;
    }
    if (this.state.confirm !== this.state.password) {
      this.setError('Your passwords must match!');
      return false;
    }
    return true;
  }

  setError = (msg) => {
    this.setState({error: msg});
  }

  render() {
    // console.log(this.state);
    return (
      <div>

      <table className="form apply-form">
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input name="characterName" type="text" onChange={this.handleChange} />
            </td>
          </tr>
          <tr>
            <td>Class</td>
            <td>
              <select name="playerClass" id="" onChange={this.handleChange} >
                <option value="">Please select a class</option>
                <option value="warrior">Warrior</option>
                <option value="paladin">Paladin</option>
                <option value="hunter">Hunter</option>
                <option value="druid">Druid</option>
                <option value="rogue">Rogue</option>
                <option value="mage">Mage</option>
                <option value="priest">Priest</option>
                <option value="warlock">Warlock</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Role</td>
            <td>
              <select name="playerRole" id="" onChange={this.handleChange}>
                <option value="">Please select a role</option>
                <option value="tank">Tank</option>
                <option value="healer">Healer</option>
                <option value="melee">Melee</option>
                <option value="ranged">Ranged</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Profession 1</td>
            <td>
              <select name="professionOne" onChange={this.handleChange}>
                <option value="">Please select your first profession</option>
                <option value="mining">Mining</option>
                <option value="herbalism">Herbalism</option>
                <option value="skinning">Skinning</option>
                <option value="engineering">Engineering</option>
                <option value="enchanting">Enchanting</option>
                <option value="alchemy">Alchemy</option>
                <option value="tailoring">Tailoring</option>
                <option value="leatherworking">Leatherworking</option>
                <option value="blacksmithing">Blacksmithing</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Profession 2</td>
            <td>
              <select name="professionTwo" onChange={this.handleChange}>
                <option value="">Please select your first profession</option>
                <option value="mining">Mining</option>
                <option value="herbalism">Herbalism</option>
                <option value="skinning">Skinning</option>
                <option value="engineering">Engineering</option>
                <option value="enchanting">Enchanting</option>
                <option value="alchemy">Alchemy</option>
                <option value="tailoring">Tailoring</option>
                <option value="leatherworking">Leatherworking</option>
                <option value="blacksmithing">Blacksmithing</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Discord Tag</td>
            <td>
              <input name="discordTag" type="text" onChange={this.handleChange}/>
            </td>
          </tr>
          <tr>
            <td>Tell us about yourself</td>
            <td>
              <textarea name="aboutSelf"  id="" cols="30" rows="5" onChange={this.handleExtraInfoChange} />
            </td>
          </tr>
          <tr>
            <td>What do you value in a guild?</td>
            <td>
              <textarea name="value"  id="" cols="30" rows="5" onChange={this.handleExtraInfoChange} />
            </td>
          </tr>
          <tr>
            <td>
              What experience do you have raiding in wow? (Can be classic, bfa or
              anything in between, just be honest)
            </td>
            <td>
              <textarea name="experience" id="" cols="30" rows="5" onChange={this.handleExtraInfoChange} />
            </td>
          </tr>
          <tr>
            <td>A recent UI screenshot.</td>
            <td>
              <input name="ui" type="text"  onChange={this.handleExtraInfoChange} />
            </td>
          </tr>
          <tr>
            <td>Anything else you would like to add?</td>
            <td>
              <textarea name="anythingElse"  id="" cols="30" rows="5" onChange={this.handleExtraInfoChange} />
            </td>
          </tr>
  
          <tr>
            <td></td>
            <td>
              <h3>IMPORTANT. DO NOT USE YOUR B.NET LOGIN DETAILS</h3>
            </td>
          </tr>
          <tr>
            <td>Username</td>
            <td>
              <input name="username" type="text" onChange={this.handleChange} />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input name="password" type="password" onChange={this.handleChange} />
            </td>
          </tr>
          <tr>
            <td>Confirm</td>
            <td>
              <input name="confirm" type="password"  onChange={this.handleChange} />
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <button className="btn btn-success" onClick={this.handleSubmit}>Apply</button>
            </td>
          </tr>
        </tbody>
      </table>
      {this.state.error}
      </div>
    );
  }
}
