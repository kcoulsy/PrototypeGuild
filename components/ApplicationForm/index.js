import React from "react";
import "./styles.scss";

export default () => {
  return (
    <table className="form apply-form">
      <tbody>
        <tr>
          <td>Name</td>
          <td>
            <input type="text" />
          </td>
        </tr>
        <tr>
          <td>Class</td>
          <td>
            <select name="" id="">
              <option>Warrior</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Role</td>
          <td>
            <select name="" id="">
              <option>Tank</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Profession 1</td>
          <td>
            <select name="" id="">
              <option>Mining</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Profession 2</td>
          <td>
            <select name="" id="">
              <option>Engineering</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Discord Tag</td>
          <td>
            <input type="text" />
          </td>
        </tr>
        <tr>
          <td>Tell us about yourself</td>
          <td>
            <textarea name="" id="" cols="30" rows="5" />
          </td>
        </tr>
        <tr>
          <td>What do you value in a guild?</td>
          <td>
            <textarea name="" id="" cols="30" rows="5" />
          </td>
        </tr>
        <tr>
          <td>
            What experience do you have raiding in wow? (Can be classic, bfa or
            anything in between, just be honest)
          </td>
          <td>
            <textarea name="" id="" cols="30" rows="5" />
          </td>
        </tr>
        <tr>
          <td>A recent UI screenshot.</td>
          <td>
            <input type="text" />
          </td>
        </tr>
        <tr>
          <td>Anything else you would like to add?</td>
          <td>
            <textarea name="" id="" cols="30" rows="5" />
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
            <input type="text" />
          </td>
        </tr>
        <tr>
          <td>Password</td>
          <td>
            <input type="password" value="password" />
          </td>
        </tr>
        <tr>
          <td>Confirm</td>
          <td>
            <input type="password" value="password" />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <button className="btn btn-success">Apply</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
