import React from "react";

import { Route } from "react-micro-router";

import Login from "components/Login";
import Profile from "components/Profile";
import Nav from "components/Nav";

import { User } from "../../types";

export const App = ({
  loggedInUser,
  setLoggedInUser,
}: {
  loggedInUser: User;
  setLoggedInUser: Function;
}) => {
  return (
    <div>
      <Nav loggedInUser={loggedInUser} />

      {loggedInUser && (
        <>
          <Route path="/" exact>
            <h2>Hello, {loggedInUser.firstName}</h2>
          </Route>

          <Route path="/profile" exact>
            <Profile
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          </Route>
        </>
      )}

      {!loggedInUser && <Login setLoggedInUser={setLoggedInUser} />}
    </div>
  );
};

export default App;
