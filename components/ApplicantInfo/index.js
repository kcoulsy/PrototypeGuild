import React from "react";

export default () => {
  return (
    <table className="info">
      <tbody>
        <tr>
          <td>Name</td>
          <td>Syth</td>
        </tr>
        <tr>
          <td>Class</td>
          <td>Warrior</td>
        </tr>
        <tr>
          <td>Role</td>
          <td>Tank</td>
        </tr>
        <tr>
          <td>Rank</td>
          <td>Guild Master</td>
        </tr>
        <tr>
          <td>Profession</td>
          <td>Mining</td>
        </tr>
        <tr>
          <td>Profession</td>
          <td>Engineering</td>
        </tr>
        <tr>
          <td />
          <td>
            <button className="btn btn-success">Accept</button>
            <button className="btn btn-danger">Decline</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
