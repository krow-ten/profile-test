import React, { useState } from "react";

import App from "./App";

export default () => {
  const [loggedInUser, setLoggedInUser] = useState();

  return <App loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />;
};
