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
          <td>Rank</td>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Syth</td>
          <td>Warrior</td>
          <td>Tank</td>
          <td>Guild Master</td>
        </tr>
        <tr>
          <td>Kiccpe</td>
          <td>Rogue</td>
          <td>Melee DPS</td>
          <td>Officer</td>
        </tr>
      </tbody>
    </table>
  );
};
