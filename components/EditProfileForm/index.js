import React from "react";

export default () => {
  return (
    <table className="form">
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
          <td>Rank</td>
          <td>
            <select name="" id="">
              <option>Guild Master</option>
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
          <td />
          <td>
            <button className="btn btn-success">Save</button>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
