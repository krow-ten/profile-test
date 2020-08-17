import React from "react";
import { Link } from "react-micro-router";

import { User } from "../../types";

export default ({ loggedInUser }: { loggedInUser: User }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>About</li>
      {loggedInUser && (
        <li>
          <Link to="/profile"> Profile</Link>
        </li>
      )}
    </ul>
  </nav>
);
