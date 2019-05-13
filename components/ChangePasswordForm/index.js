import React from "react";

export default () => {
  return (
    <table class="form">
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
            <button class="btn btn-success">Change Password</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
