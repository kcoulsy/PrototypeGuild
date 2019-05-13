import React from "react";
import Link from "next/link";
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
        <Link href="/profile">
          <tr>
            <td>Syth</td>
            <td>Warrior</td>
            <td>Tank</td>
            <td>Guild Master</td>
          </tr>
        </Link>

        <Link href="/profile">
          <tr>
            <td>Kiccpe</td>
            <td>Rogue</td>
            <td>Melee DPS</td>
            <td>Officer</td>
          </tr>
        </Link>
      </tbody>
    </table>
  );
};
