import React from 'react'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'
export default () => {
    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Apply to the guild" styleName="panel-md">
                    <div className="proto-form form-apply">
                        <input type="text" placeholder="Discord Tag" />
                        <input type="text" placeholder="Character Name" />

                        <select name="" id="">
                            <option value="">Select Class</option>
                            <option value="">Warrior</option>
                            <option value="">Paladin</option>
                        </select>
                        <select name="" id="">
                            <option value="">Select Role</option>
                            <option value="">Tank</option>
                            <option value="">Healer</option>
                        </select>
                        <select name="" id="">
                            <option value="">Select First Profession</option>
                            <option value="">Select Second Profession</option>
                        </select>
                        <select name="" id="">
                            <option value="">Select Second Profession</option>
                            <option value="">Select Second Profession</option>
                        </select>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                            placeholder="Tell us about yourself?"
                        />
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                            placeholder="What do you value in a guild?"
                        />
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                            placeholder="What experience do you have raiding in wow? (Can be classic, bfa or anything in between, just be honest)"
                        />
                        <input
                            type="text"
                            placeholder="A recent UI screenshot."
                        />
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                            placeholder="Anything else you would like to add?"
                        />
                        <button className="proto-btn">Apply Now</button>
                    </div>
                </Panel>
            </div>
        </div>
    )
}
