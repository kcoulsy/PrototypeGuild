import React from "react";
import Link from 'next/link';

export default () => {
  return (
    <table class="selector">
      <thead>
        <tr>
          <td>Event</td>
          <td>Date</td>
        </tr>
      </thead>
      <tbody>
        <Link href="/event">
        <tr>
          <td>Molten Core</td>
          <td>Wed 15th Nay</td>
        </tr>
        </Link>
        
        <Link href="/event">
        <tr>
          <td>Molten Core</td>
          <td>Wed 15th Nay</td>
        </tr>
        </Link>
      </tbody>
    </table>
  );
};
