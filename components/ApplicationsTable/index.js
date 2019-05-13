import React from "react";
import "./styles.scss";

export default () => {
  return (
    <table class="selector">
      <thead>
        <tr>
          <td>Player</td>
          <td>Class</td>
          <td>Role</td>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Syth</td>
          <td>Warrior</td>
          <td>Tank</td>
        </tr>
        <tr>
          <td>Kiccpe</td>
          <td>Rogue</td>
          <td>Melee DPS</td>
        </tr>
      </tbody>
    </table>
  );
};
