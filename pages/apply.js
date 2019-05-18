import React, { Component } from 'react'
import Router from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import AuthService from '../utils/AuthService'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'

const auth = new AuthService()

export default class Apply extends Component {
    state = {
        captcha: '',
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
            anythingElse: ''
        },
        username: '',
        password: '',
        confirm: '',
        error: ''
    }

    handleChange = ev => {
        if (this.state.error.length) this.setError('')
        const val = ev.target.value
        const field = ev.target.name
        const newState = {}
        newState[field] = val
        this.setState(newState)
    }

    handleExtraInfoChange = ev => {
        if (this.state.error.length) this.setError('')
        const val = ev.target.value
        const field = ev.target.name
        const newState = this.state.applicationJSON
        newState[field] = val
        this.setState({ applicationJSON: newState })
    }

    handleSubmit = ev => {
        const data = this.state
        data.applicationJSON = JSON.stringify(this.state.applicationJSON)
        if (this.validate()) {
            auth.api('post', '/users', {
                data: this.state
            }).then(res => {
                Router.push('http://localhost:3001/')
            })
        }
    }

    validate = () => {
        if (!this.state.characterName.length) {
            this.setError('You must enter your character name!')
            return false
        }
        if (!this.state.playerClass.length) {
            this.setError('You must select a class!')
            return false
        }
        if (!this.state.playerRole.length) {
            this.setError('You must select a role!')
            return false
        }
        if (!this.state.discordTag) {
            this.setError('You must add your discord!')
            return false
        }
        if (!this.state.username) {
            this.setError('You must enter your username!')
            return false
        }
        if (!this.state.password) {
            this.setError('You must enter your password')
            return false
        }
        if (this.state.password.length < 6) {
            this.setError('Your password must be greater than 6 characters!')
            return false
        }
        if (!this.state.confirm) {
            this.setError('You must enter your password confirmation!')
            return false
        }
        if (this.state.confirm !== this.state.password) {
            this.setError('Your passwords must match!')
            return false
        }
        // if (!this.state.captcha) {
        //   this.setError('You must prove you\'re not a robot!');
        //   return false;
        // }
        return true
    }

    setError = msg => {
        this.setState({ error: msg })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="content">
                    <Panel title="Apply to the guild" styleName="panel-md">
                        <div className="proto-form form-apply">
                            <input
                                name="discordTag"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="Discord Tag"
                            />
                            <input
                                name="characterName"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="Character Name"
                            />
                            <select
                                name="playerClass"
                                id=""
                                onChange={this.handleChange}
                            >
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
                            <select
                                name="playerRole"
                                id=""
                                onChange={this.handleChange}
                            >
                                <option value="">Please select a role</option>
                                <option value="tank">Tank</option>
                                <option value="healer">Healer</option>
                                <option value="melee">Melee</option>
                                <option value="ranged">Ranged</option>
                            </select>
                            <select
                                name="professionOne"
                                onChange={this.handleChange}
                            >
                                <option value="">
                                    Please select your first profession
                                </option>
                                <option value="mining">Mining</option>
                                <option value="herbalism">Herbalism</option>
                                <option value="skinning">Skinning</option>
                                <option value="engineering">Engineering</option>
                                <option value="enchanting">Enchanting</option>
                                <option value="alchemy">Alchemy</option>
                                <option value="tailoring">Tailoring</option>
                                <option value="leatherworking">
                                    Leatherworking
                                </option>
                                <option value="blacksmithing">
                                    Blacksmithing
                                </option>
                            </select>
                            <select
                                name="professionTwo"
                                onChange={this.handleChange}
                            >
                                <option value="">
                                    Please select your first profession
                                </option>
                                <option value="mining">Mining</option>
                                <option value="herbalism">Herbalism</option>
                                <option value="skinning">Skinning</option>
                                <option value="engineering">Engineering</option>
                                <option value="enchanting">Enchanting</option>
                                <option value="alchemy">Alchemy</option>
                                <option value="tailoring">Tailoring</option>
                                <option value="leatherworking">
                                    Leatherworking
                                </option>
                                <option value="blacksmithing">
                                    Blacksmithing
                                </option>
                            </select>
                            <textarea
                                name="aboutSelf"
                                id=""
                                cols="30"
                                rows="5"
                                onChange={this.handleExtraInfoChange}
                                placeholder="Tell us about yourself?"
                            />
                            <textarea
                                name="value"
                                id=""
                                cols="30"
                                rows="5"
                                onChange={this.handleExtraInfoChange}
                                placeholder="What do you value in a guild?"
                            />
                            <textarea
                                name="experience"
                                id=""
                                cols="30"
                                rows="5"
                                onChange={this.handleExtraInfoChange}
                                placeholder="What experience do you have raiding in wow? (Can be classic, bfa or anything in between, just be honest)"
                            />
                            <input
                                type="text"
                                name="ui"
                                placeholder="A recent UI screenshot."
                                onChange={this.handleExtraInfoChange}
                            />
                            <textarea
                                name="anythingElse"
                                id=""
                                cols="30"
                                rows="5"
                                onChange={this.handleExtraInfoChange}
                                placeholder="Anything else you would like to add?"
                            />
                            <input
                                name="username"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="Username"
                            />
                            <input
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                                placeholder="Password"
                            />
                            <input
                                name="confirm"
                                type="password"
                                onChange={this.handleChange}
                                placeholder="Confirm"
                            />
                            <ReCAPTCHA
                                sitekey="6LcTxaMUAAAAAGRkZQFvvztlW50KYF_QiOVBFwU3"
                                onChange={val =>
                                    this.setState({ captcha: val })
                                }
                            />
                            <button
                                className="proto-btn"
                                onClick={this.handleSubmit}
                            >
                                Apply Now
                            </button>
                        </div>
                        {this.state.error}
                    </Panel>
                </div>
            </div>
        )
    }
}
