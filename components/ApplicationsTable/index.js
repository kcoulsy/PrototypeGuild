import React from "react";
import Link from 'next/link';

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
        <Link href="/admin/applicant">
        <tr>
          <td>Syth</td>
          <td>Warrior</td>
          <td>Tank</td>
        </tr>
        </Link>
        
        <Link href="/admin/applicant">
        <tr>
          <td>Kiccpe</td>
          <td>Rogue</td>
          <td>Melee DPS</td>
        </tr>
        </Link>
      </tbody>
    </table>
  );
};
