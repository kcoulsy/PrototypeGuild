import React from "react";

export default () => {
  return (
    <table className="form">
      <tbody>
        <tr>
          <td>New Passowrd</td>
          <td>
            <input type="password" />
          </td>
        </tr>
        <tr>
          <td>Confirm</td>
          <td>
            <input type="password" />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <button className="btn btn-success">Change Password</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
